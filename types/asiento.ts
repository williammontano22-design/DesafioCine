export type EstadoAsiento = "disponible" | "seleccionado" | "ocupado";
export type TipoAsiento = "general" | "preferencial";

export interface Asiento {
  id: string;
  fila: string;
  numero: number;
  estado: EstadoAsiento;
  tipo: TipoAsiento;
  precio: number;
}
