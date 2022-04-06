const app = require('./app.js');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

server = require('https').createServer(app);
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.static(__dirname + "../client/public/"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(express.static('dist'));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://primal-graph-346315.nn.r.appspot.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//Comment this out?
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000", //This tells the socket which port the frontend is running on so it can track
//         methods: ["GET","POST"], //Tells the socket which commands it will be receiving from the frontend
//     },
// });

//This checks if a user opened the website
// io.on("connection", (socket) => { 
//     //console.log(socket.id);
 
//      socket.on("join_room", (roomId) => { //Server waits for client to connect
         
//          var room = Number(roomId); //Convert the room id into a number
//          socket.join(room);//Needs to be roomId
//          //console.log("User joined room: " + roomId);//Needs to be roomId
//      });
 
//      socket.on("send_message", (messageData) => {
//         //  console.log("Correct Room ID: " + messageData.roomId);
//         //  console.log("Patient That Sent Message: " + messageData.patientId);
//         //  console.log("Socket Message Emitted: " + messageData.message);
 
//          var room = Number(messageData.roomId); //Convert the roomId into a number
//          socket.to(room).emit("receive_message",messageData); // The socket.listen on the frontend LiveChat.js page will catch this message since they are both using "receive_message".
//      });
 
//      socket.on("disconnect", () => { //Checks if a user has left the website. i.e closed the socket connection
//         //  console.log("user disconnected");
//      });
//  });



app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
})

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));