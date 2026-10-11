import Navbar from "@/components/Navbar";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const ExperiencePage = () => (
  <main className="min-h-screen bg-background text-foreground">
    <Navbar />
    <div className="pt-20">
      <Experience />
    </div>
    <Footer />
    <ChatBot />
  </main>
);

export default ExperiencePage;
