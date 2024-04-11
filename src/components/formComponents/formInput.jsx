/* eslint-disable react/prop-types */
import TextField from '@mui/material/TextField';

export default function FormInput({ labelPara, defaultPara = "" , typePara="text", rows, required=false, icon, setTitle, setDescription}) {
    const handleChange = (val) => {
        setTitle ? setTitle(val) : setDescription(val);
        console.log(val);
    }
    return (
        <div className='flex justify-center items-center gap-4 w-full'>
            <div className='text-3xl '>
            {icon && icon}
            </div>
            <TextField
                onChange={val => handleChange(val.target.value) }
                style={{ width: "100%" }}
                required={required}
                id="outlined-required"
                label={labelPara}
                defaultValue={defaultPara}
                type = {typePara}
                multiline = {rows ? true : false}
                rows={rows}
            />

        </div>
    )
}