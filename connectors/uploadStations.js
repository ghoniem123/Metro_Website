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
//uploadS1();// first to run
uploadR1(); //second
//uploadSR(); //third
