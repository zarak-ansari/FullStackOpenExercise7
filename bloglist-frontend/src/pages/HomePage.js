
import BlogList from '../components/BlogList'
import NewBlogForm from '../components/NewBlogForm'

const HomePage = (props) => {
  return (
    <div>
      <NewBlogForm displayNotification={props.displayNotification} />
      <BlogList displayNotification={props.displayNotification} />
    </div>
  )
}
export default HomePage
