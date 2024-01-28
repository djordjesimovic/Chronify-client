import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SidebarLeft from './SideBarLeft';
import TaskMain from './Task list/TaskMain';
import UsersMain from './users/UsersMain';
import AllTasks from './Task list/AllTasks';
import Create from './Create';

const Home = ({ userType, setUserType, loggedUser, setLoggedUser }) => {

  if (localStorage.getItem('UserLoggedIn' === 'true')) {

  }

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
  const [allTasks, setAllTasks] = useState([]);
  const [allTasksError, setAllTasksError] = useState('');
  const [approvedTasks, setApprovedTasks] = useState([]);
  const [allCompletedTasks, setAllCompletedTasks] = useState([]);



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

  const [openMenuState, setOpenMenuState] = useState('hidden');

  const [assignedToUser, setAssignedToUser] = useState('');


  useEffect(() => {
    filterHandler()
  }, [tasks, filter])

  useEffect(() => {
    if (localStorage.getItem('UserLoggedIn') === 'true') {
      setUserType(localStorage.getItem('UserType'));
      getAllUsers();
      getTasksForLoggedInUser();
      getAllTasks();
    }
    else {
      navigate('/', { replace: true });
    }
  }, [])

  //Function for getting All users
  const getAllUsers = () => {
    fetch('https://x8ki-letl-twmt.n7.xano.io/api:IUDlTwil/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('UserToken')
      },
    })
      .then(res => res.json())
      .then(data => {
        setUsersList(data)
      });
  }

  //Function for getting tasks for logged in user
  const getTasksForLoggedInUser = () => {
    const loggedInUserId = localStorage.getItem('userId');
    fetch(`https://x8ki-letl-twmt.n7.xano.io/api:IUDlTwil/user/${loggedInUserId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('UserToken')
      },
    }).then(res => {
      return res.json();
    })
      .then(data => {
        if (data.status === true) {
          setCompletedTasks([]);
          setTasks([]);
          setTasksInProgress([]);
          setLoggedUser(
            {
              id: data.user.id,
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              email: data.user.email,
              username: data.user.username
            });
          data.user.userTasks.map(task => {
            if (task.taskCompleted === true) {
              return (
                setCompletedTasks((completedTasks) => [...completedTasks, task])
              )
            }
            else if (task.taskInProgress === true) {
              return (
                setTasksInProgress((tasksInProgress) => [...tasksInProgress, task])
              )
            }
            else {
              return (
                setTasks((tasks) => [...tasks, task])
              )
            }
          })
        }
      })
  }

  //Function for getting tasks for all tasks
  const getAllTasks = () => {
    fetch('https://x8ki-letl-twmt.n7.xano.io/api:IUDlTwil/task', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('UserToken')
      },
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.status === true) {
          setAllTasks([]);
          setApprovedTasks([]);
          setAllCompletedTasks([])
          data.tasks.map((task) => {
            if (task.taskCompleted === true && task.taskApproved === false) {
              return (
                setAllCompletedTasks((approvedTasks) => [...approvedTasks, task])
              )
            }
            else if (task.taskCompleted === true && task.taskApproved === true) {
              return (
                setApprovedTasks((tasks) => [...tasks, task])
              )
            }
            else {
              return (
                setAllTasks((tasks) => [...tasks, task])
              )
            }
          })
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
      setFilteredTasks(tasks.filter(task => task.taskImportance === '1'))
    }
    else if (filter === '2') {
      setFilteredTasks(tasks.filter(task => task.taskImportance === '2'))
    }
    else if (filter === '3') {
      setFilteredTasks(tasks.filter(task => task.taskImportance === '3'))
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
            setCurrentTaskDeadline={setCurrentTaskDeadline}
            currentTaskImportance={currentTaskImportance}
            setCurrentTaskImportance={setCurrentTaskImportance}
            getTasksForLoggedInUser={getTasksForLoggedInUser}
            getAllTasks={getAllTasks}

            editingTaskId={editingTaskId}
            setEditingTaskId={setEditingTaskId}

            completedTasks={completedTasks}
            tasksInProgress={tasksInProgress}
            category={category}
            openMenuState={openMenuState}
            setOpenMenuState={setOpenMenuState}
            assignedToUser={assignedToUser}
            setAssignedToUser={setAssignedToUser}
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
              getTasksForLoggedInUser={getTasksForLoggedInUser}
              getAllTasks={getAllTasks}
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
                tasks={tasks}
                setTasks={setTasks}
                setUsersList={setUsersList}
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
                assignedToUser={assignedToUser}
                setAssignedToUser={setAssignedToUser}
              />
              :
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
    </div>
  );
}

export default Home