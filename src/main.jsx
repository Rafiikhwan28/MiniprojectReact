import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from './context/UserContectProvider.jsx'
import "./index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
    <App />
    </UserContextProvider>
  </StrictMode>,
)