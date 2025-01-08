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
    insetInline: 0,
    height: '64px',
    backgroundColor: 'rgba(255 255 255 / 0.5)',
    backdropFilter: 'blur(10px)',

    display: 'flex',
    alignItems: 'center',
    paddingInline: '14px',
    columnGap: '16px',
})

const PageTitle = styled.h1({
    margin: 0,
    fontSize: '1.25rem',
    lineHeight: '1.5rem',
    fontWeight: 600,
})

const Sidebar = styled.aside({
    zIndex: 100,
    position: 'fixed',
    insetBlock: '64px',
    insetInlineStart: 0,
    width: '64px',
    backgroundColor: 'rgba(255 255 255 / 0.5)',
    backdropFilter: 'blur(10px)',
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

const Main = styled.main({
    paddingBlockStart: '64px',
    paddingInlineStart: '64px',
})
