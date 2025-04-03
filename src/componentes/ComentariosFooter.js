import React, { useEffect, useState } from "react";
import "../App.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ComentariosFooter() {
  const [autor, setAutor] = useState("");
  const [contenido, setContenido] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [comentarioDestacadoId, setComentarioDestacadoId] = useState(null);

  const obtenerComentarios = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/comentarios");
      const data = await res.json();
      setComentarios(data);
    } catch (error) {
      console.error("❌ Error al obtener comentarios:", error);
    }
  };

  const enviarComentario = async () => {
    if (!autor || !contenido) {
      toast.warn("Por favor, completa todos los campos.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/api/comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ autor, contenido }),
      });
      const data = await res.json();
      toast.success("✅ Comentario agregado correctamente");

      setAutor("");
      setContenido("");
      await obtenerComentarios();

      // Resaltar el nuevo comentario
      const nuevo = await fetch("http://localhost:3001/api/comentarios");
      const nuevosDatos = await nuevo.json();
      if (nuevosDatos.length > 0) {
        const nuevoId = nuevosDatos[0].id; // primero si están ordenados por fecha DESC
        setComentarioDestacadoId(nuevoId);
        setTimeout(() => setComentarioDestacadoId(null), 1000);
      }
    } catch (error) {
      toast.error("❌ Error al enviar comentario");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    obtenerComentarios();
  }, []);

  return (
    <footer className="footer-comentarios">
      <h2 className="titulo-morado text-xl mb-4">  Comentarios de Usuarios</h2>

      <div className="formulario-footer">
        <input
          type="text"
          placeholder="Tu nombre"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          className="input-form"
        />
        <textarea
          placeholder="Escribe un comentario..."
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          className="input-form"
        />
        <button className="boton-enviar" onClick={enviarComentario}>
          Enviar comentario
        </button>
      </div>

      <ul className="lista-comentarios mt-4 scroll-comentarios">
        {comentarios.map((comentario) => (
          <li
            key={comentario.id}
            className={`comentario-item ${
              comentario.id === comentarioDestacadoId ? "destello" : ""
            }`}
          >
            <strong>{comentario.autor}:</strong> {comentario.contenido}
          </li>
        ))}
      </ul>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </footer>
  );
}

export default ComentariosFooter;
