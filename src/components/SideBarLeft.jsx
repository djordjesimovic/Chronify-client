import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/finalLogo.png';
import myTasksWhite from '../assets/myTasksWhite.png';
import allUsersWhite from '../assets/allUsersWhite.png';
import allTasksWhite from '../assets/allTasksWhite.png';
import newWhite from '../assets/newWhite.png';
import logout from '../assets/logout.png'

const SideBarLeft = ({filter, setFilter, category, setCategory, openMenuState, setOpenMenuState, usersList, loggedUser}) => {

  const [userInitial, setUserInitial] = useState('');

  const navigate = useNavigate();

  const [subMenu, setSubMenu] = useState(false);

  const openMenu = () => {
    setSubMenu(!subMenu);
    setCategory('tasks');
  }

  const toggleMenu = () => {
    setOpenMenuState('hidden')
  }

  const Logout = () => {
    localStorage.removeItem('UserLoggedIn');
    localStorage.removeItem('UserToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('UserType');
    navigate('/', { replace: true})
  }

  const setUserForTask = () => {
    const userForTask = usersList.filter(user => user.userId === localStorage.getItem('userId'))
    console.log(userForTask)
    //setUserInitial(userForTask[0].firstName.charAt(0))
  }

  useEffect(() => {
    setUserForTask()
  }, [])

  return (
    <div className={`overflow-y-scroll h-full w-56 sm:w-56 md:w-56 lg:w-1/6 p-2 pt-7 font-nunito ${openMenuState} lg:flex md:${openMenuState} sm:${openMenuState} flex-col justify-between absolute sm:absolute md:absolute lg:relative top-0 left-0 z-20 bg-light-black`}>
      <button onClick={toggleMenu} className='text-white absolute top-2 right-2 flex sm:flex md:flex lg:hidden'>X</button>
      <div className='w-full flex flex-col items-start'>
        {/* <div className='w-full flex justify-center items-center mb-7 overflow-scroll'>
          <img src={logo} alt='Logo' className='w-1/2' />
        </div> */}
        <div className='w-full flex justify-center items-center flex-col gap-2 p-3 mb-4'>
          <span className='flex justify-center items-center w-14 h-14 bg-purple p-5 text-3xl text-white font-bold border border-transparent rounded-full'>{loggedUser.firstName ? loggedUser.firstName.charAt(0) : 'U'}</span>
          <span className='text-white font-bold text-sm'>@{loggedUser.username ? loggedUser.username : 'username'}</span>
        </div>
        <div className='flex flex-col justify-between items-start gap-6 p-3 w-full'>
          <div onClick={openMenu} className={`cursor-pointer flex flex-row justify-start gap-2 items-center px-3 py-2 border border-transparent rounded-md ${category === 'tasks' ? 'bg-purple' : 'bg-transparent'} w-full`}>
            <img src={myTasksWhite} alt='icon'/>
            <span className={`text-base font-bold text-white`}>My Tasks</span>
          </div>
          <div className={`${subMenu ? "flex flex-col justify-between gap-2 text-sm px-6 -mt-4" : "hidden"}`}>
            <span onClick={() => setFilter('all') } className='cursor-pointer text-white text-sm font-bold'>- All</span>
            <span onClick={() => setFilter('1')} className='cursor-pointer text-white text-sm font-bold'>- High Priority</span>
            <span onClick={() => setFilter('2')} className='cursor-pointer text-white text-sm font-bold'>- Mid Priority</span>
            <span onClick={() => setFilter('3')} className='cursor-pointer text-white text-sm font-bold'>- Low Priority</span>
          </div>
          <div onClick={() => {setCategory('users'); setSubMenu(false)}} className={`cursor-pointer flex flex-row justify-start gap-2 items-center px-3 py-2 border border-transparent rounded-md ${category === 'users' ? 'bg-purple' : 'bg-transparent'} w-full`}>
            <img src={allUsersWhite} alt='icon'/>
            <span className={`text-base font-bold text-white`}>Users</span>
          </div>
          <div onClick={() => {setCategory('allTasks'); setSubMenu(false) }} className={`${localStorage.getItem('UserType') === 'admin' ? "cursor-pointer flex flex-row justify-start gap-2 items-center px-3 py-2 border border-transparent rounded-md" : "hidden"} ${category === 'allTasks' ? 'bg-purple' : 'bg-transparent'} w-full`}>
            <img src={allTasksWhite} alt='icon'/>
            <span className={`text-base font-bold text-white`}>All Tasks</span>
          </div>
          <div onClick={() => {setCategory('new'); setSubMenu(false)}} className={`${localStorage.getItem('UserType') === 'admin' ? "cursor-pointer flex flex-row justify-start gap-2 items-center px-3 py-2 border border-transparent rounded-md" : "hidden"} ${category === 'new' ? 'bg-purple' : 'bg-transparent'} w-full`}>
            <img src={newWhite} alt='icon'/>
            <span className={`text-base font-bold text-white`}>New</span>
          </div>
        </div>
      </div>

      <div className='w-full flex flex-col items-start'>
        {/* <div className='flex justify-between items-center w-full flex-row pb-4'>
          <button className='flex justify-center items-center'><img src={light} alt="light-icon" className='w-1/4' /></button>
          <button className='flex justify-center items-center'><img src={dark} alt="dark-icon" className='w-1/4' /></button>
        </div> */}
        <div className='flex flex-row justify-start gap-2 items-center px-3 py-2 border border-transparent rounded-md'>
          <img src={logout} alt='logout' />
          <button className='font-bold text-white' onClick={Logout}>Logout</button>
        </div>
      </div>

    </div>
  )
}

export default SideBarLeft