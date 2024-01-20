import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SidebarLeft from './SideBarLeft';
import SidebarRight from './SideBarRight';
import TaskMain from './Task list/TaskMain';
import MeetingsMain from './meetings/MeetingsMain';
import UsersMain from './users/UsersMain';
import AllTasks from './Task list/AllTasks';
import AllMeetings from './meetings/AllMeetings';
import Create from './Create';

const Home = ({ userType, setUserType, loggedUser, setLoggedUser }) => {

   const navigate = useNavigate();

  //States for tasks and categories
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('tasks');
  const [modalVisible, setModalVisible] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [taskAssignedToUser, setTaskAssignedToUser] = useState('');
  const [taskModalState, setTaskModalState] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [tasksInProgress, setTasksInProgress] = useState([]);

  //All tasks for admin
  const[allTasks, setAllTasks] = useState([]);
  const[allTasksError, setAllTasksError] = useState('');
  const[approvedTasks, setApprovedTasks] = useState([]);
  const[allCompletedTasks, setAllCompletedTasks] = useState([]);



  const [currentTask, setCurrentTask] = useState('');
  const [currentTaskInfo, setCurrentTaskInfo] = useState('');
  const [currentTaskDeadline, setCurrentTaskDeadline] = useState('');
  const [currentTaskImportance, setCurrentTaskImportance] = useState('1');
  const [editingTaskId, setEditingTaskId] = useState('');

  //States for users
  const [createUserModal, setCreateUserModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newUserType, setNewUserType] = useState('user');
  const [usersList, setUsersList] = useState([]);
  const [userModalState, setUserModalState] = useState('');
  const [editingUserId, setEditingUserId] = useState('');

  const[openMenuState, setOpenMenuState] = useState('hidden');


  useEffect(() => {
    filterHandler()
  }, [tasks, filter])

  useEffect(() => {
    setUserType(localStorage.getItem('UserType'));
    getAllUsers();
    getTasksForLoggedInUser();
    getAllTasks();
  }, [])

  const checkUserLogIn = () => {
    if(localStorage.getItem('UserLoggedIn') !== 'true') {
    navigate('/', { replace: true });
    }
  }


  //Function for getting All users
  const getAllUsers = () => {
    fetch('http://localhost:5000/getAllUsers')
      .then(res => res.json())
      .then(data => {
        setUsersList(data.users)
      });
  }

  //Function for getting tasks for logged in user
  const getTasksForLoggedInUser = () => {
    const loggedInUserId = localStorage.getItem('userId');
    fetch(`http://localhost:5000/tasks/${loggedInUserId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then(data => {
      if(data.status === true) {
        //If request is good first empty both arrays and then map over the array from response and make two arrays
        setCompletedTasks([]);
        setTasks([]);
        setTasksInProgress([]);
        data.tasks.map(task => {
          if(task.taskCompleted === 1) {
            return (
              setCompletedTasks((completedTasks) => [...completedTasks, task])
            )
          }
          else if(task.taskInProgress === 1) {
            return(
              setTasksInProgress((tasksInProgress) => [...tasksInProgress, task])
            )
          }
          else {
            return  (
              setTasks((tasks) => [...tasks, task])
            )
          }
      })
      }
    })
  }

  //Function for getting tasks for all users
  const getAllTasks = () => {
    fetch('http://localhost:5000/tasks')
    .then(res => res.json())
    .then(data => {
      if(data.status === true) {
        setAllTasks([]);
        setApprovedTasks([]);
        setAllCompletedTasks([])
        data.tasks.map((task) => {
          if(task.taskCompleted === 1 && task.taskApproved === 0) {
            return(
              setAllCompletedTasks((approvedTasks) => [...approvedTasks, task])
            )
          }
          else if(task.taskCompleted === 1 && task.taskApproved === 1) {
            return(
              setApprovedTasks((tasks) => [...tasks, task])
            )
          }
          else {
            return(
              setAllTasks((tasks) => [...tasks, task])
            )
          }
        })
      }
      else {
        setAllTasksError(data.message);
      }
    })
  }


  //Function for filtering tasks
  const filterHandler = () => {
    if (filter === 'completed') {
      setFilteredTasks(tasks.filter(task => task.taskCompleted === 1))
    }
    else if (filter === 'uncompleted') {
      setFilteredTasks(tasks.filter(task => task.taskCompleted === 0))
    }
    else if (filter === 'all') {
      setFilteredTasks(tasks);
    }
    else if (filter === '1') {
      setFilteredTasks(tasks.filter(task => task.taskImportance === 1))
    }
    else if (filter === '2') {
      setFilteredTasks(tasks.filter(task => task.taskImportance === 2))
    }
    else if (filter === '3') {
      setFilteredTasks(tasks.filter(task => task.taskImportance === 3))
    }
  }

  return (
    <div className='flex flex-row justify-center items-center h-full w-full m-0 p-0 relative'>
      <SidebarLeft
        tasks={tasks}
        setTasks={setTasks}
        filter={filter}
        setFilter={setFilter}
        category={category}
        setCategory={setCategory}
        openMenuState={openMenuState}
        setOpenMenuState={setOpenMenuState}
        usersList={usersList}
        loggedUser={loggedUser}
      />
      {
        category === 'tasks' ?
          <TaskMain
            tasks={tasks}
            setTasks={setTasks}
            filteredTasks={filteredTasks}
            setFilteredTasks={setFilteredTasks}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            openEditModal={openEditModal}
            setOpenEditModal={setOpenEditModal}
            userType={userType}
            setUserType={setUserType}
            usersList={usersList}
            setUsersList={setUsersList}
            taskAssignedToUser={taskAssignedToUser}
            setTaskAssignedToUser={setTaskAssignedToUser}
            taskModalState={taskModalState}
            setTaskModalState={setTaskModalState}

            currentTask={currentTask}
            setCurrentTask={setCurrentTask}
            currentTaskInfo={currentTaskInfo}
            setCurrentTaskInfo={setCurrentTaskInfo}
            currentTaskDeadline={currentTaskDeadline}
            currentTaskImportance={currentTaskImportance}
            getTasksForLoggedInUser={getTasksForLoggedInUser}
            getAllTasks={getAllTasks}

            editingTaskId={editingTaskId}
            setEditingTaskId={setEditingTaskId}

            completedTasks={completedTasks}
            tasksInProgress={tasksInProgress}
            category={category}
            openMenuState={openMenuState}
            setOpenMenuState={setOpenMenuState}
          /> :
            category === 'meetings' ?
              <MeetingsMain 
                userType={userType} 
                setUserType={setUserType} 
              />
            :
            category === 'users' ?
              <UsersMain
                userType={userType}
                setUserType={setUserType}
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
                usersList={usersList}
                setUsersList={setUsersList}
                getAllUsers={getAllUsers}
                userModalState={userModalState}
                setUserModalState={setUserModalState}
                editingUserId={editingUserId}
                setEditingUserId={setEditingUserId}
                openMenuState={openMenuState}
                setOpenMenuState={setOpenMenuState}
              /> 
              :
              category === 'allTasks' ?
              <AllTasks 
                allTasks={allTasks} 
                setAllTasks={setAllTasks} 
                allTasksError={allTasksError} 
                setAllTasksError={setAllTasksError} 
                setEditingTaskId={setEditingTaskId}
                getTasksForLoggedInUser={getTasksForLoggedInUser}
                getAllTasks={getAllTasks}
                setModalVisible={setModalVisible}
                setTaskModalState={setTaskModalState}

                modalVisible={modalVisible}
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
                currentTaskInfo={currentTaskInfo}
                setCurrentTaskInfo={setCurrentTaskInfo}
                currentTaskDeadline={currentTaskDeadline}
                setCurrentTaskDeadline={setCurrentTaskDeadline}
                currentTaskImportance={currentTaskImportance}
                setCurrentTaskImportance={setCurrentTaskImportance}
                usersList={usersList}
                taskAssignedToUser={taskAssignedToUser}
                setTaskAssignedToUser={setTaskAssignedToUser}
                taskModalState={taskModalState}
                editingTaskId={editingTaskId}
                category={category}
                approvedTasks={approvedTasks}
                setApprovedTasks={setApprovedTasks}
                allCompletedTasks={allCompletedTasks}
                setAllCompletedTasks={setAllCompletedTasks}
                openMenuState={openMenuState}
                setOpenMenuState={setOpenMenuState}
              /> 
              : 
              category === 'allMeetings' ?
              <AllMeetings /> : 
              category === 'new' ? 
              <Create 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setTaskModalState={setTaskModalState}
                tasks={tasks}
                setTasks={setTasks}
                filteredTasks={filteredTasks}
                setFilteredTasks={setFilteredTasks}
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
                currentTaskInfo={currentTaskInfo}
                setCurrentTaskInfo={setCurrentTaskInfo}
                currentTaskDeadline={currentTaskDeadline}
                setCurrentTaskDeadline={setCurrentTaskDeadline}
                currentTaskImportance={currentTaskImportance}
                setCurrentTaskImportance={setCurrentTaskImportance}
                getTasksForLoggedInUser={getTasksForLoggedInUser}
                editingTaskId={editingTaskId}
                setEditingTaskId={setEditingTaskId}

                usersList={usersList}
                setUsersList={setUsersList}
                taskAssignedToUser={taskAssignedToUser}
                setTaskAssignedToUser={setTaskAssignedToUser}
                taskModalState={taskModalState}
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
                getAllUsers={getAllUsers}
                userModalState={userModalState}
                setUserModalState={setUserModalState}
                editingUserId={editingUserId}
                setEditingUserId={setEditingUserId}
                setNewUserType={setNewUserType}
                newUserType={newUserType}
                getAllTasks={getAllTasks}
                openMenuState={openMenuState}
                setOpenMenuState={setOpenMenuState}
              /> : null

      }
      {/* <SidebarRight /> */}
    </div>
  );
}

export default Home