import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212]">
      <ScrollyCanvas />
      <Projects />
    </main>
  );
}
