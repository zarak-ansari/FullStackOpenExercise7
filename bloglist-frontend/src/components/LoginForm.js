import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { displayNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const LoginForm = (props) => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      props.setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch(displayNotification('Successfully logged in', 3))
    } catch (exception) {
      dispatch(displayNotification('Login Failed', 3))
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

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
}

export default LoginForm
