import { useEffect } from 'react'

import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { useNotificationDispatch } from './notificationContext'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const notificationDispatch = useNotificationDispatch()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user')
    if (loggedInUser) { // doesn't check validity of the user at all
      const parsedUser = JSON.parse(loggedInUser)
      dispatch(setUser(parsedUser))
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
    dispatch(setUser(null))
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
