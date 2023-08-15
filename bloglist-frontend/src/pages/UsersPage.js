import { useQuery } from 'react-query'
import { getAll } from '../services/users'

const UsersPage = () => {
  const usersQuery = useQuery('users', getAll)

  const users = usersQuery.data

  if(usersQuery.status === 'success') {
    return(
      <div>
        <h2>Blogs</h2>

        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => <tr key={user.id}><td><a href={`/users/${user.id}`}>{user.name}</a> - {user.id}</td><td>{user.blogs.length}</td></tr>)}
          </tbody>
        </table>
      </div>
    )
  }

}

export default UsersPage