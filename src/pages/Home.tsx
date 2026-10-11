import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const Home = () => (
  <main className="min-h-screen bg-background text-foreground">
    <Navbar />
    <Hero />
    <Footer />
    <ChatBot />
  </main>
);

export default Home;
