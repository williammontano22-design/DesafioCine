export interface Cliente {
  nombre: string;
  email: string;
  telefono: string;
}

export interface Reserva {
  id: string;
  codigoPelicula: string;
  nombrePelicula: string;
  sala: string;
  funcionHorario: string;
  asientosReservados: string[]; // Ej: ["A1", "A2"]
  cliente: Cliente;
  totalPagar: number;
  fechaCompra: string;
}
