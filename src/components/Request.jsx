/* eslint-disable react/prop-types */
import { TextField } from "@mui/material"
import Button from "../components/Button"

const Request = () => {
  return (
    <>
      <div className="p-2 bg-slate-100 grid grid-cols-4 gap-5 mt-6 mb-12 rounded-md">

        <div className="lg:col-span-3 col-span-4">

          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 p-4">
            {/* 1 */}
            <div className=" text-lg mb-2">
              <TextField
                style={{ width: "95%" }}
                id="outlined-read-only-input"
                label="Title"
                defaultValue="Expert Session on TOC"
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  style: { fontSize: '22px' , paddingLeft :'8px' , paddingRight :'12px' , backgroundColor: 'rgb(241 245 249) ' } // Adjust the font size as needed
                }}
              /></div>

            {/* 2 */}
            <div className=" text-lg mb-2">
              <TextField
                style={{ width: "95%" }}
                id="outlined-read-only-input"
                label="By"
                defaultValue="John doe"
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  style: { fontSize: '22px' , paddingLeft :'8px' , paddingRight :'12px' , backgroundColor: 'rgb(241 245 249) ' } // Adjust the font size as needed
                }}
              /></div>


            {/* 3 */}
            <div className=" text-lg mb-2">
              <TextField
                style={{ width: "95%" }}
                id="outlined-read-only-input"
                label="Date"
                defaultValue="31 feb 2024"
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  style: { fontSize: '22px' , paddingLeft :'8px' , paddingRight :'12px' , backgroundColor: 'rgb(241 245 249) ' } // Adjust the font size as needed
                }}
              /></div>

            {/* 4 */}
            <div className=" text-lg mb-2">
              <TextField
                style={{ width: "95%" }}
                id="outlined-read-only-input"
                label="Timing"
                defaultValue="2pm-4pm"
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  style: { fontSize: '22px' , paddingLeft :'8px' , paddingRight :'12px' , backgroundColor: 'rgb(241 245 249) ' } // Adjust the font size as needed
                }}
              /></div>


            {/* 5 */}
            <div className="text-lg mb-2">
              <TextField
                style={{ width: "95%" }}
                id="outlined-read-only-input"
                label="Resourse"
                defaultValue="Comp Seminar Hall"
                InputProps={{
                  readOnly: true,
                }}

                InputLabelProps={{
                  style: { fontSize: '22px' , paddingLeft :'8px' , paddingRight :'12px' , backgroundColor: 'rgb(241 245 249) ' } // Adjust the font size as needed
                }}

              /></div>

            {/* 6 */}
            <div className=" text-lg mb-2">
              <TextField
                style={{ width: "95%" }}
                id="outlined-read-only-input"
                label="Organization"
                defaultValue="Individual"
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  style: { fontSize: '22px' , paddingLeft :'8px' , paddingRight :'12px' , backgroundColor: 'rgb(241 245 249) ' } // Adjust the font size as needed
                }}

              /></div>

            {/* <div className=" text-lg">Title: Expert Session on TOC</div>
<div className=" text-lg">By: John Doe</div>
<div className=" text-lg">Date: 23 Feb, 24</div>
<div className=" text-lg">Timing: 02pm - 04pm</div>
<div className=" text-lg">Resource: IT Seminar Hall</div>
<div className=" text-lg">Organization: Individual</div> */}
          </div>

        </div>


        <div className="flex flex-wrap justify-left content-end col-span-1 pb-4">
          <Button name="Permit" to="" className="bg-green-500 mb-2 lg:w-3/5 md:w-4/5 xs:w-full" />
          <Button name="Deny" to="" className="bg-red-500 lg:w-3/5 md:w-4/5 xs:w-full" />
        </div>
      </div>
    </>

  )
}

export default Request