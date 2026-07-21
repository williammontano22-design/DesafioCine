"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";

export const Dashboard: React.FC = () => {
  const peliculas = useAppSelector((state) => state?.peliculas?.lista) ?? [];
  const salas = useAppSelector((state) => state?.salas?.lista) ?? [];
  const reservas = useAppSelector((state) => state?.reservas?.historial) ?? [];

  // 1. Total de películas
  const totalPeliculas = peliculas.length;

  // 2. Total de funciones
  const totalFunciones = peliculas.reduce(
    (acc, p) => acc + (p.funciones ? p.funciones.length : 0),
    0,
  );

  // 3. Total de boletos vendidos
  const totalBoletosVendidos = reservas.reduce(
    (acc, r) => acc + r.asientosReservados.length,
    0,
  );

  // 4 y 5. Asientos disponibles y ocupados
  let asientosDisponibles = 0;
  let asientosOcupados = 0;

  salas.forEach((sala) => {
    sala.asientos.forEach((asiento) => {
      if (asiento.estado === "ocupado") {
        asientosOcupados++;
      } else {
        asientosDisponibles++;
      }
    });
  });

  // 6. Ingresos generados
  const ingresosGenerados = reservas.reduce((acc, r) => acc + r.totalPagar, 0);

  // 7. Película más reservada
  const conteoPeliculas: { [key: string]: number } = {};
  reservas.forEach((r) => {
    conteoPeliculas[r.nombrePelicula] =
      (conteoPeliculas[r.nombrePelicula] || 0) + r.asientosReservados.length;
  });

  let peliculaMasReservada = "N/A";
  let maxBoletos = 0;

  Object.entries(conteoPeliculas).forEach(([nombre, cantidad]) => {
    if (cantidad > maxBoletos) {
      maxBoletos = cantidad;
      peliculaMasReservada = nombre;
    }
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ marginBottom: "20px", color: "#1e293b" }}>
        Dashboard Cinepolito
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "30px",
        }}
      >
        <div style={cardStyle}>
          <p style={cardLabelStyle}>Total Películas</p>
          <h2 style={cardValueStyle}>{totalPeliculas}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Total Funciones</p>
          <h2 style={cardValueStyle}>{totalFunciones}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Boletos Vendidos</p>
          <h2 style={cardValueStyle}>{totalBoletosVendidos}</h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Ingresos Generados</p>
          <h2 style={{ ...cardValueStyle, color: "#16a34a" }}>
            ${ingresosGenerados.toFixed(2)}
          </h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Asientos Disponibles</p>
          <h2 style={{ ...cardValueStyle, color: "#2563eb" }}>
            {asientosDisponibles}
          </h2>
        </div>

        <div style={cardStyle}>
          <p style={cardLabelStyle}>Asientos Ocupados</p>
          <h2 style={{ ...cardValueStyle, color: "#dc2626" }}>
            {asientosOcupados}
          </h2>
        </div>

        <div style={{ ...cardStyle, gridColumn: "span 2" }}>
          <p style={cardLabelStyle}>Película Más Reservada</p>
          <h3 style={{ margin: "8px 0 0 0", color: "#0f172a" }}>
            {peliculaMasReservada} {maxBoletos > 0 && `(${maxBoletos} boletos)`}
          </h3>
        </div>
      </div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "16px",
  borderRadius: "10px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  border: "1px solid #e2e8f0",
};

const cardLabelStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "14px",
  color: "#64748b",
  fontWeight: "bold",
};

const cardValueStyle: React.CSSProperties = {
  margin: "8px 0 0 0",
  fontSize: "28px",
  fontWeight: "bold",
  color: "#0f172a",
};

export default Dashboard;
