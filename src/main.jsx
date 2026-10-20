/* -------------------- Styles -------------------- */
import './index.css'
/* -------------------- Components -------------------- */
import { StrictMode } from 'react'
import { RouterProvider } from 'react-router'
/* -------------------- Functions -------------------- */
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
/* -------------------- Routes -------------------- */
import routes from './routes/routes.jsx'

const root = document.getElementById('root')

// Create router
const router = createBrowserRouter(routes)

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
