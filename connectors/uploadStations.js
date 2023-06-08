const db = require("./db");
async function uploadSR() {

  let SR = [
    { stationid: 1, routeid: 1 },
    { stationid: 1, routeid: 2 },
    { stationid: 2, routeid: 1 },
    { stationid: 2, routeid: 2 },
    { stationid: 2, routeid: 4 },
    { stationid: 2, routeid: 3 },
    { stationid: 2, routeid: 4 },
    { stationid: 3, routeid: 3 },
    { stationid: 3, routeid: 4 },
    { stationid: 3, routeid: 5 },
    { stationid: 3, routeid: 6 },
    { stationid: 3, routeid: 7 },
    { stationid: 3, routeid: 8},
    { stationid: 4, routeid: 5 },
    { stationid: 4, routeid: 6 },
    { stationid: 4, routeid: 9},
    { stationid: 4, routeid: 10 },
    { stationid: 5, routeid: 9 },
    { stationid: 5, routeid: 10 },
    { stationid: 6, routeid: 7 },
    { stationid: 6, routeid: 8 },
    { stationid: 6, routeid: 11 },
    { stationid: 6, routeid: 12 },
    { stationid: 7, routeid: 11 },
    { stationid: 7, routeid: 12 },
  ];
  for (let i = 0; i < SR.length; i++) {
    const element =SR[i];
    await db("se_project.stationroutes").insert(element).returning("*");
  }

}
async function uploadS() {
  let stations = [
    {
      stationname: "s1",
      stationtype: "normal",
      stationposition: "start",
      stationstatus: "old",
    },
    {
      stationname: "s2",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "s3",
      stationtype: "transfer",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "s4",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "s5",
      stationtype: "normal",
      stationposition: "end",
      stationstatus: "old",
    },
    {
      stationname: "s6",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "s7",
      stationtype: "normal",
      stationposition: "end",
      stationstatus: "old",
    },
  ];

  for (let i = 0; i < stations.length; i++) {
    const element =stations[i];
    await db("se_project.stations").insert(element).returning("*");
  }
}
async function uploadR() {
    let routes = [
      { routename: "hi12", fromstationid: 1, tostationid: 2 },
      { routename: "hi21", fromstationid: 2, tostationid: 1 },
      { routename: "hi23", fromstationid: 2, tostationid: 3 },
      { routename: "hi32", fromstationid: 3, tostationid: 2 },
      { routename: "hi34", fromstationid: 3, tostationid: 4 },
      { routename: "hi43", fromstationid: 4, tostationid: 3 },
      { routename: "hi36", fromstationid: 3, tostationid: 6 },
      { routename: "hi63", fromstationid: 6, tostationid: 3 },
      { routename: "hi45", fromstationid: 4, tostationid: 5 },
      { routename: "hi54", fromstationid: 5, tostationid: 4 },
      { routename: "hi76", fromstationid: 7, tostationid: 6 },
      { routename: "hi67", fromstationid: 6, tostationid: 7 },
    ];
  
  for (let i = 0; i < routes.length; i++) {
    const element =routes[i];
    await db("se_project.routes").insert(element).returning("*");
  }
}

