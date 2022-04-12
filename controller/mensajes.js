const Mensaje = require("../models/mensaje");

const obtenerChat = async (req, res) => {
  const miUid = req.uid;
  const mensajesDe = req.params.de;

  const last30 = await Mensaje.find({
    $or: [
      { de: miUid, para: mensajesDe },
      { de: mensajesDe, para: miUid },
    ],
  })
    .sort({ createdAt: "desc" })
    .limit(50);
  res.json({
    ok: true,
    mensajes: last30,
  });
};

module.exports = {
  obtenerChat,
};
