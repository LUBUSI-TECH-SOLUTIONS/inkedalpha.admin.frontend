import { cn } from "@/lib/utils";
import type React from "react"
import { Link, useLocation } from "react-router-dom";

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const location = useLocation();

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      active: location.pathname === "/dashboard"
    },
    {
      href: "/collections",
      label: "Colecciones",
      active: location.pathname === "/collections"
    },
    {
      href: "/colors",
      label: "Colores",
      active: location.pathname === "/colors"
    },
    {
      href: "/sizes",
      label: "Tallas",
      active: location.pathname === "/sizes"
    }
  ]
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {routes.map((route) => (
        <Link 
          key={route.href} 
          to={route.href} 
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-black dark:text-white" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}