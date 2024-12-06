import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'
import { GlobalStyles } from '../components'

export const Root = () => {
    return (
        <>
            <GlobalStyles />
            <RootRoot>
                <Header>Генератор цветовых палитр</Header>
                <Outlet />
                <Footer>
                    @nikolanalokin { new Date().getFullYear() }
                </Footer>
            </RootRoot>
        </>
    )
}


const RootRoot = styled.div({
    // maxWidth: '100%',
    // minHeight: '100%',
    // display: 'flex',
    // flexDirection: 'column',

    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    minHeight: 'inherit',
})

const Header = styled.header({
    paddingInline: '48px',
    paddingBlock: '24px',
    fontSize: '18px',
    fontWeight: 600,
    borderBlockEnd: '1px solid',
})

const Footer = styled.footer({
    paddingInline: '48px',
    paddingBlock: '24px',
    fontSize: '14px',
    borderBlockStart: '1px solid',
})
