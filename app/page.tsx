import Dashboard from "@/components/Dashboard";
import FormularioPelicula from "@/components/FormularioPelicula";
import TablaPeliculas from "@/components/TablaPeliculas";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        paddingBottom: "40px",
      }}
    >
      <Dashboard />
      <FormularioPelicula />
      <TablaPeliculas />
    </main>
  );
}
