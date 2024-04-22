/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ReqFieldItem from "./ReqFieldItem";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { getCookie } from "../utilities/getCSRF";


const ProgressBar = ({ steps, request, setRequestUpdate}) => {

  const cancelRequest = async () => {
    console.log("Request Cancelled" + request['booking_id']);
    const res = await axios.get(`/deny/${request['booking_id']}`, { headers: { "X-CSRFToken": getCookie("csrftoken") } });

    if(res.status === 200){
      enqueueSnackbar("Request Cancelled", { variant: "success" });
      setRequestUpdate((prev) => !prev);
    }else{
      enqueueSnackbar(res.data.message, { variant: "error" });
    }
  }

  return (
    <div className="flex flex-col gap-6  items-start justify-center  mx-auto bg-gray-100 rounded-2xl w-[99%] sm:w-[70%] md:[60%] py-8 px-4">
        <div className="mx-auto w-[80%] justify-between flex gap-4">
          <div className="flex gap-4 h-[60px]">
              <ReqFieldItem label={"Resource"} value={request["Resource"]} />
              <ReqFieldItem label={"Date"} value={request["Date"]}/>
              <ReqFieldItem label={"Timing"} value={request["Timing"]}/>
          </div>
          <button className="text-md my-auto transition-all duration-300 text-center hover:scale-105 font-semibold text-white bg-red-500  border border-white px-4 py-2 cursor-pointer rounded-xl "
            onClick={cancelRequest}
          >cancel</button>
        </div>
        <div className="w-full mx-auto border-t pt-8 mt-4" >
        <Box sx={{ width: "100%", color: "rgb(0 123 255 / var(--tw-text-opacity))" }} >
          <Stepper activeStep={request.index + 1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        </div>
      </div>
  );
};

export default ProgressBar;
