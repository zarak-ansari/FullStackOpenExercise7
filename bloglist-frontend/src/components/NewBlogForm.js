import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Toggleable from './Toggelable'
import { useMutation, useQueryClient } from 'react-query'
import { Button, TextField, Typography } from '@mui/material'

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
      <Typography variant='h6'>Create a new Blog</Typography>
      <Toggleable buttonLabel="New Blog" ref={newBlogFormVisibilityRef}>
        <form onSubmit={createNewBlog}>
          <TextField
            id="title"
            name="title"
            label="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            id="author"
            name="author"
            label="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <TextField
            id="url"
            name="url"
            label="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button>Submit</Button>
        </form>
      </Toggleable>
    </div>
  )
}

export default NewBlogForm
