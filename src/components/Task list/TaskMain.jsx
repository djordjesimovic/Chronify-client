import React, { useState } from 'react';
import TaskList from './TaskList';
import SearchBar from '../SearchBar';
import DayDate from '../DayDate';
import TaskModal from './TaskModal';
import menu from '../../assets/menu.png'

const Main = (
      {
        tasks, 
        setTasks, 
        filteredTasks,
        modalVisible, 
        setModalVisible, 
        openEditModal, 
        setOpenEditModal, 
        userType, 
        setUserType,
        usersList,
        setUsersList,
        taskAssignedToUser,
        setTaskAssignedToUser,
        taskModalState,
        setTaskModalState,
        getTasksForLoggedInUser,
        editingTaskId,
        setEditingTaskId,
        getAllTasks,
        completedTasks,
        tasksInProgress,
        category,
        openMenuState,
        setOpenMenuState
      }) => {
  
  const [currentTask, setCurrentTask] = useState('');
  const [currentTaskInfo, setCurrentTaskInfo] = useState('');
  const [currentTaskDeadline, setCurrentTaskDeadline] = useState('');
  const [currentTaskImportance, setCurrentTaskImportance] = useState('1');
  // const [editingTaskId, setEditingTaskId] = useState('');

  const openModal = () => {
    setModalVisible(true);
    setTaskModalState('create')
  }
  const toggleMenu = () => {
    setOpenMenuState('flex')
  }

  // const getUserInfo = () => {
  //   const userToken = localStorage.getItem('UserToken')
  //   //console.log(userToken)
  //   fetch('http://localhost:5000/getuser', {
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${localStorage.getItem('UserToken')}`
  //     },
  //     // body : JSON.stringify({

  //     // })
  //   }).then(res => res.json()).then(data => console.log(data))
  // }


  return (
    <div className='overflow-y-scroll font-nunito bg-dark-black h-full w-full lg:w-5/6 md:w-full sm:w-full p-3 flex flex-col justify-start items-center relative z-10'>
      {/* <input className='w-full px-3 py-1 rounded-2xl outline-0 mb-5 bg-slate-200' type="text" placeholder='Search' /> */}
      {/* <div className='flex flex-row justify-center items-center w-full mb-5 gap-3'>
        <div className='flex lg:hidden md:flex sm:flex'>
          <button>
            <img src={menu} alt='menu' />
          </button>
        </div>
        <SearchBar />
      </div> */}
      <div className='flex flex-row justify-between items-center w-full p-3'>
        <div className='flex lg:hidden md:flex sm:flex'>
          <button onClick={toggleMenu}>
            <img src={menu} alt='menu' />
          </button>
        </div>
        <div>
          <DayDate />
        </div>
      </div>
      <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row justify-around items-start w-full p-4 gap-3 mt-5'>
        <div className='w-full sm:w-full md:w-1/3 lg:w-1/3 h-64 sm:h-64 md:h-full lg:h-full py-4 flex flex-col justify-start items-center bg-white'>
          <span className='text-sm font-bold'>Active Tasks</span>
          <TaskList 
            tasks={tasks} 
            setTasks={setTasks} 
            filteredTasks={filteredTasks}
            setEditingTaskId={setEditingTaskId}
            getTasksForLoggedInUser={getTasksForLoggedInUser}
            setTaskModalState={setTaskModalState}
            setModalVisible={setModalVisible}
            getAllTasks={getAllTasks}
            category={category}
            usersList={usersList}
          />
        </div>
        <div className='w-full sm:w-full md:w-1/3 lg:w-1/3 h-64 sm:h-64 md:h-full lg:h-full py-4 flex flex-col justify-start items-center bg-white'>
          <span className='text-sm font-bold'>Tasks in Progress</span>
          <TaskList 
            tasks={tasks} 
            setTasks={setTasks} 
            filteredTasks={tasksInProgress}
            setEditingTaskId={setEditingTaskId}
            getTasksForLoggedInUser={getTasksForLoggedInUser}
            setTaskModalState={setTaskModalState}
            setModalVisible={setModalVisible}
            getAllTasks={getAllTasks}
            category={category}
            usersList={usersList}
          />
        </div>
        <div className='w-full sm:w-full md:w-1/3 lg:w-1/3 h-64 sm:h-64 md:h-full lg:h-full py-4 flex flex-col justify-start items-center bg-white'>
          <span className='text-sm font-bold'>Completed Tasks</span>
          <TaskList 
            tasks={tasks} 
            setTasks={setTasks} 
            filteredTasks={completedTasks}
            setEditingTaskId={setEditingTaskId}
            getTasksForLoggedInUser={getTasksForLoggedInUser}
            setTaskModalState={setTaskModalState}
            setModalVisible={setModalVisible}
            getAllTasks={getAllTasks}
            category={category}
            usersList={usersList}
          />
        </div>
      </div>
    </div>
  )
}

export default Main