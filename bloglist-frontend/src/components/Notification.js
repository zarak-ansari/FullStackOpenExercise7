import { useNotificationValue } from '../notificationContext'
import { Alert } from '@mui/material'

const Notification = () => {

  const message =  useNotificationValue()


  if (message === null) {
    return null
  } else {
    return <Alert severity="success">{message}</Alert>
  }
}

export default Notification
