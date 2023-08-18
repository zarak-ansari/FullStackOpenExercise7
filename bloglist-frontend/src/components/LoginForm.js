import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useUserDispatch } from '../userContext'
import { useNavigate } from 'react-router'
import { Box, Button, Input, Typography } from '@mui/material'

const textFieldStyle = {
  margin:5
}

const LoginForm = (props) => {

  const dispatch = useUserDispatch()
  const navigate = useNavigate()
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
      navigate('/')
    } catch (exception) {
      displayNotification('Login Failed', 3)
    }
  }

  return (
    <Box>
      <Typography variant='h6'>Log In</Typography>
      <form id="loginForm" onSubmit={handleLogin}>
        <Input
          style={textFieldStyle}
          id="username"
          placeholder="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <Input
          style={textFieldStyle}
          id="password"
          placeholder="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <Button id="loginSubmit" type="submit" variant='contained'>
          Login
        </Button>
      </form>
    </Box>
  )
}



export default LoginForm
