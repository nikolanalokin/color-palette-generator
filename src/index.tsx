import 'normalize.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './services/router'
import { RouterProvider } from 'react-router-dom'

const root = createRoot(document.getElementById('root') as HTMLElement)

async function startApp () {
    root.render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    )
}

startApp()
