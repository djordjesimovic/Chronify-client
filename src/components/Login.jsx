import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/finalLogo.png'

const Login = ({userType, setUserType, loggedUser, setLoggedUser}) => {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(null)

  const navigate = useNavigate();

  const handleLoginData = () => {
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': user,
        'password': password
      })
    }).then(res => res.json())
    .then(data => {
      if(data.status === 'true') {
        localStorage.setItem('UserLoggedIn', 'true');
        localStorage.setItem('UserToken', data.token);
        localStorage.setItem('UserType', data.userType);
        localStorage.setItem('userId', data.userId);
        setLoggedUser({userId: data.userId, firstName: data.firstName, lastName: data.last, email: data.email, username: data.username});
        setLoginSuccess(true);
        setUserType(data.userType);
        navigate('home', { replace: true });
      }
      else {
        setLoginSuccess(false);
      }
    })
    // console.log(JSON.stringify({
    //   'email': user,
    //   'password': password
    // }))
  }

  return (
    <div className='flex justify-center items-center w-full h-full flex-col gap-4 font-roboto bg-light-black'>
      {/* <h1 className='font-roboto text-3xl font-bold '>Welcome to</h1> */}
      <img src={logo} alt="logo" className='w-56' />
      <div className='flex flex-col w-1/3 p-3 gap-4 items-center'>
        {/* <h3 className='text-center text-2xl font-roboto'>Login</h3> */}
        <input className='outline-0 p-2 w-full border-solid border-inherit border-2' type="text" placeholder='user' value={user} onChange={e => setUser(e.target.value)}/>
        <input className='outline-0 p-2 w-full border-solid border-inherit border-2' type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
        <span className='text-red-500'>{loginSuccess === false ? 'Wrong username or password' : ''}</span>
        <button className='px-7 py-2 text-white bg-purple' onClick={handleLoginData}>Login</button>
      </div>
    </div>
  )
}

export default Login