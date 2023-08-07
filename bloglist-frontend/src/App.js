import { useEffect } from 'react'

import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user')
    if (loggedInUser) { // doesn't check validity of the user at all
      const parsedUser = JSON.parse(loggedInUser)
      dispatch(setUser(parsedUser))
      blogService.setToken(parsedUser.token)
    }
  }, [])


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
        <NewBlogForm />
        <BlogList />
      </div>
    )
  } else {
    return (
      <div>
        <h2>Log in</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }
}

export default App
