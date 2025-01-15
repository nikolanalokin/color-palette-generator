import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { ArrowLeftIcon } from 'lucide-react'
import { Button, IconButton, Toolbar } from '../../components'
import { $appSets } from '../../stores'
import { SetsTable } from '../shared/SetsTable'
import { PageTitle, Section, VerticalDivider } from '../shared/primitives'
import { usePageNav } from '../shared/usePageNav'

export const SetIndex = () => {
    const navigate = useNavigate()

    usePageNav('Наборы', { to: '/dashboard' })

    const appSets = useUnit($appSets)

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

                        <SetsTable sets={appSets} />
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
    })
)
