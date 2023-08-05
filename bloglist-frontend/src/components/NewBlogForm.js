import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { appendBlog } from '../reducers/blogReducer'
import { displayNotification } from '../reducers/notificationReducer'
import Toggleable from './Toggelable'

const NewBlogForm = () => {
  const dispatch = useDispatch()
  const newBlogFormVisibilityRef = useRef()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createNewBlog = async (event) => {
    event.preventDefault()
    try {
      const responseBlog = await blogService.createNewBlog({ title, author, url })
      dispatch(appendBlog(responseBlog))
      dispatch(displayNotification(
        `Added new blog ${responseBlog.title} by ${responseBlog.author}`, 5
      ))
      newBlogFormVisibilityRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      dispatch(displayNotification('Could not add new blog', 5))
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>Create a new Blog</h2>
      <Toggleable buttonLabel="New Blog" ref={newBlogFormVisibilityRef}>
        <form onSubmit={createNewBlog}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <label htmlFor="url">URL</label>
          <input
            id="url"
            name="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <button>Submit</button>
        </form>
      </Toggleable>
    </div>
  )
}

export default NewBlogForm
