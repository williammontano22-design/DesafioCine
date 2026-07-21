"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setFiltroGenero,
  setFiltroClasificacion,
  setFiltroSala,
  setFiltroEstado,
} from "@/redux/slices/peliculasSlice";

export const Filtros: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filtroGenero, filtroClasificacion, filtroSala, filtroEstado } =
    useAppSelector((state) => state.peliculas);

  return (
    <div style={gridStyle}>
      <div>
        <label style={labelStyle}>🎭 Género</label>
        <select
          value={filtroGenero}
          onChange={(e) => dispatch(setFiltroGenero(e.target.value))}
          style={selectStyle}
        >
          <option value="Todos">Todos los géneros</option>
          <option value="Acción">Acción</option>
          <option value="Comedia">Comedia</option>
          <option value="Drama">Drama</option>
          <option value="Terror">Terror</option>
          <option value="Ciencia Ficción">Ciencia Ficción</option>
          <option value="Animación">Animación</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>🔞 Clasificación</label>
        <select
          value={filtroClasificacion}
          onChange={(e) => dispatch(setFiltroClasificacion(e.target.value))}
          style={selectStyle}
        >
          <option value="Todos">Todas las clasificaciones</option>
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="PG-13">PG-13</option>
          <option value="R">R</option>
          <option value="NC-17">NC-17</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>🍿 Sala</label>
        <select
          value={filtroSala}
          onChange={(e) => dispatch(setFiltroSala(e.target.value))}
          style={selectStyle}
        >
          <option value="Todas">Todas las salas</option>
          <option value="Sala 1">Sala 1</option>
          <option value="Sala 2">Sala 2</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>🟢 Estado</label>
        <select
          value={filtroEstado}
          onChange={(e) => dispatch(setFiltroEstado(e.target.value))}
          style={selectStyle}
        >
          <option value="Todos">Todos los estados</option>
          <option value="Disponible">Disponible</option>
          <option value="No disponible">No disponible</option>
        </select>
      </div>
    </div>
  );
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "12px",
  marginBottom: "20px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: "bold",
  color: "#475569",
  marginBottom: "4px",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  boxSizing: "border-box",
  fontSize: "13px",
  color: "#0f172a",
  backgroundColor: "#ffffff",
};

export default Filtros;
