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
    <>
      <div style={{ backgroundColor:'grey', padding:10 }}>
        <Link style={paddingStyle} to='/'>blogs</Link>
        <Link style={paddingStyle} to='/users'>users</Link>
        {user ? <span>{user.name} logged in <button onClick={logout}>Log Out</button></span> : <Link style={paddingStyle} to='/login'>Log In</Link>}
      </div>
      <h2>Blogs App</h2>
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
    </>
  )

}
export default App
