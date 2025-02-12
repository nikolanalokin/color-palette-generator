import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { Button } from '../../components'
import { $palettes, $sets } from '../../stores'
import { Section } from '../shared/primitives'
import { usePageNav } from '../shared/usePageNav'
import { SetListView } from './shared/SetListView'

export const SetIndex = () => {
    const navigate = useNavigate()

    usePageNav('Наборы', { to: '/dashboard' })

    const sets = useUnit($sets)
    const palettes = useUnit($palettes)

    return (
        <SetIndexRoot>
            <SetIndexMainSection>
                <Section>
                    <SetsViewTableContainer>
                        <SetsViewTableToolbar>
                            <Button onClick={() => navigate('new')}>
                                <span>Добавить набор</span>
                            </Button>
                        </SetsViewTableToolbar>

                        <SetListView
                            sets={sets}
                            palettes={palettes}
                        />
                    </SetsViewTableContainer>
                </Section>
            </SetIndexMainSection>
        </SetIndexRoot>
    )
}

const SetIndexRoot = styled.main({
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
})

const SetIndexMainSection = styled.main({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})

const SetsViewTableContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})

const SetsViewTableToolbar = styled.div(
    () => ({
        display: 'flex',
        columnGap: '8px',
    })
)
