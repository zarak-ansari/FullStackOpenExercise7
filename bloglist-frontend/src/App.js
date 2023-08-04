import { useState, useEffect, useRef } from 'react'
import { displayNotification } from './reducers/notificationReducer'

import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Toggleable from './components/Toggelable'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import BlogList from './components/BlogList'

const App = () => {

  const [user, setUser] = useState(null)

  const newBlogFormVisibilityRef = useRef()

  const dispatch = useDispatch()

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

  const addNewBlog = async (newBlog) => {
    try {
      newBlogFormVisibilityRef.current.toggleVisibility()
      const responseBlog = await blogService.createNewBlog(newBlog)
      // setBlogs(blogs.concat(responseBlog))
      dispatch(displayNotification(
        `Added new blog ${responseBlog.title} by ${responseBlog.author}`, 5
      ))
    } catch (exception) {
      dispatch(displayNotification('Could not add new blog', 5))
      console.log(exception)
    }
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
        <h2>Create a new Blog</h2>
        <Toggleable buttonLabel="New Blog" ref={newBlogFormVisibilityRef}>
          <NewBlogForm addNewBlog={addNewBlog} />
        </Toggleable>

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
