import React, { useEffect, useState } from "react";

function Departamentos() {
  const [departamentos, setDepartamentos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/departamentos")
      .then((res) => res.json())
      .then((data) => {
        setDepartamentos(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al obtener departamentos:", error);
        setCargando(false);
      });
  }, []);

  return (
    <div>
      <h1>Departamentos de Colombia 📍</h1>
      {cargando ? (
        <p>Cargando departamentos...</p>
      ) : (
        <ul>
          {departamentos.map((dep) => (
            <li key={dep.id}>
              <strong>{dep.nombre}</strong>:&nbsp;
              <span>{dep.capital || "Capital no disponible"}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Departamentos;
