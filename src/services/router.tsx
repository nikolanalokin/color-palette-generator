import { createBrowserRouter } from 'react-router-dom'
import { Root } from '../pages/Root'
import { Index } from '../pages/Index'
import { Palette, PaletteIndex } from '../pages/palette'
import { Set, SetAdd, SetIndex } from '../pages/set'
import { DashboardIndex, DashboardLayout } from '../pages/dashboard'
import { Template, TemplateAdd, TemplateIndex } from '../pages/template'

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
                path: 'dashboard',
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: <DashboardIndex />
                    },
                    {
                        path: 'sets',
                        children: [
                            {
                                index: true,
                                element: <SetIndex />,
                            },
                            {
                                path: 'new',
                                element: <SetAdd />,
                            },
                            {
                                path: ':setId',
                                element: <Set />,
                            },
                        ],
                    },
                    {
                        path: 'palettes',
                        children: [
                            {
                                index: true,
                                element: <PaletteIndex />,
                            },
                            {
                                path: 'new',
                                element: <Palette />, // <PaletteAdd />,
                            },
                            {
                                path: ':paletteId',
                                element: <Palette />,
                            },
                        ]
                    },
                    {
                        path: 'templates',
                        children: [
                            {
                                index: true,
                                element: <TemplateIndex />,
                            },
                            {
                                path: 'new',
                                element: <TemplateAdd />,
                            },
                            {
                                path: ':templateId',
                                element: <Template />,
                            },
                        ]
                    },
                ]
            },
        ]
    },
], {
    basename: '/color-palette-generator',
})
