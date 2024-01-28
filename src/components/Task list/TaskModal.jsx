import React, { useState } from 'react';

const TaskModal = (
    {
        modalVisible,
        setModalVisible,
        currentTask,
        setCurrentTask,
        currentTaskInfo,
        setCurrentTaskInfo,
        currentTaskDeadline,
        setCurrentTaskDeadline,
        currentTaskImportance,
        setCurrentTaskImportance,
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
        assignedToUser,
        setAssignedToUser
    }
) => {

    const [errorMsg, setErrorMsg] = useState('');
    const [assignedUserId, setAssignedUserId] = useState('');
    const [taskCreated, setTaskCreated] = useState(false);

    const closeModal = () => {
        setModalVisible(false);
        setAssignedUserId('');
        setTaskAssignedToUser('');
        setCurrentTask('');
        setCurrentTaskInfo('');
        setCurrentTaskDeadline('');
        setCurrentTaskImportance('1');
        setErrorMsg('');
        setTaskCreated(null);
        setEditingTaskId('');
    }

    const handleTask = () => {

        if (currentTask === '' || currentTaskDeadline === '' || currentTaskImportance === '') {
            setErrorMsg("Please insert all data correct");
            setTaskCreated(false)
        }
        else {
            if (taskModalState === 'create') {
                fetch('https://x8ki-letl-twmt.n7.xano.io/api:IUDlTwil/task', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('UserToken')
                    },
                    body: JSON.stringify(
                        {
                            user_id: taskAssignedToUser, // Replace with the actual user ID
                            task: currentTask,
                            taskInfo: currentTaskInfo,
                            taskDeadline: currentTaskDeadline, // Replace with the actual deadline
                            taskImportance: currentTaskImportance,
                            taskCompleted: false,
                            taskInProgress: false,
                            taskApproved: false
                        }
                    ),
                })
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    if(data.status && data.status === true) {
                        setCurrentTask('');
                        setCurrentTaskInfo('');
                        setCurrentTaskDeadline('');
                        setCurrentTaskImportance('1');
                        setErrorMsg(data.message);
                        setAssignedUserId('');
                        setTaskCreated(true);
                        setTaskAssignedToUser('');
                        getTasksForLoggedInUser();
                        getAllTasks();
                    }
                    else {
                        setTaskCreated(false);
                        setErrorMsg(data.message);
                    }
                })
            }
            else if (taskModalState === 'edit') {
                //Ima mali problem sa osvezavanjem vrednosti polja za korisnika kome se dodeljuje zadatak
                fetch(`https://x8ki-letl-twmt.n7.xano.io/api:IUDlTwil/task/${editingTaskId}`, {
                    method: 'PATCH', // Use 'PUT' for update
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('UserToken')
                    },
                    body: JSON.stringify({
                        user_id: taskAssignedToUser, // Replace with the actual user ID
                        task: currentTask,
                        taskInfo: currentTaskInfo,
                        taskDeadline: currentTaskDeadline, // Replace with the actual deadline
                        taskImportance: currentTaskImportance,
                    })
                }).then(res => res.json())
                .then(data => {
                    if(data.status === true) {
                        // setAssignedToUser(data.user.username)
                        setCurrentTask('');
                        setCurrentTaskInfo('');
                        setCurrentTaskDeadline('');
                        setCurrentTaskImportance('1');
                        setErrorMsg(data.message);
                        setAssignedUserId('');
                        setTaskCreated(true);
                        setTaskAssignedToUser('');
                        getTasksForLoggedInUser();
                        getAllTasks()
                    }
                    else {
                        setTaskCreated(false);
                        setErrorMsg(data.message);
                    }
                })
            }
        }
    }

    return (
        <div className={`${modalVisible === true ? "font-nunito absolute top-0 left-0 flex justify-center items-center w-full h-full" : 'hidden'}`}>
            <div className="relative border-solid border rounded-2xl border-gray-200  shadow-xl flex flex-col gap-3 px-4 py-40 justify-center items-center w-10/12 h-86 lg:w-5/12 lg:h-86 bg-white">
                <div className='flex flex-row justify-between items-center w-full gap-1 text-sm'>
                    <label className='w-1/4 text-xs' htmlFor='task'>Insert your Task</label>
                    <input required={true} className='border-gray-200 border-solid border w-3/4 outline-0 p-1' type="text" name='task' value={currentTask} onChange={(e) => setCurrentTask(e.target.value)} />
                </div>
                <div className='flex flex-row justify-between items-center w-full gap-1 text-sm'>
                    <label className='w-1/4 text-xs' htmlFor="task-info">Additional Info</label>
                    <input required className='border-gray-200 border-solid border w-3/4 outline-0 p-1' type="text" name='task-info' value={currentTaskInfo} onChange={(e) => setCurrentTaskInfo(e.target.value)} />
                </div>
                <div className='flex flex-row justify-between items-center w-full gap-1 text-sm'>
                    <label className='w-1/4 text-xs' htmlFor="deadline">Task Deadline</label>
                    <input min={new Date().toISOString().split('T')[0]} required className='border-gray-200 border-solid border w-3/4 outline-0 p-1' type="date" name='deadline' value={currentTaskDeadline} onChange={(e) => setCurrentTaskDeadline(e.target.value)} />
                </div>
                <div className='flex flex-row justify-between items-center w-full gap-1 text-sm'>
                    <label className='w-1/4 text-xs' htmlFor="task-importance">Choose Task Importance</label>
                    <select required name='task-importance' className='border-gray-200 border-solid border w-3/4 outline-0 p-1' onChange={(e) => setCurrentTaskImportance(e.target.value)}>
                        <option value={'1'}>High importance</option>
                        <option value={'2'}>Mid importance</option>
                        <option value={'3'}>Low importance</option>
                    </select>
                </div>
                <div className='flex flex-row justify-between items-center w-full gap-1 text-sm'>
                    <label className='w-1/4 text-xs' htmlFor="asign-task-to">Assign Task To:</label>
                    <select onChange={(e) => setTaskAssignedToUser(e.target.value)} required name='assign-task-to' className='border-gray-200 border-solid border w-3/4 outline-0 p-1'>
                        <option value="" selected disabled={true} hidden={true}>Choose user</option>
                        {
                            usersList.map(user =>
                                <option value={user.id}>{user.email}</option>
                            )
                        }
                    </select>
                </div>
                <div className='flex flex-row justify-center gap-7 items-center w-full mt-5'>
                    <button onClick={handleTask} className='px-3 py-2 bg-green-600 text-white'>{taskModalState === 'create' ? "Create task" : "Edit task"}</button>
                    <button onClick={closeModal} className='px-3 py-2 bg-red-700 text-white'>Close</button>
                </div>
                <span className={`${taskCreated === true ? "flex text-green-500" : taskCreated === false ? "flex text-red-500" : "hidden"}`}>{errorMsg}</span>
            </div>
        </div>
    )
}

export default TaskModal

