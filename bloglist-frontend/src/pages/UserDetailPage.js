import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import { getAll } from '../services/users'
import { Box, List, ListItem, Typography } from '@mui/material'


const UserDetailPage = () => {
  const id = useParams().id
  const usersQuery = useQuery('users', getAll)

  if(usersQuery.status === 'loading') return <div>Still loading</div>
  if(usersQuery.status === 'error') return <div>Something went wrong</div>

  const users = usersQuery.data
  const user = users.find(user => user.id === id)
  return(
    <Box>
      <Typography variant='h5'>{user.name}</Typography>
      <Typography variant='h6'>Added Blogs:</Typography>
      <List>
        {user.blogs.map(blog => (<ListItem key={blog.id}>{blog.title}</ListItem>))}
      </List>
    </Box>
  )
}

export default UserDetailPage