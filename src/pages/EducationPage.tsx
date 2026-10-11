import Navbar from "@/components/Navbar";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const EducationPage = () => (
  <main className="min-h-screen bg-background text-foreground">
    <Navbar />
    <div className="pt-20">
      <Education />
    </div>
    <Footer />
    <ChatBot />
  </main>
);

export default EducationPage;
