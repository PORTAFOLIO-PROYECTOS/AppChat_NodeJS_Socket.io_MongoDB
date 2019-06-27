const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io");
const port = 2705;
const socket = io(http);
const chatRouter = require("./server/routes/chat");

app.use("/chat", chatRouter);
app.use(express.static(`${__dirname}/client`));

const chatSchema = require("./server/mongoDB/chatSchema");
const connectDB = require("./server/mongoDB/dbconnection");

socket.on("connection", (socket) => {
    console.log("usuario conectado");

    socket.on("disconnect", () => {
        console.log("usuario desconectado");
    });

    socket.on("chat message", (msg) => {
        console.log(`message: ${msg}`);

        socket.broadcast.emit("received", {
            message: msg
        });

        //guardando chat
        connectDB.then(db => {
            console.log("Conectado correctamente al servidor");
            let mensaje = new chatSchema({ message: msg, sender: "Anónimo" });
            mensaje.save();
        });
    });
});

http.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});