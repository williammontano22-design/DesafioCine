"use client";

import React from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  eliminarPelicula,
  editarPelicula,
} from "@/redux/slices/peliculasSlice";
import { Pelicula } from "@/types/pelicula";

interface Props {
  pelicula: Pelicula;
  onEditar: (pelicula: Pelicula) => void;
}

export const PeliculaFila: React.FC<Props> = ({ pelicula, onEditar }) => {
  const dispatch = useAppDispatch();

  const handleEliminar = () => {
    if (
      confirm(`¿Estás seguro de eliminar la película "${pelicula.nombre}"?`)
    ) {
      dispatch(eliminarPelicula(pelicula.codigo));
    }
  };

  const handleToggleEstado = () => {
    const nuevoEstado =
      pelicula.estado === "Disponible" ? "No disponible" : "Disponible";
    dispatch(
      editarPelicula({
        ...pelicula,
        estado: nuevoEstado,
      }),
    );
  };

  return (
    <tr style={{ borderBottom: "1px solid #e2e8f0", color: "#0f172a" }}>
      <td style={tdStyle}>
        <strong>{pelicula.codigo}</strong>
      </td>
      <td style={tdStyle}>{pelicula.nombre}</td>
      <td style={tdStyle}>{pelicula.genero}</td>
      <td style={tdStyle}>{pelicula.duracion} min</td>
      <td style={tdStyle}>{pelicula.clasificacion}</td>
      <td style={tdStyle}>{pelicula.salaAsignada}</td>
      <td style={tdStyle}>${pelicula.precioEntrada.toFixed(2)}</td>
      <td style={tdStyle}>
        <span
          style={{
            ...badgeStyle,
            backgroundColor:
              pelicula.estado === "Disponible" ? "#dcfce7" : "#fee2e2",
            color: pelicula.estado === "Disponible" ? "#15803d" : "#b91c1c",
          }}
        >
          {pelicula.estado}
        </span>
      </td>
      <td style={tdStyle}>
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            onClick={handleToggleEstado}
            style={{ ...btnStyle, backgroundColor: "#64748b" }}
            title="Cambiar disponibilidad"
          >
            🔄 Estado
          </button>
          <button
            onClick={() => onEditar(pelicula)}
            style={{ ...btnStyle, backgroundColor: "#eab308" }}
          >
            ✏️ Editar
          </button>
          <button
            onClick={handleEliminar}
            style={{ ...btnStyle, backgroundColor: "#ef4444" }}
          >
            🗑️ Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  fontSize: "14px",
};

const badgeStyle: React.CSSProperties = {
  padding: "4px 8px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "bold",
};

const btnStyle: React.CSSProperties = {
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "bold",
};

export default PeliculaFila;
