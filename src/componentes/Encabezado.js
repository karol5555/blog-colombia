
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Encabezado() {
  return (
    <header className="barra-navegacion">
      <nav className="nav-links">
        <Link to="/" className="nav-boton">Inicio</Link>
        <Link to="/departamentos" className="nav-boton">Departamentos</Link>
        <Link to="/platos-tipicos" className="nav-boton">Platos Típicos</Link>
        <Link to="/mapa" className="nav-boton">Mapas Colombia</Link>
      </nav>
    </header>
  );
}

export default Encabezado;