async function uploadR1() {
  let routes = [
    { routename: "adly mansour - haykestep", fromstationid: 43, tostationid: 44 },
    { routename: "haykestep - adly mansour", fromstationid: 44, tostationid: 43 },
    { routename: "haykestep - omar ibn el khattab", fromstationid: 44, tostationid: 45 },
    { routename: "omar ibn el khattab - haykestep", fromstationid: 45, tostationid: 44},
    { routename: "omar ibn el khattab - qubaa", fromstationid: 45, tostationid: 46 },
    { routename: "qubaa - omar ibn el khattab", fromstationid: 46, tostationid: 45 },
    { routename: "qubaa - hesham barakat", fromstationid: 46, tostationid: 47 },
    { routename: "hesham barakat - qubaa", fromstationid: 47, tostationid: 46 },
    { routename: "hesham barakat - el nozha", fromstationid: 47, tostationid: 48},
    { routename: "el nozha - hesham barakat", fromstationid: 48, tostationid: 47},
    { routename: "el nozha - el shams club", fromstationid: 48, tostationid: 49},
    { routename: "el shams club - el nozha", fromstationid: 49, tostationid: 48},
    { routename: "el shams club - alf maskan", fromstationid: 49, tostationid: 50 },
    { routename: "alf maskan - el shams club", fromstationid: 50, tostationid: 49 },
    { routename: "alf maskan - helioples", fromstationid: 50, tostationid: 51 },
    { routename: "helioples - alf maskan", fromstationid: 51, tostationid: 50 },
    { routename: "helioples - haroun", fromstationid: 51, tostationid: 52 },
    { routename: "haroun - helioples", fromstationid: 52, tostationid: 51 },
    { routename: "haroun - al-ahram", fromstationid: 52, tostationid: 53 },
    { routename: "al-ahram - haroun", fromstationid: 53, tostationid: 52 },
    { routename: "al-ahram - koleyet el-banat", fromstationid: 53, tostationid: 54 },
    { routename: "koleyet el-banat - al-ahram", fromstationid: 54, tostationid: 53 },
    { routename: "koleyet el-banat - stadium", fromstationid: 54, tostationid: 55},
    { routename: "stadium - koleyet el-banat", fromstationid: 55, tostationid: 54 },
    { routename: "stadium - fair zone", fromstationid: 55, tostationid: 56 },
    { routename: "fair zone - stadium", fromstationid: 56, tostationid: 55 },
    { routename: "fair zone - abbassiya", fromstationid: 56, tostationid: 57 },
    { routename: "abbassiya - fair zone", fromstationid: 57, tostationid: 56 },
    { routename: "abbassiya - abdou pasha", fromstationid: 57, tostationid: 58 },
    { routename: "abdou pasha - abbassiya", fromstationid: 58, tostationid: 57 },
    { routename: "abdou pasha - el-geish", fromstationid: 58, tostationid: 59 },
    { routename: "el-geish - abdou pasha", fromstationid: 59, tostationid: 58 },
    { routename: "el-geish - bab el shaariya", fromstationid: 59, tostationid: 60 },
    { routename: "bab el shaariya - elgeish", fromstationid: 60, tostationid: 59 },
    { routename: "bab el shaariya - attaba", fromstationid: 60, tostationid: 61 },
    { routename: "attaba - bab el shaariya", fromstationid: 61, tostationid: 60 },
    { routename: "attaba - nasser ", fromstationid: 61, tostationid: 20 },
    { routename: "nasser - attaba", fromstationid: 20, tostationid: 61 },
    { routename: "attaba - al-shohadaa ", fromstationid: 61, tostationid: 22 },
    { routename: "al-shohadaa - attaba", fromstationid: 22, tostationid: 61 },
    { routename: "nasser - orabi", fromstationid: 20, tostationid: 21 },
    { routename: "orabi - nasser", fromstationid: 21, tostationid: 20 },
    { routename: "orabi - al-shohadaa", fromstationid: 21, tostationid: 22 },
    { routename: "al-shohadaa - orabi", fromstationid: 22, tostationid: 21 },
    { routename: "nasser - maspero", fromstationid: 20, tostationid: 62 },
    { routename: "maspero - nasser", fromstationid: 62, tostationid: 20 },
    { routename: "maspero - safaa hijazy", fromstationid: 62, tostationid: 63 },
    { routename: "safaa hijazy - maspero", fromstationid: 63, tostationid: 62},
    { routename: "safaa hijazy -kitkat", fromstationid: 63, tostationid: 64},
    { routename: "kitkat - safaa hijazy", fromstationid: 64, tostationid: 63 },
    { routename: "kitkat - sudan", fromstationid: 64, tostationid: 65},
    { routename: "sudan - kitkat", fromstationid: 65, tostationid: 64 },
    { routename: "sudan - imbaba ", fromstationid: 65, tostationid: 66},
    { routename: "imbaba - sudan", fromstationid: 66, tostationid: 65 },
    { routename: "imbaba - el bohy", fromstationid: 66, tostationid: 67 },
    { routename: "el bohy - imbaba", fromstationid: 67, tostationid: 66},
    { routename: "el bohy - el qawmia", fromstationid: 67, tostationid: 68 },
    { routename: "el qawmia - el bohy", fromstationid: 68, tostationid: 67 },
    { routename: "al qawmia - ring road", fromstationid: 68, tostationid: 69 },
    { routename: "ring road - al qawmia", fromstationid: 69, tostationid: 68 },
    { routename: "ring road - road el farag", fromstationid: 69, tostationid: 70 },
    { routename: "road el farag - ring road", fromstationid: 70, tostationid: 60},
    { routename: "kitkat - tawfikia ", fromstationid: 64, tostationid: 71},
    { routename: "tawfikia - kitkat", fromstationid: 71, tostationid: 64},
    { routename: "tawfikia - wadi el nile", fromstationid: 71, tostationid: 72 },
    { routename: "wadi el nile - tawfikia", fromstationid: 72, tostationid: 71},
    { routename: "wadi el nile - gamet el dowel", fromstationid: 72, tostationid: 73 },
    { routename: "gamet el dowel - wadi el nile", fromstationid: 73, tostationid: 72},
    { routename: "gamet el  dowel - boulak el dakrour", fromstationid: 73, tostationid: 74 },
    { routename: "boulak el dakrour - gamet el dowel", fromstationid: 74, tostationid: 73 },
    { routename: "boulak el dakrour - cairo university", fromstationid: 74, tostationid: 75 },
    { routename: "cairo university - boulak el dakrour", fromstationid: 75, tostationid: 74 },
    { routename: "cairo university - faisal", fromstationid: 75, tostationid: 76 },
    { routename: "faisal - cairo university ", fromstationid: 76, tostationid: 75 },
    { routename: "faisal - giza", fromstationid: 76, tostationid: 77 },
    { routename: "giza - faisal", fromstationid: 77, tostationid: 76 },
    { routename: "giza - omm el masryeen", fromstationid: 77, tostationid: 78},
    { routename: "omm el masryeen - giza", fromstationid: 78, tostationid: 77 },
    { routename: "omm el masryeen - sakiat mekky", fromstationid: 78, tostationid: 79 },
    { routename: "sakiat mekky - omm el masryeen", fromstationid: 79, tostationid: 78 },
    { routename: "sakiat mekky - el monib", fromstationid: 79, tostationid: 80 },
    { routename: "el monib - sakiat mekky", fromstationid: 80, tostationid: 79 },
    { routename: "cairo university - el bohth", fromstationid: 75, tostationid: 81 },
    { routename: "el bohth - cairo university", fromstationid: 81, tostationid: 75},
    { routename: "el bohth - dokki", fromstationid: 81, tostationid: 82},
    { routename: "dokki - el bohth", fromstationid: 82, tostationid: 81 },
    { routename: "dokki - opera", fromstationid: 82, tostationid: 83 },
    { routename: "opera - dokki", fromstationid: 83, tostationid: 82 },
    { routename: "al-shohadaa - ghamra", fromstationid: 22, tostationid: 23 },
    { routename: "ghamra - al-shohadaa", fromstationid: 23, tostationid: 22 },
    { routename: "ghamra - el demerdash", fromstationid: 23, tostationid: 24 },
    { routename: "el demerdash - ghamra", fromstationid: 24, tostationid: 23},
    { routename: "el demerdash - manshiet el sadr", fromstationid: 24, tostationid: 25 },
    { routename: "manshiet el sadr - el demerdash", fromstationid: 25, tostationid: 24 },
    { routename: "manshiet el sadr - kobri el qobba", fromstationid: 25, tostationid: 26 },
    { routename: "kobri el qobba - manshiet el sadr", fromstationid: 26, tostationid: 25 },
    { routename: "kobri el qobba - hammamat el qobba ", fromstationid: 26, tostationid: 27 },
    { routename: "hammamt el qobba - kobri el qobba ", fromstationid: 27, tostationid: 26},
    { routename: "hammamt el qobba - saray el qobba", fromstationid: 27, tostationid: 28 },
    { routename: "saray el qobba - hammamt el qobba ", fromstationid: 28, tostationid: 27 },
    { routename: "saray el qobba - hadayeq el zaitoun", fromstationid: 28, tostationid: 29 },
    { routename: "hadayeq el zaitoun - saray el qobba", fromstationid: 29, tostationid: 28},
    { routename: "hadayeq el zaitoun - helmeyet el zaitoun", fromstationid: 29, tostationid: 30 },
    { routename: "helmeyet el zaitoun - hadayeq el zaitoun", fromstationid: 30, tostationid: 29 },
    { routename: "helmeyet el zaitoun - el matareyya ", fromstationid: 30, tostationid: 31 },
    { routename: "el matareyya - helmeyet el zaitoun", fromstationid: 31, tostationid: 30 },
    { routename: "el matareyya - ain shams", fromstationid: 31, tostationid: 32 },
    { routename: "ain shams - el matareyya", fromstationid: 32, tostationid: 31 },
    { routename: "ain shams - ezbet el nakhl", fromstationid: 32, tostationid: 33 },
    { routename: "ezbet el nakhl - ain shams", fromstationid: 33, tostationid: 32 },
    { routename: "ezbet el nakhl - el marg", fromstationid: 33, tostationid: 34 },
    { routename: "el marg - ezbet el nakhl", fromstationid: 34, tostationid: 33 },
    { routename: "el marg - new marg", fromstationid: 34, tostationid: 35 },
    { routename: "new marg - el marg", fromstationid: 35, tostationid: 34 },













  ];

for (let i = 0; i < routes.length; i++) {
  const element =routes[i];
  await db("se_project.routes").insert(element).returning("*");
}
}

