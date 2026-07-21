"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { agregarReserva } from "@/redux/slices/reservasSlice";
import { confirmarReservaEnSala } from "@/redux/slices/salasSlice";
import { Reserva } from "@/types/reserva";
import MapaAsientos from "./MapaAsientos";

export const FormularioReserva: React.FC = () => {
  const dispatch = useAppDispatch();
  const peliculas = useAppSelector((state) =>
    state.peliculas.lista.filter((p) => p.estado === "Disponible"),
  );
  const salas = useAppSelector((state) => state.salas.lista);

  const [peliculaCodigo, setPeliculaCodigo] = useState(
    peliculas[0]?.codigo || "",
  );
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [telefonoCliente, setTelefonoCliente] = useState("");
  const [error, setError] = useState("");

  // Película elegida
  const peliculaActual = peliculas.find((p) => p.codigo === peliculaCodigo);

  // Sala asignada a la película
  const salaActual =
    salas.find((s) => s.nombre === peliculaActual?.salaAsignada) || salas[0];

  // Asientos seleccionados actualmente por el usuario
  const asientosSeleccionados = salaActual
    ? salaActual.asientos.filter((a) => a.estado === "seleccionado")
    : [];

  const totalPagar = asientosSeleccionados.reduce(
    (acc, a) => acc + a.precio,
    0,
  );

  const handleComprar = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!peliculaActual) {
      setError("Debes seleccionar una película disponible.");
      return;
    }

    if (asientosSeleccionados.length === 0) {
      setError("Debes seleccionar al menos un asiento en el mapa.");
      return;
    }

    if (
      !nombreCliente.trim() ||
      !emailCliente.trim() ||
      !telefonoCliente.trim()
    ) {
      setError("Por favor completa todos los datos del cliente.");
      return;
    }

    const nuevaReserva: Reserva = {
      id: `RES-${Date.now()}`,
      codigoPelicula: peliculaActual.codigo,
      nombrePelicula: peliculaActual.nombre,
      sala: salaActual.nombre,
      funcionHorario:
        horarioSeleccionado || peliculaActual.funciones[0]?.horario || "18:00",
      asientosReservados: asientosSeleccionados.map((a) => a.id),
      cliente: {
        nombre: nombreCliente,
        email: emailCliente,
        telefono: telefonoCliente,
      },
      totalPagar,
      fechaCompra: new Date().toLocaleDateString("es-SV"),
    };

    // 1. Guardar la reserva en el historial de Redux
    dispatch(agregarReserva(nuevaReserva));

    // 2. Marcar los asientos como Ocupados permanentemente en la sala
    dispatch(
      confirmarReservaEnSala({
        salaId: salaActual.id,
        asientosIds: asientosSeleccionados.map((a) => a.id),
      }),
    );

    alert(`🎉 ¡Reserva realizada con éxito!
Código: ${nuevaReserva.id}
Total a pagar: $${totalPagar.toFixed(2)}`);

    // Limpiar formulario
    setNombreCliente("");
    setEmailCliente("");
    setTelefonoCliente("");
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginTop: 0, color: "#0f172a" }}>
        🎟️ Reservar Boletos de Cine
      </h2>

      {error && <div style={errorStyle}>{error}</div>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Selección de Película y Horario */}
        <div>
          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Película</label>
            <select
              value={peliculaCodigo}
              onChange={(e) => setPeliculaCodigo(e.target.value)}
              style={inputStyle}
            >
              {peliculas.map((p) => (
                <option key={p.codigo} value={p.codigo}>
                  {p.nombre} ({p.salaAsignada} - ${p.precioEntrada})
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Horario de Función</label>
            <select
              value={horarioSeleccionado}
              onChange={(e) => setHorarioSeleccionado(e.target.value)}
              style={inputStyle}
            >
              {peliculaActual?.funciones.map((f) => (
                <option key={f.id} value={f.horario}>
                  {f.horario} hrs
                </option>
              ))}
            </select>
          </div>

          {/* Formulario Cliente */}
          <h4 style={{ color: "#0f172a", marginBottom: "10px" }}>
            👤 Datos del Cliente
          </h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombreCliente}
              onChange={(e) => setNombreCliente(e.target.value)}
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={emailCliente}
              onChange={(e) => setEmailCliente(e.target.value)}
              style={inputStyle}
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={telefonoCliente}
              onChange={(e) => setTelefonoCliente(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Resumen de Compra */}
          <div style={resumenStyle}>
            <p style={{ margin: "4px 0", fontSize: "14px", color: "#334155" }}>
              <strong>Asientos seleccionados:</strong>{" "}
              {asientosSeleccionados.map((a) => a.id).join(", ") || "Ninguno"}
            </p>
            <h3 style={{ margin: "10px 0 0 0", color: "#16a34a" }}>
              Total: ${totalPagar.toFixed(2)}
            </h3>
          </div>

          <button onClick={handleComprar} style={btnComprarStyle}>
            Confirmar Reserva
          </button>
        </div>

        {/* Mapa Interactivo de Asientos */}
        <div>{salaActual && <MapaAsientos salaId={salaActual.id} />}</div>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  margin: "20px",
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
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  boxSizing: "border-box",
  color: "#0f172a",
  backgroundColor: "#ffffff",
};

const resumenStyle: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  padding: "15px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  marginTop: "15px",
};

const btnComprarStyle: React.CSSProperties = {
  backgroundColor: "#16a34a",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%",
  fontSize: "16px",
  marginTop: "15px",
};

const errorStyle: React.CSSProperties = {
  backgroundColor: "#fef2f2",
  color: "#dc2626",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "15px",
  fontSize: "14px",
  border: "1px solid #fecaca",
};

export default FormularioReserva;
