import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from "axios";
import {Navigate} from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import Navbar from '../components/Navbar';



const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await axios.post('/login/', {
                email, password
            })
            console.log(data);
            if(data.status === 200){
                enqueueSnackbar("Login Successful", {variant: 'success'}) 
                setRedirect(true);
            }else 
                enqueueSnackbar(`Login Failed ${data.message}`, {variant: 'error'}, {autoHideDuration: 2000})
        } catch (error) {
            console.error(error);
        }
    }

    if(redirect) {
        return <Navigate to="/" />
    }


    return (
        <>
        <Navbar/>
        <form className='flex justify-center justify-items-center' > 


            <div className=' rounded-lg subpixel-antialiased flex flex-col justify-center justify-items-center shadow-lg bg-gray-50 py-12 my-32 max-w-[500px]  md:w-[70%] border sm:w-5/6 w-5/6'>

                <div className='text-center font-normal md:text-4xl text-3xl mb-16'>Login
                </div>


                <div className='flex justify-center'>
                    <TextField
                        id="email"
                        label="Email"
                        required
                        value={email}
                        style={{ width: "60%", marginBottom: "20px" }}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div className='flex justify-center'>
                    <TextField
                        style={{ width: "60%", marginBottom: "12px" }}
                        required
                        type="password"
                        id="password"
                        label="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <div className='subpixel-antialiased mb-2 text-blue-500 flex justify-center'>
                    <div style={{ width: "60%" }}>
                        <a href="#" >Forget Passswod?</a>
                    </div>
                </div>

                <div className='flex justify-center mt-4'>
                    <button onClick={(e) => handleSubmit(e)} className="text-md transition-all duration-300 text-center  font-semibold text-white border border-white px-4 py-2 cursor-pointer rounded-xl bg-primary w-[100px] " >Login</button>                
                </div>

            </div>

        </form>
        </>
    );
}

export default Login