import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { ArrowLeftIcon } from 'lucide-react'
import { Button, IconButton, Toolbar } from '../../components'
import { $appSets } from '../../stores'
import { SetsTable } from '../shared/SetsTable'
import { PageTitle, VerticalDivider } from '../shared/primitives'
import { usePageNav } from '../shared/usePageNav'

export const SetIndex = () => {
    const navigate = useNavigate()

    usePageNav('Наборы', { to: '/dashboard' })

    const appSets = useUnit($appSets)

    return (
        <SetIndexRoot>
            <SetIndexMainSection>
                <SetsViewTableContainer>
                    <SetsTableToolbar>
                        <Button onClick={() => navigate('new')}>
                            <span>Добавить набор</span>
                        </Button>
                    </SetsTableToolbar>

                    <SetsTable sets={appSets} />
                </SetsViewTableContainer>
            </SetIndexMainSection>
        </SetIndexRoot>
    )
}

const SetIndexRoot = styled.main({
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
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

const SetsTableToolbar = styled.div(
    () => ({
        display: 'flex',
    })
)
