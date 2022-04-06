const { io } = require("../index");

// Mensajes de sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");
  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});
