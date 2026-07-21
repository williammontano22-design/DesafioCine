"use client";

import { useState } from "react";
import Navbar, { VistaActual } from "@/components/navbar";
import Dashboard from "@/components/Dashboard";
import FormularioReserva from "@/components/FormularioReserva";
import HistorialVentas from "@/components/HistorialVentas";
import FormularioPelicula from "@/components/FormularioPelicula";
import TablaPeliculas from "@/components/TablaPeliculas";

export default function Home() {
  const [vistaActual, setVistaActual] = useState<VistaActual>("dashboard");

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        paddingBottom: "40px",
      }}
    >
      <Navbar vistaActual={vistaActual} setVistaActual={setVistaActual} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "10px" }}>
        {vistaActual === "dashboard" && <Dashboard />}
        {vistaActual === "reservas" && <FormularioReserva />}
        {vistaActual === "historial" && <HistorialVentas />}
        {vistaActual === "agregar" && <FormularioPelicula />}
        {vistaActual === "catalogo" && <TablaPeliculas />}
      </div>
    </main>
  );
}
