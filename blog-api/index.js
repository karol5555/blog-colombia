const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 3001; // Puedes usar cualquier puerto

app.use(cors());
app.use(express.json());

// Configura la conexión a tu base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blog_colombia',
  password: '123',  // reemplaza esto por la tuya
  port: 5432
});

// Ruta GET /api/departamentos
app.get('/api/departamentos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM departamentos ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener departamentos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
