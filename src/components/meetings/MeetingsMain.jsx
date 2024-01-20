import React from 'react';
import SearchBar from '../SearchBar';
import DayDate from '../DayDate';
import MeetingList from './MeetingList';

const MeetingsMain = ({userType, setUserType}) => {
  return (
    <div className='font-nunito overflow-y-scroll relative h-full w-4/6 p-3 flex flex-col justify-start items-center bg-background-color'>
        <SearchBar />
        <div className='flex flex-row justify-between items-center w-full'>
            <div>
              <DayDate />
            </div>
            {
              userType === 'admin' ? <button className=' bg-blue-700 text-white px-5 py-2'>Create new task</button> : ''
            }
        </div>
      <MeetingList />
    </div>
  )
}

export default MeetingsMain