/* eslint-disable react/prop-types */
import TextField from '@mui/material/TextField';
// import Button from "../components/Button";
import Button from '@mui/material/Button';
// import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CloseIcon from '@mui/icons-material/Close';


export default function ChangePassword({closeModalChangePass}){
    return (<>
        
        <div >
            
            <form className='flex flex-col gap-6' action="">
                <div className='flex justify-end relative' >
                    <span className='bg-red-500 absolute -top-3 -right-3 rounded-full text-white hover:bg-red-600' >
                    <CloseIcon   onClick={closeModalChangePass} style={{padding:"4px"  , fontSize:"30px" , borderTopRightRadius: '10px'}}/>
                    </span>
                </div>
            
                <div className='flex justify-center'>
                    <TextField
                        label="Old Password"
                    />
                </div>

                <div className=' flex justify-center'>
                    <TextField
                        label="New Password"
                    />
                </div>

                <div className=' flex justify-center'>
                    <TextField
                        label="Re-enter new Password"
                    />
                </div>
                <div className=' flex justify-center'>
                    <Button variant="contained" style={{ backgroundColor: "rgb(107 114 128)" }} >Change</Button>
                </div>

            </form>
            
        </div>
        
    </>
    )
}