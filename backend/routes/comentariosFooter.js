const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

// Configuración de conexión
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "blog_colombia",
  password: "123", // reemplaza si tienes otra contraseña
  port: 5432,
});

// 📝 Ruta para guardar comentarios
router.post("/comentarios", async (req, res) => {
  const { autor, contenido } = req.body;
  try {
    await pool.query(
      "INSERT INTO comentarios (autor, contenido) VALUES ($1, $2)",
      [autor, contenido]
    );
    res.status(200).json({ message: "✅ Comentario guardado correctamente" });
  } catch (error) {
    console.error("❌ Error al guardar comentario:", error);
    res.status(500).json({ message: "Error al guardar el comentario" });
  }
});

// 📄 Ruta para obtener comentarios
router.get("/comentarios", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM comentarios ORDER BY fecha DESC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener comentarios:", error);
    res.status(500).json({ message: "Error al obtener comentarios" });
  }
});

module.exports = router;
