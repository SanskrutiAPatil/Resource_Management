const days = [
    "Sunday"
    ,"Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]


const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];



export const getMonth = (n) => {
    return months[n];
}

export const getDay = (n) => {
   return days[n];
}