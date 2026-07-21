import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asiento } from "@/types/asiento";

export interface Sala {
  id: string;
  nombre: string;
  capacidad: number;
  asientos: Asiento[];
}

interface SalasState {
  lista: Sala[];
}

// Función auxiliar para generar asientos iniciales (5 filas A-E, 8 columnas 1-8)
const generarAsientosIniciales = (): Asiento[] => {
  const filas = ["A", "B", "C", "D", "E"];
  const asientos: Asiento[] = [];

  filas.forEach((fila) => {
    for (let i = 1; i <= 8; i++) {
      asientos.push({
        id: `${fila}${i}`,
        fila,
        numero: i,
        estado: "disponible",
        tipo: fila === "A" || fila === "B" ? "preferencial" : "general",
        precio: fila === "A" || fila === "B" ? 6.5 : 5.0,
      });
    }
  });

  return asientos;
};

const initialState: SalasState = {
  lista: [
    {
      id: "sala-1",
      nombre: "Sala 1",
      capacidad: 40,
      asientos: generarAsientosIniciales(),
    },
    {
      id: "sala-2",
      nombre: "Sala 2",
      capacidad: 40,
      asientos: generarAsientosIniciales(),
    },
  ],
};

export const salasSlice = createSlice({
  name: "salas",
  initialState,
  reducers: {
    // Alterna la selección manual de un asiento (disponible <-> seleccionado)
    seleccionarAsiento: (
      state,
      action: PayloadAction<{ salaId: string; asientoId: string }>,
    ) => {
      const { salaId, asientoId } = action.payload;
      const sala = state.lista.find((s) => s.id === salaId);

      if (sala) {
        const asiento = sala.asientos.find((a) => a.id === asientoId);
        if (asiento && asiento.estado !== "ocupado") {
          asiento.estado =
            asiento.estado === "seleccionado" ? "disponible" : "seleccionado";
        }
      }
    },

    // Marca los asientos como ocupados de forma permanente al confirmar la compra
    confirmarReservaEnSala: (
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
    },
  },
});

export const { seleccionarAsiento, confirmarReservaEnSala } =
  salasSlice.actions;

export default salasSlice.reducer;
