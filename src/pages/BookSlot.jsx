/* eslint-disable react/prop-types */

import FormInput from '../components/formComponents/formInput';
import { PiArrowRightThin } from "react-icons/pi";
import { IoIosCloseCircle } from "react-icons/io";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi";
import { LuClock3 } from "react-icons/lu";


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import { getCookie } from '../utilities/getCSRF';

import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';

dayjs.extend(utc);

const eightAM = dayjs().set('hour', 8).startOf('hour');
const eightPM = dayjs().set('hour', 20).startOf('hour');




export default function BookSlot({ handleClose, currDateTime, resource }) {

    
    const [startTime, setStartTime] = useState(currDateTime);
    const [endTime, setEndTime] = useState( startTime ? startTime.add(0.5, 'hour') : null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    const getDateTimeReqFmt = (givenObject) => {
        return `${(dayjs(givenObject).utc().add(5, 'hours').add(30, 'minutes')).format('YYYY-MM-DDT HH:mm:ss')}`.replace(' ', '');
    }
    

    const handleBooking = async (event) => {
        try {
            event.preventDefault();

            console.log(startTime, endTime);
            
            const start_time = getDateTimeReqFmt(startTime);
            const end_time = getDateTimeReqFmt(endTime);
            
            console.log(start_time, end_time);
            const csrfToken = getCookie("csrftoken");
            console.log(description);

            if(title === '') alert("Missing Title Field");
            else{
                console.log(startTime, endTime)
                const response = await axios.post(
                    `/resourcedetail/${resource}`,
                    {
                        start_time, 
                        end_time
                    },
                    {
                        headers: {
                        "X-CSRFToken": csrfToken, 
                        },
                    }
                    );
                    console.log(response);
                    response.status === 200 
                        ? enqueueSnackbar("Request Sent Successfully", {variant: 'success'}) 
                        : enqueueSnackbar("Request Failed: " + response.message, {variant: 'error'});
                    handleClose();
            }

        } catch (error) {   
            console.error(error);
        }


    }


    const handleTime = (val) => {
        setStartTime(val);
        setEndTime(val.add(1, 'hour'));
    }


    const newTheme = (theme) =>
        createTheme({
            ...theme,
            components: {
                MuiDateCalendar: {
                    styleOverrides: {
                        root: {
                            color: "#007BFF",
                            borderRadius: 13,
                            borderColor: "#ffffff",
                            backgroundColor: "#ffffff",
                        },
                    },
                },
            },
        });
    return (
        <>
            <div className='form_outerSection'>

                <div className='form_mainCard w-4/5 relative'>
                    <div className='flex justify-end cursor-pointer absolute -top-5 -right-5'>
                        <div className=' text-5xl rounded-full bg-gray-100 text-red-500' onClick={handleClose}><IoIosCloseCircle /></div>
                    </div>

                    <div className="text-center underline underline-offset-4 py-4 subpixel-antialiased md:text-2xl xs:text-1xl lg:text-4xl lg:mb-4 xs:mb-2 xs:mx-2"  >
                        Booking Card
                    </div>

                    <form className='flex  gap-6 flex-wrap justify-between content-center  flex-col '>

                        
                        <FormInput 
                        labelPara="Title" 
                        required={true} 
                        icon={<HiOutlinePencil/>}
                        setTitle={setTitle}
                        />

                        <FormInput 
                        labelPara="Description" 
                        rows={3} 
                        icon={<MdOutlineLibraryBooks/>} 
                        setDescription={setDescription}
                        />



                        <div className='form_inputField justify-center w-full'>
                            <div className='grid grid-cols-2 gap-2 w-full'>
                                <div className=' flex gap-4 w-full'>

                                    <LuClock3 className='text-3xl my-auto mx-auto' />
                                    
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <ThemeProvider theme={newTheme}> 
                                            <DateTimePicker
                                            minTime={eightAM}
                                            maxTime={eightPM}
                                            minDate={dayjs().startOf('day')} 
                                            onChange={val => handleTime(val)} 
                                            label="Start Date Time" 
                                            value={startTime}
                                            />
                                        </ThemeProvider>
                                    </LocalizationProvider>
                                </div>

                                <div className='flex  gap-4 w-full'>    
                                    <PiArrowRightThin className='col-span-1 text-3xl my-auto ' />
                                
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <ThemeProvider theme={newTheme}> 
                                            <DateTimePicker
                                            minTime={eightAM}
                                            maxTime={eightPM}
                                            label="End Date Time" 
                                            value={endTime} 
                                            minDate={dayjs().startOf('day')}
                                            onChange={(val) => setEndTime(val)}
                                            />
                                        </ThemeProvider>
                                    </LocalizationProvider>
                                </div>


                            </div>
                        </div>

                        <div className='flex justify-end'>
                            <button 
                            className="text-md transition-all bg-primary duration-300 text-center hover:scale-105 font-semibold text-white border border-white px-5 text-xl py-3 cursor-pointer rounded-xl "
                                onClick={event => handleBooking(event)}
                                >Book
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}