/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const Button = ({name, to="", className=""}) => {
  return (
    <Link to={to} className={"text-md transition-all duration-300 text-white text-center hover:scale-105 font-semibold  border border-white px-4 py-2 cursor-pointer " + className + " rounded-xl "} >
        {name}
    </Link>
  )
}

export default Button