import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import { useMutation, useQueryClient } from 'react-query'

import blogService from '../services/blogs'
import { useUserValue } from '../userContext'
import { Link, Typography, Button, TextField, List, ListItem, Box } from '@mui/material'

const BlogDetailPage = (props) => {
  const id = useParams().id
  const queryClient = useQueryClient()
  const user = useUserValue()
  const navigate = useNavigate()
  const blogsQuery = useQuery('blogs', blogService.getAll)
  const [commentText, setCommentText] = useState('')

  const updateBlogMutation = useMutation(blogService.updateBlog, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('blogs')
    }
  })

  const removeBlogMutation = useMutation(blogService.removeBlog, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('blogs')
    }
  })

  const removeBlogButtonHandler = () => {
    try {
      navigate('/')
      removeBlogMutation.mutate(blog.id)
      props.displayNotification('Deleted blog successfully', 5)
    } catch (error) {
      console.log(error)
      props.displayNotification('Something went wrong', 5)
    }
  }

  const incrementLikes = () => {
    const updatedBlog = { ...blog }
    updatedBlog.user = blog.user.id
    updatedBlog.likes = blog.likes + 1
    updateBlogMutation.mutate(updatedBlog)
    props.displayNotification(`liked blog ${blog.title}`,5)
  }

  if(blogsQuery.status === 'loading') return (<div>Still loading</div>)
  if(blogsQuery.status === 'error') return (<div>Something went wrong</div>)

  const blog = blogsQuery.data.find(blog => blog.id === id)
  const addComment = (event) => {
    event.preventDefault()

    const newBlog = { ...blog }
    newBlog.user = blog.user.id

    if(!blog.comments) {
      newBlog.comments = [commentText]
    } else {
      newBlog.comments.push(commentText)
    }

    updateBlogMutation.mutate(newBlog)
    setCommentText('')
    props.displayNotification('Added comment to the blog successfully', 5)
  }

  return(
    <Box>
      <Typography variant='h6'>{blog.title} - {blog.author}</Typography>
      <Typography><Link href={blog.url}>{blog.url}</Link></Typography>
      <Typography>{blog.likes} like(s) <Button onClick={incrementLikes}>Like</Button></Typography>
      <Typography>added by {blog.user.name}</Typography>
      {blog.user.username === user.username && (
        <Button className="removeBlogButton" onClick={removeBlogButtonHandler}>
            Remove
        </Button>
      )}
      <Typography variant='h6'>Comments:</Typography>
      <form onSubmit={addComment}>
        <TextField
          type='text'
          name='commentText'
          id='commentText'
          label='Comment'
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
        />
        <Button type='submit'>Submit</Button>
      </form>
      <List>
        {blog.comments.map(comment => <ListItem key={comment}>{comment}</ListItem>)}
      </List>

    </Box>
  )
}

export default BlogDetailPage