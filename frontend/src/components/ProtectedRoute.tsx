// // src/components/ProtectedRoute.tsx

// import { Navigate } from "react-router-dom";

// type ProtectedRouteProps = {
//   children: React.ReactElement;
//   requiredRole?: "user" | "council";
// };

// export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
//   const role = localStorage.getItem("role");

//   // Not logged in → send to landing page
//   if (!role) return <Navigate to="/" replace />;

//   // Logged in but wrong role
//   if (requiredRole && role !== requiredRole) {
//     return <Navigate to={role === "council" ? "/council" : "/add-land"} replace />;
//   }

//   return children;
// };
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  role?: "user" | "council";
}

export const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  // ✅ User login check (normal users)
  const isUserLoggedIn =
    localStorage.getItem("auth_token") ||
    localStorage.getItem("bhoomika_user_auth") === "true";

  // ✅ Council login check (hardcoded demo auth)
  const isCouncilLoggedIn =
    localStorage.getItem("bhoomika_council_auth") === "true";

  // ✅ Role-based protection
  if (role === "user" && !isUserLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (role === "council" && !isCouncilLoggedIn) {
    return <Navigate to="/login-council" replace />;
  }

  return children;
};
