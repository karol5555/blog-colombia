import React, { useEffect, useState } from "react";
import "../App.css";

function PlatosTipicos() {
  const [platos, setPlatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(null);

  useEffect(() => {
    fetch("https://api-colombia.com/api/v1/TypicalDish")
      .then((res) => res.json())
      .then((data) => {
        setPlatos(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al obtener platos típicos:", error);
        setCargando(false);
      });
  }, []);

  const abrirModal = (plato) => {
    setModalAbierto(plato);
  };

  const cerrarModal = () => {
    setModalAbierto(null);
  };

  return (
    <div className="contenedor-principal">
      <h1 className="titulo">Platos Típicos de Colombia 🍽️</h1>

      {cargando ? (
        <p className="text-center text-lg">Cargando platos típicos...</p>
      ) : (
        <div className="grid-departamentos">
          {platos.map((plato) => (
            <div
              key={plato.id}
              className="tarjeta-cuadrada cursor-pointer"
              onClick={() => abrirModal(plato)}
            >
              <strong className="nombre-departamento">{plato.name}</strong>
              <p className="capital">{plato.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalAbierto && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-tarjeta" onClick={(e) => e.stopPropagation()}>
            <strong className="nombre-departamento">
              🍽️ {modalAbierto.name}
            </strong>
            <p className="capital">{modalAbierto.description}</p>

            <button className="boton-cerrar-modal" onClick={cerrarModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlatosTipicos;
