"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBusqueda } from "@/redux/slices/peliculasSlice";

export const Buscador: React.FC = () => {
  const dispatch = useAppDispatch();
  const busqueda = useAppSelector((state) => state.peliculas.busqueda);

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>🔎 Búsqueda en tiempo real</label>
      <input
        type="text"
        value={busqueda}
        onChange={(e) => dispatch(setBusqueda(e.target.value))}
        placeholder="Buscar por nombre, género, clasificación o sala..."
        style={inputStyle}
      />
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  marginBottom: "15px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: "bold",
  color: "#475569",
  marginBottom: "5px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  boxSizing: "border-box",
  fontSize: "14px",
  color: "#0f172a",
  backgroundColor: "#ffffff",
};

export default Buscador;
