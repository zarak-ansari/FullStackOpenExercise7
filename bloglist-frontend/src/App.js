import { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import { useUserDispatch, useUserValue } from './userContext'
import { useNotificationDispatch } from './notificationContext'
import blogService from './services/blogs'

import Notification from './components/Notification'

import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage'
import LoginForm from './components/LoginForm'

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
      <h2>Blogs</h2>
      <Notification />
      {user && <p>{user.name} logged in <button onClick={logout}>Log Out</button></p>}
      <Routes>
        <Route
          path='/login'
          element={<LoginForm />}
        />
        <Route
          path='/users'
          element={user ? <UsersPage /> : <Navigate replace to='/login' />}
        />
        <Route
          path='/'
          element={<HomePage displayNotification={displayNotification}/>}
        />
      </Routes>
    </>
  )

}
export default App
