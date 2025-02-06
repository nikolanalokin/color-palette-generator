import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { usePageNav } from '../shared/usePageNav'
import { Section } from '../shared/primitives'
import { Form } from '../../components'

const options = [
    {
        id: 'OkhslHueShiftProcessor',
        label: 'OkhslHueShiftProcessor',
    },
    {
        id: 'OkhslHueShiftRotateProcessor',
        label: 'OkhslHueShiftRotateProcessor',
    },
    {
        id: 'OkhslLightnessBezierProcessor',
        label: 'OkhslLightnessBezierProcessor',
    },
    {
        id: 'OkhslLightnessLinearProcessor',
        label: 'OkhslLightnessLinearProcessor',
    },
    {
        id: 'OkhslSaturationProcessor',
        label: 'OkhslSaturationProcessor',
    },
]

export const TemplateIndex = () => {
    const navigate = useNavigate()

    usePageNav('Шаблоны', { to: '/dashboard' })

    return (
        <TemplateIndexRoot>
            <TemplateIndexMainSection>
                <Section>
                    <Container>
                        <List>
                            { notAdded.map(o => {

                                return (
                                    <ListItem>

                                    </ListItem>
                                )
                            }) }
                        </List>
                        <List>
                            { added.map(o => {

                                return (
                                    <ListItem>

                                    </ListItem>
                                )
                            }) }
                        </List>
                    </Container>
                </Section>
            </TemplateIndexMainSection>
        </TemplateIndexRoot>
    )
}

const TemplateIndexRoot = styled.main({
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
})

const TemplateIndexMainSection = styled.main({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})

const Container = styled.div({

})

const List = styled.div({

})

const ListItem = styled.div({

})
