import React, { useEffect, useState } from "react";
import "../App.css";

function Departamentos() {
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudadesPorDepartamento, setCiudadesPorDepartamento] = useState({});
  const [cargando, setCargando] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(null);

  useEffect(() => {
    fetch("https://api-colombia.com/api/v1/Department")
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

  const obtenerCiudades = (id) => {
    if (modalAbierto === id) {
      setModalAbierto(null);
      return;
    }

    if (ciudadesPorDepartamento[id]) {
      setModalAbierto(id);
      return;
    }

    fetch(`https://api-colombia.com/api/v1/Department/${id}/cities`)
      .then((res) => res.json())
      .then((data) => {
        setCiudadesPorDepartamento((prev) => ({
          ...prev,
          [id]: data,
        }));
        setModalAbierto(id);
      })
      .catch((error) => console.error("Error al obtener ciudades:", error));
  };

  return (
    <div className="contenedor-principal">
      <h1 className="titulo">Departamentos de Colombia </h1>

      {cargando ? (
        <p className="text-center text-lg">Cargando departamentos...</p>
      ) : (
        <div className="grid-departamentos">
          {departamentos.map((dep) => (
            <div key={dep.id} className="tarjeta-cuadrada">
              <strong className="nombre-departamento"> {dep.name}</strong>
              <button
                onClick={() => obtenerCiudades(dep.id)}
                className="boton"
              >
                ciudades
              </button>
            </div>
          ))}
        </div>
      )}

      {modalAbierto && (
        <div className="modal-overlay" onClick={() => setModalAbierto(null)}>
          <div className="modal-tarjeta" onClick={(e) => e.stopPropagation()}>
            <strong className="nombre-departamento">
               {
                departamentos.find((d) => d.id === modalAbierto)?.name
              }
            </strong>
            <ul className="lista-ciudades mt-2">
              {ciudadesPorDepartamento[modalAbierto]?.length > 0 ? (
                ciudadesPorDepartamento[modalAbierto].map((ciudad) => (
                  <li key={ciudad.id}>{ciudad.name}</li>
                ))
              ) : (
                <li>Sin ciudades registradas</li>
              )}
            </ul>
            <button
              className="boton-cerrar-modal"
              onClick={() => setModalAbierto(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Departamentos;
