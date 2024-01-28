import React from 'react'
import editIcon from '../../assets/editPurple.png';
import deleteIcon from '../../assets/deletePurple.png'

const User = (
  {
    user, 
    userType, 
    getAllUsers, 
    userModalState, 
    setUserModalState, 
    createUserModal, 
    setCreateUserModal, 
    editingUserId, 
    setEditingUserId,
    getTasksForLoggedInUser,
    getAllTasks
  }
  ) => {


  //function for deleting user
  const deleteUser = () => {
    fetch(`https://x8ki-letl-twmt.n7.xano.io/api:IUDlTwil/user/${user.id}`, {
      method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('UserToken')
        }
    }).then(res => res.json())
    .then(data => {
      if(data.status === true) {
        alert(data.message);
        getAllUsers();
        getAllTasks();
        getTasksForLoggedInUser();
      }
      else {
        alert(data.message);
      }
    })
  }

  //function for editing users
  const editUser = () => {
    setUserModalState('edit');
    setCreateUserModal(true)
    setEditingUserId(user.id);
    console.log(user.id)
  }


  return (
    <div className='p-4 flex flex-col sm:flex-col md:flex-col lg:flex-col justify-evenly items-center w-72 sm:w-72 md:w-72 lg:w-72 h-100 sm:h-100 md:h-100 lg:h-100 border-solid border rounded-2xl bg-transparent text-white font-nunito'>
      <div className='flex justify-center items-center w-12 h-12 bg-purple text-white border border-transparent rounded-full'>
        <span className='text-lg font-bold'>{user.firstName.charAt(0)}</span>
      </div>
      <div className='flex flex-col sm:flex-row md:flex-row lg:flex-col items-center gap-2'>
        <span className='text-xs'>First Name:</span>
        <span className='text-base font-bold'>{user.firstName}</span>
      </div>
      <div className='flex flex-row sm:flex-row md:flex-row lg:flex-col items-center gap-2'>
        <span className='text-xs'>Last Name:</span>
        <span className='text-base font-bold'>{user.lastName}</span>
      </div>
      <div className='flex flex-col sm:flex-row md:flex-row lg:flex-col items-center gap-2'>
        <span className='text-xs'>Username:</span>
        <span className='text-base font-bold'>{user.username}</span>
      </div>
      <div className='flex flex-col sm:flex-row md:flex-row lg:flex-col items-center gap-2'>
        <span className='text-xs'>Email:</span>
        <span className='text-base font-bold'>{user.email}</span>
      </div>
      <div className='flex flex-col sm:flex-row md:flex-row lg:flex-col items-center gap-2'>
        <span className='text-xs'>User Type:</span>
        <span className='text-base font-bold'>{user.userType}</span>
      </div>
      {
        userType === 'admin' ?
        <div className='flex flex-row gap-4'>
          <button onClick={editUser}>
            <img className='w-5' src={editIcon} alt='edit icon' />
          </button>
          <button onClick={deleteUser}>
            <img className='w-5' src={deleteIcon} alt='edit icon' />
          </button>
        </div> : null
      }
    </div>
  )
}

export default User