"use client";

import React from "react";

export type VistaActual = "dashboard" | "reservas" | "agregar" | "catalogo";

interface Props {
  vistaActual: VistaActual;
  setVistaActual: (vista: VistaActual) => void;
}

export const Navbar: React.FC<Props> = ({ vistaActual, setVistaActual }) => {
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <span>CinePolito</span>
      </div>

      <nav style={navStyle}>
        <button
          onClick={() => setVistaActual("dashboard")}
          style={{
            ...btnTabStyle,
            ...(vistaActual === "dashboard" ? btnActiveStyle : {}),
          }}
        >
          Dashboard
        </button>

        <button
          onClick={() => setVistaActual("reservas")}
          style={{
            ...btnTabStyle,
            ...(vistaActual === "reservas" ? btnActiveStyle : {}),
          }}
        >
          Reservas
        </button>

        <button
          onClick={() => setVistaActual("agregar")}
          style={{
            ...btnTabStyle,
            ...(vistaActual === "agregar" ? btnActiveStyle : {}),
          }}
        >
          Agregar Película
        </button>

        <button
          onClick={() => setVistaActual("catalogo")}
          style={{
            ...btnTabStyle,
            ...(vistaActual === "catalogo" ? btnActiveStyle : {}),
          }}
        >
          Catálogo
        </button>
      </nav>
    </header>
  );
};

const headerStyle: React.CSSProperties = {
  backgroundColor: "#0f172a",
  color: "#ffffff",
  padding: "12px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
};

const logoStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const navStyle: React.CSSProperties = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
};

const btnTabStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  color: "#94a3b8",
  border: "none",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
  transition: "all 0.2s",
};

const btnActiveStyle: React.CSSProperties = {
  backgroundColor: "#2563eb",
  color: "#ffffff",
};

export default Navbar;
