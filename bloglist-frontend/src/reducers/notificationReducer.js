import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification: (state, action) => {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    hideNotification: (state, action) => {
      return ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { showNotification, hideNotification, incrementByAmount } =
  notificationSlice.actions

export default notificationSlice.reducer

export const displayNotification = (notificationText, timeInSeconds) => {
  return async (dispatch) => {
    dispatch(showNotification(notificationText))
    setTimeout(() => dispatch(hideNotification()), timeInSeconds * 1000)
  }
}
