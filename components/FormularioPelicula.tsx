"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { agregarPelicula } from "@/redux/slices/peliculasSlice";
import {
  Pelicula,
  GeneroPelicula,
  ClasificacionPelicula,
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
  const [imagen, setImagen] = useState("");
  const [error, setError] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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
      imagen: imagen || "https://via.placeholder.com/300x400?text=Sin+Imagen",
    };

    dispatch(agregarPelicula(nuevaPelicula));

    // Limpiar campos
    setCodigo("");
    setNombre("");
    setDuracion(120);
    setPrecioEntrada(5.0);
    setHorarioTexto("14:00, 18:00");
    setImagen("");
    alert("Película registrada correctamente");
  };

  return (
    <div style={cardContainerStyle}>
      {/* Encabezado Único */}
      <div style={headerStyle}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
          Agregar Nueva Película
        </h2>
        <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#94a3b8" }}>
          Complete el formulario para registrar un nuevo título en la cartelera.
        </p>
      </div>

      {error && <div style={errorStyle}>{error}</div>}

      <form onSubmit={handleSubmit} style={formStyle}>
        {/* Columna Izquierda: Carga e Imagen */}
        <div style={columnImageStyle}>
          <label style={labelStyle}>Poster o Imagen Promocional</label>

          <div style={imagePreviewContainer}>
            {imagen ? (
              <img src={imagen} alt="Vista previa" style={imageStyle} />
            ) : (
              <span style={{ fontSize: "12px", color: "#64748b" }}>
                Sin Imagen
              </span>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ fontSize: "12px", color: "#475569", width: "100%" }}
          />

          <span
            style={{ fontSize: "11px", color: "#94a3b8", textAlign: "center" }}
          >
            o ingrese una URL directa:
          </span>

          <input
            type="url"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            placeholder="https://ejemplo.com/poster.jpg"
            style={inputStyle}
          />
        </div>

        {/* Columna Derecha: Campos de Información */}
        <div style={columnFieldsStyle}>
          <div style={rowStyle}>
            <div>
              <label style={labelStyle}>Código Identificador</label>
              <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Ej: PEL003"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Nombre de la Película</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Avatar 3"
                style={inputStyle}
              />
            </div>
          </div>

          <div style={rowStyle}>
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
                <option value="G">G (Público General)</option>
                <option value="PG">PG (Supervisión Requerida)</option>
                <option value="PG-13">PG-13 (Mayores de 13 años)</option>
                <option value="R">R (Mayores de 17 años)</option>
                <option value="NC-17">NC-17 (Exclusivo Adultos)</option>
              </select>
            </div>
          </div>

          <div style={rowStyle}>
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
          </div>

          <div style={rowStyle}>
            <div>
              <label style={labelStyle}>Precio de Entrada ($)</label>
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
                placeholder="14:00, 18:00, 20:30"
                style={inputStyle}
              />
            </div>
          </div>

          <button type="submit" style={btnSubmitStyle}>
            Guardar Película
          </button>
        </div>
      </form>
    </div>
  );
};

// Estilos unificados
const cardContainerStyle: React.CSSProperties = {
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

const formStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "24px",
  padding: "24px",
};

const columnImageStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
};

const columnFieldsStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  flex: 1,
};

const imagePreviewContainer: React.CSSProperties = {
  width: "140px",
  height: "190px",
  borderRadius: "6px",
  overflow: "hidden",
  backgroundColor: "#f1f5f9",
  border: "1px solid #cbd5e1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const rowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
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

const btnSubmitStyle: React.CSSProperties = {
  backgroundColor: "#2563eb",
  color: "#ffffff",
  padding: "10px 16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
  marginTop: "10px",
};

const errorStyle: React.CSSProperties = {
  backgroundColor: "#fef2f2",
  color: "#dc2626",
  padding: "12px 24px",
  fontSize: "14px",
  borderBottom: "1px solid #fecaca",
  fontWeight: "bold",
};

export default FormularioPelicula;
