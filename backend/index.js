const express = require("express");
const cors = require("cors");
const comentariosFooterRoutes = require("./routes/comentariosFooter");

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

//Ruta para probar que el servidor funciona
app.get("/", (req, res) => {
  res.send("🚀 Backend funcionando!");
});


app.use("/api", comentariosFooterRoutes);

//Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Backend escuchando en http://localhost:${PORT}`);
});
