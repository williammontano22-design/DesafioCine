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

  // Sala asignada
  const salaActual =
    salas.find((s) => s.nombre === peliculaActual?.salaAsignada) || salas[0];

  // Asientos seleccionados
  const asientosSeleccionados = salaActual
    ? salaActual.asientos.filter((a) => a.estado === "seleccionado")
    : [];

  const totalPagar = asientosSeleccionados.reduce(
    (acc, a) => acc + a.precio,
    0,
  );

  // Expresión Regular para Email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    if (!nombreCliente.trim()) {
      setError("Por favor ingresa el nombre del cliente.");
      return;
    }

    if (!regexEmail.test(emailCliente.trim())) {
      setError("Por favor ingresa un correo electrónico válido.");
      return;
    }

    if (telefonoCliente.length !== 8) {
      setError("El número de teléfono debe contener exactamente 8 dígitos.");
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

    dispatch(agregarReserva(nuevaReserva));

    dispatch(
      confirmarReservaEnSala({
        salaId: salaActual.id,
        asientosIds: asientosSeleccionados.map((a) => a.id),
      }),
    );

    alert(
      `Reserva realizada con éxito\nCódigo: ${nuevaReserva.id}\nTotal a pagar: $${totalPagar.toFixed(2)}`,
    );

    setNombreCliente("");
    setEmailCliente("");
    setTelefonoCliente("");
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
          Reservar Boletos de Cine
        </h2>
        <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#94a3b8" }}>
          Seleccione la película, el horario y sus asientos correspondientes.
        </p>
      </div>

      {error && <div style={errorStyle}>{error}</div>}

      <div style={contentGridStyle}>
        {/* Columna Izquierda: Formulario + Poster de Película */}
        <div>
          {/* Ficha rápida con Imagen de la Película */}
          {peliculaActual && (
            <div style={posterCardStyle}>
              <div style={posterImageContainerStyle}>
                <img
                  src={
                    peliculaActual.imagen ||
                    "https://via.placeholder.com/300x400?text=Sin+Imagen"
                  }
                  alt={peliculaActual.nombre}
                  style={posterImageStyle}
                />
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "16px",
                    color: "#0f172a",
                  }}
                >
                  {peliculaActual.nombre}
                </h3>
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "13px",
                    color: "#64748b",
                  }}
                >
                  <strong>Género:</strong> {peliculaActual.genero} |{" "}
                  <strong>Clasificación:</strong> {peliculaActual.clasificacion}
                </p>
                <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
                  <strong>Duración:</strong> {peliculaActual.duracion} min |{" "}
                  <strong>Precio base:</strong> $
                  {peliculaActual.precioEntrada.toFixed(2)}
                </p>
              </div>
            </div>
          )}

          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Seleccionar Película</label>
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

          <h4
            style={{ color: "#0f172a", marginBottom: "10px", fontSize: "14px" }}
          >
            Datos del Cliente
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
              placeholder="Correo electrónico (ej: usuario@gmail.com)"
              value={emailCliente}
              onChange={(e) => setEmailCliente(e.target.value)}
              style={inputStyle}
            />
            <input
              type="tel"
              placeholder="Teléfono (8 dígitos)"
              value={telefonoCliente}
              maxLength={8}
              onChange={(e) => {
                const soloNumeros = e.target.value.replace(/\D/g, "");
                setTelefonoCliente(soloNumeros);
              }}
              style={inputStyle}
            />
          </div>

          <div style={resumenStyle}>
            <p style={{ margin: "4px 0", fontSize: "13px", color: "#334155" }}>
              <strong>Asientos seleccionados:</strong>{" "}
              {asientosSeleccionados.map((a) => a.id).join(", ") || "Ninguno"}
            </p>
            <h3
              style={{
                margin: "8px 0 0 0",
                color: "#16a34a",
                fontSize: "18px",
              }}
            >
              Total: ${totalPagar.toFixed(2)}
            </h3>
          </div>

          <button onClick={handleComprar} style={btnComprarStyle}>
            Confirmar Reserva
          </button>
        </div>

        {/* Columna Derecha: Mapa de Asientos */}
        <div>{salaActual && <MapaAsientos salaId={salaActual.id} />}</div>
      </div>
    </div>
  );
};

// Estilos
const containerStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  margin: "20px 0",
  border: "1px solid #e2e8f0",
};

const headerStyle: React.CSSProperties = {
  backgroundColor: "#0f172a",
  color: "#ffffff",
  padding: "16px 24px",
};

const contentGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "24px",
  padding: "24px",
};

const posterCardStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  backgroundColor: "#f8fafc",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  marginBottom: "15px",
};

const posterImageContainerStyle: React.CSSProperties = {
  width: "80px",
  height: "110px",
  borderRadius: "6px",
  overflow: "hidden",
  backgroundColor: "#cbd5e1",
  flexShrink: 0,
};

const posterImageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: "bold",
  color: "#334155",
  marginBottom: "5px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  boxSizing: "border-box",
  fontSize: "13px",
  color: "#0f172a",
  backgroundColor: "#ffffff",
};

const resumenStyle: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  padding: "12px",
  borderRadius: "6px",
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
  fontSize: "15px",
  marginTop: "15px",
};

const errorStyle: React.CSSProperties = {
  backgroundColor: "#fef2f2",
  color: "#dc2626",
  padding: "12px 24px",
  fontSize: "14px",
  borderBottom: "1px solid #fecaca",
  fontWeight: "bold",
};

export default FormularioReserva;
