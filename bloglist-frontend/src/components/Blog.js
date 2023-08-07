import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'
import { incrementLikesOfBlog, removeBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = (props) => {

  const dispatch = useDispatch()
  const blog = props.blog
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleVisibility = () => setDetailsVisible(!detailsVisible)

  const incrementLikes = async () => {
    const updatedBlog = { ...blog }
    updatedBlog.user = blog.user.id
    updatedBlog.likes = blog.likes + 1
    delete updatedBlog.id
    await blogService.updateBlog(updatedBlog, blog.id)
    dispatch(displayNotification(`liked blog ${blog.title}`,5))
    dispatch(incrementLikesOfBlog(blog.id))
  }

  const removeBlogButtonHandler = () => {
    try {
      blogService.removeBlog(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(displayNotification('Deleted blog successfully', 5))
      console.log('hi')
    } catch (error) {
      console.log(error)
      dispatch(displayNotification('Something went wrong', 5))
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

Blog.prototypes = {
  key: PropTypes.string.isRequired,
  blog: PropTypes.object.isRequired,
  incrementLikesOfBlog: PropTypes.func.isRequired,
  loggedInUsername: PropTypes.string.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog
