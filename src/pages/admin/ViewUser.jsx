import { useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { UserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Navbar from "../../components/Navbar";


const ViewUser = () => {
  const [redirect, setRedirect] = useState(false);
  const { user, isUserInfoReady } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(null);
  // const FIELDS = ["email", "role" ];

  useEffect(() => {
    if(isUserInfoReady && user && user["userDetails"] && user["userDetails"].is_admin){
      setIsAdmin(true);
    }
  }, [isAdmin, isUserInfoReady, user]);

  
  if (isAdmin === null || !isUserInfoReady) {
    return <Spinner />;
  }
  if(!isAdmin){
    return <Navigate to="/" />
  }
  
  if(isUserInfoReady && user && user["userDetails"] && user["userDetails"].is_admin !== true){
    setRedirect(true);
  }
  if (isUserInfoReady && !user) {
    setRedirect(true);
  }


  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <>

      <Navbar/>

      <div className="flex mt-12 flex-row flex-wrap justify-center">


        {/* <table>
          <tr className="border" >
            <th className="border" >Company</th>
            <th className="border" >Contact</th>
            <th className="border" >Country</th>
          </tr>
          <tr className="border" >
            <td className="border" >Alfreds Futterkiste</td>
            <td className="border" >Maria Anders</td>
            <td className="border" >Germany</td>
          </tr>
          <tr className="border" >
            <td className="border" >Centro comercial Moctezuma</td>
            <td className="border" >Francisco Chang</td>
            <td className="border" >Mexico</td>
          </tr>
        </table> */}

        <table >

          <caption className="text-5xl p-4">Principle</caption>
          <tr>
            <th className="thElement">Index</th>
            <th className="thElement">Email</th>
            <th className="thElement">action</th>
          </tr>
          <tr>
            <td className="tdElement text-center">1</td>
            <td className="tdElement text-center px-16">abc@gmail.com</td>
            <td className="tdElement text-center"> <Button variant="contained" color="error" size="small">Delete</Button> </td>
          </tr>

          <tr>
            <td className="tdElement text-center">1</td>
            <td className="tdElement text-center px-16">abc@gmail.com</td>
            <td className="tdElement text-center">  <Button variant="contained" color="error" size="small">Delete</Button>   </td>
          </tr>

        </table>

      </div>
    </>
  );
};

export default ViewUser;
