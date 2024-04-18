/* eslint-disable react/prop-types */

import FormInput from '../components/formComponents/formInput';
import { PiArrowRightThin } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
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
import { eightAM, eightPM, isValidBooking } from '../utilities/valid';

dayjs.extend(utc);




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
                        
            const start_time = getDateTimeReqFmt(startTime);
            const end_time = getDateTimeReqFmt(endTime);
    
            const csrfToken = getCookie("csrftoken");


            if(title === '' || description === ""){ 
                enqueueSnackbar('Title & Description are required', {
                    variant: 'warning', 
                    anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'}
                });
            }else{
                if(isValidBooking(startTime, endTime)){
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
                        if(response.data.status === 200){
                            enqueueSnackbar(response.data.message, {variant: 'success'}) 
                            handleClose();
                        } else
                            enqueueSnackbar(response.data.message, {variant: 'error'});
                }else{
                    console.log('Invalid Booking');
                }
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
            <div className='form_outerSection '>

                <div className='flex p-8 flex-wrap justify-center content-center flex-col rounded-lg bg-gray-100 m-2  w-[80%] sm:w-[70%] max-w-[800px] md:w-[80%] relative '>
                    <div className='flex justify-end cursor-pointer absolute -top-5 -right-5'>
                        <div className=' text-4xl rounded-full w-fit bg-red-500 p-1 text-gray-100' onClick={handleClose}><IoCloseOutline /></div>
                    </div>

                    <div className="text-center mb-4 hidden sm:block  underline-offset-4 py-4 subpixel-antialiased text-3xl "  >
                        Booking Card
                    </div>

                    <form className='flex  gap-6 justify-between content-center  flex-col '>

                        
                        <FormInput 
                        labelPara="Title" 
                        required={true} 
                        icon={<HiOutlinePencil/>}
                        setTitle={setTitle}
                        />

                        <FormInput 
                        labelPara="Description" 
                        required={true}
                        rows={3} 
                        icon={<MdOutlineLibraryBooks/>} 
                        setDescription={setDescription}
                        />



                        <div className=' justify-center w-full'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full '>
                                <div className=' flex gap-4 w-full mb-4'>

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
                                            minutesStep={30}
                                            />
                                        </ThemeProvider>
                                    </LocalizationProvider>
                                </div>

                                <div className='flex  gap-4 w-full mb-4'>    
                                    <PiArrowRightThin className='col-span-1 text-3xl my-auto ' />
                                
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <ThemeProvider theme={newTheme}> 
                                            <DateTimePicker
                                            minTime={startTime ? startTime.add(30, 'minutes') : eightAM}
                                            maxTime={eightPM}
                                            minDate={startTime ? startTime.startOf('day') : dayjs().startOf('day')}
                                            maxDate={startTime ? startTime.endOf('day') : null}
                                            label="End Date Time" 
                                            value={endTime} 
                                            minutesStep={30}
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