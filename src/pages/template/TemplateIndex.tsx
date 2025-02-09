import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { usePageNav } from '../shared/usePageNav'
import { Section } from '../shared/primitives'
import { Button, IconButton, List, ListItem, ListItemAction, ListItemContent, ListItemSubtitle, ListItemTitle } from '../../components'
import { $templates } from '../../stores/template'
import { Settings2Icon } from 'lucide-react'

export const TemplateIndex = () => {
    const navigate = useNavigate()
    const templates = useUnit($templates)

    usePageNav('Шаблоны', { to: '/dashboard' })

    return (
        <TemplateIndexRoot>
            <TemplateIndexMainSection>
                <Section>
                    <FormContainer>
                        <FormToolbar>
                            <Button onClick={() => navigate('new')}>
                                <span>Добавить шаблон</span>
                            </Button>
                        </FormToolbar>

                        <List>
                            { templates.map(template => {
                                return (
                                    <ListItem key={template.id}>
                                        <ListItemContent>
                                            <ListItemTitle>
                                                { template.name }
                                            </ListItemTitle>
                                            <ListItemSubtitle>
                                                Используется процессоров: { template.processors.length }
                                            </ListItemSubtitle>
                                        </ListItemContent>
                                        <ListItemAction>
                                            <IconButton onClick={() => navigate(`/dashboard/templates/${template.id}`)}>
                                                <Settings2Icon />
                                            </IconButton>
                                        </ListItemAction>
                                    </ListItem>
                                )
                            }) }
                        </List>
                    </FormContainer>
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

const FormContainer = styled.section({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})

const FormToolbar = styled.section({
    display: 'flex',
})
