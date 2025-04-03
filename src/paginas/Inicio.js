import React, { useEffect, useState } from "react";
import ComentariosFooter from "../componentes/ComentariosFooter"; // 👈 Se importa el componente del pie de página
import "../App.css";

function Inicio() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch("https://api-colombia.com/api/v1/Country/Colombia")
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch((error) =>
        console.error("Error al cargar info de Colombia", error)
      );
  }, []);

  return (
    <div className="contenedor-inicio">
      <h1 className="titulo text-center mb-8">
        Bienvenido a Colombia 🇨🇴
      </h1>

      {info ? (
        <div className="tarjeta-base tarjeta-inicio">
          <h2 className="text-2xl font-semibold mb-2">{info.name}</h2>
          <p className="mb-2">
            <strong>Capital:</strong> {info.capital || "Bogotá"}
          </p>
          <p className="mb-2">
            <strong>Población:</strong>{" "}
            {info.population.toLocaleString()} habitantes
          </p>
          <p className="mb-2">
            <strong>Superficie:</strong>{" "}
            {info.surface.toLocaleString()} km²
          </p>
          <p className="mt-4 text-justify">{info.description}</p>
        </div>
      ) : (
        <p className="text-center">Cargando datos...</p>
      )}

      {/* Pie de página con formulario de comentarios */}
      <ComentariosFooter />
    </div>
  );
}

export default Inicio;
