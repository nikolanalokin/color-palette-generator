import { useState } from 'react'
import styled from '@emotion/styled'
import { PlusIcon, Settings2Icon, MinusIcon, XIcon } from 'lucide-react'
import { ProcessorVO } from '../../types'
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    getProcessorForm,
    IconButton,
    List,
    ListItem,
    ListItemAction,
    ListItemContent,
    ListItemSubtitle,
    ListItemTitle,
    ListTitle,
    useModal
} from '../../components'
import { processorOptions as options } from '../../core/astral'
import { getProcessorDefaultValue, ProcessorType } from '../../astral'
import { useControllableState } from '../../components/hooks'

export type ProcessorsInputProps = {
    value?: ProcessorVO[]
    onValueChange?(value: ProcessorVO[]): void
    orientation?: 'horizontal' | 'vertical'
}

export const ProcessorsInput: React.FC<ProcessorsInputProps> = props => {
    const {
        value: valueProp,
        onValueChange,
        orientation,
    } = props

    const {
        isOpen,
        setModal,
        open,
        close,
    } = useModal()

    const [value, setValue] = useControllableState({
        defaultProp: [],
        prop: valueProp,
        onChange: onValueChange,
    })

    const [editedProcessorType, setEditedProcessorType] = useState<ProcessorType>(null)
    const [processorOptions, setProcessorOptions] = useState<any>(null)

    const notAdded = options.filter(o => !value.find(p => p.type === o.value))

    const ProcessorOptionsForm = getProcessorForm(editedProcessorType)

    return (
        <>
            <ProcessorsInputRoot data-orientation={orientation}>
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
                                        setValue([
                                            ...value,
                                            {
                                                type: o.value,
                                                options: getProcessorDefaultValue(o.value)(),
                                            }
                                        ])
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

                    { value.map(p => {
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
                                        setValue(value.filter(_p => _p.type !== p.type))
                                    }}>
                                        <MinusIcon />
                                    </IconButton>
                                </ListItemAction>
                            </ListItem>
                        )
                    }) }
                </List>
            </ProcessorsInputRoot>

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
                            setValue(value.map(p => p.type === editedProcessorType ? ({
                                ...p,
                                options: processorOptions,
                            }) : p))
                            close()
                            setEditedProcessorType(null)
                            setProcessorOptions(null)
                        }}
                    >
                        Сохранить
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

const ProcessorsInputRoot = styled.div({
    display: 'flex',
    columnGap: '16px',

    '&[data-orientation="vertical"]': {
        flexDirection: 'column',
        rowGap: '8px',
    },
})
