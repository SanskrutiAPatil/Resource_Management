import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {Navigate} from 'react-router-dom';
import Select from "@mui/material/Select";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { getCookie } from "../../utilities/getCSRF";
import Spinner from "../../components/Spinner";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {user, isUserInfoReady} = useContext(UserContext);
  console.log(user);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(document.cookie);

    const csrfToken = getCookie("csrftoken");

    const response = await axios.post(
      "/adminmonitor/",
      {
        mail: email,
        role: position,
      },
      {
        headers: {
          "X-CSRFToken": csrfToken, 
        },
      }
    );

    alert("User Registered");
    console.log(response);

    setEmail("");
    setName("");
    setPosition("");
  };

  if(!isUserInfoReady){
    return <Spinner />;
  }

  if(isUserInfoReady && !user){
    setRedirect(true);
  }

  if(redirect){
    return <Navigate to="/login" />
  }



  return (
    <>
      <form
        className="flex justify-center justify-items-center"
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className="w-[80%] sm:w-[60%] md:w-[40%] rounded-lg subpixel-antialiased flex justify-items-center gap-3 flex-col justify-center  shadow-sm bg-gray-100 py-12 my-32 md:px-16 sm:px-2 md:mx-32 sm:mx-6 mx-2 ">
          <h2 className="text-center font-normal md:text-4xl text-3xl mb-8">
            Registration Form
          </h2>

          <div className="flex  justify-center">
            <TextField
              id="email"
              label="Email"
              type="email"
              required
              value={email}
              style={{ width: "80%", marginBottom: "20px" }}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div className="flex justify-center w-[80%] mb-6 mx-auto">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Position</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={position}
                label="Position"
                onChange={(event) => setPosition(event.target.value)}
              >
                <MenuItem value={1}>Student</MenuItem>
                <MenuItem value={2}>Club Head</MenuItem>
                <MenuItem value={3}>Teacher</MenuItem>
                <MenuItem value={4}>HOD</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="flex justify-center">
            <TextField
              style={{ width: "80%", marginBottom: "20px" }}
              required
              id="name"
              label="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: "12px", textAlign: "center" }}
            >
              ADD
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
