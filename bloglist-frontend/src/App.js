import { useEffect } from 'react'
import { Route, Routes, Navigate, Link } from 'react-router-dom'

import { useUserDispatch, useUserValue } from './userContext'
import { useNotificationDispatch } from './notificationContext'
import blogService from './services/blogs'

import Notification from './components/Notification'

import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage'
import LoginForm from './components/LoginForm'
import UserDetailPage from './pages/UserDetailPage'
import BlogDetailPage from './pages/BlogDetailPage'

import { AppBar, Container, Toolbar, Typography, Button, Box } from '@mui/material'

const paddingStyle = { padding: 5 }

const App = () => {

  const userDispatch = useUserDispatch()
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user')
    if (loggedInUser) { // doesn't check validity of the user at all
      const parsedUser = JSON.parse(loggedInUser)
      userDispatch({ type:'SET_USER', payload:parsedUser })
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const notificationDispatch = useNotificationDispatch()

  const displayNotification = (notificationText, timeInSeconds) => {
    notificationDispatch({ type:'SHOW', payload:notificationText })
    setTimeout(() => notificationDispatch({ type:'HIDE' }), timeInSeconds * 1000)
  }

  const logout = () => {
    blogService.setToken(null)
    window.localStorage.removeItem('user')
    userDispatch({ type:'LOGOUT' })
  }

  const user = useUserValue()

  return(
    <Container>
      <AppBar position='static' component='nav'>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button variant='text'>
              <Link style={paddingStyle} to='/'>blogs</Link>
            </Button>
            <Button variant='text'>
              <Link style={paddingStyle} to='/users'>users</Link>
            </Button>
          </Box>
          <Box>
            {user
              ?
              <Typography>{user.name} logged in <Button variant='contained' onClick={logout}>Log Out</Button></Typography>
              :
              <Button><Link style={paddingStyle} to='/login'>Log In</Link></Button>
            }
          </Box>
        </Toolbar>
      </AppBar>
      <Typography variant='h5'>Blogs App</Typography>
      <Notification />
      <Routes>
        <Route
          path='/login'
          element={user ? <Navigate replace to='/' /> : <LoginForm displayNotification={displayNotification} />}
        />
        <Route
          path='/users'
          element={<UsersPage />}
        />
        <Route
          path='/users/:id'
          element={<UserDetailPage />}
        />
        <Route
          path='/blogs/:id'
          element={<BlogDetailPage displayNotification={displayNotification} />}
        />
        <Route
          path='/'
          element={user ? <HomePage displayNotification={displayNotification} /> : <Navigate replace to='/login' />}
        />
      </Routes>
    </Container>
  )

}
export default App
