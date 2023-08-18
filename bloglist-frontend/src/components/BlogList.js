import Blog from './Blog'
import blogService from '../services/blogs'
import { useQuery } from 'react-query'
import { useUserValue } from '../userContext'
import { Table, TableContainer, TableBody, Typography } from '@mui/material'

const BlogList = (props) => {

  const blogsQuery = useQuery('blogs', blogService.getAll)
  const user = useUserValue()
  const username = user ? user.username : ''

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
        <Typography variant='h6'>Blogs</Typography>
        <TableContainer>
          <Table>
            <TableBody id='blogList'>
              {sortedBlogs.map(blog => (<Blog key={blog.id} blog={blog} loggedInUsername={username} displayNotification={props.displayNotification}/>))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  } else {
    return null
  }
}

export default BlogList