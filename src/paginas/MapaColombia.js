import React, { useEffect, useState } from "react";
import "../App.css";

function MapaColombia() {
  const [mapas, setMapas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  useEffect(() => {
    fetch("https://api-colombia.com/api/v1/Map")
      .then((res) => res.json())
      .then((data) => {
        setMapas(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al obtener mapas:", error);
        setCargando(false);
      });
  }, []);

  return (
    <div className="contenedor-principal">
      <h1 className="titulo">Mapas de Colombia 🗺️</h1>

      {cargando ? (
        <p className="text-center text-lg">Cargando mapas...</p>
      ) : (
        <div className="grid-departamentos">
          {mapas.map((mapa) => (
            <div key={mapa.id} className="tarjeta-cuadrada">
              <strong className="nombre-departamento">{mapa.name}</strong>

              {mapa.urlImages && mapa.urlImages.length > 0 ? (
                <img
                  src={mapa.urlImages[0]}
                  alt={mapa.name}
                  className="imagen-mapa cursor-pointer"
                  onClick={() => setImagenSeleccionada(mapa.urlImages[0])}
                />
              ) : (
                <p className="capital text-sm italic text-gray-500">Sin imagen</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {imagenSeleccionada && (
        <div className="modal-overlay" onClick={() => setImagenSeleccionada(null)}>
          <div className="modal-imagen">
            <img src={imagenSeleccionada} alt="Mapa grande" />
          </div>
        </div>
      )}
    </div>
  );
}

export default MapaColombia;
