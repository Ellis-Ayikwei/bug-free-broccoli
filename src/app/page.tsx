import LandingClient from "@/components/LandingClient";
import MissionSection from "@/components/MissionSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-slate-50">
      <LandingClient />
      <MissionSection />
      <Footer />
    </div>
  );
}
