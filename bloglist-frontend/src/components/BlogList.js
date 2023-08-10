import Blog from './Blog'
import blogService from '../services/blogs'
import { useQuery } from 'react-query'
import { useUserValue } from '../userContext'

const BlogList = (props) => {

  const blogsQuery = useQuery('blogs', blogService.getAll)
  const user = useUserValue()

  if(blogsQuery.status === 'loading') {
    return (
      <div id='blogList'>Blogs still loading</div>
    )
  }

  if(blogsQuery.status === 'error'){
    <div id='blogList'>An error occurred</div>
  }

  const blogs = blogsQuery.data
  const sortedBlogs = blogs.slice().sort((a, b) => (a.likes < b.likes))

  if (blogs) {
    return (
      <>
        <h2>Blogs</h2>
        <div id='blogList'>
          {sortedBlogs.map(blog => (<Blog key={blog.id} blog={blog} loggedInUsername={user.username} displayNotification={props.displayNotification}/>))}
        </div>
      </>)
  } else {
    return null
  }
}

export default BlogList