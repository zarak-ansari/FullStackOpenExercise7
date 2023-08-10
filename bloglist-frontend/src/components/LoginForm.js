import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useUserDispatch } from '../userContext'

const LoginForm = (props) => {

  const dispatch = useUserDispatch()

  const displayNotification = props.displayNotification
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      dispatch({ type:'SET_USER', payload:user })
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
      displayNotification('Successfully logged in', 3)
    } catch (exception) {
      displayNotification('Login Failed', 3)
    }
  }

  return (
    <div>
      <form id="loginForm" onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button id="loginSubmit" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}



export default LoginForm
