
import RequestInfo from "../components/RequestInfo";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner"
import axios from "axios";
import { getCookie } from "../utilities/getCSRF";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Requests = () => {

  const [requests, setRequests] = useState(null);
  const [reload, setReload] = useState(false);
  const [login, setLogin] = useState(getCookie("csrftoken"));

  
  useEffect(() => {
    setRequests(null);
    axios
    .get('/pendingrequest/')
    .then((res) => {
        const {data} = res;
        setRequests(data.data);
        setLogin(getCookie("csrftoken"));
        console.log(data.data);
        console.log("fetched requests....");
      })
      .catch((err) => {
        console.log(err);
      });
    },[reload, login]);
    
    if(login === ""){
      return <Navigate to="/login" />
    }


  return (
    <>
      <Navbar/>
      <div className="h-full flex content-center justify-center">

        <div className="p-2 m-2 w-9/12">

          {!requests && 
            <Spinner/>
          }

          { requests && requests.length !== 0 &&
            requests.map((request, index) => (
              <RequestInfo  key={index} request={request} setReload={setReload} />
            ))
          }

          {requests && !requests.length && 
            <div className="flex justify-center items-center">
              <h2 className="text-5xl font-bold text-[#ec4464]" >All Done... <br />No Requests</h2>
              <img className="" src="images/no-req-img.avif" alt="No Requests" />
            </div>
          }
        
        </div>

      </div>
    </>
  )
}

export default Requests