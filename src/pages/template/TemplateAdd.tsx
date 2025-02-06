import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { usePageNav } from '../shared/usePageNav'
import { Section } from '../shared/primitives'
import {
    Button,
    ContentLoader,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    IconButton,
    ListItem,
    ListItemAction,
    ListItemContent,
    ListItemSubtitle,
    ListItemTitle,
    ListTitle,
    OkhslHueShiftProcessorForm,
    OkhslHueShiftRotateProcessorForm,
    OkhslLightnessBezierProcessorForm,
    OkhslLightnessLinearProcessorForm,
    OkhslSaturationProcessorForm,
    TextInput,
    useModal
} from '../../components'
import { useEffect, useState } from 'react'
import { $editedTemplate, addTemplate, createDefaultTemplate, setEditedTemplate } from '../../stores/templates'
import { List, MinusIcon, PlusIcon, Settings2Icon, XIcon } from 'lucide-react'
import { getProcessorDefaultValue, ProcessorType } from '../../core_v2'

const options: Array<{
    value: ProcessorType
    label: string
    description: string
}> = [
    {
        value: 'OkhslHueShiftProcessor',
        label: 'OkhslHueShiftProcessor',
        description: 'Линейное изменение цветового тона на заданное значение с 0 на заданной точке',
    },
    {
        value: 'OkhslHueShiftRotateProcessor',
        label: 'OkhslHueShiftRotateProcessor',
        description: 'Линейная интерполяция цветового тона по двум точкам',
    },
    {
        value: 'OkhslLightnessBezierProcessor',
        label: 'OkhslLightnessBezierProcessor',
        description: 'Безье интерполяция светлоты',
    },
    {
        value: 'OkhslLightnessLinearProcessor',
        label: 'OkhslLightnessLinearProcessor',
        description: 'Линейная интерполяция светлоты',
    },
    {
        value: 'OkhslSaturationProcessor',
        label: 'OkhslSaturationProcessor',
        description: 'Параболлическое уменьшение насыщенности с 0 на заданной точке',
    },
]

export const TemplateAdd = () => {
    const navigate = useNavigate()
    const editedTemplate = useUnit($editedTemplate)

    usePageNav('Добавление шаблона', { to: '/dashboard' })

    useEffect(() => {
        setEditedTemplate(createDefaultTemplate())
        return () => {
            setEditedTemplate(null)
        }
    }, [])

    const {
        isOpen,
        setModal,
        open,
        close,
    } = useModal()

    const [editedProcessorType, setEditedProcessorType] = useState<ProcessorType>(null)
    const [processorOptions, setProcessorOptions] = useState<any>(null)

    if (!editedTemplate) {
        return <ContentLoader />
    }

    const {
        name,
        processors,
    } = editedTemplate

    const notAdded = options.filter(o => !processors.find(p => p.type === o.value))

    const valid = !!name

    const ProcessorOptionsForm = {
        OkhslHueShiftProcessor: OkhslHueShiftProcessorForm,
        OkhslHueShiftRotateProcessor: OkhslHueShiftRotateProcessorForm,
        OkhslLightnessBezierProcessor: OkhslLightnessBezierProcessorForm,
        OkhslLightnessLinearProcessor: OkhslLightnessLinearProcessorForm,
        OkhslSaturationProcessor: OkhslSaturationProcessorForm,
    }[editedProcessorType]

    return (
        <TemplateAddRoot>
            <TemplateAddMainSection>
                <Section>
                    <FormContainer>
                        <FormToolbar>
                            <Button
                                disabled={!valid}
                                onClick={() => {
                                    addTemplate(editedTemplate)
                                    navigate('/dashboard')
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
                            <ComparisonInputContainer>
                                <List>
                                    <ListTitle>Доступны</ListTitle>

                                    { notAdded.map(o => {
                                        return (
                                            <ListItem key={o.value}>
                                                <ListItemContent>
                                                    <ListItemTitle>
                                                        { o.label }
                                                    </ListItemTitle>
                                                    <ListItemSubtitle>
                                                        { o.description }
                                                    </ListItemSubtitle>
                                                </ListItemContent>
                                                <ListItemAction>
                                                    <IconButton onClick={() => {
                                                        setEditedTemplate({
                                                            ...editedTemplate,
                                                            processors: [...processors, {
                                                                type: o.value,
                                                                options: getProcessorDefaultValue(o.value)(),
                                                            }]
                                                        })
                                                    }}>
                                                        <PlusIcon />
                                                    </IconButton>
                                                </ListItemAction>
                                            </ListItem>
                                        )
                                    }) }
                                </List>
                                <List>
                                    <ListTitle>Добавлены</ListTitle>

                                    { processors.map(p => {
                                        const option = options.find(o => o.value === p.type)
                                        return (
                                            <ListItem key={p.type}>
                                                <ListItemContent>
                                                    <ListItemTitle>
                                                        { option.label }
                                                    </ListItemTitle>
                                                    <ListItemSubtitle>
                                                        { option.description }
                                                    </ListItemSubtitle>
                                                </ListItemContent>
                                                <ListItemAction>
                                                    <IconButton onClick={() => {
                                                        setEditedProcessorType(p.type)
                                                        setProcessorOptions(p.options)
                                                        open()
                                                    }}>
                                                        <Settings2Icon />
                                                    </IconButton>
                                                    <IconButton onClick={() => {
                                                        setEditedTemplate({
                                                            ...editedTemplate,
                                                            processors: processors.filter(_p => _p.type !== p.type)
                                                        })
                                                    }}>
                                                        <MinusIcon />
                                                    </IconButton>
                                                </ListItemAction>
                                            </ListItem>
                                        )
                                    }) }
                                </List>
                            </ComparisonInputContainer>
                        </Form>
                    </FormContainer>
                </Section>
            </TemplateAddMainSection>

            <Dialog ref={setModal}>
                <DialogHeader>
                    <DialogTitle>Настройки {editedProcessorType}</DialogTitle>
                    <IconButton onClick={() => {
                        close()
                        setEditedProcessorType(null)
                        setProcessorOptions(null)
                    }}>
                        <XIcon />
                    </IconButton>
                </DialogHeader>
                <DialogBody>
                    { isOpen && editedProcessorType ? (
                        <ProcessorOptionsForm
                            value={processorOptions}
                            onChange={setProcessorOptions}
                        />
                    ) : null }
                </DialogBody>
                <DialogFooter>
                    <Button
                        onClick={() => {
                            setEditedTemplate({
                                ...editedTemplate,
                                processors: processors.map(p => p.type === editedProcessorType ? ({
                                    ...p,
                                    options: processorOptions,
                                }) : p)
                            })
                            close()
                            setEditedProcessorType(null)
                            setProcessorOptions(null)
                        }}
                    >
                        Сохранить
                    </Button>
                </DialogFooter>
            </Dialog>
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

const ComparisonInputContainer = styled.div({
    display: 'flex',
    columnGap: '16px',
})
