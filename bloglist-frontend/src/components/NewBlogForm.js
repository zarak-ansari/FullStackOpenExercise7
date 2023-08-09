import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Toggleable from './Toggelable'
import { useMutation, useQueryClient } from 'react-query'

const NewBlogForm = (props) => {

  const queryClient = useQueryClient()

  const newBlogMutation = useMutation(blogService.createNewBlog, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
    }
  })

  const newBlogFormVisibilityRef = useRef()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createNewBlog = async (event) => {
    event.preventDefault()
    try {
      newBlogMutation.mutate({ title, author, url })
      props.displayNotification(`Added new blog ${title} by ${author}`, 5)
      newBlogFormVisibilityRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      props.displayNotification('Could not add new blog', 5)
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
