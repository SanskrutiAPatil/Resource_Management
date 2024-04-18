import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";

export const eightAM = dayjs().set('hour', 8).startOf('hour');
export const eightPM = dayjs().set('hour', 20).startOf('hour');

export const isValidBooking = (startDateTime, endDateTime) => {
    if(startDateTime.date() !== endDateTime.date()){
        enqueueSnackbar('Start Date and End Date should be on the same day', {
            variant: 'warning', 
            anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'}
        });
        return false;
    }else if(startDateTime.hour() < eightAM.hour() || endDateTime.hour() > eightPM.hour()){
        enqueueSnackbar('Booking should be between 8AM and 8PM', {
            variant: 'error', 
            anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'}
        });
        return false;
    }       
    else if(startDateTime.isBefore(dayjs().startOf('minute')) || endDateTime.isBefore(dayjs().startOf('minute'))){
        enqueueSnackbar('End time should be more than start time', {
            variant: 'warning', 
            anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'}
        });
        return false;
    }else if(startDateTime.isAfter(endDateTime)){
        enqueueSnackbar('Start Time should be before End Time', {
            variant: 'warning', 
            anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'}
        });
        return false;
    }else if(endDateTime.diff(startDateTime, 'minutes') < 30){
        enqueueSnackbar('Booking should be for atleast 30 minutes', {
            variant: 'warning', 
            anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'}
        });
        return false;
    }else
        return true;
}