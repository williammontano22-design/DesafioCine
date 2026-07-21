"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { editarPelicula } from "@/redux/slices/peliculasSlice";
import { Pelicula, GeneroPelicula } from "@/types/pelicula";
import PeliculaFila from "./PeliculaFila";
import Buscador from "./Buscador";
import Filtros from "./Filtros";

export const TablaPeliculas: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    lista,
    busqueda,
    filtroGenero,
    filtroClasificacion,
    filtroSala,
    filtroEstado,
  } = useAppSelector((state) => state.peliculas);

  const [peliculaAEditar, setPeliculaAEditar] = useState<Pelicula | null>(null);

  // 🎯 Lógica de Filtrado y Búsqueda combinada
  const peliculasFiltradas = lista.filter((p) => {
    const coincideBusqueda =
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.genero.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.clasificacion.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.salaAsignada.toLowerCase().includes(busqueda.toLowerCase());

    const coincideGenero =
      filtroGenero === "Todos" || p.genero === filtroGenero;
    const coincideClasificacion =
      filtroClasificacion === "Todos" ||
      p.clasificacion === filtroClasificacion;
    const coincideSala =
      filtroSala === "Todas" || p.salaAsignada === filtroSala;
    const coincideEstado =
      filtroEstado === "Todos" || p.estado === filtroEstado;

    return (
      coincideBusqueda &&
      coincideGenero &&
      coincideClasificacion &&
      coincideSala &&
      coincideEstado
    );
  });

  const handleGuardarEdicion = (e: React.FormEvent) => {
    e.preventDefault();
    if (peliculaAEditar) {
      dispatch(editarPelicula(peliculaAEditar));
      setPeliculaAEditar(null);
      alert("Película actualizada con éxito");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginTop: 0, color: "#0f172a" }}>
        🎬 Catálogo de Películas
      </h2>

      {/* 🔍 Buscador y Filtros */}
      <Buscador />
      <Filtros />

      {peliculasFiltradas.length === 0 ? (
        <p style={{ color: "#64748b", textAlign: "center", padding: "20px 0" }}>
          No se encontraron películas que coincidan con la búsqueda o filtros.
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
                <th style={thStyle}>Código</th>
                <th style={thStyle}>Nombre</th>
                <th style={thStyle}>Género</th>
                <th style={thStyle}>Duración</th>
                <th style={thStyle}>Clasificación</th>
                <th style={thStyle}>Sala</th>
                <th style={thStyle}>Precio</th>
                <th style={thStyle}>Estado</th>
                <th style={thStyle}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {peliculasFiltradas.map((p) => (
                <PeliculaFila
                  key={p.codigo}
                  pelicula={p}
                  onEditar={(peli) => setPeliculaAEditar(peli)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de Edición */}
      {peliculaAEditar && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3 style={{ marginTop: 0, color: "#0f172a" }}>
              ✏️ Editar Película
            </h3>
            <form
              onSubmit={handleGuardarEdicion}
              style={{ display: "grid", gap: "10px" }}
            >
              <div>
                <label style={labelStyle}>Nombre</label>
                <input
                  type="text"
                  value={peliculaAEditar.nombre}
                  onChange={(e) =>
                    setPeliculaAEditar({
                      ...peliculaAEditar,
                      nombre: e.target.value,
                    })
                  }
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Género</label>
                <select
                  value={peliculaAEditar.genero}
                  onChange={(e) =>
                    setPeliculaAEditar({
                      ...peliculaAEditar,
                      genero: e.target.value as GeneroPelicula,
                    })
                  }
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
                <label style={labelStyle}>Precio ($)</label>
                <input
                  type="number"
                  step="0.5"
                  value={peliculaAEditar.precioEntrada}
                  onChange={(e) =>
                    setPeliculaAEditar({
                      ...peliculaAEditar,
                      precioEntrada: Number(e.target.value),
                    })
                  }
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <button
                  type="submit"
                  style={{ ...btnStyle, backgroundColor: "#2563eb", flex: 1 }}
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={() => setPeliculaAEditar(null)}
                  style={{ ...btnStyle, backgroundColor: "#64748b", flex: 1 }}
                >
                  Cancelar
                </button>
              </div>
            </form>
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
  margin: "20px",
};

const thStyle: React.CSSProperties = {
  padding: "12px",
  borderBottom: "2px solid #cbd5e1",
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
  maxWidth: "400px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: "bold",
  color: "#475569",
  marginBottom: "4px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  boxSizing: "border-box",
  color: "#0f172a",
  backgroundColor: "#ffffff",
};

const btnStyle: React.CSSProperties = {
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default TablaPeliculas;
