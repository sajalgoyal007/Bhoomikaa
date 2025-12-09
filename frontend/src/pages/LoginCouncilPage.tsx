// // src/pages/LoginCouncilPage.tsx

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";

// const COUNCIL_PASSWORD = "admin@123"; // ✅ hardcoded hackathon password

// const LoginCouncilPage: React.FC = () => {
//   const [password, setPassword] = useState("");
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const submit = () => {
//     if (password === COUNCIL_PASSWORD) {
//       // ✅ MOST IMPORTANT LINE
//       localStorage.setItem("bhoomika_council_auth", "true");

//       toast({
//         title: "Welcome, Council",
//         description: "You are signed in.",
//       });

//       navigate("/council"); // ✅ redirect to protected dashboard
//     } else {
//       toast({
//         title: "Invalid password",
//         description: "Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen tribal-pattern flex items-center justify-center">
//       <Card className="w-full max-w-md vintage-border">
//         <CardHeader>
//           <CardTitle className="text-2xl">Council Login</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div>
//             <Label htmlFor="password">Shared Council Password</Label>
//             <Input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter council password"
//             />
//           </div>

//           <Button onClick={submit} className="w-full">
//             Sign In
//           </Button>

//           <p className="text-xs text-center text-muted-foreground mt-2">
//             Demo Password: <span className="font-mono">admin@123</span>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default LoginCouncilPage;


// src/pages/LoginCouncilPage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const COUNCIL_ID = "COUNCIL2025";
const COUNCIL_PASSWORD = "admin@123";

const LoginCouncilPage: React.FC = () => {
  const [councilId, setCouncilId] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const submit = () => {
    if (councilId === COUNCIL_ID && password === COUNCIL_PASSWORD) {
      // ✅ Proper council login state
      localStorage.setItem("bhoomika_council_auth", "true");
      localStorage.setItem("role", "council");

      toast({
        title: "Welcome, Council",
        description: "You are signed in securely.",
      });

      navigate("/council");
    } else {
      toast({
        title: "Invalid credentials",
        description: "Council ID or Password is incorrect.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen tribal-pattern flex items-center justify-center">
      <Card className="w-full max-w-md vintage-border">
        <CardHeader>
          <CardTitle className="text-2xl">Council Login</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div>
            <Label>Council ID</Label>
            <Input
              value={councilId}
              onChange={(e) => setCouncilId(e.target.value)}
              placeholder="Enter council ID"
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <Button onClick={submit} className="w-full">
            Sign In
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-2">
            Demo ID: <span className="font-mono">COUNCIL2025</span> | Password:{" "}
            <span className="font-mono">admin@123</span>
          </p>

        </CardContent>
      </Card>
    </div>
  );
};

export default LoginCouncilPage;
