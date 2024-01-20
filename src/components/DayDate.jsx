import React from 'react';
import { currDay, currMonth, currYear, currDayName } from '../utils/Date';

const DayDate = () => {
  return (
    <div>
        <h2 className='font-nunito text-3xl font-bold text-white'>{currDayName}</h2>
        <span className='font-nunito font-bold text-sm text-white'>{currMonth} {currDay}. {currYear}.</span>
    </div>
  )
}

export default DayDate