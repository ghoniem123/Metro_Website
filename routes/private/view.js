const db = require('../../connectors/db');
const roles = require('../../constants/roles');
const { getSessionToken } = require('../../utils/session');

const getUser = async function(req) {
  const sessionToken = getSessionToken(req);
  if (!sessionToken) {
    return res.status(301).redirect('/');
  }

  const user = await db.select('*')
    .from('se_project.sessions')
    .where('token', sessionToken)
    .innerJoin('se_project.users', 'se_project.sessions.userid', 'se_project.users.id')
    .innerJoin('se_project.roles', 'se_project.users.roleid', 'se_project.roles.id')
    .first();
  
  console.log('user =>', user)
  user.isNormal = user.roleid === roles.user;
  user.isAdmin = user.roleid === roles.admin;
  user.isSenior = user.roleid === roles.senior;

  return user;  
}

module.exports = function(app) {
  // Register HTTP endpoint to render /users page
  app.get('/dashboard', async function(req, res) {
    const user = await getUser(req);
    return res.render('dashboard', user);
  });

  // Register HTTP endpoint to render /users page
  app.get('/users', async function(req, res) {
    const users = await db.select('*').from('se_project.users');
    return res.render('users', { users });
  });

  app.get('/resetPassword', async function(req, res) {
    const user = await getUser(req);
    return res.render('resetpassword', user);
  });

  app.get('/prices', async function(req, res) {
    const user = await getUser(req);
    const stations = await db.select('*').from('se_project.stations');
    return res.render('prices', {user,stations});
  });

  app.get('/subscriptions', async function(req, res) {
    const user = await getUser(req);
    const sub = await db.select('*').from('se_project.subsription').where("userid",user.userid);
    return res.render('subscriptions', {user,sub});
  });
  
  app.get('/subscriptions/purchase', async function(req, res) {
    const user = await getUser(req);
    return res.render('buysubscription', user);
  });

  app.get('/tickets', async function(req, res) {
    const user = await getUser(req);
    const ticket = await db.select('*').from('se_project.tickets').where("userid",user.userid );
    return res.render('view_ticket', {user,ticket});
  });

  app.get('/tickets/purchase', async function(req, res) {
    const user = await getUser(req);
    const stations = await db.select('*').from('se_project.stations');
    return res.render('tickets',{user,stations});
  });
  app.get('/tickets/purchase/subscription', async function(req, res) {
    const user = await getUser(req);
    const stations = await db.select('*').from('se_project.stations');
    const sub = await db.select("*").from('se_project.subsription').where("userid",user.userid);
    return res.render('pay_ticket_sub',{user,stations,sub});
    
  });
  app.get('/requests/refund', async function(req, res) {
    const user = await getUser(req);
    const refund = await db.select('se_project.refund_requests.status',"se_project.refund_requests.refundamount","se_project.tickets.origin","se_project.tickets.destination","se_project.tickets.tripdate")
    .from('se_project.refund_requests').join("se_project.tickets","se_project.tickets.id","se_project.refund_requests.ticketid").where("se_project.refund_requests.userid",user.userid );
   
    return res.render('refundrequests', {user,refund});
  });
  app.get('/requests/senior', async function(req, res) {
    const user = await getUser(req);
    const senior = await db.select('*').from('se_project.senior_requests').where("userid",user.userid );
    return res.render('seniorrequest',{senior,user});
  });

  app.get('/rises/simulate', async function(req, res) {
    const user = await getUser(req);
    const upcoming = await db.select('*').from('se_project.rides').where("userid",user.userid ).where("status","upcoming");
    const completed = await db.select('*').from('se_project.rides').where("userid",user.userid ).where("status","completed");
    const stations = await db.select('*').from('se_project.stations');
    return res.render('rides',{upcoming,completed,user,stations});
  });
  // Register HTTP endpoint to render /courses page
  app.get('/manage/stations', async function(req, res) {
    const user = await getUser(req);
    const stations = await db.select('*').from('se_project.stations');
    return res.render('stations', {user, stations });
  });

  app.get('/manage/stations/create', async function(req, res) {
    const user = await getUser(req);
    return res.render('createStation', user);
  });


  app.get('/manage/stations/edit/:stationId', async function(req, res) {
    const user = await getUser(req);
    const stationID = req.params.stationId;
    console.log(stationID);
    return res.render('update_Station', {user,stationID});
  });

  app.get('/manage/routes/edit/:routeId', async function(req, res) {
    const user = await getUser(req);
    const routeID = req.params.routeId;
    return res.render('updateRoute', {user,routeID});
  });


  app.get('/manage/routes', async function(req, res) {
    const user = await getUser(req);
    const routes = await db.select('routes.id','routes.routename','station1.stationname as from','station2.stationname as to').from('se_project.routes as routes')
    .join('se_project.stations as station1','station1.id','routes.fromstationid')
    .join('se_project.stations as station2','station2.id','routes.tostationid');
    return res.render('routes', {user, routes });
  });

  app.get('/manage/routes/create', async function(req, res) {
    const user = await getUser(req);
    const newly = await db.select('*').from('se_project.stations').where("stationstatus","new");
    const stations = await db.select('*').from('se_project.stations').where("stationstatus","old").where("stationposition","end").orWhere("stationposition","start");
    return res.render('createRoute', {user,stations,newly});
  });

  app.get('/manage/requests/refunds', async function(req, res) {
    const user = await getUser(req);
    const pending = await db.select('se_project.refund_requests.id', 'status','refundamount','tripdate',"se_project.users.firstname","se_project.users.lastname").from('se_project.refund_requests')
    .join('se_project.tickets','se_project.tickets.id','se_project.refund_requests.ticketid').join("se_project.users","se_project.users.id","se_project.refund_requests.userid").where("se_project.refund_requests.status","pending");

    const accepted = await db.select('se_project.refund_requests.id', 'status','refundamount','tripdate',"se_project.users.firstname","se_project.users.lastname").from('se_project.refund_requests')
    .join('se_project.tickets','se_project.tickets.id','se_project.refund_requests.ticketid').join("se_project.users","se_project.users.id","se_project.refund_requests.userid").where("se_project.refund_requests.status","Accept");

    const rejected =  await db.select('se_project.refund_requests.id', 'status','refundamount','tripdate',"se_project.users.firstname","se_project.users.lastname").from('se_project.refund_requests')
    .join('se_project.tickets','se_project.tickets.id','se_project.refund_requests.ticketid').join("se_project.users","se_project.users.id","se_project.refund_requests.userid").where("se_project.refund_requests.status","Reject");

    return res.render('refund', {user,pending,accepted,rejected});
  });

  app.get('/manage/requests/seniors', async function(req, res) {
    const user = await getUser(req);
    const pending = await db.select('se_project.senior_requests.id', 'status','nationalid',"se_project.users.firstname","se_project.users.lastname").from('se_project.senior_requests')
   .join("se_project.users","se_project.users.id","se_project.senior_requests.userid").where("se_project.senior_requests.status","pending");

    const accepted =await db.select('se_project.senior_requests.id', 'status','nationalid',"se_project.users.firstname","se_project.users.lastname").from('se_project.senior_requests')
    .join("se_project.users","se_project.users.id","se_project.senior_requests.userid").where("se_project.senior_requests.status","Accept");

    const rejected =await db.select('se_project.senior_requests.id', 'status','nationalid',"se_project.users.firstname","se_project.users.lastname").from('se_project.senior_requests')
    .join("se_project.users","se_project.users.id","se_project.senior_requests.userid").where("se_project.senior_requests.status","Reject");

    return res.render('senior', {user,pending,accepted,rejected});
  });

  app.get('/manage/zones', async function(req, res) {
    const user = await getUser(req);
    const zone1 = await db.select('*').from('se_project.zones').where("id","1");
    const zone2 = await db.select('*').from('se_project.zones').where("id","2");
    const zone3 = await db.select('*').from('se_project.zones').where("id","3");
    return res.render('zones',{zone1,zone2,zone3,user});
  });

};