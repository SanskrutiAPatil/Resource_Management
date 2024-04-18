/* eslint-disable react/prop-types */
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

function EditProfile( {data , closeModal}) {
    console.log(data);
    return (<>
        
        {/* <div>Hola!</div> */}
        <div >
            
            <form action="">
                <div className='flex justify-end relative' >
                    <span className='bg-red-500 absolute -top-3 -right-3 rounded-full text-white hover:bg-red-600' >
                    <CloseIcon   onClick={closeModal} style={{padding:"4px"  , fontSize:"30px" , borderTopRightRadius: '10px'}}/>
                    </span>
                </div>
            
                <div className='my-6 flex justify-center'>
                    <TextField
                        // id="outlined-helperText"
                        label="User Name"
                        defaultValue="User Name"
                    // helperText="Some important text"
                    />
                </div>

                <div className='mb-6 flex justify-center'>
                    <TextField
                        // id="outlined-helperText"
                        label="Organization"
                        defaultValue="Organization"
                    // helperText="Some important text"
                    />
                </div>

                <div className=' flex justify-center'>
                    <Button variant="contained" style={{ backgroundColor: "rgb(107 114 128)" }} >Edit</Button>
                </div>

            </form>
            
        </div>
        
    </>
    )
}

export default EditProfile;