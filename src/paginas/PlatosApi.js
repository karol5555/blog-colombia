import React, { useEffect, useState } from "react";

function PlatosApi() {
  const [platos, setPlatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("https://api-colombia.com/api/v1/TypicalDish")
      .then((res) => res.json())
      .then((data) => {
        setPlatos(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al obtener platos desde la API:", error);
        setCargando(false);
      });
  }, []);

  return (
    <div>
      <h1>Platos Típicos desde la API-Colombia 🍲</h1>
      {cargando ? (
        <p>Cargando platos...</p>
      ) : (
        <ul>
          {platos.map((plato) => (
            <li key={plato.id} style={{ marginBottom: "1rem" }}>
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
      )}
    </div>
  );
}

export default PlatosApi;
