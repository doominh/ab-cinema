import { Fragment } from "react"
import Header from "@/components/layouts/Header"
import { Outlet } from "react-router-dom"

const Main = () => {
  return (
    <Fragment>
      <Header></Header>
      <Outlet></Outlet>
    </Fragment>
  )
}

export default Main
