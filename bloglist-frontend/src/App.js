import { useEffect } from 'react'

import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'
import { useNotificationDispatch } from './notificationContext'
import { useUserDispatch, useUserValue } from './userContext'
import UsersPage from './components/UsersPage'

const App = () => {

  const user = useUserValue()
  const userDispatch = useUserDispatch()
  const notificationDispatch = useNotificationDispatch()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user')
    if (loggedInUser) { // doesn't check validity of the user at all
      const parsedUser = JSON.parse(loggedInUser)
      userDispatch({ type:'SET_USER', payload:parsedUser })
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const displayNotification = (notificationText, timeInSeconds) => {
    notificationDispatch({ type:'SHOW', payload:notificationText })
    setTimeout(() => notificationDispatch({ type:'HIDE' }), timeInSeconds * 1000)
  }

  const logout = () => {
    blogService.setToken(null)
    window.localStorage.removeItem('user')
    userDispatch({ type:'LOGOUT' })
  }

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>
          Logged in user: {user.name}
          <button onClick={logout}>Log Out</button>
        </p>
        <NewBlogForm displayNotification={displayNotification} />
        <BlogList displayNotification={displayNotification} />

        <UsersPage />
      </div>
    )
  } else {
    return (
      <div>
        <h2>Log in</h2>
        <Notification />
        <LoginForm displayNotification={displayNotification} />
      </div>
    )
  }
}

export default App
