import { IoCall } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className=" -mx-4 md:-mx-20 bg-primary rounded-t-xl h-60 mt-28 relative flex justify-center ">
        <div className="bg-secondary w-[72%] h-full md:h-[90%] rounded-xl border absolute -top-20 flex-col flex md:flex-row justify-around md:items-center p-4">
            <div className="text-primary text-3xl text-center flex flex-col items-center gap-2">
                <IoCall />
                <h4 className="text-white">1234567890</h4>
            </div>
            <div className="border h-full"></div>
            <div className="text-primary text-3xl text-center flex flex-col items-center gap-2">
                <FaLocationDot/>
                <h4 className="text-white">A3-305</h4>
            </div>
            <div className="border h-full"></div>
            <div className="text-primary text-3xl text-center flex flex-col items-center gap-2">
                <MdEmail/>
                <h4 className="text-white">johndoe@gmail.com</h4>
            </div>
        </div>
        
        <div className="-mx-[10px] absolute bottom-10">
            <h1 className="text-md decoration-1 font-semibold text-white ">&copy; 2024 PICT.EDU. All Rights Reserved</h1>
            <div className="-mx-6 border-t-white border mt-1"></div>
        </div>

    </div>
  )
}

export default Footer