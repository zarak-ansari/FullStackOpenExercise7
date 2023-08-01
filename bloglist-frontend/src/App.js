import { useState, useEffect, useRef } from 'react'
import { displayNotification } from './reducers/notificationReducer'

import blogService from './services/blogs'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Toggleable from './components/Toggelable'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
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

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes)
      setBlogs(sortedBlogs)
    })
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
      setBlogs(blogs.concat(responseBlog))
      dispatch(displayNotification(
        `Added new blog ${responseBlog.title} by ${responseBlog.author}`, 5
      ))
    } catch (exception) {
      dispatch(displayNotification('Could not add new blog',5))
      console.log(exception)
    }
  }

  const incrementLikesOfBlog = async (blogId, updatedBlog) => {
    await blogService.updateBlog(updatedBlog, blogId)
    const newBlogs = blogs.map((blog) => {
      if (blog.id === blogId) {
        return { ...blog, likes: blog.likes + 1 }
      } else {
        return blog
      }
    })
    setBlogs(newBlogs)
  }

  const removeBlog = async (blogId) => {
    if (window.confirm('Do you really want to delete the blog?')) {
      const newBlogs = blogs.filter((blog) => blog.id !== blogId)
      setBlogs(newBlogs)
      await blogService.removeBlog(blogId)
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

        <div id="blogList">
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                incrementLikesOfBlog={incrementLikesOfBlog}
                loggedInUsername={user.username}
                removeBlog={removeBlog}
              />
            ))}
        </div>
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
