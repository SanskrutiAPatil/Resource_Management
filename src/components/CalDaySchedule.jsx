import dayjs from 'dayjs';
import '../index.css';



/* eslint-disable react/prop-types */
const CalDaySchedule = ({ date, day, times, month, bookedSlots , handleOpen, setCurrDateTime, dateObj}) => {
// this render column on screen

console.log(bookedSlots);

  const clickHandler = (e) => {
    const {id} = e.target;
    var currDate = dayjs(dateObj).set('hour', (+id/2)+7).startOf('hour');
    if((+id) % 2) currDate = currDate.add(30, 'minute');
    setCurrDateTime(currDate);
    handleOpen();
  }


  const createDivs = (num , handleClick)  => {
    // this function return array of cell of length 25
    const div = [];
    for (let i = 1; i <= num; i++) {
      // this loop puch 25 sub div in main div array  

      let flagIsBlocked = false 
      if(bookedSlots){
        for(let i1 = 0 ; i1 < bookedSlots.length ; i1++){
          if( bookedSlots[i1].endTime >= i && bookedSlots[i1].startTime <= i && bookedSlots[i1].startDate === date && month === bookedSlots[i1].month){
            flagIsBlocked = true ;
            break ;
          }
        }
      } 
      // above code block iterate array and find out that wheather slot is booked or not 

      div.push(
        <>
          {/* this is a code for single cell */}

          <div
            id={i}
            onClick={i == 1 || flagIsBlocked  ?  null : handleClick }
            // onClick={ console.log(flagIsBlocked + "this print flagIsBlocked ") }
            
            // this handle onclick action on cell

            className={
              " border-b even:border-dotted  last:border-b-0 text-center text-xl font-medium pt-[6px] text-black first:bg-gray-200 border-gray-600 relative  " +
              (times && " pt-0 bg-gray-200 ") +
              (i == 1 ? " h-16 " : " h-10 ")+
              ((!times && i != 1) && "  hover:bg-gray-100  ")
            }
            key={i}
          >
            
            {/* <div>{flagIsBlocked+ "1"}</div> */}
            {i === 1 && (
              <div className="flex flex-col gap-[2px] items-start px-2">
                <h3 className="sm:hidden md:block">{date}</h3>
                <h6 className="text-md  ">{day}</h6>
              </div>
            )}
            {/* above block handle 1 row of header of column */}


            {times && i % 2 === 0 && <h3 className='-mt-2'>{times[i]}</h3>}
            {/* this is used for handle 0th index row  */}

            {/* {!times && i === 14 && <div className="absolute h-[120px] w-[90%] rounded-xl left-1 opacity-70 bg-blue-400 z-10 top-0" ></div>} */}

            




            {
            bookedSlots &&
            bookedSlots.map((slot, index) =>
              slot.endTime >= i && slot.startTime <= i && slot.startDate === date && month === slot.month ?  (
                // (flagIsBlocked = true)
                <div
                  onClick={() => console.log("Clicked")}
                  key={index}
                  className={
                    " booked_slot " +
                    ((slot.startTime !== i || slot.endTime !== i ) && " h-[102%] ")+
                    (slot.startTime === i && " h-[98%] mt-[2px] border-b-red-200 rounded-t-md ") +
                    (slot.endTime === i && " h-[98%] mb-[2px] rounded-b-md ")
                  }
                >
                  {slot.startTime == i && <div className='text-sm text-center truncate text-gray-800'>~ {slot.bookedBy}</div>}
                  
                </div>
              )            :       null
            )
            
            }
            {/* above code block handle logic for ccoloring booked slot */}




          </div>
        </>
      );
    }
    return div;
  };
  const divs = createDivs(25 , clickHandler);
  return <div>{divs}</div>;
};

export default CalDaySchedule;
