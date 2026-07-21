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
  horario: string; // Ej: "14:30", "18:00"
}

export interface Pelicula {
  codigo: string; // Código único
  nombre: string;
  genero: GeneroPelicula;
  duracion: number; // En minutos
  clasificacion: ClasificacionPelicula;
  salaAsignada: string; // Ej: "Sala 1", "Sala 2"
  precioEntrada: number;
  estado: EstadoPelicula;
  funciones: Funcion[];
  imagenUrl?: string;
}
