import React, { useEffect, useState } from "react";
import { obtenerInfoColombia } from "../servicios/api";

function Inicio() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    obtenerInfoColombia().then((data) => {
      console.log("Datos recibidos:", data);  // 👈 esto mostrará lo que llega
      setInfo(data);
    });
  }, []);
  

  return (
    <div>
      <h1>Bienvenido a Colombia 🇨🇴</h1>
      {info ? (
        <div>
          <h2>{info.name}</h2>
          <p><strong>Capital:</strong> {info.capital || "Bogotá"}</p>
          <p><strong>Población:</strong> {info.population.toLocaleString()} habitantes</p>
          <p><strong>Superficie:</strong> {info.surface.toLocaleString()} km²</p>
          <p>{info.description}</p>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}

export default Inicio;
