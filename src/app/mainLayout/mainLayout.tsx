import { Outlet } from "react-router-dom"
import { Header } from "./components/header"

export const Mainlayout = () => {
  return (
    <>
      <Header />
      <section className="flex-col">
        <div className="felx-1 space-x-4 p-8 pt-6">
          <Outlet />
        </div>
      </section>
    </>
  )
}