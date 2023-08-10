import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './notificationContext'
import { UserContextProvider } from './userContext'
import { QueryClient, QueryClientProvider } from 'react-query'

const root = ReactDOM.createRoot(document.getElementById('root'))

const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
