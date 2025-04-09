const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

// Store socket.io instance globally for use in controllers
app.set('io', io);

// Listen for client connections
io.on('connection', (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

server.listen(port, () => { 
    console.log(`Server running on port ${port}`);
});
