import styled from '@emotion/styled'
import { Link, useNavigate } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { Button } from '../../components'
import { $appPalettes, $appSets } from '../../stores'
import { AddPaletteButton } from '../shared/AddPaletteButton'
import { usePageNav } from '../shared/usePageNav'
import { Section } from '../shared/primitives'
import { $templates } from '../../stores/template'

export const DashboardIndex = () => {
    const navigate = useNavigate()
    const palettes = useUnit($appPalettes)
    const sets = useUnit($appSets)
    const templates = useUnit($templates)
    usePageNav('Dashboard', null)
    return (
        <DashboardIndexRoot>
            <DashboardIndexMainSection>
                <Section>
                    <Card to="palettes">
                        <Title>
                            Палитры
                        </Title>

                        <Caption>
                            Всего: { palettes.length }
                        </Caption>

                        <AddPaletteButton onClick={evt => {
                            evt.preventDefault()
                            navigate('palettes/new')
                        }}>
                            <span>Добавить палитру</span>
                        </AddPaletteButton>
                    </Card>
                </Section>

                <Section>
                    <Card to="sets">
                        <Title>
                            Наборы
                        </Title>

                        <Caption>
                            Всего: { sets.length }
                        </Caption>

                        <Button onClick={evt => {
                            evt.preventDefault()
                            navigate('sets/new')
                        }}>
                            <span>Добавить набор</span>
                        </Button>
                    </Card>
                </Section>

                <Section>
                    <Card to="templates">
                        <Title>
                            Шаблоны
                        </Title>

                        <Caption>
                            Всего: { templates.length }
                        </Caption>

                        <Button onClick={evt => {
                            evt.preventDefault()
                            navigate('templates/new')
                        }}>
                            <span>Добавить шаблон</span>
                        </Button>
                    </Card>
                </Section>
            </DashboardIndexMainSection>
        </DashboardIndexRoot>
    )
}

const DashboardIndexRoot = styled.main({
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
})

const DashboardIndexMainSection = styled.main({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, max-content)',
    gap: '6px',
})

const Card = styled(Link)({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '16px',
})

const Title = styled.div({
    fontSize: '1.5rem',
    fontWeight: 600,
})

const Caption = styled.div({
    fontSize: '0.875rem',
    fontWeight: 400,
})
