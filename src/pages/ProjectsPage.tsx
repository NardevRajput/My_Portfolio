import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const ProjectsPage = () => (
  <main className="min-h-screen bg-background text-foreground">
    <Navbar />
    <div className="pt-20">
      <Projects />
    </div>
    <Footer />
    <ChatBot />
  </main>
);

export default ProjectsPage;
