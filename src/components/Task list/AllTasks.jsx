import React from 'react';
import SearchBar from '../SearchBar';
import DayDate from '../DayDate';
import Task from './Task';
import TaskModal from './TaskModal';
import menu from '../../assets/menu.png'

const AllTasks = (
  {
    allTasks,
    setAllTasks,
    allTasksError,
    setAllTasksError,
    setEditingTaskId,
    getTasksForLoggedInUser,
    getAllTasks,
    setModalVisible,
    setTaskModalState,
    modalVisible,
    currentTask,
    setCurrentTask,
    currentTaskInfo,
    setCurrentTaskInfo,
    currentTaskDeadline,
    setCurrentTaskDeadline,
    currentTaskImportance,
    setCurrentTaskImportance,
    usersList,
    taskAssignedToUser,
    setTaskAssignedToUser,
    taskModalState,
    editingTaskId,
    category,
    approvedTasks,
    setApprovedTasks,
    allCompletedTasks,
    setAllCompletedTasks,
    openMenuState,
    setOpenMenuState
  }
) => {

  const toggleMenu = () => {
    setOpenMenuState('flex')
  }

  return (
    <div className='font-nunito bg-dark-black overflow-y-scroll h-full w-full lg:w-5/6 md:w-full sm:w-full p-3 flex flex-col justify-start items-center relative z-10'>
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
        <div className='overflow-y-scroll w-full sm:w-full md:w-1/3 lg:w-1/3 h-64 sm:h-64 md:h-full lg:h-full p-4 flex flex-col justify-start items-center bg-white gap-4'>
          <span className='text-sm font-bold'>Active Tasks</span>
          <div className='flex flex-col justify-start items-center h-100 w-full p-4 gap-3 overflow-x-scroll px-4'>
            {
              allTasks.length > 0 ?
                allTasks.map((task) => {
                  return (
                    <Task
                      key={task.taskId}
                      tasks={allTasks}
                      setTasks={setAllTasks}
                      task={task}
                      setEditingTaskId={setEditingTaskId}
                      getTasksForLoggedInUser={getTasksForLoggedInUser}
                      getAllTasks={getAllTasks}
                      setModalVisible={setModalVisible}
                      setTaskModalState={setTaskModalState}
                      category={category}
                      usersList={usersList}
                    />
                  )
                }) : <span>{allTasksError}</span>
            }
          </div>
        </div>
        <div className='overflow-y-scroll w-full sm:w-full md:w-1/3 lg:w-1/3 h-64 sm:h-64 md:h-full lg:h-full p-4 flex flex-col justify-start items-center bg-white gap-4'>
          <span className='text-sm font-bold'>Approval tasks</span>
          <div className='flex flex-col justify-start items-center h-100 w-full p-4 gap-3 overflow-x-scroll px-4'>
            {
              allCompletedTasks.length > 0 ?
                allCompletedTasks.map((task) => {
                  return (
                    <Task
                      key={task.taskId}
                      tasks={allTasks}
                      setTasks={setAllTasks}
                      task={task}
                      setEditingTaskId={setEditingTaskId}
                      getTasksForLoggedInUser={getTasksForLoggedInUser}
                      getAllTasks={getAllTasks}
                      setModalVisible={setModalVisible}
                      setTaskModalState={setTaskModalState}
                      category={category}
                      usersList={usersList}
                    />
                  )
                }) : <span>{allTasksError}</span>
            }
          </div>
        </div>
        <div className='overflow-y-scroll w-full sm:w-full md:w-1/3 lg:w-1/3 h-64 sm:h-64 md:h-full lg:h-full p-4 flex flex-col justify-start items-center bg-white gap-4'>
          <span className='text-sm font-bold'>Approved tasks</span>
          <div className='flex flex-col justify-start items-center h-100 w-full p-4 gap-3 overflow-x-scroll px-4'>
            {
              approvedTasks.length > 0 ?
                approvedTasks.map((task) => {
                  return (
                    <Task
                      key={task.taskId}
                      tasks={allTasks}
                      setTasks={setAllTasks}
                      task={task}
                      setEditingTaskId={setEditingTaskId}
                      getTasksForLoggedInUser={getTasksForLoggedInUser}
                      getAllTasks={getAllTasks}
                      setModalVisible={setModalVisible}
                      setTaskModalState={setTaskModalState}
                      category={category}
                      usersList={usersList}
                    />
                  )
                }) : <span>{allTasksError}</span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllTasks