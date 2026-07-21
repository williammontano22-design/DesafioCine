"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { seleccionarAsiento } from "@/redux/slices/salasSlice";
import { Asiento } from "@/types/asiento";

interface Props {
  salaId: string;
}

export const MapaAsientos: React.FC<Props> = ({ salaId }) => {
  const dispatch = useAppDispatch();
  const sala = useAppSelector((state) =>
    state.salas.lista.find((s) => s.id === salaId),
  );

  if (!sala) {
    return (
      <p style={{ color: "#64748b" }}>
        Selecciona una sala válida para ver la distribución de asientos.
      </p>
    );
  }

  const handleAsientoClick = (asiento: Asiento) => {
    if (asiento.estado === "ocupado") return; // Bloquear clic si ya está ocupado

    dispatch(
      seleccionarAsiento({
        salaId: sala.id,
        asientoId: asiento.id,
      }),
    );
  };

  // Agrupar asientos por fila (A, B, C...)
  const filas = Array.from(new Set(sala.asientos.map((a) => a.fila)));

  return (
    <div style={containerStyle}>
      <h3 style={{ marginTop: 0, color: "#0f172a", textAlign: "center" }}>
        🗺️ Mapa de Asientos ({sala.nombre})
      </h3>

      {/* Pantalla Simulada */}
      <div style={pantallaStyle}>PANTALLA</div>

      {/* Leyenda de colores */}
      <div style={leyendaContainerStyle}>
        <div style={leyendaItemStyle}>
          <div style={{ ...asientoBaseStyle, backgroundColor: "#cbd5e1" }} />
          <span style={leyendaTextoStyle}>Disponible</span>
        </div>
        <div style={leyendaItemStyle}>
          <div style={{ ...asientoBaseStyle, backgroundColor: "#2563eb" }} />
          <span style={leyendaTextoStyle}>Seleccionado</span>
        </div>
        <div style={leyendaItemStyle}>
          <div
            style={{
              ...asientoBaseStyle,
              backgroundColor: "#ef4444",
              cursor: "not-allowed",
            }}
          />
          <span style={leyendaTextoStyle}>Ocupado</span>
        </div>
      </div>

      {/* Grid de Asientos */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        {filas.map((fila) => {
          const asientosDeFila = sala.asientos.filter((a) => a.fila === fila);
          return (
            <div
              key={fila}
              style={{ display: "flex", gap: "8px", alignItems: "center" }}
            >
              <span
                style={{ fontWeight: "bold", width: "20px", color: "#64748b" }}
              >
                {fila}
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                {asientosDeFila.map((asiento) => {
                  let bgColor = "#cbd5e1"; // Disponible por defecto
                  let cursor = "pointer";

                  if (asiento.estado === "seleccionado") {
                    bgColor = "#2563eb";
                  } else if (asiento.estado === "ocupado") {
                    bgColor = "#ef4444";
                    cursor = "not-allowed";
                  }

                  return (
                    <button
                      key={asiento.id}
                      onClick={() => handleAsientoClick(asiento)}
                      disabled={asiento.estado === "ocupado"}
                      style={{
                        ...asientoBaseStyle,
                        backgroundColor: bgColor,
                        cursor: cursor,
                      }}
                      title={`${asiento.id} - $${asiento.precio} (${asiento.tipo})`}
                    >
                      {asiento.numero}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  margin: "20px 0",
};

const pantallaStyle: React.CSSProperties = {
  backgroundColor: "#94a3b8",
  color: "#ffffff",
  textAlign: "center",
  padding: "6px",
  borderRadius: "4px",
  fontWeight: "bold",
  letterSpacing: "4px",
  fontSize: "12px",
  marginBottom: "20px",
};

const leyendaContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "20px",
};

const leyendaItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const leyendaTextoStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#475569",
};

const asientoBaseStyle: React.CSSProperties = {
  width: "36px",
  height: "36px",
  borderRadius: "6px",
  border: "none",
  color: "#ffffff",
  fontWeight: "bold",
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s",
};

export default MapaAsientos;
