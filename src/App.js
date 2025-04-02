import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Encabezado from "./componentes/Encabezado";
import Inicio from "./paginas/Inicio";
import Departamentos from "./paginas/Departamentos"; // 👈 esta línea nueva

function App() {
  return (
    <Router>
      <Encabezado />
      <main style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/departamentos" element={<Departamentos />} /> {/* 👈 nueva ruta */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
