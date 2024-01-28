import React from 'react'
import Task from './Task';

const TaskList = (
    {
      tasks, 
      setTasks, 
      filteredTasks, 
      setEditingTaskId,
      getTasksForLoggedInUser,
      setModalVisible,
      setTaskModalState,
      getAllTasks,
      category, 
      usersList,
      assignedToUser,
      setAssignedToUser,
      currentTask,
      setCurrentTask,
      currentTaskInfo,
      setCurrentTaskInfo,
      currentTaskDeadline,
      currentTaskImportance,
      setCurrentTaskImportance,
      setCurrentTaskDeadline
    }
  ) => {
  filteredTasks.sort((a, b) => {
    return (a.taskImportance - b.taskImportance);
  })
  return (
    <div className='flex flex-col justify-start items-center h-100 w-full p-4 gap-3 overflow-x-scroll px-4'>
      {
        filteredTasks.length > 0 ? filteredTasks.map((task) => 
          <Task 
            key={task.id} 
            task={task} 
            tasks={tasks} 
            setTasks={setTasks}
            setEditingTaskId={setEditingTaskId} 
            getTasksForLoggedInUser={getTasksForLoggedInUser}
            setModalVisible={setModalVisible}
            setTaskModalState={setTaskModalState}
            getAllTasks={getAllTasks}
            category={category}
            usersList={usersList}
            assignedToUser={assignedToUser}
            setAssignedToUser={setAssignedToUser}
            currentTask={currentTask}
            setCurrentTask={setCurrentTask}
            currentTaskInfo={currentTaskInfo}
            setCurrentTaskInfo={setCurrentTaskInfo}
            currentTaskDeadline={currentTaskDeadline}
            setCurrentTaskDeadline={setCurrentTaskDeadline}
            currentTaskImportance={currentTaskImportance}
            setCurrentTaskImportance={setCurrentTaskImportance}
          />
        ) : <span className='font-roboto text-xs font-bold'>No Tasks</span>
      }
    </div>
  )
}

export default TaskList