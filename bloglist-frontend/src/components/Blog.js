const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = (props) => {

  const blog = props.blog

  return (
    <div className="blog" id={blog.id} style={blogStyle}>
      <p className="blogTitleAndAuthor">
        <a href={`/blogs/${blog.id}`}>{blog.title} - {blog.author}{' '}</a>
      </p>
    </div>
  )
}


export default Blog
