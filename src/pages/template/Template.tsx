import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { usePageNav } from '../shared/usePageNav'
import { Section } from '../shared/primitives'
import {
    Button,
    ContentLoader,
    ScaleInput,
    TextInput,
} from '../../components'
import { $editedTemplate, $templates, createDefaultTemplate, setEditedTemplate } from '../../stores/template'
import { ProcessorsInput } from '../shared/ProcessorsInput'
import { saveTemplate } from '../../controllers'

export const Template = () => {
    const navigate = useNavigate()
    const { templateId } = useParams()

    usePageNav('Шаблон', { to: '/dashboard/templates' })

    const templates = useUnit($templates)
    const editedTemplate = useUnit($editedTemplate)

    useEffect(() => {
        if (templateId) {
            const template = templates.find(template => template.id === templateId)
            if (template) setEditedTemplate(template)
            else setEditedTemplate(createDefaultTemplate())
        } else {
            setEditedTemplate(createDefaultTemplate())
        }
    }, [templateId])

    if (!editedTemplate) {
        return <ContentLoader />
    }

    const {
        name,
        scale,
        generator,
        processors,
    } = editedTemplate

    const valid = !!name

    return (
        <TemplateRoot>
            <TemplateMainSection>
                <Section>
                    <FormContainer>
                        <FormToolbar>
                            <Button
                                disabled={!valid}
                                onClick={() => {
                                    saveTemplate(editedTemplate)
                                    navigate('/dashboard/templates', { replace: true })
                                    setEditedTemplate(null)
                                }}
                            >
                                Сохранить
                            </Button>
                        </FormToolbar>

                        <Form>
                            <TextInput
                                labelText="Название шаблона"
                                value={name}
                                onChange={value => setEditedTemplate({
                                    ...editedTemplate,
                                    name: value
                                })}
                            />

                            <ScaleInput
                                labelText="Шкала"
                                value={scale}
                                onValueChange={scale => setEditedTemplate({
                                    ...editedTemplate,
                                    scale
                                })}
                            />

                            <GeneratorInput>
                                <div>Генератор</div>
                                { generator }
                            </GeneratorInput>

                            <ProcessorsInput
                                value={processors}
                                onValueChange={value => setEditedTemplate({
                                    ...editedTemplate,
                                    processors: value,
                                })}
                            />
                        </Form>
                    </FormContainer>
                </Section>
            </TemplateMainSection>
        </TemplateRoot>
    )
}

const TemplateRoot = styled.main({
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
})

const TemplateMainSection = styled.main({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})

const FormContainer = styled.section({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})

const FormToolbar = styled.div({
    display: 'flex',
})

const Form = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
    maxWidth: '1024px',
})

const GeneratorInput = styled.div({

})

const ComparisonInputContainer = styled.div({
    display: 'flex',
    columnGap: '16px',
})
