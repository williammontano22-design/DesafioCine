"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { Reserva } from "@/types/reserva";

export const HistorialVentas: React.FC = () => {
  const historial = useAppSelector((state) => state.reservas.historial);
  const [reservaDetalle, setReservaDetalle] = useState<Reserva | null>(null);

  return (
    <div style={containerStyle}>
      <h2 style={{ marginTop: 0, color: "#0f172a" }}>📜 Historial de Ventas</h2>

      {historial.length === 0 ? (
        <p style={{ color: "#64748b", textAlign: "center", padding: "20px 0" }}>
          Aún no se han realizado ventas en el sistema.
        </p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                  fontSize: "13px",
                }}
              >
                <th style={thStyle}>ID Reserva</th>
                <th style={thStyle}>Fecha</th>
                <th style={thStyle}>Cliente</th>
                <th style={thStyle}>Película</th>
                <th style={thStyle}>Sala</th>
                <th style={thStyle}>Asientos</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: "1px solid #e2e8f0",
                    color: "#0f172a",
                  }}
                >
                  <td style={tdStyle}>
                    <strong>{item.id}</strong>
                  </td>
                  <td style={tdStyle}>{item.fechaCompra}</td>
                  <td style={tdStyle}>{item.cliente.nombre}</td>
                  <td style={tdStyle}>{item.nombrePelicula}</td>
                  <td style={tdStyle}>{item.sala}</td>
                  <td style={tdStyle}>{item.asientosReservados.join(", ")}</td>
                  <td
                    style={{ ...tdStyle, color: "#16a34a", fontWeight: "bold" }}
                  >
                    ${item.totalPagar.toFixed(2)}
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => setReservaDetalle(item)}
                      style={btnDetalleStyle}
                    >
                      👁️ Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal con los Detalles Completos de la Venta */}
      {reservaDetalle && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3
              style={{
                marginTop: 0,
                color: "#0f172a",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "10px",
              }}
            >
              🎟️ Comprobante de Venta #{reservaDetalle.id}
            </h3>

            <div style={detailGridStyle}>
              <p>
                <strong>Fecha de Compra:</strong> {reservaDetalle.fechaCompra}
              </p>
              <p>
                <strong>Película:</strong> {reservaDetalle.nombrePelicula}
              </p>
              <p>
                <strong>Sala:</strong> {reservaDetalle.sala}
              </p>
              <p>
                <strong>Horario:</strong> {reservaDetalle.funcionHorario} hrs
              </p>
              <p>
                <strong>Asientos:</strong>{" "}
                {reservaDetalle.asientosReservados.join(", ")}
              </p>
              <p>
                <strong>Total Pagado:</strong>{" "}
                <span style={{ color: "#16a34a", fontWeight: "bold" }}>
                  ${reservaDetalle.totalPagar.toFixed(2)}
                </span>
              </p>
            </div>

            <hr
              style={{
                border: "0",
                borderTop: "1px solid #e2e8f0",
                margin: "15px 0",
              }}
            />

            <h4 style={{ margin: "0 0 8px 0", color: "#334155" }}>
              👤 Datos del Cliente
            </h4>
            <div style={detailGridStyle}>
              <p>
                <strong>Nombre:</strong> {reservaDetalle.cliente.nombre}
              </p>
              <p>
                <strong>Correo:</strong> {reservaDetalle.cliente.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {reservaDetalle.cliente.telefono}
              </p>
            </div>

            <button
              onClick={() => setReservaDetalle(null)}
              style={btnCerrarStyle}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
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

const thStyle: React.CSSProperties = {
  padding: "12px",
  borderBottom: "2px solid #cbd5e1",
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  fontSize: "14px",
};

const btnDetalleStyle: React.CSSProperties = {
  backgroundColor: "#0284c7",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "12px",
};

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "24px",
  borderRadius: "10px",
  width: "100%",
  maxWidth: "450px",
};

const detailGridStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  fontSize: "14px",
  color: "#334155",
};

const btnCerrarStyle: React.CSSProperties = {
  backgroundColor: "#64748b",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%",
  marginTop: "20px",
};

export default HistorialVentas;
