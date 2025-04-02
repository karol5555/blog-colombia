import React, { useEffect, useState } from "react";
import {
  obtenerDepartamentos,
  obtenerDepartamentoPorId,
} from "../servicios/api";

function Departamentos() {
  const [departamentosConCapital, setDepartamentosConCapital] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const departamentos = await obtenerDepartamentos();

        // Obtener detalles de cada uno con capital
        const detalles = await Promise.all(
          departamentos.map((dep) => obtenerDepartamentoPorId(dep.id))
        );

        setDepartamentosConCapital(detalles);
        setCargando(false);
      } catch (error) {
        console.error("Error al cargar departamentos:", error);
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  return (
    <div>
      <h1>Departamentos de Colombia 📍</h1>
      {cargando ? (
        <p>Cargando departamentos...</p>
      ) : (
        <ul>
          {departamentosConCapital.map((dep) => (
            <li key={dep.id}>
              <strong>{dep.name}</strong>:&nbsp;
              <span>{dep.capital || "Capital no disponible"}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Departamentos;
