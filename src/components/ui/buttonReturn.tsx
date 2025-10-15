import { useNavigate } from "react-router-dom"
import { Button } from "./button"
import { ArrowLeft} from "lucide-react"

interface ButtonReturnProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  isLoading?: boolean
  label?: string
}

export const ButtonReturn = ({
  variant = "default",
  size = "icon",
  isLoading = false,
}: ButtonReturnProps) => {
  const navigate = useNavigate()

  const handleReturn = () => {
    navigate(-1)
  }
  return (
    <Button
      variant={variant}
      size={size}
      disabled={isLoading}
      onClick={handleReturn}
    >
      <ArrowLeft />
    </Button>
  )
}