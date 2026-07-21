"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { agregarPelicula } from "@/redux/slices/peliculasSlice";
import {
  Pelicula,
  GeneroPelicula,
  ClasificacionPelicula,
  EstadoPelicula,
} from "@/types/pelicula";

export const FormularioPelicula: React.FC = () => {
  const dispatch = useAppDispatch();
  const peliculasExistentes = useAppSelector((state) => state.peliculas.lista);

  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [genero, setGenero] = useState<GeneroPelicula>("Acción");
  const [duracion, setDuracion] = useState<number>(120);
  const [clasificacion, setClasificacion] =
    useState<ClasificacionPelicula>("PG-13");
  const [salaAsignada, setSalaAsignada] = useState("Sala 1");
  const [precioEntrada, setPrecioEntrada] = useState<number>(5.0);
  const [horarioTexto, setHorarioTexto] = useState("14:00, 18:00");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (!nombre.trim()) {
      setError("El nombre de la película es obligatorio.");
      return;
    }

    if (!codigo.trim()) {
      setError("El código es obligatorio.");
      return;
    }

    const existeCodigo = peliculasExistentes.some(
      (p) => p.codigo.toLowerCase() === codigo.toLowerCase(),
    );

    if (existeCodigo) {
      setError("Ya existe una película registrada con ese código.");
      return;
    }

    if (precioEntrada < 0) {
      setError("El precio de la entrada no puede ser negativo.");
      return;
    }

    if (duracion <= 0) {
      setError("La duración debe ser mayor a 0 minutos.");
      return;
    }

    const funciones = horarioTexto
      .split(",")
      .map((h, index) => ({
        id: `f-${index}-${Date.now()}`,
        horario: h.trim(),
      }))
      .filter((f) => f.horario !== "");

    const nuevaPelicula: Pelicula = {
      codigo,
      nombre,
      genero,
      duracion,
      clasificacion,
      salaAsignada,
      precioEntrada,
      estado: "Disponible",
      funciones,
    };

    dispatch(agregarPelicula(nuevaPelicula));

    // Limpiar formulario
    setCodigo("");
    setNombre("");
    setDuracion(120);
    setPrecioEntrada(5.0);
    setHorarioTexto("14:00, 18:00");
    alert("Película registrada correctamente");
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginTop: 0, color: "#0f172a" }}>➕ Agregar Película</h2>

      {error && <div style={errorStyle}>{error}</div>}

      <form onSubmit={handleSubmit} style={formGridStyle}>
        <div>
          <label style={labelStyle}>Código</label>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ej: PEL003"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Avatar 2"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Género</label>
          <select
            value={genero}
            onChange={(e) => setGenero(e.target.value as GeneroPelicula)}
            style={inputStyle}
          >
            <option value="Acción">Acción</option>
            <option value="Comedia">Comedia</option>
            <option value="Drama">Drama</option>
            <option value="Terror">Terror</option>
            <option value="Ciencia Ficción">Ciencia Ficción</option>
            <option value="Animación">Animación</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Clasificación</label>
          <select
            value={clasificacion}
            onChange={(e) =>
              setClasificacion(e.target.value as ClasificacionPelicula)
            }
            style={inputStyle}
          >
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R</option>
            <option value="NC-17">NC-17</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Duración (minutos)</label>
          <input
            type="number"
            value={duracion}
            onChange={(e) => setDuracion(Number(e.target.value))}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Sala Asignada</label>
          <select
            value={salaAsignada}
            onChange={(e) => setSalaAsignada(e.target.value)}
            style={inputStyle}
          >
            <option value="Sala 1">Sala 1</option>
            <option value="Sala 2">Sala 2</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Precio Entrada ($)</label>
          <input
            type="number"
            step="0.5"
            value={precioEntrada}
            onChange={(e) => setPrecioEntrada(Number(e.target.value))}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Horarios (separados por coma)</label>
          <input
            type="text"
            value={horarioTexto}
            onChange={(e) => setHorarioTexto(e.target.value)}
            placeholder="14:30, 18:00"
            style={inputStyle}
          />
        </div>

        <div style={{ gridColumn: "1 / -1", marginTop: "10px" }}>
          <button type="submit" style={buttonStyle}>
            Guardar Película
          </button>
        </div>
      </form>
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

const formGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "15px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: "bold",
  marginBottom: "5px",
  color: "#475569",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  boxSizing: "border-box",
  color: "#0f172a", // 👈 Forzar texto oscuro
  backgroundColor: "#ffffff", // 👈 Forzar fondo blanco
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#2563eb",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%",
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

export default FormularioPelicula;
