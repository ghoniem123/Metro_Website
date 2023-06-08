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


async function uploadS() {
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
