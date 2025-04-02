import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Encabezado from "./componentes/Encabezado";
import Inicio from "./paginas/Inicio";
import Departamentos from "./paginas/Departamentos";
import PlatosTipicos from "./paginas/PlatosTipicos"; // ✅ asegurarse que este archivo exista
import MapaColombia from "./paginas/MapaColombia"; // opcional si ya lo tienes
import "./App.css"; // ✅ estilos globales

function App() {
  return (
    <div className="fondo-app min-h-screen">
      <Router>
        <Encabezado />
        <main className="px-4 py-8 max-w-screen-xl mx-auto">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/departamentos" element={<Departamentos />} />
            <Route path="/platos-tipicos" element={<PlatosTipicos />} />
            <Route path="/mapa" element={<MapaColombia />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
