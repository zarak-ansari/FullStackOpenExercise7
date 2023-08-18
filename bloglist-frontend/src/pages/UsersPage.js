import { useQuery } from 'react-query'
import { getAll } from '../services/users'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

const UsersPage = () => {
  const usersQuery = useQuery('users', getAll)

  const users = usersQuery.data

  if(usersQuery.status === 'success') {
    return(
      <div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => <TableRow key={user.id}><TableCell><a href={`/users/${user.id}`}>{user.name}</a></TableCell><TableCell>{user.blogs.length}</TableCell></TableRow>)}
          </TableBody>
        </Table>
      </div>
    )
  }

}

export default UsersPage