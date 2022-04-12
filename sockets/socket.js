const {
  usuarioConnectado,
  usuarioDesconnectado,
  grabarMensaje,
} = require("../controller/socket");
const { comprobarJWT } = require("../helpers/jwt");
const { io } = require("../index");

// Mensajes de sockets
io.on("connection", async (client) => {
  console.log("Cliente conectado");
  const [valido, uid] = comprobarJWT(client.handshake.headers["x-token"]);

  if (!valido) {
    return client.disconnect();
  }
  usuarioConnectado(uid);
  client.join(uid);

  client.on("mensaje-personal", async (payload) => {
    // Grabar mensaje
    await grabarMensaje(payload);
    io.to(payload.para).emit("mensaje-personal", payload);
  });

  client.on("disconnect", () => {
    usuarioDesconnectado(uid);
  });
});
