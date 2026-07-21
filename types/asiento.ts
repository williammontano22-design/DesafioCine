export type EstadoAsiento = "disponible" | "seleccionado" | "ocupado";
export type TipoAsiento = "general" | "preferencial";

export interface Asiento {
  id: string; // Ej: "A1", "B3"
  fila: string; // Ej: "A", "B"
  numero: number; // Ej: 1, 2, 3
  estado: EstadoAsiento;
  tipo: TipoAsiento;
  precio: number;
}
