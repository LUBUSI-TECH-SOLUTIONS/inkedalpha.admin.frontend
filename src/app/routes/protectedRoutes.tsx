import { useSession } from "@/features/auth/useSession";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
  const { user, isLoading } = useSession();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />
  }


  return <Outlet />;
}