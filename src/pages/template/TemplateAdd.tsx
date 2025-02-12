import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { usePageNav } from '../shared/usePageNav'
import { Section } from '../shared/primitives'
import {
    Button,
    ContentLoader,
    ScaleInput,
    TextInput,
} from '../../components'
import { useEffect } from 'react'
import { $editedTemplate, $templates, addTemplate, createDefaultTemplate, setEditedTemplate } from '../../stores/template'
import { ProcessorsInput } from '../shared/ProcessorsInput'
import { getNextId } from '../../utils/getNextId'

export const TemplateAdd = () => {
    const navigate = useNavigate()
    const templates = useUnit($templates)
    const editedTemplate = useUnit($editedTemplate)

    usePageNav('Добавление шаблона', { to: '/dashboard/templates' })

    useEffect(() => {
        setEditedTemplate(createDefaultTemplate())
        return () => {
            setEditedTemplate(null)
        }
    }, [])

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
        <TemplateAddRoot>
            <TemplateAddMainSection>
                <Section>
                    <FormContainer>
                        <FormToolbar>
                            <Button
                                disabled={!valid}
                                onClick={() => {
                                    addTemplate({ ...editedTemplate, id: getNextId(templates) })
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
            </TemplateAddMainSection>
        </TemplateAddRoot>
    )
}

const TemplateAddRoot = styled.main({
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
})

const TemplateAddMainSection = styled.main({
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
