import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { $palette, MainForm } from './shared/MainForm'
import { useUnit } from 'effector-react'

export const Index = () => {
    const navigate = useNavigate()
    // useEffect(() => {
    //     navigate('/dashboard')
    // }, [])
    const palette = useUnit($palette)
    return (
        <IndexRoot
            // style={{ background: `
            //     radial-gradient(100% 244.46% at 0% 0%, ${palette.shades.at(1).hex} 0%, ${palette.shades.at(-2).hex} 100%),
            //     radial-gradient(50% 122.23% at 50% 50%, ${palette.shades.at(2).hex} 0%, ${palette.shades.at(-3).hex} 100%),
            //     radial-gradient(100.45% 245.58% at 0% 0%, ${palette.shades.at(-4).hex} 0%, ${palette.shades.at(0).hex} 100%),
            //     linear-gradient(127.43deg, ${palette.shades.at(-3).hex} 0%, ${palette.shades.at(2).hex} 100%)
            // ` }}
        >
            <StartSection>
                {/* <Button onClick={() => navigate('/dashboard')}>Dashboard</Button> */}

                <MainForm />
            </StartSection>
        </IndexRoot>
    )
}

const IndexRoot = styled.div({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0 0 0 / .1)',

    // background: `
    //     radial-gradient(100% 244.46% at 0% 0%, #CCFF00 0%, #FF027C 100%),
    //     radial-gradient(50% 122.23% at 50% 50%, #9AA4FF 0%, #306C00 100%),
    //     radial-gradient(100.45% 245.58% at 0% 0%, #000AFE 0%, #70FF00 100%),
    //     linear-gradient(127.43deg, #7B0007 0%, #8F73FF 100%)
    // `,
    backgroundBlendMode: 'lighten, color-dodge, normal',
})

const StartSection = styled.section({
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingInline: '2rem',
})
