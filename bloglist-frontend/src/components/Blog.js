import { useState } from 'react'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from 'react-query'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = (props) => {

  const queryClient = useQueryClient()
  const blog = props.blog
  const [detailsVisible, setDetailsVisible] = useState(false)

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
  const toggleVisibility = () => setDetailsVisible(!detailsVisible)

  const incrementLikes = () => {
    const updatedBlog = { ...blog }
    updatedBlog.user = blog.user.id
    updatedBlog.likes = blog.likes + 1
    updateBlogMutation.mutate(updatedBlog)
    props.displayNotification(`liked blog ${blog.title}`,5)
  }

  const removeBlogButtonHandler = () => {
    try {
      removeBlogMutation.mutate(blog.id)
      props.displayNotification('Deleted blog successfully', 5)
    } catch (error) {
      console.log(error)
      props.displayNotification('Something went wrong', 5)
    }
  }

  return (
    <div className="blog" id={blog.id} style={blogStyle}>
      <p className="blogTitleAndAuthor">
        {blog.title} - {blog.author}{' '}
        <button onClick={toggleVisibility}>
          {detailsVisible ? 'Hide' : 'Show'}
        </button>
      </p>
      {detailsVisible && (
        <div className="expandedBlog">
          <p className="blogUrl">{blog.url}</p>
          <p className="blogLikes">
            likes {blog.likes}{' '}
            <button onClick={incrementLikes} className="likeButton">
              like
            </button>
          </p>
          <p className="blogUsername">{blog.user.name}</p>
          {blog.user.username === props.loggedInUsername && (
            <button className="removeBlogButton" onClick={removeBlogButtonHandler}>
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}


export default Blog
