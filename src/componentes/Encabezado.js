import React from "react";
import { Link } from "react-router-dom";

function Encabezado() {
  return (
    <header style={{ padding: "1rem", background: "#f4f4f4" }}>
      <nav>
        <Link to="/">Inicio</Link> |{" "}
        <Link to="/departamentos">Departamentos</Link> |{" "}
        <Link to="/platos-tipicos">Platos Típicos</Link>
      </nav>
    </header>
  );
}

export default Encabezado;