async function uploadR1() {
  let routes = [
    { routename: "helwan - ain helwan", fromstationid: 1, tostationid: 2 },
    { routename: "ain helwan - helwan", fromstationid: 2, tostationid: 1 },
    { routename: "helwan university - ain helwan", fromstationid: 3, tostationid: 2 },
    { routename: "ain helwan - helwan university", fromstationid: 2, tostationid: 3 },
    { routename: "helwan university - wadi hof", fromstationid: 3, tostationid: 4 },
    { routename: "wadi hof - helwan university", fromstationid: 4, tostationid: 3 },
    { routename: "hadayek helwan - wadi hof", fromstationid: 5, tostationid: 4 },
    { routename: "wadi hof - hedayek helwan", fromstationid: 4, tostationid: 5 },
    { routename: "el masraa - hadayek helwan", fromstationid: 6, tostationid: 5 },
    { routename: "hadayek helwan -  el masraa", fromstationid: 5, tostationid: 6 },
    { routename: "el masraa - tura el esmant", fromstationid: 6, tostationid: 7 },
    { routename: "tura el esmant - el masraa", fromstationid: 7, tostationid: 6 },
    { routename: "tura el esmant - kozzika", fromstationid: 7, tostationid: 8 },
    { routename: "kozzika - tura el esmant", fromstationid: 8, tostationid: 7 },
    { routename: "tura el balad - kozzika", fromstationid: 9, tostationid: 8 },
    { routename: "kozzika - tura el balad", fromstationid: 8, tostationid: 9 },
    { routename: "tura el balad - sakanat el maadi ", fromstationid: 9, tostationid: 10 },
    { routename: "sakanat el maadi - tura el balad", fromstationid: 10, tostationid: 9 },
    { routename: "maadi - sakanat el maadi", fromstationid: 11, tostationid: 10 },
    { routename: "sakanat el maadi - maadi", fromstationid: 10, tostationid: 11 },
    { routename: "maadi - hadayek el maadi", fromstationid: 11, tostationid: 12 },
    { routename: "hadayek el maadi - maadi", fromstationid: 12, tostationid: 11 },
    { routename: "hadayek el maadi - dar el salam", fromstationid: 12, tostationid: 13},
    { routename: "dar el salam - hadayek el maadi", fromstationid: 13, tostationid: 12 },
    { routename: "dar el salam - el zahraa", fromstationid: 13, tostationid: 14 },
    { routename: "el zahraa - dar el salam", fromstationid: 14, tostationid: 13 },
    { routename: "el zahraa - mar girgis", fromstationid: 14, tostationid: 15 },
    { routename: "mir girgis - el zahraa", fromstationid: 15, tostationid: 14 },
    { routename: "mir girgis - el malek el saleh", fromstationid: 15, tostationid: 16 },
    { routename: "el malek el saleh - mir girgis", fromstationid: 16, tostationid: 15 },
    { routename: "el malek el saleh - el sayeda zeinab", fromstationid: 16, tostationid: 17 },
    { routename: "el sayeda zeinab - el malek el saleh", fromstationid: 17, tostationid: 16 },
    { routename: "el sayeda zeinab - saad zaghloul", fromstationid: 17, tostationid: 18 },
    { routename: "saad zaghloul - el sayeda zeinab", fromstationid: 18, tostationid: 17 },

    { routename: "saad zaghloul - sadat", fromstationid: 18, tostationid: 19 },
    { routename: "sadat - saad zaghloul", fromstationid: 19, tostationid: 18 },
    { routename: "sadat - opera", fromstationid: 19, tostationid: 83 },
    { routename: "opera - sadat", fromstationid: 83, tostationid: 19 },
    { routename: "sadat - mohamed naguib", fromstationid: 19, tostationid:84  },
    { routename: "mohamed naguib - sadat", fromstationid:84 , tostationid: 19 },

    { routename: "nasser- sadat", fromstationid:20 , tostationid: 19 },
    { routename: "sadat - nasser", fromstationid:19 , tostationid: 20 },
    { routename: "mohamed naguib - attaba", fromstationid:20 , tostationid: 61 },
    { routename: "attaba - mohamed naguib", fromstationid:61 , tostationid: 20 },
    { routename: "mohamed naguib - sadat", fromstationid:84 , tostationid: 19 },
    { routename: "mohamed naguib - sadat", fromstationid:84 , tostationid: 19 },

    { routename: "el shohadaa - massara", fromstationid:22 , tostationid: 42 },
    { routename: "massara - el shohadaa", fromstationid:42 , tostationid: 22 },
    { routename: "massara - rod el farag", fromstationid:42 , tostationid: 41 },
    { routename: "rod el farag - massara", fromstationid:41 , tostationid: 42 },
    { routename: "rod el farag - st teresa", fromstationid:41 , tostationid: 40 },
    { routename: " st teresa- rod el farag", fromstationid:40 , tostationid: 41 },

    { routename: "st teresa - khalafawy", fromstationid:40 , tostationid: 39 },
    { routename: "khalafawy - st teresa", fromstationid:39 , tostationid: 40 },
    { routename: "khalafawy - mezallat", fromstationid:39 , tostationid: 38 },
    { routename: "mezallat - khalafawy", fromstationid:38 , tostationid: 39 },
    { routename: " mezallat - koliet el zeraa", fromstationid:38 , tostationid: 37 },
    { routename: "koliet el zeraa - mezallat", fromstationid:37 , tostationid: 38 },

    { routename: "koliet el zeraa - shubra el khaimah", fromstationid:37 , tostationid: 36 },
    { routename: "subra el khaimah - koliet el zeraa", fromstationid:36 , tostationid: 37 },
  ];

for (let i = 0; i < routes.length; i++) {
  const element =routes[i];
  await db("se_project.routes").insert(element).returning("*");
}
}


