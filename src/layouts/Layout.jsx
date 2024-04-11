import { Outlet} from "react-router-dom"
import Footer from "../components/Footer"

const Layout = () => {
  return (
    <div className="px-4 md:px-20">
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout