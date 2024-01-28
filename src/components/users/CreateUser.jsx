import React, { useState } from 'react'

const CreateUser = (
    { 
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
      setEditingUserId 
    }
  ) => {

  //States for the message after register
  const [registerMsg, setRegisterMsg] = useState('');
  const [registerStatus, setRegisterStatus] = useState('');

  //Function for closing modal
  const closeRegisterModal = () => {
    setCreateUserModal(false);
    setFirstName('');
    setLastName('');
    setUsername('');
    setEmail('');
    setPassword('');
    setNewUserType('user');
    setRegisterMsg('');
    setRegisterStatus('');
    setUserModalState('');
  }


  //function for handling registration
  const registerUser = () => {
    // console.log(newUserType)
    if (userModalState === 'create') {
      if (firstName !== '' && firstName.length < 12 && lastName !== '' && lastName.length < 12 && username !== '' && username.length > 4 && email !== '' && password !== '' && password.length > 4 && password.length < 16) {
        fetch('https://x8ki-letl-twmt.n7.xano.io/api:IUDlTwil/auth/signup', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('UserToken')
          },
          body: JSON.stringify({
            'firstName': firstName,
            'lastName': lastName,
            'username': username,
            'email': email,
            'password': password,
            'userType': newUserType
          })
        })
        .then(res => {
          return(res.json())
        }).then(data => {
          if(data.status && data.status === true) {
            setRegisterStatus(true);
            setRegisterMsg(data.message);
            getAllUsers();
            setFirstName('');
            setLastName('');
            setUsername('');
            setEmail('');
            setPassword('');
            setNewUserType('user');
          }
          else {
            setRegisterMsg(data.message);
          }
        })

      }
      else {
        setRegisterMsg('Please insert all data correctly');
      }
    }
    else if(userModalState === 'edit') {
      const updatedUser = {
        'firstName': firstName,
        'lastName': lastName,
        'username': username,
        'email': email,
        'userType': newUserType
      }
      //https://x8ki-letl-twmt.n7.xano.io/api:IUDlTwil/user/{user_id}
      fetch(`https://x8ki-letl-twmt.n7.xano.io/api:IUDlTwil/user/${editingUserId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('UserToken')
          },
          body: JSON.stringify(updatedUser)
      }).then(res => res.json())
        .then(data => {
          if(data.status === true){
            setRegisterMsg(data.message);
            setRegisterStatus(data.status);
            getAllUsers();
            setFirstName('');
            setLastName('');
            setUsername('');
            setEmail('');
            setPassword('');
            setNewUserType('user');
          }
          else {
            setRegisterStatus(false);
            setRegisterMsg(data.message)
          }
        })
    }

  }

  return (
    <div className={`${createUserModal === true ? "flex w-full h-full justify-center items-center font-nunito absolute top-0 left-0" : "hidden"}`}>
      <div className="relative border-solid border rounded-2xl border-gray-200  shadow-xl flex flex-col gap-3 px-4 py-40 justify-center items-center w-5/12 h-96 bg-white">
        <div className='flex flex-row justify-between items-center w-full'>
          <span className='w-1/4 text-sm font-bold'>First Name</span>
          <input required={true} type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} className='border-gray-200 border-solid border w-3/4 outline-0 p-1' />
        </div>
        <div className='flex flex-row justify-between items-center w-full'>
          <span className='w-1/4 text-sm font-bold'>Last Name</span>
          <input required={true} type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} className='border-gray-200 border-solid border w-3/4 outline-0 p-1' />
        </div>
        <div className='flex flex-row justify-between items-center w-full'>
          <span className='w-1/4 text-sm font-bold'>Username</span>
          <input required={true} type='text' value={username} onChange={(e) => setUsername(e.target.value)} className='border-gray-200 border-solid border w-3/4 outline-0 p-1' />
        </div>
        <div className='flex flex-row justify-between items-center w-full'>
          <span className='w-1/4 text-sm font-bold'>Email</span>
          <input required={true} type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='border-gray-200 border-solid border w-3/4 outline-0 p-1' />
        </div>
        {
          userModalState === 'create' ? 
          <div className='flex flex-row justify-between items-center w-full'>
            <span className='w-1/4 text-sm font-bold'>Password</span>
            <input required={true} type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='border-gray-200 border-solid border w-3/4 outline-0 p-1' />
          </div> : ''
        }
        
        <div className='flex flex-row justify-between items-center w-full'>
          <span className='w-1/4 text-sm font-bold'>User Type</span>
          <select required={true} onChange={(e) => { setNewUserType(e.target.value) }} className='border-gray-200 border-solid border w-3/4 outline-0 p-1'>
            <option value={'user'}>User</option>
            <option value={'admin'}>Admin</option>
          </select>
        </div>
        <div className='flex flex-row justify-center gap-7 items-center w-full mt-5'>
          <button onClick={registerUser} className='px-3 py-2 bg-blue-700 text-white'>{userModalState === 'create' ? "Create user" : "Edit user"}</button>
          <button onClick={closeRegisterModal} className='px-3 py-2 bg-red-700 text-white'>Close</button>
        </div>
        <span className={`text-xs font-bold ${registerStatus === true ? "text-green-500" : "text-red-500"}`}>{registerMsg}</span>
      </div>
    </div>
  )
}

export default CreateUser