const next = require("next");
const express = require("express");
const http = require("http");
const https = require("https");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();
const httpPort = process.env.PORT || 3001;
const httpsPort = 3443;
const options = dev
  ? {
    /**
     * IF YOU NEED HTTPS FOR LOCALHOST, UNCOMMENT THIS
     * AND GENERATE THE key & crt FOLLOW THIS COMMAND:
     * bash local_certificate/cer.sh
     * Read more: local_certificate/readme.md
     */
    // key: fs.readFileSync("local_certificate/localhost.key"),
    // cert: fs.readFileSync("local_certificate/localhost.crt"),
  }
  : {};

server.use(express.static(__dirname + "/public", { maxAge: "365d", redirect: false }));
server.use(express.static(__dirname + "/.next/static", { maxAge: "365d", redirect: false }));
server.use(express.static(__dirname + "/_next/static", { maxAge: "365d", redirect: false }));

app.prepare().then(() => {
  server.all("*", (req, res) => {
    return handle(req, res);
  });
  let httpServer = http.createServer(server);
  let httpsServer = https.createServer(options, server)
  

  // let io = require('socket.io')(httpServer);

  // let arrUserSocket = [];
  
  // io.on('connection', function (socket) {
  
  //   arrUserSocket.push(socket.id);
  //   console.log("CONNECT !!!!!!!", socket.id);
  
  //   socket.on('disconnect', () => {
  //     console.log("disconnect CONNECT !!!!!");
  
  //     let idRemove = arrUserSocket.findIndex(function (item) {
  //       return item == socket.id;
  //     });
  
  //     arrUserSocket.splice(idRemove, 1); // xoa ten client tren may client dang online 
  //     console.log(socket.id + ' Disconnect !');
  
  //   });
  
  // });

  httpServer.listen(httpPort);
  httpsServer.listen(httpsPort);
});



