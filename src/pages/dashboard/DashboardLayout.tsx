import styled from '@emotion/styled'
import { NavLink, Outlet } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { BookDashedIcon, LibraryIcon, PaletteIcon } from 'lucide-react'
import { iconButtonStyles } from '../../components'
import { $appTitle } from '../../stores'
import { BackButton } from './BackButton'

export const DashboardLayout = () => {
    const appTitle = useUnit($appTitle)
    return (
        <DashboardLayoutRoot>
            <Header>
                <BackButton />
                <PageTitle>{ appTitle }</PageTitle>
            </Header>

            <Sidebar>
                <LogoContainer></LogoContainer>
                <Nav>
                    <NavItem to="sets">
                        <LibraryIcon />
                    </NavItem>
                    <NavItem to="palettes">
                        <PaletteIcon />
                    </NavItem>
                    <NavItem to="templates">
                        <BookDashedIcon />
                    </NavItem>
                </Nav>
            </Sidebar>

            <Main>
                <Outlet />
            </Main>

            <Footer>
                @nikolanalokin { new Date().getFullYear() }
            </Footer>
        </DashboardLayoutRoot>
    )
}

const DashboardLayoutRoot = styled.main({
    display: 'flex',
    flexDirection: 'column',
})

const Header = styled.header({
    zIndex: 100,
    position: 'fixed',
    insetBlockStart: 0,
    insetInlineStart: '64px',
    insetInlineEnd: 0,
    height: '96px',

    display: 'flex',
    alignItems: 'center',
    paddingInline: '36px',
    paddingBlockStart: '16px',
    columnGap: '16px',

    backgroundColor: 'rgba(238 238 238 / .5)',
    backdropFilter: 'blur(10px)',
})

const Sidebar = styled.aside({
    zIndex: 100,
    position: 'fixed',
    insetBlock: 0,
    insetInlineStart: 0,
    width: '64px',
    backgroundColor: 'rgba(255 255 255 / 0.8)',
    backdropFilter: 'blur(10px)',
})

const Main = styled.main({
    paddingBlockStart: '96px',
    paddingInlineStart: '64px',
    minHeight: 'calc(100vh - 62px)',
})

const Footer = styled.footer({
    paddingInlineStart: '64px',
    paddingInlineEnd: '24px',
    paddingBlock: '24px',
    fontSize: '0.875rem',
    lineHeight: 1,
    textAlign: 'end',
})

const PageTitle = styled.h1({
    margin: 0,
    fontSize: '2.25rem',
    lineHeight: 1,
    fontWeight: 700,
})

const LogoContainer = styled.nav({
    height: '96px',
})

const Nav = styled.nav({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBlock: '12px',
    rowGap: '4px',
})

const NavItem = styled(NavLink)(
    iconButtonStyles,
    {
        '&.active': {
            backgroundColor: 'rgba(0 0 0 / 1)',
            color: '#ffffff',

            '&:hover': {
                backgroundColor: 'rgba(0 0 0 / .9)',
            },

            '&:active': {
                backgroundColor: 'rgba(0 0 0 / .8)',
            },
        },
    }
)
