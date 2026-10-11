import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const AboutPage = () => (
  <main className="min-h-screen bg-background text-foreground">
    <Navbar />
    <div className="pt-20">
      <About />
    </div>
    <Footer />
    <ChatBot />
  </main>
);

export default AboutPage;
