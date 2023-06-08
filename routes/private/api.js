const { isEmpty } = require("lodash");
const { v4 } = require("uuid");
const db = require("../../connectors/db");
const roles = require("../../constants/roles");
const {getSessionToken}=require('../../utils/session');
const e = require("express");
const getUser = async function (req) {
  const sessionToken = getSessionToken(req);
  if (!sessionToken) {
    return res.status(301).redirect("/");
  }
  console.log("hi",sessionToken);
  const user = await db
    .select("*")
    .from("se_project.sessions")
    .where("token", sessionToken)
    .innerJoin(
      "se_project.users",
      "se_project.sessions.userid",
      "se_project.users.id"
    )
    .innerJoin(
      "se_project.roles",
      "se_project.users.roleid",
      "se_project.roles.id"
    )
   .first();

  console.log("user =>", user);
  user.isNormal = user.roleid === roles.user;
  user.isAdmin = user.roleid === roles.admin;
  user.isSenior = user.roleid === roles.senior;
  console.log("user =>", user)
  
  return user;
};

module.exports = function (app) {
  // example
  app.get("/users", async function (req, res) {
    try {
       const user = await getUser(req);
      const users = await db.select('*').from("se_project.users")
        
      return res.status(200).json(users);
    } catch (e) {
      console.log(e.message);
      return res.status(400).send("Could not get users");
    }
  });
  app.post("/api/v1/station", async function (req, res) {
    const stationExists = await db
      .select("*")
      .from("se_project.stations")
      .where("stationname", req.body.stationname);
    if (!isEmpty(stationExists)) {
      return res.status(400).send("station exists");
    }

    const newStation = {
      stationname: req.body.stationname,
      stationtype : "normal",
      stationposition: null,
      stationstatus: "new"
    };
    try {
      const station = await db("se_project.stations").insert(newStation).returning("*");

      return res.status(200).json(station );
    } catch (e) {
      console.log(e.message);
      return res.status(400).send("Could not create station");
    }
  });

  app.put("/api/v1/station/:stationId",  async function (req, res) {
    if (!req.body.stationName) {
      return res.status(400).send("name is required");
    }
    try{  
    const stationID = req.params.stationId;
    const stationExists = await db
      .select("*")
      .from("se_project.stations")
      .where("id", stationID);
    if (isEmpty(stationExists)) {
      return res.status(400).send("There is no station with this ID");
    }
    const updatedstation = await db("se_project.stations")
    .where("id",stationID)
    .update({
      stationname:req.body.stationName
    })
    .returning("*");
    return res.status(200).json(updatedstation);
  }catch(e){
    console.log(e.message);
      return res.status(400).send("Could not update station");
  }
  });

  app.put("/api/v1/ride/simulate", async function (req, res){
    try {
      const {origin, destination, tripDate}=req.body;

      const currentUser = await getUser(req);

      const rideExists = await db
      .select("*")
      .from("se_project.rides")
      .where("userid", currentUser.userid)
      .where("origin", origin)
      .where("destination", destination)
      .where ("tripdate", tripDate);
    if (isEmpty(rideExists)) {
      return res.status(400).send("you dont have a ride with this information");
    }
    
    if (rideExists[0]["status"] == "completed"){
      return res.status(400).send("this ride has been already completed");
    }
 
    const updatedride = await db("se_project.rides")
    .where("userid", currentUser.userid)
    .where("origin", origin)
    .where("destination", destination)
    .where ("tripdate", tripDate)
    .update({
      status:"completed"
    })
    .returning("*");

    return res.status(200).json(updatedride);
    }catch (e){
      console.log(e.message);
      return res.status(400).send("Could not simulate ride");
    }
     
  });

  app.delete("/api/v1/station/:stationId", async function (req, res){
    try{
    const stationID = req.params.stationId;
    const stationExists = await db
    .select("*")
    .from("se_project.stations")
    .where("id", stationID);
  if (isEmpty(stationExists)) {
    return res.status(400).send("There is no station with this ID");
  }
 
  const stationtype = stationExists[0]["stationtype"];
  const stationposition = stationExists[0]["stationposition"];

  if (stationposition.trim()=="start"){

    let nextStationID ="";
    const stationroutes = await db
    .select("routeid")
    .from("se_project.stationroutes")
    .where("stationid", stationID);

    if(isEmpty(stationroutes)){
      await db("se_project.stations").where("id", stationID).del();
       return res.status(200).json("Station deleted successfully");
   }

    const route =stationroutes[0]["routeid"];

    let nextID = await db
    .select("*")
    .from("se_project.routes")
    .where("id",route )
    .where("fromstationid", stationID)
    .orWhere("tostationid", stationID)

    
    if (!isEmpty(nextID))
       if (nextID[0]["tostationid"]==stationID)
       nextStationID=nextID[0]["fromstationid"];
      else if (nextID[0]["fromstationid"]==stationID)
      nextStationID=nextID[0]["tostationid"];
     else {
        await db("se_project.stations").where("id", stationID).del();
         return res.status(200).json("Station deleted successfully");
     }


     await db("se_project.stations")
      .where("id", nextStationID)
      .update({
        stationposition : "start"
      });

      await db("se_project.stations").where("id", stationID).del();
  
      return res.status(200).json("Station deleted successfully");

  }
  else if (stationposition.trim()=="end"){
    let prevStationID ="";
    const stationroutes = await db
    .select("routeid")
    .from("se_project.stationroutes")
    .where("stationid", stationID);


   if(isEmpty(stationroutes)){
      await db("se_project.stations").where("id", stationID).del();
       return res.status(200).json("Station deleted successfully");
   }


    const route =stationroutes[0]["routeid"];

    let prevID = await db
    .select("*")
    .from("se_project.routes")
    .where("id",route )
    .where("fromstationid", stationID)
    .orWhere("tostationid", stationID)
    
    if (!isEmpty(prevID))
       if (prevID[0]["tostationid"]==stationID)
      prevStationID=prevID[0]["fromstationid"];
      else if (prevID[0]["fromstationid"]==stationID)
      prevStationID=prevID[0]["tostationid"];
  

     await db("se_project.stations")
      .where("id", prevStationID)
      .update({
        stationposition : "end"
      });

       await db("se_project.stations").where("id", stationID).del();
  
      return res.status(200).json("Station deleted successfully");
  }
  else if(stationposition.trim()=="middle") {

     if (stationtype.trim() == "normal"){
            
      let prev_next_stations=[];

      const stationroutes = await db
      .select("routeid")
      .from("se_project.stationroutes")
      .where("stationid", stationID);

      for (let i = 0; i < stationroutes.length; i++) {

        const route =stationroutes[i]["routeid"];
    
        let ID = await db
        .select("tostationid")
        .from("se_project.routes")
        .where("id",route )
        .where("fromstationid", stationID);
        
        if (!isEmpty(ID))
        prev_next_stations.push( ID[0]["tostationid"] );
    
        }
        
        const routes =[
          { routename: `hi${prev_next_stations[0]}${prev_next_stations[1]}`, fromstationid: prev_next_stations[0], tostationid: prev_next_stations[1] },
          { routename: `hi${prev_next_stations[1]}${prev_next_stations[0]}`, fromstationid: prev_next_stations[1], tostationid: prev_next_stations[0] }
        ];

        const newRouteIDs=[];

        for (let i = 0; i < routes.length; i++) {
          const element =routes[i];
          const id= await db("se_project.routes").insert(element).returning("id");
          newRouteIDs.push(id[0]);
        }

        let SR = [
          { stationid: prev_next_stations[0], routeid: newRouteIDs[0] },
          { stationid: prev_next_stations[0], routeid: newRouteIDs[1] },
          { stationid: prev_next_stations[1], routeid: newRouteIDs[0] },
          { stationid: prev_next_stations[1], routeid: newRouteIDs[1] }
        ];

       

        for (let i = 0; i < SR.length; i++) {
          const element =SR[i];
          await db("se_project.stationroutes").insert(element);
        }
      

        const deletedStation = await db("se_project.stations").where("id", stationID).del().returning("*");
  
        return res.status(200).json("Station deleted successfully");
     }
     else{ 
          
      let prev_next_stations=[];

      const stationroutes = await db
      .select("routeid")
      .from("se_project.stationroutes")
      .where("stationid", stationID);

      for (let i = 0; i < stationroutes.length; i++) {

        const route =stationroutes[i]["routeid"];
    
        let ID = await db
        .select("tostationid")
        .from("se_project.routes")
        .where("id",route )
        .where("fromstationid", stationID);
        
        if (!isEmpty(ID))
        prev_next_stations.push( ID[0]["tostationid"] );
    
        }
      
        const station_0 = await db
        .select("*")
        .from("se_project.stations")
        .where("id", prev_next_stations[0]);

        const station_1 = await db
        .select("*")
        .from("se_project.stations")
        .where("id", prev_next_stations[1]);

        const station_2 = await db
        .select("*")
        .from("se_project.stations")
        .where("id", prev_next_stations[2]);

        let newTransferStationID="";


        if( station_0[0]["stationposition"]=="middle" && station_0[0]["stationtype"]=="normal"){
           newTransferStationID=station_0[0]["id"];
        }
        else if ( station_1[0]["stationposition"]=="middle" && station_1[0]["stationtype"]=="normal") {
           newTransferStationID=station_1[0]["id"];
        }
        else if ( station_2[0]["stationposition"]=="middle" && station_2[0]["stationtype"]=="normal") {
           newTransferStationID=station_2[0]["id"];
        }

        if (newTransferStationID=="")   
         return res.status(400).send("Could not delete station, as there is no subsitute for this transfer station");

        if (newTransferStationID==station_0[0]["id"]){
          const routes =[
            { routename: `hi${newTransferStationID}${station_1[0]["id"]}`, fromstationid: newTransferStationID, tostationid: station_1[0]["id"]},
            { routename: `hi${station_1[0]["id"]}${newTransferStationID}`, fromstationid: station_1[0]["id"], tostationid: newTransferStationID },
            { routename: `hi${newTransferStationID}${station_2[0]["id"]}`, fromstationid: newTransferStationID, tostationid: station_2[0]["id"] },
            { routename: `hi${station_2[0]["id"]}${newTransferStationID}`, fromstationid: station_2[0]["id"], tostationid: newTransferStationID }
          ];
    
        console.log(newTransferStationID);
        console.log(station_1);
        console.log(station_2);

          const newRouteIDs=[];
  
          for (let i = 0; i < routes.length; i++) {
            const element =routes[i];
            const id= await db("se_project.routes").insert(element).returning("id");
            newRouteIDs.push(id[0]);
          }
  
          let SR = [
            { stationid: newTransferStationID, routeid: newRouteIDs[0] },
            { stationid: newTransferStationID, routeid: newRouteIDs[1] },
            { stationid: newTransferStationID, routeid: newRouteIDs[2] },
            { stationid: newTransferStationID, routeid: newRouteIDs[3] },
            { stationid: station_1[0]["id"], routeid: newRouteIDs[0] },
            { stationid: station_1[0]["id"], routeid: newRouteIDs[1] },
            { stationid: station_2[0]["id"], routeid: newRouteIDs[2] },
            { stationid: station_2[0]["id"], routeid: newRouteIDs[3] }
          ];
  
         
  
          for (let i = 0; i < SR.length; i++) {
            const element =SR[i];
            await db("se_project.stationroutes").insert(element);
          }
        
           await db("se_project.stations")
           .where("id", newTransferStationID)
           .update({
           stationtype : "transfer"
          }).returning("*");
  
          await db("se_project.stations").where("id", stationID).del();

          return res.status(200).json("Station deleted successfully");
         

        }else if (newTransferStationID==station_1[0]["id"]){
          const routes =[
            { routename: `hi${newTransferStationID}${station_0[0]["id"]}`, fromstationid: newTransferStationID, tostationid: station_0[0]["id"]},
            { routename: `hi${station_0[0]["id"]}${newTransferStationID}`, fromstationid: station_0[0]["id"], tostationid: newTransferStationID },
            { routename: `hi${newTransferStationID}${station_2[0]["id"]}`, fromstationid: newTransferStationID, tostationid: station_2[0]["id"] },
            { routename: `hi${station_2[0]["id"]}${newTransferStationID}`, fromstationid: station_2[0]["id"], tostationid: newTransferStationID }
          ];
  
          const newRouteIDs=[];
  
          for (let i = 0; i < routes.length; i++) {
            const element =routes[i];
            const id= await db("se_project.routes").insert(element).returning("id");
            newRouteIDs.push(id[0]);
          }
  
          let SR = [
            { stationid: newTransferStationID, routeid: newRouteIDs[0] },
            { stationid: newTransferStationID, routeid: newRouteIDs[1] },
            { stationid: newTransferStationID, routeid: newRouteIDs[2] },
            { stationid: newTransferStationID, routeid: newRouteIDs[3] },
            { stationid: station_0[0]["id"], routeid: newRouteIDs[0] },
            { stationid: station_0[0]["id"], routeid: newRouteIDs[1] },
            { stationid: station_2[0]["id"], routeid: newRouteIDs[2] },
            { stationid: station_2[0]["id"], routeid: newRouteIDs[3] }
          ];
  
         
  
          for (let i = 0; i < SR.length; i++) {
            const element =SR[i];
            await db("se_project.stationroutes").insert(element);
          }
        
           await db("se_project.stations")
           .where("id", newTransferStationID)
           .update({
           stationtype : "transfer"
          }).returning("*");
  
          await db("se_project.stations").where("id", stationID).del();

          return res.status(200).json("Station deleted successfully");
        
        }else{
          const routes =[
            { routename: `hi${newTransferStationID}${station_0[0]["id"]}`, fromstationid: newTransferStationID, tostationid: station_0[0]["id"]},
            { routename: `hi${station_0[0]["id"]}${newTransferStationID}`, fromstationid: station_0[0]["id"], tostationid: newTransferStationID },
            { routename: `hi${newTransferStationID}${station_1[0]["id"]}`, fromstationid: newTransferStationID, tostationid: station_1[0]["id"] },
            { routename: `hi${station_1[0]["id"]}${newTransferStationID}`, fromstationid: station_1[0]["id"], tostationid: newTransferStationID }
          ];
  
          const newRouteIDs=[];
  
          for (let i = 0; i < routes.length; i++) {
            const element =routes[i];
            const id= await db("se_project.routes").insert(element).returning("id");
            newRouteIDs.push(id[0]);
          }
  
          let SR = [
            { stationid: newTransferStationID, routeid: newRouteIDs[0] },
            { stationid: newTransferStationID, routeid: newRouteIDs[1] },
            { stationid: newTransferStationID, routeid: newRouteIDs[2] },
            { stationid: newTransferStationID, routeid: newRouteIDs[3] },
            { stationid: station_0[0]["id"], routeid: newRouteIDs[0] },
            { stationid: station_0[0]["id"], routeid: newRouteIDs[1] },
            { stationid: station_1[0]["id"], routeid: newRouteIDs[2] },
            { stationid: station_1[0]["id"], routeid: newRouteIDs[3] }
          ];
  
         
  
          for (let i = 0; i < SR.length; i++) {
            const element =SR[i];
            await db("se_project.stationroutes").insert(element);
          }
        
          await db("se_project.stations")
           .where("id", newTransferStationID)
           .update({
           stationtype : "transfer"
          }).returning("*");

          await db("se_project.stations").where("id", stationID).del();

          return res.status(200).json("Station deleted successfully");
        }

        
      }
  }

   }catch (e){
     console.log(e.message);
     return res.status(400).send("Could not delete station");
   }

  });
  app.post("/api/v1/route", async function (req, res){

    if (!req.body.routeName) {
      return res.status(400).send("route name is required");
    } if (!req.body.newStationId) {
      return res.status(400).send("new station name is required");
    } if (!req.body.connectedStationId) {
      return res.status(400).send("connected station name is required");
    }

    try{
      const stationExist_1 = await db
      .select("*")
      .from("se_project.stations")
      .where("id", req.body.newStationId);
    if (isEmpty(stationExist_1)) {
      return res.status(400).send(`There is no station with id ${req.body.newStationId}`);
    }

    const stationExist_2 = await db
    .select("*")
    .from("se_project.stations")
    .where("id", req.body.connectedStationId);
  if (isEmpty(stationExist_2)) {
    return res.status(400).send(`There is no station with id ${req.body.connectedStationId}`);
  }
    

    const routes =[
      { routename: req.body.routeName, fromstationid: req.body.newStationId, tostationid: req.body.connectedStationId },
      { routename: req.body.routeName, fromstationid: req.body.connectedStationId, tostationid: req.body.newStationId }
    ];

    const newRouteIDs=[];

    for (let i = 0; i < routes.length; i++) {
      const element =routes[i];
      const id= await db("se_project.routes").insert(element).returning("id");
      newRouteIDs.push(id[0]);
    }

    let SR = [
      { stationid: req.body.newStationId, routeid: newRouteIDs[0] },
      { stationid: req.body.newStationId, routeid: newRouteIDs[1] },
      { stationid: req.body.connectedStationId, routeid: newRouteIDs[0] },
      { stationid: req.body.connectedStationId, routeid: newRouteIDs[1] }
    ];

   

    for (let i = 0; i < SR.length; i++) {
      const element =SR[i];
      await db("se_project.stationroutes").insert(element);
    }

    const station_position = await db
      .select("stationposition")
      .from("se_project.stations")
      .where("id", req.body.connectedStationId);

    await db("se_project.stations")
    .where("id",req.body.connectedStationId)
    .update({
      stationposition:"middle"
    });

     await db("se_project.stations")
    .where("id",req.body.newStationId)
    .update({
      stationposition:station_position[0]["stationposition"],
      stationstatus:"old"
    });

    return res.status(200).json("routes created successfully");

  }catch(e){
    console.log(e.message);
      return res.status(400).send("Could not create routes");
  }

  });

  app.put("/api/v1/route/:routeId",  async function (req, res) {
    if (!req.body.routeName) {
      return res.status(400).send("name is required");
    }
    try{  
    const routeID = req.params.routeId;
    const routeExists = await db
      .select("*")
      .from("se_project.routes")
      .where("id", routeID);
    if (isEmpty(routeExists)) {
      return res.status(400).send("There is no route with this ID");
    }

    const updatedroute = await db("se_project.routes")
    .where("id",routeID)
    .update({
      routename:req.body.routeName
    })
    .returning("*");
    return res.status(200).json(updatedroute);
  }catch(e){
    console.log(e.message);
      return res.status(400).send("Could not update route");
  }
  });

  app.delete("/api/v1/route/:routeId",  async function (req, res){
    const routeID = req.params.routeId;

    try{

    const routeExists = await db
      .select("*")
      .from("se_project.routes")
      .where("id", routeID);
    if (isEmpty(routeExists)) {
      return res.status(400).send("There is no route with this ID");
    }

    const deletedroute = await db("se_project.routes").where("id", routeID).del().returning("*");

    const routeExists_2 = await db
      .select("*")
      .from("se_project.routes")
      .where("fromstationid", deletedroute[0]["tostationid"])
      .where("tostationid", deletedroute[0]["fromstationid"]);
    if (!isEmpty(routeExists_2)) {
      return res.status(200).json("route deleted successsfully");
    }

    const fromStationPosition = await db
    .select("stationposition")
    .from("se_project.stations")
    .where("id", deletedroute[0]["fromstationid"]);

    const toStationPosition = await db
    .select("stationposition")
    .from("se_project.stations")
    .where("id", deletedroute[0]["tostationid"]);
    
    if(fromStationPosition[0]["stationposition"]=="start"){

      await db("se_project.stations")
      .where("id",deletedroute[0]["fromstationid"])
      .update({
        stationposition: null
      });

     await db("se_project.stations")
    .where("id",deletedroute[0]["tostationid"])
    .update({
      stationposition: "start"
    });

    }else if(toStationPosition[0]["stationposition"]=="end"){

      await db("se_project.stations")
      .where("id",deletedroute[0]["fromstationid"])
      .update({
        stationposition: "end"
      });

     await db("se_project.stations")
    .where("id",deletedroute[0]["tostationid"])
    .update({
      stationposition: null
    });
    
    }else if(toStationPosition[0]["stationposition"]=="start"){

      await db("se_project.stations")
      .where("id",deletedroute[0]["fromstationid"])
      .update({
        stationposition: "start"
      });

     await db("se_project.stations")
    .where("id",deletedroute[0]["tostationid"])
    .update({
      stationposition: null
    });

    }else if(fromStationPosition[0]["stationposition"]=="end"){

      await db("se_project.stations")
      .where("id",deletedroute[0]["fromstationid"])
      .update({
        stationposition: null
      });

     await db("se_project.stations")
    .where("id",deletedroute[0]["tostationid"])
    .update({
      stationposition: "end"
    });
    
    } 
    

    return res.status(200).json("route deleted successsfully ");
  }catch(e){
    console.log(e.message);
      return res.status(400).send("Could not delete route");
  }
   });

  app.get("/api/v1/tickets/price",  async function (req, res){
   originid=req.query.originId;

   destinationid=req.query.destinationId;

   try{
    const originExists = await db
    .select("*")
    .from("se_project.stations")
    .where("id", originid);
  if (isEmpty(originExists)) {
    return res.status(400).send(`There is no station with this ID ${originid}`);
  }

  const destinationExists = await db
    .select("*")
    .from("se_project.stations")
    .where("id", destinationid);
  if (isEmpty(destinationExists)) {
    return res.status(400).send(`There is no station with this ID  ${destinationid}`);
  }

  let routeArray=[];
  let visistedArray=[];

  routeArray.push(originid);
  visistedArray.push(originid);

  let nextStationId=originid;
  let prevStationId=10000000;
  let transferStation=[];

  while (nextStationId!=destinationid){

    let currentStationID=nextStationId;

    const currentStationroutes = await db
    .select("tostationid")
    .from("se_project.routes")
    .where("fromstationid", currentStationID)
    .whereNot("tostationid", prevStationId);

    for (let i=0; i < currentStationroutes.length; i++){
           if (currentStationroutes[i]["tostationid"]==destinationid){
            routeArray.push(currentStationroutes[i]["tostationid"]);
            visistedArray.push(currentStationroutes[i]["tostationid"]);

            const currentStation = await db
            .select("stationtype")
            .from("se_project.stations")
            .where("id", currentStationroutes[i]["tostationid"]);
         
            if (currentStation[0]["stationtype"]=="transfer")
            transferStation.push(currentStationroutes[i]["tostationid"]);

           nextStationId=destinationid;
            break;
    }
 
  }
  if( nextStationId==destinationid)
   continue;
   

    let i2=0;

    while ( i2<currentStationroutes.length  && visistedArray.includes(currentStationroutes[i2]["tostationid"]) )
          i2++;  
       
          if (i2==currentStationroutes.length){

            nextStationId=transferStation.pop();
            
            index_of_current=routeArray.indexOf(nextStationId);
      
            if(nextStationId!=prevStationId && nextStationId!=currentStationID){
                   const ConnectionExists = await db
                   .select("*")
                   .from("se_project.routes")
                   .where("fromstationid",currentStationID )
                   .where("tostationid",nextStationId);
 
                   if(!isEmpty(ConnectionExists)){
                    routeArray.push(nextStationId);
                   
                     continue;    
                   }
                  }      


            let temp_transfer=[];

            while(index_of_current==-1&&transferStation.length==0){
              temp_transfer.push(nextStationId);
              nextStationId=transferStation.pop();
              index_of_current=routeArray.indexOf(nextStationId);            
            }

            if ( index_of_current==-1){
               let flag=false;
              while(temp_transfer.length!=0)
                transferStation.push(temp_transfer.pop());

              nextStationId=transferStation.pop();
              
              for (let y=0;y<routeArray.length;y++){
                 const ConnectionExists = await db
                 .select("*")
                 .from("se_project.routes")
                 .where("tostationid",nextStationId )
                 .where("fromstationid",routeArray[y]);

                 if(!isEmpty(ConnectionExists)){

                     const AllTransferStations = await db
                     .select("id")
                     .from("se_project.stations")
                     .where("stationtype", "transfer");
        
                     let All_transfer=[];
                     for (let y=0;y<AllTransferStations.length;y++)
                       All_transfer.push(AllTransferStations[y]["id"]);
        

                       for (let y=0;y<routeArray.length;y++){
                         if (All_transfer.includes(routeArray[y]) ){
                          const ConnectionExists = await db
                          .select("*")
                          .from("se_project.routes")
                          .where("tostationid",nextStationId )
                          .where("fromstationid",routeArray[y]);
        
                          if(!isEmpty(ConnectionExists)){
                            routeArray=routeArray.slice(0,(routeArray.indexOf(routeArray[y])+1));
                            routeArray.push(nextStationId);
                            flag=true;
                            break;
                          }
                         }
                       }
                       if(!flag){
                         routeArray=routeArray.slice(0,(routeArray.indexOf(routeArray[y])+1));
                         routeArray.push(nextStationId);
                         flag=true;
                         break;
                       }
                  }
                }
                if(flag)
                continue;
            }

            routeArray=routeArray.slice(0,(index_of_current+1)); 
      
            prevStationId=routeArray.at(-2);

            continue;
          }

    if (currentStationroutes[0]==null ){
 
      nextStationId=transferStation.pop();
      
      index_of_current=routeArray.indexOf(nextStationId);

      routeArray=routeArray.slice(0,(index_of_current+1));

      prevStationId=routeArray.at(-2);

      continue;
    }

      let i=0;

       while ( i<currentStationroutes.length  && visistedArray.includes(currentStationroutes[i]["tostationid"]) )
          i++;  
       
          if (i==currentStationroutes.length){
 
            nextStationId=transferStation.pop();
            
            index_of_current=routeArray.indexOf(nextStationId);
      
            routeArray=routeArray.slice(0,(index_of_current+1));
      
            prevStationId=routeArray.at(-2);

            continue;
          }

          const currentStation = await db
          .select("stationtype")
          .from("se_project.stations")
          .where("id", currentStationroutes[i]["tostationid"]);
      
          if (currentStation[0]["stationtype"]=="transfer"){
            const toStations = await db
            .select("*")
            .from("se_project.routes")
            .where("fromstationid", currentStationroutes[i]["tostationid"]);
      
      
            for (let j = 0; j < (toStations.length-2); j++)
              transferStation.push(currentStationroutes[i]["tostationid"]);
          }

          if (currentStation[0]["stationtype"]=="transfer"){
             const AllTransferStations = await db
             .select("id")
             .from("se_project.stations")
             .where("stationtype", "transfer");

             let All_transfer=[];
             for (let y=0;y<AllTransferStations.length;y++)
               All_transfer.push(AllTransferStations[y]["id"]);

               for (let y=0;y<routeArray.length;y++){
                 if (All_transfer.includes(routeArray[y])){
                  const ConnectionExists = await db
                  .select("*")
                  .from("se_project.routes")
                  .where("tostationid",currentStationroutes[i]["tostationid"] )
                  .where("fromstationid",routeArray[y]);

                  if(!isEmpty(ConnectionExists)){
                    routeArray=routeArray.slice(0,(routeArray.indexOf(routeArray[y])+1));
                    break;
                  }
        
                 } 
               }

          }

      routeArray.push(currentStationroutes[i]["tostationid"]);
      visistedArray.push(currentStationroutes[i]["tostationid"]);
      nextStationId= currentStationroutes[i]["tostationid"];  
      prevStationId=currentStationID; 
  }
  const number_of_stations = routeArray.length;
  let price=null;

  if (number_of_stations<=9){
     price = await db
    .select("price")
    .from("se_project.zones")
    .where("id", 1);

  }
  else if (number_of_stations>16){
    price = await db
    .select("price")
    .from("se_project.zones")
    .where("id", 3);
  }else {
    price = await db
    .select("price")
    .from("se_project.zones")
    .where("id", 2);
  }

  return res.status(200).json(price);
   }catch(e){
    console.log(e.message);
      return res.status(400).send("Could not check price");
  }

});

app.post("/api/v1/payment/ticket",  async function (req, res){ 

  try{
  const originId =await db
  .select("id")
  .from("se_project.stations")
  .where("stationname", req.body.origin);

  if (isEmpty(originId)) {
    return res.status(400).send(`There is no station with this name ${req.body.origin}`);
  }
  let originid=originId[0]["id"];

  const destinationId =await db
  .select("id")
  .from("se_project.stations")
  .where("stationname", req.body.destination);


  if (isEmpty(destinationId)) {
    return res.status(400).send(`There is no station with this name  ${req.body.destination}`);
  }
  let destinationid=destinationId[0]["id"];



  let routeArray=[];
  let visistedArray=[];

  routeArray.push(originid);
  visistedArray.push(originid);

  let nextStationId=originid;
  let prevStationId=10000000;
  let transferStation=[];

  while (nextStationId!=destinationid){

    let currentStationID=nextStationId;

    const currentStationroutes = await db
    .select("tostationid")
    .from("se_project.routes")
    .where("fromstationid", currentStationID)
    .whereNot("tostationid", prevStationId);

    for (let i=0; i < currentStationroutes.length; i++){
           if (currentStationroutes[i]["tostationid"]==destinationid){
            routeArray.push(currentStationroutes[i]["tostationid"]);
            visistedArray.push(currentStationroutes[i]["tostationid"]);

            const currentStation = await db
            .select("stationtype")
            .from("se_project.stations")
            .where("id", currentStationroutes[i]["tostationid"]);
         
            if (currentStation[0]["stationtype"]=="transfer")
            transferStation.push(currentStationroutes[i]["tostationid"]);

           nextStationId=destinationid;
            break;
    }
 
  }
  if( nextStationId==destinationid)
   continue;
   

    let i2=0;

    while ( i2<currentStationroutes.length  && visistedArray.includes(currentStationroutes[i2]["tostationid"]) )
          i2++;  
       
          if (i2==currentStationroutes.length){

            nextStationId=transferStation.pop();
            
            index_of_current=routeArray.indexOf(nextStationId);
      
            if(nextStationId!=prevStationId && nextStationId!=currentStationID){
                   const ConnectionExists = await db
                   .select("*")
                   .from("se_project.routes")
                   .where("fromstationid",currentStationID )
                   .where("tostationid",nextStationId);
 
                   if(!isEmpty(ConnectionExists)){
                    routeArray.push(nextStationId);
                   
                     continue;    
                   }
                  }      


            let temp_transfer=[];

            while(index_of_current==-1&&transferStation.length==0){
              temp_transfer.push(nextStationId);
              nextStationId=transferStation.pop();
              index_of_current=routeArray.indexOf(nextStationId);            
            }

            if ( index_of_current==-1){
               let flag=false;
              while(temp_transfer.length!=0)
                transferStation.push(temp_transfer.pop());

              nextStationId=transferStation.pop();
              
              for (let y=0;y<routeArray.length;y++){
                 const ConnectionExists = await db
                 .select("*")
                 .from("se_project.routes")
                 .where("tostationid",nextStationId )
                 .where("fromstationid",routeArray[y]);

                 if(!isEmpty(ConnectionExists)){

                     const AllTransferStations = await db
                     .select("id")
                     .from("se_project.stations")
                     .where("stationtype", "transfer");
        
                     let All_transfer=[];
                     for (let y=0;y<AllTransferStations.length;y++)
                       All_transfer.push(AllTransferStations[y]["id"]);
        

                       for (let y=0;y<routeArray.length;y++){
                         if (All_transfer.includes(routeArray[y]) ){
                          const ConnectionExists = await db
                          .select("*")
                          .from("se_project.routes")
                          .where("tostationid",nextStationId )
                          .where("fromstationid",routeArray[y]);
        
                          if(!isEmpty(ConnectionExists)){
                            routeArray=routeArray.slice(0,(routeArray.indexOf(routeArray[y])+1));
                            routeArray.push(nextStationId);
                            flag=true;
                            break;
                          }
                         }
                       }
                       if(!flag){
                         routeArray=routeArray.slice(0,(routeArray.indexOf(routeArray[y])+1));
                         routeArray.push(nextStationId);
                         flag=true;
                         break;
                       }
                  }
                }
                if(flag)
                continue;
            }

            routeArray=routeArray.slice(0,(index_of_current+1)); 
      
            prevStationId=routeArray.at(-2);

            continue;
          }

    if (currentStationroutes[0]==null ){
 
      nextStationId=transferStation.pop();
      
      index_of_current=routeArray.indexOf(nextStationId);

      routeArray=routeArray.slice(0,(index_of_current+1));

      prevStationId=routeArray.at(-2);

      continue;
    }

      let i=0;

       while ( i<currentStationroutes.length  && visistedArray.includes(currentStationroutes[i]["tostationid"]) )
          i++;  
       
          if (i==currentStationroutes.length){
 
            nextStationId=transferStation.pop();
            
            index_of_current=routeArray.indexOf(nextStationId);
      
            routeArray=routeArray.slice(0,(index_of_current+1));
      
            prevStationId=routeArray.at(-2);

            continue;
          }

          const currentStation = await db
          .select("stationtype")
          .from("se_project.stations")
          .where("id", currentStationroutes[i]["tostationid"]);
      
          if (currentStation[0]["stationtype"]=="transfer"){
            const toStations = await db
            .select("*")
            .from("se_project.routes")
            .where("fromstationid", currentStationroutes[i]["tostationid"]);
      
      
            for (let j = 0; j < (toStations.length-2); j++)
              transferStation.push(currentStationroutes[i]["tostationid"]);
          }

          if (currentStation[0]["stationtype"]=="transfer"){
             const AllTransferStations = await db
             .select("id")
             .from("se_project.stations")
             .where("stationtype", "transfer");

             let All_transfer=[];
             for (let y=0;y<AllTransferStations.length;y++)
               All_transfer.push(AllTransferStations[y]["id"]);

               for (let y=0;y<routeArray.length;y++){
                 if (All_transfer.includes(routeArray[y])){
                  const ConnectionExists = await db
                  .select("*")
                  .from("se_project.routes")
                  .where("tostationid",currentStationroutes[i]["tostationid"] )
                  .where("fromstationid",routeArray[y]);

                  if(!isEmpty(ConnectionExists)){
                    routeArray=routeArray.slice(0,(routeArray.indexOf(routeArray[y])+1));
                    break;
                  }
        
                 } 
               }

          }

      routeArray.push(currentStationroutes[i]["tostationid"]);
      visistedArray.push(currentStationroutes[i]["tostationid"]);
      nextStationId= currentStationroutes[i]["tostationid"];  
      prevStationId=currentStationID; 
  }
 const number_of_stations = routeArray.length;
 let price=null;

 if (number_of_stations<=9){
    price = await db
   .select("price")
   .from("se_project.zones")
   .where("id", 1);

 }
 else if (number_of_stations>16){
   price = await db
   .select("price")
   .from("se_project.zones")
   .where("id", 3);
 }else {
   price = await db
   .select("price")
   .from("se_project.zones")
   .where("id", 2);
 }

let ticket_price=price[0]["price"];

let transferStations=[];

let RouteStations=[];

for (let i = 0; i < routeArray.length; i++){
  const Stationname = await db
  .select("stationname")
  .from("se_project.stations")
  .where("id", routeArray[i]);

  RouteStations.push(Stationname[0]["stationname"]);

  const Stationtype = await db
  .select("stationtype")
  .from("se_project.stations")
  .where("id", routeArray[i]);

  if (Stationtype[0]["stationtype"]=="transfer")
    transferStations.push(Stationname[0]["stationname"]);

}

const user = await getUser(req);

const senior = await db
  .select("roleid")
  .from("se_project.users")
  .where("id", user.userid);

  if (senior[0]["roleid"]==3)
    ticket_price*=0.5;

if(ticket_price!=req.body.payedamount)
return res.status(400).send(`You should only pay the exact ticket price, the ticket price is ${ticket_price}`);

    const newTicket = {
      origin: req.body.origin,
      destination : req.body.destination,
      userid: user.userid,
      subid: null,
      tripdate:req.body.tripDate
    };
    
      var ticketID = await db("se_project.tickets").insert(newTicket).returning("id");

      const newRide={
        status:"upcoming",
        origin: req.body.origin,
        destination : req.body.destination,
        userid: user.userid,
        ticketid:ticketID[0],
        tripdate:req.body.tripDate
       }

       await db("se_project.rides").insert(newRide);

    const newtransaction ={
      amount : req.body.payedamount,//ticket_price,
      userid : user.userid,
      purchasediid : ticketID[0],
      purchasetype: "ticket"
    };

      await db("se_project.transactions").insert(newtransaction);

      const ticketid=ticketID[0];
      price =req.body.payedamount
      return res.status(200).json({ticketid ,price,RouteStations ,transferStations});

  }catch(e){
    console.log(e.message);
      return res.status(400).send("Could not purchase ticket");
  }

});

app.post("/api/v1/tickets/purchase/subscription",  async function (req, res){ 
  try{

    const user = await getUser(req);

    const subID =await db
    .select("*")
    .from("se_project.subsription")
    .where("id", req.body.subId)
    .where("userid",user.userid);
  
    if (isEmpty(subID)) {
      return res.status(400).send(`There is no subscription belonging to you with this ID ${req.body.subId}`);
    }

    const originId =await db
    .select("id")
    .from("se_project.stations")
    .where("stationname", req.body.origin);
  
    if (isEmpty(originId)) {
      return res.status(400).send(`There is no station with this name ${req.body.origin}`);
    }
    let originid=originId[0]["id"];
  
    const destinationId =await db
    .select("id")
    .from("se_project.stations")
    .where("stationname", req.body.destination);
  
  
    if (isEmpty(destinationId)) {
      return res.status(400).send(`There is no station with this name  ${req.body.destination}`);
    }
    let destinationid=destinationId[0]["id"];
  
    let routeArray=[];
  let visistedArray=[];

  routeArray.push(originid);
  visistedArray.push(originid);

  let nextStationId=originid;
  let prevStationId=10000000;
  let transferStation=[];

  while (nextStationId!=destinationid){

    let currentStationID=nextStationId;

    const currentStationroutes = await db
    .select("tostationid")
    .from("se_project.routes")
    .where("fromstationid", currentStationID)
    .whereNot("tostationid", prevStationId);

    for (let i=0; i < currentStationroutes.length; i++){
           if (currentStationroutes[i]["tostationid"]==destinationid){
            routeArray.push(currentStationroutes[i]["tostationid"]);
            visistedArray.push(currentStationroutes[i]["tostationid"]);

            const currentStation = await db
            .select("stationtype")
            .from("se_project.stations")
            .where("id", currentStationroutes[i]["tostationid"]);
         
            if (currentStation[0]["stationtype"]=="transfer")
            transferStation.push(currentStationroutes[i]["tostationid"]);

           nextStationId=destinationid;
            break;
    }
 
  }
  if( nextStationId==destinationid)
   continue;
   

    let i2=0;

    while ( i2<currentStationroutes.length  && visistedArray.includes(currentStationroutes[i2]["tostationid"]) )
          i2++;  
       
          if (i2==currentStationroutes.length){

            nextStationId=transferStation.pop();
            
            index_of_current=routeArray.indexOf(nextStationId);
      
            if(nextStationId!=prevStationId && nextStationId!=currentStationID){
                   const ConnectionExists = await db
                   .select("*")
                   .from("se_project.routes")
                   .where("fromstationid",currentStationID )
                   .where("tostationid",nextStationId);
 
                   if(!isEmpty(ConnectionExists)){
                    routeArray.push(nextStationId);
                   
                     continue;    
                   }
                  }      


            let temp_transfer=[];

            while(index_of_current==-1&&transferStation.length==0){
              temp_transfer.push(nextStationId);
              nextStationId=transferStation.pop();
              index_of_current=routeArray.indexOf(nextStationId);            
            }

            if ( index_of_current==-1){
               let flag=false;
              while(temp_transfer.length!=0)
                transferStation.push(temp_transfer.pop());

              nextStationId=transferStation.pop();
              
              for (let y=0;y<routeArray.length;y++){
                 const ConnectionExists = await db
                 .select("*")
                 .from("se_project.routes")
                 .where("tostationid",nextStationId )
                 .where("fromstationid",routeArray[y]);

                 if(!isEmpty(ConnectionExists)){

                     const AllTransferStations = await db
                     .select("id")
                     .from("se_project.stations")
                     .where("stationtype", "transfer");
        
                     let All_transfer=[];
                     for (let y=0;y<AllTransferStations.length;y++)
                       All_transfer.push(AllTransferStations[y]["id"]);
        

                       for (let y=0;y<routeArray.length;y++){
                         if (All_transfer.includes(routeArray[y]) ){
                          const ConnectionExists = await db
                          .select("*")
                          .from("se_project.routes")
                          .where("tostationid",nextStationId )
                          .where("fromstationid",routeArray[y]);
        
                          if(!isEmpty(ConnectionExists)){
                            routeArray=routeArray.slice(0,(routeArray.indexOf(routeArray[y])+1));
                            routeArray.push(nextStationId);
                            flag=true;
                            break;
                          }
                         }
                       }
                       if(!flag){
                         routeArray=routeArray.slice(0,(routeArray.indexOf(routeArray[y])+1));
                         routeArray.push(nextStationId);
                         flag=true;
                         break;
                       }
                  }
                }
                if(flag)
                continue;
            }

            routeArray=routeArray.slice(0,(index_of_current+1)); 
      
            prevStationId=routeArray.at(-2);

            continue;
          }

    if (currentStationroutes[0]==null ){
 
      nextStationId=transferStation.pop();
      
      index_of_current=routeArray.indexOf(nextStationId);

      routeArray=routeArray.slice(0,(index_of_current+1));

      prevStationId=routeArray.at(-2);

      continue;
    }

      let i=0;

       while ( i<currentStationroutes.length  && visistedArray.includes(currentStationroutes[i]["tostationid"]) )
          i++;  
       
          if (i==currentStationroutes.length){
 
            nextStationId=transferStation.pop();
            
            index_of_current=routeArray.indexOf(nextStationId);
      
            routeArray=routeArray.slice(0,(index_of_current+1));
      
            prevStationId=routeArray.at(-2);

            continue;
          }

          const currentStation = await db
          .select("stationtype")
          .from("se_project.stations")
          .where("id", currentStationroutes[i]["tostationid"]);
      
          if (currentStation[0]["stationtype"]=="transfer"){
            const toStations = await db
            .select("*")
            .from("se_project.routes")
            .where("fromstationid", currentStationroutes[i]["tostationid"]);
      
      
            for (let j = 0; j < (toStations.length-2); j++)
              transferStation.push(currentStationroutes[i]["tostationid"]);
          }

          if (currentStation[0]["stationtype"]=="transfer"){
             const AllTransferStations = await db
             .select("id")
             .from("se_project.stations")
             .where("stationtype", "transfer");

             let All_transfer=[];
             for (let y=0;y<AllTransferStations.length;y++)
               All_transfer.push(AllTransferStations[y]["id"]);

               for (let y=0;y<routeArray.length;y++){
                 if (All_transfer.includes(routeArray[y])){
                  const ConnectionExists = await db
                  .select("*")
                  .from("se_project.routes")
                  .where("tostationid",currentStationroutes[i]["tostationid"] )
                  .where("fromstationid",routeArray[y]);

                  if(!isEmpty(ConnectionExists)){
                    routeArray=routeArray.slice(0,(routeArray.indexOf(routeArray[y])+1));
                    break;
                  }
        
                 } 
               }

          }

      routeArray.push(currentStationroutes[i]["tostationid"]);
      visistedArray.push(currentStationroutes[i]["tostationid"]);
      nextStationId= currentStationroutes[i]["tostationid"];  
      prevStationId=currentStationID; 
  }
   const number_of_stations = routeArray.length;

   const zoneID = await db
       .select("zoneid")
       .from("se_project.subsription")
       .where("id", req.body.subId);


   if (zoneID[0]["zoneid"]==1 && number_of_stations>9){
    return res.status(400).send(`your subscription is only valid for routes with maximum number of 9 stations, while current route is ${number_of_stations} stations`);
   }
   else if (zoneID[0]["zoneid"]==2 && number_of_stations>16){
    return res.status(400).send(`your subscription is only valid for routes with maximum number of 16 stations, while current route is ${number_of_stations} stations`);
   }
    
  let transferStations=[];
  
  let RouteStations=[];
  
  for (let i = 0; i < routeArray.length; i++){
    const Stationname = await db
    .select("stationname")
    .from("se_project.stations")
    .where("id", routeArray[i]);
  
    RouteStations.push(Stationname[0]["stationname"]);
  
    const Stationtype = await db
    .select("stationtype")
    .from("se_project.stations")
    .where("id", routeArray[i]);
  
    if (Stationtype[0]["stationtype"]=="transfer")
      transferStations.push(Stationname[0]["stationname"]);
  
  }
  

  const remaining_no_tickets = await db
        .select("nooftickets")
        .from("se_project.subsription")
        .where("id", req.body.subId);

  if (remaining_no_tickets[0]["nooftickets"]==0)
  return res.status(400).send("couldnot purchase ticekt because remaining number of tickets in the subscription is zero");
  
      const newTicket = {
        origin: req.body.origin,
        destination : req.body.destination,
        userid: user.userid,
        subid: req.body.subId,
        tripdate:req.body.tripDate
      };
      
        var ticketID= await db("se_project.tickets").insert(newTicket).returning("id");

         const newRide={
          status:"upcoming",
          origin: req.body.origin,
          destination : req.body.destination,
          userid: user.userid,
          ticketid:ticketID[0],
          tripdate:req.body.tripDate
         }

         await db("se_project.rides").insert(newRide);

         const no_tickets = await db
        .select("nooftickets")
        .from("se_project.subsription")
        .where("id", req.body.subId);

        await db("se_project.subsription")
        .where("id",req.body.subId)
        .update({
          nooftickets:no_tickets[0]["nooftickets"]-1
        });
       const ticketid=ticketID[0];

        return res.status(200).json({ticketid,RouteStations ,transferStations});
  
    }catch(e){
      console.log(e.message);
        return res.status(400).send("Could not purchase ticket");
    }
  
});

app.put("/api/v1/password/reset",async function (req, res){
  try{

  const user = await getUser(req); 

   const newPassword =req.body.newPassword;
   if (!newPassword) {
    // If the email is not present, return an HTTP unauthorized code
    return res.status(400).send("password is required");
  }
   const updateduser = await db("se_project.users")
   .where("id", user.userid)
   .update({
    password: newPassword
   })
   .returning("*");

   return res.status(200).json(updateduser);

}  catch (e) {
  console.log(e.message);
  return res.status(400).send("Could not update user");
}

 });

 app.get("/api/v1/zones",async function(req,res){
  try {
   const zones = await db.select('*').from("se_project.zones")
   return res.status(200).json(zones);
 } catch (e) {
   console.log(e.message);
   return res.status(400).send("Could not get zones");
 }
 });

 app.put("/api/v1/requests/refunds/:requestId",async function(req,res){
  try{
    
     const refundStatus =req.body.refundStatus;
     const refundID = req.params.requestId;

     const RequestExists = await db
     .select("*")
     .from("se_project.refund_requests")
     .where("id", refundID);
    if (isEmpty(RequestExists)) {
       return res.status(400).send("No refund request with this ID");
      }
    
     const updaterefund = await db("se_project.refund_requests")
     .where("id",refundID )
     .update({
            status : refundStatus
     })
     .returning("*");
     if (refundStatus=="Accept"){
      const refund_amount = await db.select("refundamount").from("se_project.refund_requests").where("id", refundID);
      const ticketID = await db.select("ticketid").from("se_project.refund_requests").where("id", refundID);

      if (refund_amount[0]["refundamount"]==0){
             
        const subid = await db.select("subid").from("se_project.tickets").where("id", ticketID[0]["ticketid"]);

        let ticketsnumber = await db.select("nooftickets").from("se_project.subsription").where("id",subid[0]["subid"] );
        const number_tickets=ticketsnumber[0]["nooftickets"]+1;

        const updatedsub = await db("se_project.subsription")

        .where("id",subid[0]["subid"] )
        .update({

            nooftickets : number_tickets
     })

      }
      await db("se_project.rides").where("ticketid", ticketID[0]["ticketid"]).del();

     }

     return res.status(200).json(updaterefund);

 } catch (e) {

   console.log(e.message);
   return res.status(400).send("Could not refund");
}

 });

 app.put("/api/v1/requests/senior/:requestId",async function(req,res){
  try{
    
    const seniorStatus =req.body.seniorStatus;
    const requestID = req.params.requestId;

    const RequestExists = await db
    .select("*")
    .from("se_project.senior_requests")
    .where("id", requestID);

   if (isEmpty(RequestExists)) {
      return res.status(400).send("No request with this ID");
     }
   
    const updateSenior = await db("se_project.senior_requests")
    .where("id",requestID )
    .update({

           status : seniorStatus
    })
    .returning("*");

    if (seniorStatus == "Accept" ){
      const senior_req = await db
      .select("*")
      .from("se_project.senior_requests")
      .where("id",requestID);
      
      const Senior = await db("se_project.users")
      .where("id",senior_req[0]["userid"] )
      .update({
           roleid : "3"
    })
    }
    return res.status(200).json(updateSenior);
} catch (e) {
  console.log(e.message);
  return res.status(400).send("Could not update");
}
 });

 app.put("/api/v1/zones/:zoneId",async function(req,res){
  try{

    if (!req.body.price) {
      return res.status(400).send("price is required");
    } if (!req.params.zoneId ) {
      return res.status(400).send("zone number is required");
    }
    
    const price =req.body.price;
    const zoneID = req.params.zoneId;

    const ZoneExists = await db
    .select("*")
    .from("se_project.zones")
    .where("id", zoneID);

    if (isEmpty(ZoneExists)) {
      return res.status(400).send("No zone with this ID");
     }
   
    const updateprice = await db("se_project.zones")
    .where("id",zoneID )
    .update({
           price : price
    })
    .returning("*");

    return res.status(200).json(updateprice);

} catch (e) {
  console.log(e.message);
  return res.status(400).send("Could not change price");
}

 });

 app.post("/api/v1/refund/:ticketId",async function (req, res) {
 try{

 
  const user = await getUser(req); 
  const ticketId= req.params.ticketId;

  const refundRequestExists = await db.select ("*").from("se_project.refund_requests").where("userid", user.userid).where("ticketid", ticketId);
  
  if (!isEmpty (refundRequestExists)) {
   return res.status(400).send("this request sent before");
      }

  const ticketExists = await db.select ("*").from("se_project.tickets").where("userid", user.userid).where("id", ticketId);

  if (isEmpty (ticketExists)) {
    return res.status(400).send("this ticket doesn't exist");
}
  const tripDate=await db.select("tripdate").from("se_project.tickets").where("id", ticketId);
  const currentDate=new Date();
  const currentTimestamp=currentDate.getTime ();

  if(!(currentTimestamp <tripDate[0]["tripdate"])){ 
   return res.status (400).send("ticket is not future dated");
   }
   
  const subID =await db.select("subid").from("se_project.tickets").where("id", ticketId);

  let newrequest={};


  if(subID[0]["subid"]==null){
  const amount = await db.select("amount").from("se_project.transactions").where("userid", user.userid).where("purchasediid", ticketId).where("purchasetype","ticket");

  console.log(amount);

   newrequest ={
  status :"pending",
  userid:user.userid,
  refundamount:amount[0]["amount"],
  ticketid:ticketId
  }   

}else{
  newrequest={
    status :"pending",
    userid:user.userid,
    refundamount:0,
    ticketid:ticketId
    }
}
  const refundRequest=await db ("se_project.refund_requests").insert(newrequest) .returning("*");
   return res.status(200).json(refundRequest);}

 catch (e) {
  console.log (e.message) ;
  res.status(400).send("Could not process the request");
 }
});

app.post("/api/v1/senior/request",async function (req, res) {
const user = await getUser(req);
if (!req.body.nationalid) {
  return res.status(400).send("national id is required");
}

const requestExists = await db
.select("*")
.from("se_project.senior_requests")
.where("userid", user.userid);

if (!isEmpty(requestExists)) {
  return res.status(400).send("request exists");
}

const newsrequest ={
status :"pending",
userid :user.userid, 
nationalid:req.body.nationalid,
}

try {
const request = await db("se_project.senior_requests").insert(newsrequest).returning("*");

return res.status(200).json(request );

} catch (e) {
console.log(e.message);
return res.status(400).send("Could not create request");
}

});

app.post("/api/v1/payment/subscription",async function (req, res) {
const user = await getUser(req);
try {
  if (!req.body.subtype) {
    return res.status(400).send("subscription type is required");
  }
  if (!req.body.CreditCardNumber) {
    return res.status(400).send("credit card number is required");
  }
  if (!req.body.holderName) {
    return res.status(400).send("card holder name is required");
  }
  if (!req.body.payedamount) {
    return res.status(400).send("paid amount is required");
  }
  if (!req.body.zoneid) {
    return res.status(400).send("zone number (id) is required");
  }

  const subscriptionExists = await db
  .select("*")
  .from("se_project.subsription")
  .where("userid", user.userid);

  if (!isEmpty(subscriptionExists)) {
   if(subscriptionExists[0].nooftickets!=0)
    return res.status(400).send("you already have a valid subscription so you can't subcribe to another ");
}

let no_tickets=0;

if (req.body.subtype=="annual")
   no_tickets=100;
else  if (req.body.subtype=="quarterly")
   no_tickets=50;
else if (req.body.subtype=="monthly")
   no_tickets=10;


   const zone_price = await db
   .select("price")
   .from("se_project.zones")
   .where("id", req.body.zoneid);
 
 let sub_price= no_tickets*zone_price[0]["price"];

 const user_Senior = await db
.select("roleid")
.from("se_project.users")
.where("id", user.userid);

if (user_Senior[0]["roleid"]==3)
sub_price*=0.5;

   if(sub_price!=req.body.payedamount)
   return res.status(400).send(`You should only pay the exact subscription price, the ticket price is ${sub_price}`);

const newsubscription ={
subtype:req.body.subtype,
zoneid:req.body.zoneid,
userid: user.userid,
nooftickets:no_tickets
}

const subscriptionid = await db("se_project.subsription").insert(newsubscription).returning("id");

const newtransaction={
  amount: req.body.payedamount,//sub_price,
  userid :user.userid,
  purchasediid:subscriptionid[0], 
  purchasetype:"subscription"
}

 await db("se_project.transactions").insert(newtransaction);

return res.status(200).json("payment done succesfully" );

} catch (e) {
console.log(e.message);
return res.status(400).send("Could not complete payment");
}

});
};

 
