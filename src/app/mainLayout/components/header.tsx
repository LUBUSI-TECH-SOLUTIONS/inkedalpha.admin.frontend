import { MainNav } from "@/components/mainNav"
import { UserButton } from "@/components/userButton"

export const Header = () => {
  return (
    <section className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6"/>
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </section>
  )
}