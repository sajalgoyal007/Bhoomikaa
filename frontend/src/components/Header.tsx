// src/components/Header.tsx

import { Link, useNavigate } from "react-router-dom";
import { Globe, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleWalletConnect = () => {
    if (!walletConnected) {
      setWalletAddress("0x1a2b...3c4d");
      setWalletConnected(true);
    } else {
      setWalletAddress("");
      setWalletConnected(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-card parchment shadow-md">
      <div className="container mx-auto px-4 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="text-4xl">🏛️</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">
                {t("app.title")}
              </h1>
              <p className="text-sm text-muted-foreground hidden md:block">
                {t("app.tagline")}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {/* Language */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2"
            >
              <Globe className="w-4 h-4" />
              {language === "en" ? "हिंदी" : "English"}
            </Button>

            {/* Wallet */}
            <Button
              variant={walletConnected ? "secondary" : "default"}
              size="sm"
              onClick={handleWalletConnect}
              className="gap-2"
            >
              <Wallet className="w-4 h-4" />
              {walletConnected ? walletAddress : t("nav.connectWallet")}
            </Button>

            {/* Login Buttons Removed — Now Uses Role System */}
            {!role && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate("/")}
              >
                🔐 Login
              </Button>
            )}

            {/* Logout */}
            {role && (
              <Button variant="destructive" size="sm" onClick={logout}>
                🚪 Logout
              </Button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-2 justify-center md:justify-start">
          {/* User Routes */}
          {role === "user" && (
            <>
              <Link to="/search">
                <Button variant="ghost" size="sm" className="gap-2">
                  🔍 {t("nav.search")}
                </Button>
              </Link>

              <Link to="/add-land">
                <Button variant="ghost" size="sm" className="gap-2">
                  ➕ {t("nav.addLand")}
                </Button>
              </Link>

              <Link to="/contact">
                <Button variant="ghost" size="sm" className="gap-2">
                  📞 {t("nav.contact")}
                </Button>
              </Link>
            </>
          )}

          {/* Council Routes */}
          {/* Council Routes */}
          {role === "council" && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => navigate("/login-council")} // ✅ ALWAYS go via login
            >
              🧑‍💼 {t("nav.council")}
            </Button>
          )}

          {/* Always visible */}
          <Link to="/about">
            <Button variant="ghost" size="sm" className="gap-2">
              ℹ️ {t("nav.about")}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};
