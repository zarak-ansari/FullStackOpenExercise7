import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogReducer'

const BlogList = (props) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.slice().sort((a, b) => (a.likes < b.likes))

  useEffect(() => {
    blogService.getAll().then((blogsFromBackend) => {
      dispatch(setBlogs(blogsFromBackend))
    })
  }, [])

  if (blogs) {
    return (
      <>
        <h2>Blogs</h2>
        <div id='blogList'>
          {sortedBlogs.map(blog => (<Blog key={blog.id} blog={blog} loggedInUsername={user.username} displayNotification={props.displayNotification}/>))}
        </div></>)
  } else {
    return null
  }
}

export default BlogList