import { useSession } from "@/features/auth/useSession"
import { supabase } from "@/lib/supabaseClient"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { LogOut } from "lucide-react"

export const  UserButton = () => {
  const { user } = useSession()

  const logout = async () => {
    await supabase.auth.signOut()
  }

  if (!user) return null
  return (

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
        >
          <Avatar className="h-10 w-10 ">
            <AvatarImage src={user.user_metadata.avatar_url} />
            <AvatarFallback className="rounded-lg">
              {user.user_metadata.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {/* <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {user.user_metadata.name || user.user_metadata.full_name || 'No name'}
            </span>
            <span className="text-muted-foreground truncate text-xs">
              {user.email}
            </span>
          </div>
          <EllipsisVertical className="ml-auto size-4" /> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="end"
        sideOffset={4}>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata.name} />
              <AvatarFallback className="rounded-lg">
                {user.user_metadata.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.user_metadata.name}</span>
              <span className="text-muted-foreground truncate text-xs">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Other elements here */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}