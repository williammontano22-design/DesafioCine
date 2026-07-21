import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pelicula } from "@/types/pelicula";

interface PeliculasState {
  lista: Pelicula[];
  busqueda: string;
  filtroGenero: string;
  filtroClasificacion: string;
  filtroSala: string;
  filtroEstado: string;
}

const initialState: PeliculasState = {
  lista: [
    {
      codigo: "PEL001",
      nombre: "Avengers: Endgame",
      genero: "Acción",
      duracion: 181,
      clasificacion: "PG-13",
      salaAsignada: "Sala 1",
      precioEntrada: 5.5,
      estado: "Disponible",
      funciones: [
        { id: "f1", horario: "14:30" },
        { id: "f2", horario: "18:00" },
      ],
    },
    {
      codigo: "PEL002",
      nombre: "The Lion King",
      genero: "Animación",
      duracion: 118,
      clasificacion: "G",
      salaAsignada: "Sala 2",
      precioEntrada: 4.5,
      estado: "Disponible",
      funciones: [{ id: "f3", horario: "15:00" }],
    },
  ],
  busqueda: "",
  filtroGenero: "Todos",
  filtroClasificacion: "Todos",
  filtroSala: "Todas",
  filtroEstado: "Todos",
};

export const peliculasSlice = createSlice({
  name: "peliculas",
  initialState,
  reducers: {
    agregarPelicula: (state, action: PayloadAction<Pelicula>) => {
      state.lista.push(action.payload);
    },
    editarPelicula: (state, action: PayloadAction<Pelicula>) => {
      const index = state.lista.findIndex(
        (p) => p.codigo === action.payload.codigo,
      );
      if (index !== -1) {
        state.lista[index] = action.payload;
      }
    },
    eliminarPelicula: (state, action: PayloadAction<string>) => {
      state.lista = state.lista.filter((p) => p.codigo !== action.payload);
    },
    setBusqueda: (state, action: PayloadAction<string>) => {
      state.busqueda = action.payload;
    },
    setFiltroGenero: (state, action: PayloadAction<string>) => {
      state.filtroGenero = action.payload;
    },
    setFiltroClasificacion: (state, action: PayloadAction<string>) => {
      state.filtroClasificacion = action.payload;
    },
    setFiltroSala: (state, action: PayloadAction<string>) => {
      state.filtroSala = action.payload;
    },
    setFiltroEstado: (state, action: PayloadAction<string>) => {
      state.filtroEstado = action.payload;
    },
  },
});

export const {
  agregarPelicula,
  editarPelicula,
  eliminarPelicula,
  setBusqueda,
  setFiltroGenero,
  setFiltroClasificacion,
  setFiltroSala,
  setFiltroEstado,
} = peliculasSlice.actions;

export default peliculasSlice.reducer;
