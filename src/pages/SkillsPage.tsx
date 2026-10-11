import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const SkillsPage = () => (
  <main className="min-h-screen bg-background text-foreground">
    <Navbar />
    <div className="pt-20">
      <Skills />
    </div>
    <Footer />
    <ChatBot />
  </main>
);

export default SkillsPage;
