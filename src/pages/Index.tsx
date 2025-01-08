import styled from '@emotion/styled'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'

export const Index = () => {
    const navigate = useNavigate()
    // useEffect(() => {
    //     navigate('/dashboard')
    // }, [])
    return (
        <IndexRoot>
            <StartSection>
                <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
            </StartSection>
        </IndexRoot>
    )
}

const IndexRoot = styled.div({
    display: 'flex',
    flexDirection: 'column',
})

const StartSection = styled.section({
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})
