import 'normalize.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './pages/App'

const root = createRoot(document.getElementById('root') as HTMLElement)

async function startApp () {
    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    )
}

startApp()
