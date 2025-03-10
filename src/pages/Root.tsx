import styled from '@emotion/styled'
import { Outlet, useLocation } from 'react-router-dom'
import { GlobalStyles, VarsStyles } from '../components'
import { useEffect } from 'react'
import { setThemeTone } from '../stores'
import { formatCss } from 'culori'
import { ShadeInfo } from '../core'

export const Root = () => {
    const location = useLocation()
    useEffect(() => {
        setThemeTone(null)
    }, [location])
    return (
        <>
            <GlobalStyles />
            <VarsStyles />

            <RootRoot>
                <Outlet />
                {/* <Footer>
                    @nikolanalokin { new Date().getFullYear() }
                </Footer> */}
            </RootRoot>
        </>
    )
}


const RootRoot = styled.div<{ shade?: ShadeInfo }>(
    ({ shade }) => ({
        // maxWidth: '100%',
        // minHeight: '100%',
        // display: 'flex',
        // flexDirection: 'column',

        display: 'grid',
        gridTemplateRows: '1fr auto',
        minHeight: 'inherit',

        backgroundImage: shade
            ? `linear-gradient(to left, ${formatCss(shade.rgb)}, ${formatCss({...shade.rgb, alpha: 0})} 50%)`
            : null,

        // backgroundColor: 'rgba(238 238 238 / 1)',
    })
)

const Footer = styled.footer({
    paddingInline: '88px 48px',
    paddingBlock: '24px',
    fontSize: '0.875rem',
    textAlign: 'end',
})
