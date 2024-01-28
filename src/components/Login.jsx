import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/finalLogo.png'

const Login = ({userType, setUserType, loggedUser, setLoggedUser}) => {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(null)
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleLoginData = () => {
    fetch('https://x8ki-letl-twmt.n7.xano.io/api:IUDlTwil/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': user,
        'password': password
      })
    }).then(res => {
      return res.json();
    })
      .then(data => {
        if (data.status && data.status === true) {
          localStorage.setItem('UserLoggedIn', 'true');
          localStorage.setItem('UserToken', data.authToken);
          localStorage.setItem('UserType', data.user.userType);
          localStorage.setItem('userId', data.user.id);
          setLoginSuccess(true);
          setUserType(data.user.userType);
          navigate('home', { replace: true });
        }
        else {
          setLoginSuccess(false);
          setErrorMsg(data.message);
        }
      })
  }

  return (
    <div className='flex justify-center items-center w-full h-full flex-col gap-4 font-roboto bg-light-black'>
      <img src={logo} alt="logo" className='w-56' />
      <div className='flex flex-col w-1/3 p-3 gap-4 items-center'>
        <input className='outline-0 p-2 w-full border-solid border-inherit border-2' type="text" placeholder='user' value={user} onChange={e => setUser(e.target.value)}/>
        <input className='outline-0 p-2 w-full border-solid border-inherit border-2' type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
        <span className='text-red-500'>{loginSuccess === false ? 'Wrong username or password' : ''}</span>
        <button className='px-7 py-2 text-white bg-purple' onClick={handleLoginData}>Login</button>
      </div>
      {
        errorMsg !== '' ? <span className='text-red-500 font-bold text-sm'>{errorMsg}</span> : null
      }
    </div>
  )
}

export default Login