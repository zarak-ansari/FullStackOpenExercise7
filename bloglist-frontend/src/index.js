import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './notificationContext'
import { UserContextProvider } from './userContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { createTheme, responsiveFontSizes } from '@mui/material'

const root = ReactDOM.createRoot(document.getElementById('root'))

const queryClient = new QueryClient()

let theme = createTheme({
  typography: {
    h5: {
      margin: '1.25rem 0',
    },
    h6: {
      margin: '1.25rem 0',
    },
  }
})
theme = responsiveFontSizes(theme)

root.render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <UserContextProvider>
        <Router>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Router>
      </UserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
