import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import { useMutation, useQueryClient } from 'react-query'

import blogService from '../services/blogs'
import { useUserValue } from '../userContext'

const BlogDetailPage = (props) => {
  const id = useParams().id
  const queryClient = useQueryClient()
  const user = useUserValue()
  const navigate = useNavigate()
  const blogsQuery = useQuery('blogs', blogService.getAll)


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

  return(
    <div>
      <h2>{blog.title} - {blog.author}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>{blog.likes} like(s) <button onClick={incrementLikes}>Like</button></p>
      <p>added by {blog.user.name}</p>
      {blog.user.username === user.username && (
        <button className="removeBlogButton" onClick={removeBlogButtonHandler}>
            Remove
        </button>
      )}

    </div>
  )
}

export default BlogDetailPage