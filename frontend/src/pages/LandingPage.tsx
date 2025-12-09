import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center tribal-pattern px-6">

      {/* HERO */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">
        Blockchain Land Verification
      </h1>

      <p className="max-w-xl text-muted-foreground mb-10 text-lg">
        A transparent and tamper-proof land registry system with council-level verification.
      </p>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-6 mb-16">
        <Button aria-label="Citizen Login"
          className="px-10 py-5 text-lg"
          onClick={() => navigate("/login")
          }
        >
          👤 Citizen Login
        </Button>

        <Button
          className="px-10 py-5 text-lg"
          variant="secondary"
          onClick={() => navigate("/login-council")}
        >
          🧑‍💼 Council Login
        </Button>
      </div>

      {/* HOW IT WORKS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-16">
        {[
          "Add Land Details",
          "Council Verification",
          "Blockchain Record",
        ].map((step, i) => (
          <div
            key={i}
            className="bg-card border rounded-xl p-6 shadow-md vintage-border"
          >
            <h3 className="font-semibold mb-2">Step {i + 1}</h3>
            <p className="text-sm text-muted-foreground">{step}</p>
          </div>
        ))}
      </div>

      {/* CORE FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mb-10">
        {[
          "Blockchain Security",
          "Council Approval System",
          "IPFS-Based Documents",
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-card border rounded-xl p-6 shadow-md"
          >
            <h3 className="font-semibold mb-1">{feature}</h3>
            <p className="text-sm text-muted-foreground">
              Built for transparency and trust.
            </p>
          </div>
        ))}
      </div>

      {/* FOOTER LINE */}
      <p className="text-xs text-muted-foreground mt-6">
        Built for transparent land governance on blockchain.
      </p>

          {/* FOOTER */}
<footer className="w-full mt-16 py-4 border-t text-center text-sm text-muted-foreground">
  © {new Date().getFullYear()} Bhoomikaa. All Rights Reserved.  
  <span className="block mt-1 text-xs">
    Built by Sajal Goyal
  </span>
</footer>


    </div>
  );
};

export default LandingPage;
