import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reserva } from "@/types/reserva";

interface ReservasState {
  historial: Reserva[];
}

const initialState: ReservasState = {
  historial: [],
};

export const reservasSlice = createSlice({
  name: "reservas",
  initialState,
  reducers: {
    agregarReserva: (state, action: PayloadAction<Reserva>) => {
      state.historial.push(action.payload);
    },
  },
});

export const { agregarReserva } = reservasSlice.actions;
export default reservasSlice.reducer;
