import React, { useState, useEffect } from 'react';
import Delete from '../../assets/delete.png';
import Edit from '../../assets/edit.png';
import Complete from '../../assets/complete.png';
import { currDay, currMonth, currYear } from '../../utils/Date';

const Task = (
    {
      task, 
      tasks, 
      setTasks, 
      setEditingTaskId,
      getTasksForLoggedInUser,
      setModalVisible,
      setTaskModalState,
      getAllTasks,
      category,
      usersList
    }
  ) => {
  

  const completeTaskHandler = () => {
    fetch(`http://localhost:5000/tasks/${task.taskId}/complete`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers you need (e.g., authorization token)
      },
    }).then(res => res.json()).then(data => {
      if(data.status === true) {
        alert(data.message);
        getTasksForLoggedInUser();
        getAllTasks();
      }
      else {
        alert(data.message);
      }
    })
  }

  const deleteTaskHandler = () => {
    // setTasks(tasks.filter(el => el.taskId !== task.taskId))
    fetch(`http://localhost:5000/tasks/${task.taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers you need (e.g., authorization token)
      },
    })
    .then(res => res.json()).then(data => {
      if(data.status === true) {
        alert(data.message);
        getTasksForLoggedInUser();
        getAllTasks();
      }
      else {
        alert(data.message)
      }
    })
  }

  const editTaskHandler = () => {
     setModalVisible(true);
     setTaskModalState('edit');
     setEditingTaskId(task.taskId)
    // console.log(editingTaskId)
  }

  const inProgressHandler = () => {
    fetch(`http://localhost:5000/tasks/${task.taskId}/toggle-progress`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers you need (e.g., authorization token)
      },
    }).then(res => res.json()).then(data => {
      if(data.status === true) {
        getTasksForLoggedInUser();
        getAllTasks();
      }
    })
  }

  const approveTaskHandler = () => {
    fetch(`http://localhost:5000/tasks/${task.taskId}/approve`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers you need (e.g., authorization token)
      },
    }).then(res => res.json()).then(data => {
      if(data.status === true) {
        getTasksForLoggedInUser();
        getAllTasks();
        alert(data.message);
      }
      else {
        alert(data.message);
      }
    })
  }

  const originalDate = new Date(task.taskDeadline);
  const formattedDate = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1).toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')}`;

  const originalTaskCreateDate = new Date(task.taskDate);
  const formatedOriginalTaskCreateDate = `${originalTaskCreateDate.getFullYear()}-${(originalTaskCreateDate.getMonth() + 1).toString().padStart(2, '0')}-${originalTaskCreateDate.getDate().toString().padStart(2, '0')}`;

  const [assignedToUser, setAssignedToUser] = useState('');

  const setUserForTask = () => {
    const userForTask = usersList.filter(user => user.userId === task.userId)
    setAssignedToUser(userForTask[0].username)
  }

  useEffect(() => {
    setUserForTask()
  }, [])

  return (
    <div className='w-full'>
      <div className={`border-solid border rounded-2xl relative flex align-center justify-between flex-col w-full px-6 py-3 text-black ${task.taskCompleted === 1 && category !== 'allTasks' ? "bg-slate-400" : task.taskImportance === 1 ? "bg-high-importance" : task.taskImportance === 2 ? "bg-mid-importance" : task.taskImportance === 3 ? "bg-low-importance" : ""}`}>
        <div className='flex flex-row justify-between w-full'>
          <div className='flex flex-col gap-3'>
            <h1 className={`text-base font-bold ${task.taskCompleted === 1 && category !== 'allTasks' ? "line-through" : ""}`}>{task.task}</h1>
            <h3 className='text-sm'>{task.taskInfo}</h3>
            <span className='text-sm'>Deadline: {formattedDate}</span>
            <div>
              <span className='text-sm'>Importance: </span>
              <span className={`${task.taskImportance === 1 ? "text-red-600" : task.taskImportance === 2 ? "text-amber-600" : task.taskImportance === 3 ? "text-green-600" : ""} font-bold`}>{task.taskImportance}</span>
            </div>
          </div>
          {
            task.taskCompleted !== 1 && task.taskInProgress !== 1 ?
            <div className='flex flex-col items-center justify-evenly p-3'>
              <button className={`${localStorage.getItem('UserType') === 'admin' ? "flex" : "hidden"}`} onClick={editTaskHandler}><img src={Edit}  alt='Edit Button' className='w-4'/></button>
              {/* <button onClick={completeTaskHandler}><img src={Complete}  alt='Complete Button' className='w-4'/></button> */}
              <button className={`${localStorage.getItem('UserType') === 'admin' ? "flex" : "hidden"}`} onClick={deleteTaskHandler}><img src={Delete}  alt='Delete Button' className='w-4'/></button>
            </div> : ''
          }
        </div>
        <div className='mt-3'>
          <span className='text-sm text-left mt-3 mr-1'>
            Assigned to:
          </span>
          <span className='text-sm font-bold text-left mt-3'>{assignedToUser}</span>
        </div>
        <span className='text-xs font-bold text-left mt-3'>Created on: {formatedOriginalTaskCreateDate}</span>
        {
          task.taskCompleted !== 1 && task.taskInProgress !== 1 && category !== 'allTasks' ?
          <div className='bg-yellow-400 flex flex-row justify-between items-center w-full mt-3'>
            <button onClick={inProgressHandler} className='px-2 py-2 bg-amber-300 text-white font-bold uppercase text-sm'>Start Task</button>
            <button onClick={completeTaskHandler} className='bg-lime-300 px-2 py-2 text-white font-bold uppercase text-sm'>Complete Task</button>
          </div> : task.taskInProgress === 1 ? 
          <div className='bg-yellow-400 flex flex-row justify-between items-center w-full mt-3'>
            <button onClick={inProgressHandler} className='px-2 py-2 bg-amber-300 text-white font-bold uppercase text-sm'>Pause Task</button>
            <button onClick={completeTaskHandler} className='bg-lime-300 px-2 py-2 text-white font-bold uppercase text-sm'>Complete Task</button>
          </div> : ''
        }
        {
          task.taskCompleted === 1 && task.taskApproved === 0 && category === 'allTasks' ?
          <button onClick={approveTaskHandler} className='bg-lime-300 px-2 py-2 mt-4 text-white font-bold uppercase text-sm'>Approve Task</button> : null
        }
        {
          task.taskCompleted === 1 && task.taskApproved === 1 && category !== 'allTasks' ? 
          <span className='font-bold text-sm text-lime-300 mt-3'>Task approved</span> : null
        }
      </div>
    </div>
  )
}

export default Task