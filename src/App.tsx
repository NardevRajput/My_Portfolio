import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";

import { Toaster as Sonner } from "@/components/ui/sonner";

import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";

import NotFound from "./pages/NotFound";

import AdminLogin from "./admin/AdminLogin";

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
          <Routes>
            <Route path="/" element={<Index />} />

            <Route path="/admin-login" element={<AdminLogin />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
