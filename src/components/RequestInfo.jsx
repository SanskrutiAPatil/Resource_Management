/* eslint-disable react/prop-types */
import { getCookie } from '../utilities/getCSRF';
import ReqFieldItem from './ReqFieldItem';
import axios from 'axios';

const RequestInfo = ({request, setReload}) => {

    const permitRequest = async (id) =>{
        try{
            const csrfToken = getCookie("csrftoken");
            const res = await axios.get(
                `/grant/${id}`, 
                {
                    headers: {
                    "X-CSRFToken": csrfToken, 
                    },
                }
        )
            setReload(prev => !prev);
            console.log(res);
        }catch(error){
            console.log(error);
        }
      }
    
      const denyRequest = async (id) =>{
        try{
            const csrfToken = getCookie("csrftoken");
            const res = await axios.get(
                `/deny/${id}`,
                {
                    headers: {
                    "X-CSRFToken": csrfToken, 
                    },
                }
        )
            setReload(prev => !prev);
            console.log(res);
        }catch(error){
            console.log(error);
        }
      }
    

    const reqInfoFields = ["title", "Request by", "Date", "Timing", "Resource", "organization"];

    return (
        <div className="p-4 rounded-xl bg-slate-100 grid grid-cols-4 gap-5 mb-6">

            <div className="col-span-3">
                <div className="grid grid-cols-2 gap-6 p-4">
                        

                        {
                            reqInfoFields.map((field, index) => (
                            <div key={index} className=" text-lg">
                                    
                                <ReqFieldItem label={field.charAt(0).toUpperCase() + field.slice(1)} value={request[field] ? request[field] : "Default" } />
                                    
                            </div>  
                            ))
                        }
                    
                </div>
        </div>

        <div className="flex flex-col gap-2 pb-4 justify-end content-end">
                <button onClick={() => permitRequest(request['booking_id'])} className="text-md transition-all duration-300 text-center  font-semibold text-white border border-white px-4 py-2 cursor-pointer rounded-xl bg-green-500 hover:bg-green-600 hover:text-white" >Permit</button>
                <button onClick={() => denyRequest(request['booking_id'])} className="text-md transition-all duration-300 text-center  font-semibold text-white border border-white px-4 py-2 cursor-pointer rounded-xl bg-red-500 hover:bg-red-600 hover:text-white" > Deny</button>
        </div>
        
</div>
    )
}

export default RequestInfo