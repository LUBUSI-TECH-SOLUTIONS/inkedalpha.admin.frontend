import AuthCallback from "@/features/auth/authCallback";
import Home from "@/features/home/homePage";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/app/routes/protectedRoutes";
import Dashboard from "@/features/dashboard/dashboardPage";
import { Mainlayout } from "@/app/mainLayout/mainLayout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/callback",
    element: <AuthCallback />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Mainlayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          }
        ]
      }
    ]
  }
])

export default routes;