export type GeneroPelicula =
  | "Acción"
  | "Comedia"
  | "Drama"
  | "Terror"
  | "Ciencia Ficción"
  | "Animación";
export type ClasificacionPelicula = "G" | "PG" | "PG-13" | "R" | "NC-17";
export type EstadoPelicula = "Disponible" | "No disponible";

export interface Funcion {
  id: string;
  horario: string;
}

export interface Pelicula {
  codigo: string;
  nombre: string;
  genero: GeneroPelicula;
  duracion: number;
  clasificacion: ClasificacionPelicula;
  salaAsignada: string;
  precioEntrada: number;
  estado: EstadoPelicula;
  funciones: { id: string; horario: string }[];
  imagen?: string;
}
