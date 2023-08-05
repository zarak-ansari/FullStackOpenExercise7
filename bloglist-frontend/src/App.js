import { useState, useEffect } from 'react'

import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'

const App = () => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user')
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])


  const logout = () => {
    blogService.setToken(null)
    window.localStorage.removeItem('user')
    setUser(null)
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
        <LoginForm
          setUser={setUser}
        />
      </div>
    )
  }
}

export default App
