// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ParcelProvider } from "@/contexts/ParcelContext";
import LoginUserPage from "./pages/LoginUserPage";
import LoginCouncilPage from "./pages/LoginCouncilPage";
import { Button } from "@/components/ui/button"
import LandingPage from "@/pages/LandingPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Header } from "@/components/Header";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import ParcelDetailPage from "./pages/ParcelDetailPage";
import AddLandPage from "./pages/AddLandPage";
import MyLandsPage from "./pages/MyLandsPage";
import CouncilPage from "./pages/CouncilPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <ParcelProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Header />
              <Routes>
                <Route
  path="/search"
  element={
    <ProtectedRoute role="user">
      <SearchPage />
    </ProtectedRoute>
  }
/>
                <Route path="/" element={<LandingPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/parcel/:id" element={<ParcelDetailPage />} />
                <Route
  path="/add-land"
  element={
    <ProtectedRoute role="user">
      <AddLandPage />
    </ProtectedRoute>
  }
/>
                <Route path="/my-lands" element={<MyLandsPage />} />
                <Route
  path="/council"
  element={
    <ProtectedRoute role="council">
      <CouncilPage />
    </ProtectedRoute>
  }
/>
                <Route path="/about" element={<AboutPage />} />
                <Route
  path="/contact"
  element={
    <ProtectedRoute role="user">
      <ContactPage />
    </ProtectedRoute>
  }
/>

                {/* Login routes */}
                <Route path="/login" element={<LoginUserPage />} />
                <Route path="/login-council" element={<LoginCouncilPage />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ParcelProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
