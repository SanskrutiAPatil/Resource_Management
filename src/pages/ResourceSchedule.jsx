/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import CalDaySchedule from "../components/CalDaySchedule";
import { getDay } from "../utilities/dateUtils";
import { time } from "../assets/Times";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import utc from "dayjs/plugin/utc";


import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider } from "@emotion/react";
import { createTheme, duration } from "@mui/material/styles";
import axios from "axios";

import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";


import BookSlot from './BookSlot.jsx'

// modal
import Modal from '@mui/material/Modal';
import { getCookie } from "../utilities/getCSRF.js";
import { getTimeIndex } from "../utilities/timeUtils.js";
import Navbar from "../components/Navbar.jsx";


dayjs.extend(utc);


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 4,
};




const ResourceSchedule = () => {

  const [open, setOpen] = useState(false);
  const [currDateTime, setCurrDateTime] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { resName } = useParams();
  const [currDate, setCurrDate] = useState(dayjs());
  const [daysToDisplay, setDaysToDisplay] = useState(7);
  const [bookedSlots, setBookedSlots] = useState(null);
  const [some, setSome] = useState(null);

  const [booking, setBooking] = useState(null);


  useEffect(() => {

    
      const csrftoken = getCookie('csrftoken');
      axios
        .put(
          `/resourcedetail/${resName.replace(/ /g, '')}`,
          {
            "date": currDate.format("YYYY-MM-DD"),
          },
          {
            headers: {
              "X-CSRFToken": csrftoken,
            }
          }
        )
        .then((response) => {
          setBooking(response.data.bookings);
        })
        .catch((error) => {
          console.log(error);
        });


  }, [currDate, resName]);

  const arr = [];

  

  if(booking){
    booking.map((book) => {
        const dateStartTime = dayjs.utc(book.start_time);
        const dateEndTime = dayjs.utc(book.end_time);
        const startTime = dateStartTime.format('HH:mm'); // Get the time in hours
        const endTime = dateEndTime.format('HH:mm'); // Get the time in hours

        const booked = {
          startTime: getTimeIndex(startTime),
          endTime: getTimeIndex(endTime) -1,
          startDate: dateStartTime.date(),
          endDate: dateEndTime.date(),
          month: dateEndTime.month(),
          bookedBy: book.booked_by,
        }
        arr.push(booked)
        console.log(booked);


    });
    console.log(arr);
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

  const getWeek = (currentDate) => {
    const week = [];
    for (
      let i = currentDate.date();
      i < currentDate.date() + daysToDisplay;
      i++
    ) {
      week.push(currentDate.date(i));
    }
    for(let i = 0; i < 7; i++) {
    console.log(week[i].date());
    }
    return week;
  };


  const getNextWeek = () => {
    setCurrDate((prev) => prev.date(prev.date() + 7));
  };

  const getPrevWeek = () => {
    console.log(currDate.diff(dayjs(), 'day'));
    if (currDate.diff(dayjs(), 'day') >= 6) {
      setCurrDate((prev) => prev.date(prev.date() - 7));
    } else {
      setCurrDate(dayjs());
    }
  };

  const bookings = [
    {
      bookedBy: "Prasanna Pande",
      Position: "VC",
      Title: "Conducting SIG's for First Year",
      startDate: 6,
      endDate: 6,
      startTime: 9,
      endTime: 9,
      month: 3
    },
    {
      bookedBy: "Prasanna Pande",
      Position: "VC",
      Title: "Conducting SIG's for First Year",
      startDate: 7,
      endDate: 7,
      startTime: 13,
      endTime: 16,
      month: 3
    },
    {
      bookedBy: "Prasanna Pande",
      Position: "VC",
      Title: "Conducting SIG's for First Year",
      startDate: 8,
      endDate: 8,
      startTime: 4,
      endTime: 5,
      month: 3
    }
    ,    {
      bookedBy: "Prasanna Pande",
      Position: "VC",
      Title: "Conducting SIG's for First Year",
      startDate: 9,
      endDate: 9,
      startTime: 4,
      endTime: 10,
      month: 3
    }
    ,    {
      bookedBy: "Prasanna Pande",
      Position: "VC",
      Title: "Conducting SIG's for First Year",
      startDate: 9,
      endDate: 9,
      startTime: 12,
      endTime: 15,
      month: 3
    }
  ];

  return (
    <>
      <Navbar/>
      <div className="mt-8 flex gap-8 items-center justify-between">
        
        <div className="flex gap-8 items-center">
          <div className="flex gap-2">
            <button
              className="text-primary text-5xl  rounded-md"
              onClick={() => {
                getPrevWeek();
              }}
            >
              <FaRegArrowAltCircleLeft />
            </button>

            <button
              className="text-primary text-5xl  rounded-md"
              onClick={() => {
                getNextWeek();
              }}
            >
              <FaRegArrowAltCircleRight />
            </button>
          </div>

          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ThemeProvider theme={newTheme}>
                <DatePicker
                  disablePast
                  label={`Check Availability of ${resName}`}
                  value={currDate}
                  onChange={(date) => setCurrDate(date.date(date.date() - 3))}
                  defaultValue={currDate}
                />
              </ThemeProvider>
            </LocalizationProvider>
          </div>
        </div>

        <div>
          <h1 className="text-3xl underline  font-semibold">{resName}</h1> 
        </div>

      </div>

      <div className="w-full mt-8 border rounded-md overflow-hidden border-gray-600 grid grid-cols-8">
        <CalDaySchedule times={time } />
        {getWeek(currDate).map((day) => (
          <div
            key={`${day.format("YYYY-MM-DD HH:mm:ss")}`}
            className="border-l border-gray-600 "
          >
            <CalDaySchedule 
            key={`${day.format("YYYY-MM-DD HH:mm:ss")}`} 
            bookedSlots={arr} 
            dateObj={day} 
            month={day.get('month')} 
            year={day.get('year')} 
            date={day.date()} 
            day={getDay(day.day())} 
            handleOpen={handleOpen} 
            handleClose={handleClose}
            setCurrDateTime={setCurrDateTime} />
          </div>
        ))}
      </div>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BookSlot resource={resName} currDateTime={currDateTime} handleClose={handleClose} />
      </Modal>

    </>
  );
};

export default ResourceSchedule;
