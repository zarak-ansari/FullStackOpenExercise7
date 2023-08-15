import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import { getAll } from '../services/users'


const UserDetailPage = () => {
  const id = useParams().id
  const usersQuery = useQuery('users', getAll)

  if(usersQuery.status === 'loading') return <div>Still loading</div>
  if(usersQuery.status === 'error') return <div>Something went wrong</div>

  const users = usersQuery.data
  const user = users.find(user => user.id === id)
  return(
    <div>
      <h2>{user.name}</h2>
      <h3>Added Blogs:</h3>
      <ul>
        {user.blogs.map(blog => (<li key={blog.id}>{blog.title}</li>))}
      </ul>
    </div>
  )
}

export default UserDetailPage