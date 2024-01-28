import React from 'react'
import User from './User'

const usersList = (
  {
    usersList, 
    setUsersList, 
    userType, 
    getAllUsers, 
    userModalState, 
    setUserModalState, 
    createUserModal, 
    setCreateUserModal, 
    editingUserId, 
    setEditingUserId,
    getTasksForLoggedInUser,
    getAllTasks,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    email,
    setEmail
  }) => {
  return (
    <div className='flex flex-wrap flex-row sm:flex-row md:flex-row lg:flex-row justify-center items-center w-full h-full mt-2  gap-7'>
      {
        usersList.length > 0 ? usersList.map((singleUser) => 
          <User 
            key={singleUser.id} 
            user={singleUser} 
            userType={userType} 
            getAllUsers={getAllUsers} 
            userModalState={userModalState}
            setUserModalState={setUserModalState}
            createUserModal={createUserModal} 
            setCreateUserModal={setCreateUserModal} 
            editingUserId={editingUserId}
            setEditingUserId={setEditingUserId}
            getTasksForLoggedInUser={getTasksForLoggedInUser}
            getAllTasks={getAllTasks}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
          />
        ) : 
        <span>There are no users</span>
      }
    </div>
  )
}

export default usersList