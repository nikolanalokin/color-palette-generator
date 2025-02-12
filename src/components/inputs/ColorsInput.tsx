import styled from '@emotion/styled'
import { Color, formatHex, Mode } from 'culori'
import { useControllableState } from '../hooks'
import { Button, IconButton } from '../buttons'
import { ListPlusIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { Field, FieldLabel } from './shared'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { ColorPicker } from './ColorPicker'
import { useLayoutEffect, useState } from 'react'
import { ListInput } from './ListInput'

type BaseColorsInputProps<C = string | Color> = {
    labelText?: string
    mode?: Mode
    value?: C[]
    onValueChange?(value: C[]): void
}

export type ColorsInputProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseColorsInputProps> & BaseColorsInputProps

export const ColorsInput = (props: ColorsInputProps) => {
    const {
        labelText,
        mode,
        value: valueProp,
        onValueChange,
        ...restProps
    } = props

    const [initialOpen, setInitialOpen] = useState(false)

    useLayoutEffect(() => {
        setInitialOpen(true)
    }, [])

    const [value, setValue] = useControllableState({
        defaultProp: [],
        prop: valueProp,
        onChange: onValueChange,
    })

    const [list, setList] = useState([])
    const [colorOpen, setColorOpen] = useState(null)
    const [listInputOpen, setListInputOpen] = useState(false)

    const handleAdd = () => {
        const newValue = value.concat(DEFAULT_COLOR)
        setValue(newValue)
        setColorOpen(newValue.length - 1)
    }

    const handleAddList = () => {
        setListInputOpen(false)
        setInitialOpen(false)
        setValue(value.concat(list.filter(item => /^#?([a-f0-9]{6}|[a-f0-9]{3})$/.test(item))))
        setInitialOpen(true)
    }

    const handleUpdate = (index: number, newValue: string | Color) => {
        setValue(value.map((v, i) => i === index ? newValue : v))
    }

    const handleRemove = (index: number) => {
        setValue(value.filter((_, i) => i !== index))
    }

    return (
        <ColorsInputRoot {...restProps}>
            { labelText ? (
                <ColorsInputLabel>
                    { labelText }
                </ColorsInputLabel>
            ) : null }

            <ColorsInputInput>
                { value.map((v, index) => {
                    const hex = formatHex(v)
                    return (
                        <ColorsInputItem key={index}>
                            <Popover
                                open={colorOpen === index}
                                onOpenChange={isOpen => !isOpen && setColorOpen(null)}
                            >
                                <PopoverTrigger asChild>
                                    <ColorsInputItemColor
                                        style={{ backgroundColor: hex }}
                                        onClick={() => setColorOpen(index)}
                                    />
                                </PopoverTrigger>

                                <PopoverContent>
                                    <ColorPicker
                                        mode={mode}
                                        value={v}
                                        onValueChange={value => handleUpdate(index, value)}
                                    />
                                </PopoverContent>
                            </Popover>

                            <ColorsInputItemTitle>{ hex }</ColorsInputItemTitle>

                            <IconButton
                                size="sm"
                                onClick={(evt) => {
                                    evt.preventDefault()
                                    handleRemove(index)
                                }}
                            >
                                <Trash2Icon />
                            </IconButton>
                        </ColorsInputItem>
                    )
                }) }

                { value.length > 0 ? (
                    <IconButton onClick={() => handleAdd()}>
                        <PlusIcon />
                    </IconButton>
                ) : (
                    <Button onClick={() => handleAdd()}>
                        Добавить
                    </Button>
                ) }

                <Popover
                    open={listInputOpen}
                    onOpenChange={isOpen => {
                        setListInputOpen(isOpen)
                    }}
                >
                    <PopoverTrigger asChild>
                        { value.length > 0 ? (
                            <IconButton onClick={() => setListInputOpen(true)}>
                                <ListPlusIcon />
                            </IconButton>
                        ) : (
                            <Button onClick={() => setListInputOpen(true)}>
                                Добавить списком
                            </Button>
                        ) }
                    </PopoverTrigger>

                    <PopoverContent>
                        <ListInputContainer>
                            <ListInput
                                value={list}
                                onValueChange={setList}
                            />
                            <Button onClick={() => handleAddList()}>
                                Добавить
                            </Button>
                        </ListInputContainer>
                    </PopoverContent>
                </Popover>
            </ColorsInputInput>
        </ColorsInputRoot>
    )
}

const DEFAULT_COLOR = '#240cd4'

const ColorsInputRoot = styled(Field)(
    () => ({

    })
)

const ColorsInputLabel = styled(FieldLabel)(
    () => ({
        display: 'flex',
        justifyContent: 'space-between',
    })
)

const ColorsInputInput = styled.div(
    () => ({
        display: 'flex',
        columnGap: '8px',
    })
)

const ColorsInputItem = styled.div(
    () => ({
        display: 'flex',
        alignItems: 'center',
        columnGap: '8px',
        padding: '6px',
        borderRadius: '8px',
        backgroundColor: 'rgba(0 0 0 / .1)',
    })
)

const ColorsInputItemColor = styled.div(
    () => ({
        display: 'flex',
        width: '24px',
        height: '24px',
        borderRadius: '4px',
        cursor: 'pointer',
    })
)

const ColorsInputItemTitle = styled.div(
    () => ({
        fontSize: '0.75rem',
        fontWeight: 500,
    })
)

const ListInputContainer = styled.div(
    ({}) => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '8px',
        width: '256px',
    })
)
