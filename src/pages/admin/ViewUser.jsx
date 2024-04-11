import { useContext, useState } from "react";
import Spinner from "../../components/Spinner";
import { UserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";

const ViewUser = () => {
  const [redirect, setRedirect] = useState(false);
  const { user, isUserInfoReady } = useContext(UserContext);

  // const FIELDS = ["email", "role" ];

  if (!isUserInfoReady) {
    return <Spinner />;
  }

  if (isUserInfoReady && !user) {
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="flex mt-12 flex-row flex-wrap justify-center">
        <table>
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
        </table>
      </div>
    </>
  );
};

export default ViewUser;
