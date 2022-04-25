const app = require('./app.js'),
server = require('http').createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", //This tells the socket which port the frontend is running on so it can track
        methods: ["GET","POST"], //Tells the socket which commands it will be receiving from the frontend
    },
});


server.listen(8080, () => console.log(`Listening on port ${8080}!`));