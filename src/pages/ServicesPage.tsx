import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const ServicesPage = () => (
  <main className="min-h-screen bg-background text-foreground">
    <Navbar />
    <div className="pt-20">
      <Services />
    </div>
    <Footer />
    <ChatBot />
  </main>
);

export default ServicesPage;
