import { createBrowserRouter } from 'react-router-dom'
import { Root } from '../pages/Root'
import { Index } from '../pages/Index'
import { Dashboard } from '../pages/Dashboard'
import { Palette } from '../pages/Palette'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <Index />
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/palette',
                element: <Palette />,
            },
            {
                path: '/palette/new',
                element: <Palette />,
            },
            {
                path: '/palette/:paletteId',
                element: <Palette />,
            },
        ]
    },
], {
    basename: '/color-palette-generator',
})
