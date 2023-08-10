import { useQuery } from 'react-query'
import { getAll } from '../services/users'

const UsersPage = () => {
  const usersQuery = useQuery('users', getAll)

  const users = usersQuery.data

  if(usersQuery.status === 'success') {
    return(
      <div>
        <table>
          <tr>
            <th>User Name</th>
            <th>Blogs Created</th>
          </tr>
          {users.map(user => <tr key={user.id}><td>{user.name}</td><td>{user.blogs.length}</td></tr>)}
        </table>
      </div>
    )
  }

}

export default UsersPage