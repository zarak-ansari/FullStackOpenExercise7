// import { useSelector } from 'react-redux'
import { useNotificationValue } from '../notificationContext'


const Notification = () => {

  const message =  useNotificationValue() //useSelector(state => state.notification)

  const styles = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  } else {
    return <div style={styles}>{message}</div>
  }
}

export default Notification
