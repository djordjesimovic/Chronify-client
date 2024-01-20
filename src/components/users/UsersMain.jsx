import React from 'react';
import SearchBar from '../SearchBar';
import DayDate from '../DayDate';
import UsersList from './UsersList';
import CreateUser from './CreateUser';
import menu from '../../assets/menu.png';

const usersMain = (
  { userType,
    setUserType,
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
    usersList,
    setUsersList,
    getAllUsers,
    userModalState,
    setUserModalState,
    editingUserId,
    setEditingUserId,
    openMenuState,
    setOpenMenuState
  }) => {

  // const openUserModal = () => {
  //   setCreateUserModal(true);
  //   setUserModalState('create')
  // }
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
      <UsersList
        usersList={usersList}
        setUsersList={setUsersList}
        userType={userType}
        getAllUsers={getAllUsers}
        userModalState={userModalState}
        setUserModalState={setUserModalState}
        createUserModal={createUserModal}
        setCreateUserModal={setCreateUserModal}
        editingUserId={editingUserId}
        setEditingUserId={setEditingUserId}
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

export default usersMain