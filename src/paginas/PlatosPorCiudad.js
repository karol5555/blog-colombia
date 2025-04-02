import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PlatosPorCiudad() {
  const { ciudad } = useParams();
  const [platos, setPlatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("https://api-colombia.com/api/v1/TypicalDish")
      .then((res) => res.json())
      .then((data) => {
        // Filtro básico: platos cuya descripción mencione la ciudad
        const filtrados = data.filter((plato) =>
          plato.description?.toLowerCase().includes(ciudad.toLowerCase())
        );
        setPlatos(filtrados);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al obtener platos:", error);
        setCargando(false);
      });
  }, [ciudad]);

  return (
    <div>
      <h1>Platos típicos relacionados con {ciudad} 🍛</h1>
      {cargando ? (
        <p>Cargando platos...</p>
      ) : platos.length > 0 ? (
        <ul>
          {platos.map((plato) => (
            <li key={plato.id}>
              <h3>{plato.name}</h3>
              <p>{plato.description}</p>
              {plato.image && (
                <img
                  src={plato.image}
                  alt={plato.name}
                  style={{ width: "200px", borderRadius: "8px" }}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron platos típicos para esta ciudad.</p>
      )}
    </div>
  );
}

export default PlatosPorCiudad;