async function uploadS1() {
  let stations = [
    {
      stationname: "Helwan",
      stationtype: "normal",
      stationposition: "start",
      stationstatus: "old",
    },
    {
      stationname: "Ain Helwan",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Helwan university",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Wadi Haf",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Hadayek Helwan",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "El masraa",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Tura El-Esmant",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Kozzika",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Tora El-Balad",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Sakanat El-Maadi",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Maadi",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Hadayek El-Maadi",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Dar El-salam",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },

    {
      stationname: "El-Zahraa",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },

    {
      stationname: "Mar Girgis",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "El-Malek El-Saleh",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Al-Sayeda Zeinab",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, 
     {
      stationname: "Saad Zaghloul",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Sadat",
      stationtype: "transfer",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Nasser",
      stationtype: "transfer",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Orabi",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Al-Shohadaa",
      stationtype: "transfer",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Ghamra",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "El-Demerdash",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Manshiet El-Sadr",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Kobri El-Qobba",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Hammamat El-Qobba",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Saray El-Qobba",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Hadayeq El-Zaitoun",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Helmeyet El-Zaitoun",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "El-Matareyya",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Ain Shams",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Ezbet El-Nakhl",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "El-Marg",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "New Marg",
      stationtype: "normal",
      stationposition: "end",
      stationstatus: "old",
    },
    {
      stationname: "Shubra Al Khaimah",
      stationtype: "normal",
      stationposition: "end",
      stationstatus: "old",
    },
    {
      stationname: "Koliet El-Zeraa",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Mezallat",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Khalafawy",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "St. Teresa",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Rod El-Farag",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Masarra",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },

  ];
  for (let i = 0; i < stations.length; i++) {
    const element =stations[i];
    await db("se_project.stations").insert(element).returning("*");
  }
}


async function uploadS2() {
  let stations = [
    {
      stationname: "Adly Mansour",
      stationtype: "normal",
      stationposition: "start",
      stationstatus: "old",
    },
    {
      stationname: "Haykestep",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Omar Ibn El khattab",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Qubaa",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Hesham Barakat",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "El Nozha",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "El Shams Club",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Alf Maskan",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Helioples",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Haroun",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Al-Ahram",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Koleyet El-Banat",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Stadium",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Fair Zone",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Abbassiya",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Abdou Pasha",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "El-Geish",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Bab El Shaariya",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Attaba",
      stationtype: "transfer",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Maspero",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Safaa Hijazy",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Kit-Kat",
      stationtype: "transfer",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Sudan",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
    {
      stationname: "Imbaba",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "El-Bohy",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "El-Qawmia",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Ring Road",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Rod El Farag Corridor",
      stationtype: "normal",
      stationposition: "end",
      stationstatus: "old",
    }, {
      stationname: "Tawfikia",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Wadi El Nile",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Gamet El Dowel",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Boulak El Dakrour",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Cairo University",
      stationtype: "transfer",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Faisal",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Giza",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Omm El-Masryeen",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Sakiat Mekky",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "El Monib",
      stationtype: "normal",
      stationposition: "start",
      stationstatus: "old",
    }, {
      stationname: "El Bohth",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Dokki",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Opera",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    }, {
      stationname: "Mohamed Naguib",
      stationtype: "normal",
      stationposition: "middle",
      stationstatus: "old",
    },
  ];
  for (let i = 0; i < stations.length; i++) {
    const element =stations[i];
    await db("se_project.stations").insert(element).returning("*");
  }
}
//uploadS();// first to run
//uploadR(); //second
//uploadSR(); //third
