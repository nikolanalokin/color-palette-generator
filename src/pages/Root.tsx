import styled from '@emotion/styled'
import { Outlet, useLocation } from 'react-router-dom'
import { GlobalStyles } from '../components'
import { useEffect } from 'react'
import { setThemeShade, useColorStore } from '../stores/app'
import { formatCss } from 'culori'
import { ShadeInfo } from '../core'

export const Root = () => {
    const location = useLocation()
    const shade = useColorStore(state => state.shade)
    useEffect(() => {
        setThemeShade(null)
    }, [location])
    return (
        <>
            <GlobalStyles />
            <RootRoot shade={shade}>
                {/* <Header>Генератор цветовых палитр</Header> */}
                <Outlet />
                <Footer>
                    @nikolanalokin { new Date().getFullYear() }
                </Footer>
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
        gridTemplateRows: 'auto 1fr auto',
        minHeight: 'inherit',

        backgroundImage: shade
            ? `linear-gradient(to left, ${formatCss(shade.rgb)}, ${formatCss({...shade.rgb, alpha: 0})} 50%)`
            : null,
    })
)

const Header = styled.header({
    paddingInline: '48px',
    paddingBlock: '24px',
    fontSize: '18px',
    fontWeight: 600,
})

const Footer = styled.footer({
    paddingInline: '48px',
    paddingBlock: '24px',
    fontSize: '0.875rem',
})
