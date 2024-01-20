
const date = new Date();
const currentDay = date.getDate();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();

const day= new Date().getDay() //return 0 to 6
const weekday= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturaday'];
const month= ["January","February","March","April","May","June","July","August","September","October","November","December"];
const currDay = currentDay;
const currMonth = month[currentMonth];
const currYear = currentYear;
const currDayName = weekday[day];


export {date, currDay, currMonth, currYear, currDayName, currentDay, currentMonth, currentYear};