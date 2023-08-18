import { Link, TableCell, TableRow } from '@mui/material'

const Blog = ({ blog }) => {


  return (
    <TableRow className="blog" id={blog.id}>
      <TableCell className="blogTitleAndAuthor">
        <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
      </TableCell>
      <TableCell>
        {blog.author}
      </TableCell>
    </TableRow>
  )
}


export default Blog
