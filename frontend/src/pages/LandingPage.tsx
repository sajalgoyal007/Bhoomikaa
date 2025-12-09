import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const loginAsUser = () => {
    localStorage.setItem("role", "user");
    navigate("/add-land");
  };

  const loginAsCouncil = () => {
    localStorage.setItem("role", "council");
    navigate("/council");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center tribal-pattern px-6">
      <h1 className="text-4xl font-bold mb-4 text-primary">
        Land Registry DApp
      </h1>
      <p className="text-muted-foreground mb-8">
        Secure, Verify, and Manage Land Ownership on Blockchain
      </p>

      <div className="flex gap-6">
        <Button
          className="px-8 py-4 text-lg"
          onClick={loginAsUser}
        >
          Login as User
        </Button>

        <Button
          className="px-8 py-4 text-lg"
          variant="secondary"
          onClick={loginAsCouncil}
        >
          Login as Council
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;

