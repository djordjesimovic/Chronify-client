import React from 'react';
import SearchBar from './SearchBar';
import DayDate from './DayDate';
import task from '../assets/task.png';
import meeting from '../assets/meeting.png';
import user from '../assets/user.png'
import TaskModal from './Task list/TaskModal';
import CreateUser from './users/CreateUser';
import menu from '../assets/menu.png';

const Create = (
    {
        setModalVisible,
        taskModalState,
        setTaskModalState,
        modalVisible,
        tasks,
        setTasks,
        currentTask,
        setCurrentTask,
        currentTaskInfo,
        setCurrentTaskInfo,
        currentTaskDeadline,
        setCurrentTaskDeadline,
        currentTaskImportance,
        setCurrentTaskImportance,
        getTasksForLoggedInUser,
        usersList,
        setUsersList,
        taskAssignedToUser,
        setTaskAssignedToUser,
        createUserModal,
        setCreateUserModal,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        newUserType,
        setNewUserType,
        getAllUsers,
        userModalState,
        setUserModalState,
        editingUserId,
        setEditingUserId,
        editingTaskId,
        setEditingTaskId,
        getAllTasks,
        setOpenMenuState,
        openMenuState
    }
) => {

    const openTaskModal = () => {
        setModalVisible(true);
        setTaskModalState('create');
    }
    const openUserModal = () => {
        setCreateUserModal(true);
        setUserModalState('create')
    }
    const toggleMenu = () => {
        setOpenMenuState('flex')
    }

    return (
        <div className='font-nunito bg-dark-black overflow-y-scroll h-full w-full lg:w-5/6 md:w-full sm:w-full p-3 flex flex-col justify-start items-center relative z-10'>
            {/* <SearchBar /> */}
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
            <div className='flex flex-row flex-wrap w-full justify-center items-center gap-5 mt-24'>
                <div onClick={openTaskModal} className='cursor-pointer w-52 bg-white border-solid border-2 rounded-2xl p-4 flex justify-center items-center flex-col'>
                    <div className='w-1/2 pb-5'>
                        <img src={task} alt='task' />
                    </div>
                    <span className='font-bold'>New Task</span>
                </div>
                {/* <div className='cursor-pointer w-52 border-solid border-2 rounded-2xl p-4 flex justify-center items-center flex-col'>
                <div className='w-1/2 pb-5'>
                    <img src={meeting} alt='task' />
                </div>
                <span className='font-bold'>New Meeting</span>
            </div> */}
                <div onClick={openUserModal} className='cursor-pointer w-52 bg-white border-solid border-2 rounded-2xl p-4 flex justify-center items-center flex-col'>
                    <div className='w-1/2 pb-5'>
                        <img src={user} alt='task' />
                    </div>
                    <span className='font-bold'>New User</span>
                </div>
            </div>
            <TaskModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                tasks={tasks}
                setTasks={setTasks}
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
                currentTaskInfo={currentTaskInfo}
                setCurrentTaskInfo={setCurrentTaskInfo}
                currentTaskDeadline={currentTaskDeadline}
                setCurrentTaskDeadline={setCurrentTaskDeadline}
                currentTaskImportance={currentTaskImportance}
                setCurrentTaskImportance={setCurrentTaskImportance}
                usersList={usersList}
                setUsersList={setUsersList}
                taskAssignedToUser={taskAssignedToUser}
                setTaskAssignedToUser={setTaskAssignedToUser}
                taskModalState={taskModalState}
                setTaskModalState={setTaskModalState}
                getTasksForLoggedInUser={getTasksForLoggedInUser}
                editingTaskId={editingTaskId}
                setEditingTaskId={setEditingTaskId}
                getAllTasks={getAllTasks}
            />
            <CreateUser
                createUserModal={createUserModal}
                setCreateUserModal={setCreateUserModal}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                newUserType={newUserType}
                setNewUserType={setNewUserType}
                getAllUsers={getAllUsers}
                userModalState={userModalState}
                setUserModalState={setUserModalState}
                editingUserId={editingUserId}
                setEditingUserId={setEditingUserId}
            />
        </div>
    )
}

export default Create