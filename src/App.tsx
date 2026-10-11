
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import EducationPage from "./pages/EducationPage";
import ExperiencePage from "./pages/ExperiencePage";
import SkillsPage from "./pages/SkillsPage";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import Applications from "./pages/Applications";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

import AdminLogin from "./admin/AdminLogin";
import ForgotPassword from "./admin/ForgotPassword";
import Dashboard from "./admin/Dashboard";
import ProtectedRoute from "./admin/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <ScrollToTop />

          <Routes>
            {/* Public Portfolio */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Login */}
            <Route
              path="/admin/login"
              element={<AdminLogin />}
            />

            {/* Admin Forgot Password */}
            <Route
              path="/admin/forgot-password"
              element={<ForgotPassword />}
            />

            {/* Protected Admin Dashboard */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Backward-Compatible Admin URLs */}
            <Route
              path="/admin-login"
              element={
                <Navigate to="/admin/login" replace />
              }
            />

            <Route
              path="/dashboard"
              element={
                <Navigate to="/admin/dashboard" replace />
              }
            />

            {/* 404 - Page Not Found */}
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;