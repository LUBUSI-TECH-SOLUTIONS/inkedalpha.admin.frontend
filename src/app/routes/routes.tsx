import AuthCallback from "@/features/auth/authCallback";
import Home from "@/features/home/homePage";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/app/routes/protectedRoutes";
import Dashboard from "@/features/dashboard/dashboardPage";
import { Mainlayout } from "@/app/mainLayout/mainLayout";
import { CollectionPage } from "@/features/collections/collectionPage";
import { NewColection } from "@/features/collections/components/newCollection";

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
          },
          {
            path: "/collections",
            element: <CollectionPage/>,
          },
          {
            path: "/collections/new",
            element: <NewColection/>,
          }
        ]
      }
    ]
  }
])

export default routes;