import AuthCallback from "@/features/auth/authCallback";
import Home from "@/features/home/homePage";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/app/routes/protectedRoutes";
import Dashboard from "@/features/dashboard/dashboardPage";
import { Mainlayout } from "@/app/mainLayout/mainLayout";
import { CollectionPage } from "@/features/collections/collectionPage";
import { NewColection } from "@/features/collections/components/newCollection";
import { ColorsPage } from "@/features/colors/colorsPage";
import { NewColor } from "@/features/colors/components/newColor";
import { SizePage } from "@/features/size/sizePage";
import { NewSize } from "@/features/size/components/newSize";

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
          },
          {
            path: "/collections/:id",
            element: <NewColection/>,
          },
          {
            path: "/colors",
            element: <ColorsPage/>,
          },
          {
            path: "/colors/new",
            element: <NewColor/>,
          },
          {
            path: "/colors/:id",
            element: <NewColor/>,
          },
          {
            path: "/sizes",
            element: <SizePage/>,
          },
          {
            path: "/sizes/new",
            element: <NewSize/>,
          }
        ]
      }
    ]
  }
])

export default routes;