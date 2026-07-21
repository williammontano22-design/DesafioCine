import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asiento } from "@/types/asiento";

interface Sala {
  id: string;
  nombre: string;
  asientos: Asiento[];
}

interface SalasState {
  lista: Sala[];
  asientosSeleccionadosTemporalmente: string[]; // IDs de asientos seleccionados antes de confirmar reserva
}

// Helper para generar una matriz inicial de 20 asientos (Filas A, B, C, D)
const generarAsientosIniciales = (): Asiento[] => {
  const filas = ["A", "B", "C", "D"];
  const asientos: Asiento[] = [];

  filas.forEach((fila) => {
    for (let i = 1; i <= 5; i++) {
      asientos.push({
        id: `${fila}${i}`,
        fila,
        numero: i,
        estado: "disponible",
        tipo: fila === "D" ? "preferencial" : "general",
        precio: fila === "D" ? 7.0 : 5.0,
      });
    }
  });

  return asientos;
};

const initialState: SalasState = {
  lista: [
    { id: "Sala 1", nombre: "Sala 1", asientos: generarAsientosIniciales() },
    { id: "Sala 2", nombre: "Sala 2", asientos: generarAsientosIniciales() },
  ],
  asientosSeleccionadosTemporalmente: [],
};

export const salasSlice = createSlice({
  name: "salas",
  initialState,
  reducers: {
    toggleSeleccionAsiento: (state, action: PayloadAction<string>) => {
      const asientoId = action.payload;
      if (state.asientosSeleccionadosTemporalmente.includes(asientoId)) {
        state.asientosSeleccionadosTemporalmente =
          state.asientosSeleccionadosTemporalmente.filter(
            (id) => id !== asientoId,
          );
      } else {
        state.asientosSeleccionadosTemporalmente.push(asientoId);
      }
    },
    limpiarSeleccionTemporal: (state) => {
      state.asientosSeleccionadosTemporalmente = [];
    },
    ocuparAsientos: (
      state,
      action: PayloadAction<{ salaId: string; asientosIds: string[] }>,
    ) => {
      const { salaId, asientosIds } = action.payload;
      const sala = state.lista.find((s) => s.id === salaId);
      if (sala) {
        sala.asientos.forEach((asiento) => {
          if (asientosIds.includes(asiento.id)) {
            asiento.estado = "ocupado";
          }
        });
      }
      state.asientosSeleccionadosTemporalmente = [];
    },
  },
});

export const {
  toggleSeleccionAsiento,
  limpiarSeleccionTemporal,
  ocuparAsientos,
} = salasSlice.actions;

export default salasSlice.reducer;
