import React, { useState } from 'react';


const EditModal = ({ editingTaskId, setEditingTaskId, openEditModal, setOpenEditModal, task, tasks, setTasks, setCurrentTask, setCurrentTaskInfo, setCurrentTaskDeadline, setCurrentTaskImportance, currentTask, currentTaskInfo, currentTaskDeadline, currentTaskImportance }) => {


    const [errorMsg, setErrorMsg] = useState(false);

    const closeModal = () => {
        setOpenEditModal(false);
        setEditingTaskId('');
    }


    const editTaskHandler = () => {
        const updatedTask = {
            taskId: editingTaskId,
            task: currentTask,
            taskInfo: currentTaskInfo,
            taskDeadLine: currentTaskDeadline,
            taskImportance: currentTaskImportance,
            completed: false
        }

        const tempArr = [...tasks]
        const taskToChange = tempArr.find(item => item.taskId === editingTaskId);
        if (taskToChange) {
            taskToChange.taskId = editingTaskId;
            taskToChange.task = currentTask;
            taskToChange.taskInfo = currentTaskInfo;
            taskToChange.taskDeadLine = currentTaskDeadline;
            taskToChange.taskImportance = currentTaskImportance;
            taskToChange.completed = false;
            taskToChange.inProgress = false;
        }
        console.log(tempArr);
        setTasks(tempArr);

        // setTasks((prevTasks) =>
        //     prevTasks.map((el) => (el.taskId === editingTaskId ? updatedTask : task))
        // )
        setCurrentTask('');
        setCurrentTaskInfo('');
        setCurrentTaskDeadline('');
        setCurrentTaskImportance('1');
        setErrorMsg(false);
        setOpenEditModal(false)
        setEditingTaskId('');
        // tasks.map((el) => (el.taskId === updatedTask.taskId ? console.log('Jeste') : console.log('nije')))
    }

    return (
        <div className={`${openEditModal === true ? "font-nunito font-bold absolute top-0 left-0 flex justify-center items-center w-full h-full" : 'hidden'}`}>
            <div className="relative border-solid border rounded-2xl border-gray-200  shadow-xl flex flex-col gap-3 px-4 py-40 justify-center items-center w-5/12 h-64 font-roboto bg-white ">
                <button className='absolute top-2 right-4 text-2xl' onClick={closeModal}>X</button>
                <div className='flex flex-row justify-between items-center w-full gap-1 text-sm'>
                    <label className='w-1/4' htmlFor='task'>Insert your Task</label>
                    <input required={true} className='border-gray-200 border-solid border w-3/4 outline-0 p-1' type="text" name='task' value={currentTask} onChange={(e) => setCurrentTask(e.target.value)} />
                </div>
                <div className='flex flex-row justify-between items-center w-full gap-1 text-sm'>
                    <label className='w-1/4' htmlFor="task-info">Additional Info</label>
                    <input required className='border-gray-200 border-solid border w-3/4 outline-0 p-1' type="text" name='task-info' value={currentTaskInfo} onChange={(e) => setCurrentTaskInfo(e.target.value)} />
                </div>
                <div className='flex flex-row justify-between items-center w-full gap-1 text-sm'>
                    <label className='w-1/4' htmlFor="deadline">Task Deadline</label>
                    <input required className='border-gray-200 border-solid border w-3/4 outline-0 p-1' type="date" name='deadline' value={currentTaskDeadline} onChange={(e) => setCurrentTaskDeadline(e.target.value)} />
                </div>
                <div className='flex flex-row justify-between items-center w-full gap-1 text-sm'>
                    <label className='w-1/4' htmlFor="task-importance">Choose Task Importance</label>
                    <select required name='task-importance' className='border-gray-200 border-solid border w-3/4 outline-0 p-1' onChange={(e) => setCurrentTaskImportance(e.target.value)}>
                        <option value={'1'}>High importance</option>
                        <option value={'2'}>Mid importance</option>
                        <option value={'3'}>Low importance</option>
                    </select>
                </div>
                <button onClick={editTaskHandler}>Edit Task</button>
                <span className={`${errorMsg ? "flex text-red" : "hidden"}`}>Please fill all required fields</span>
            </div>
        </div>
    )
}

export default EditModal