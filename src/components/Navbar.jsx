/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import Button from "./Button"
import { getCookie } from "../utilities/getCSRF"
import { useContext, useEffect, useState} from "react"
import { UserContext } from "../context/userContext";
import Spinner from "./Spinner";

const Navbar = () => {
  const title = "Resource Management Portal"
  const [login, setLogin] = useState(null);
  const [reqLinkStatus, setReqLinkStatus] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const {user, isUserInfoReady} = useContext(UserContext)

  
  useEffect(() => {
    if(getCookie("csrftoken") !== ""){
      setLogin(true);
    } else {
      setLogin(false);
    }

    if(isUserInfoReady && user && user["userDetails"] && user["userDetails"].Role === 0){
      setReqLinkStatus(true);
    }
    
    if(isUserInfoReady && user && user["userDetails"] && user["userDetails"].is_admin){
      setIsAdmin(true);
    }
    
    console.log(user);
    
  }, [login, isUserInfoReady, user]);
  
  if (!isUserInfoReady) {
    return <Spinner />;
  }
  

  return (
    <>
    <header className="bg-primary h-16  lg:h-[73px] -mx-4 md:-mx-20 px-4 md:px-20 flex justify-center items-center rounded-b-xl">
        <nav className="flex items-center justify-between w-full">
            
            <Link to={'/'}>
                <img
                    className="h-16" 
                    src="/logo/pict-logo.png" 
                    alt="logo of pict" />
            </Link>

            <div className="-mx-[10px] hidden md:block">
                <h1 className="text-2xl decoration-1 font-semibold text-white ">{title}</h1>
                <div className="-mx-6 border-t-white border mt-1"></div>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
                {/* <p className="text-xl text-white">Add User</p>
                <p className="text-xl text-white">View Users</p> */}
                <Button to="/" className="hover:shadow-lg hover:text-primary hover:bg-white" name="Home"/>
                <Button to="/admin/add" className={"hover:shadow-lg hover:text-primary hover:bg-white" + (isAdmin ? "" : " hidden ")} name="Add"/>
                <Button to="/admin/view" className={"hover:shadow-lg hover:text-primary hover:bg-white" + (isAdmin ? "" : " hidden ")} name="View"/>
                <Button to={login ? "/requests" : "/login"} className={"hover:shadow-lg hover:text-primary hover:bg-white " + (reqLinkStatus && " hidden ")} name="Requests" />
                <Button to={login ? "/profile" : "/login"} className={"hover:shadow-lg hover:text-primary hover:bg-white "} name="Profile" />
                <Button to={login ? "/" : "/login"} name="Login"  className={"hover:shadow-lg hover:bg-white hover:text-primary hover:underline hover:outline-none " + (!login ? "" : "hidden ")}/>
            </div>
            
        </nav>
    </header>

    </>
  )
}

export default Navbar