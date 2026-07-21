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
  asientosReservados: string[];
  cliente: Cliente;
  totalPagar: number;
  fechaCompra: string;
}
