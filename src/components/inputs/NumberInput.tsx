import styled from '@emotion/styled'
import { BaseInput, Field, FieldLabel } from './shared'
import { IconButton } from '../buttons'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { useId, useRef } from 'react'
import { useControllableState } from '../hooks'

type BaseNumberInputProps = {
    labelText?: string
    value?: number
    onValueChange?(value: number): void
}

export type NumberInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseNumberInputProps> & BaseNumberInputProps

export const NumberInput = (props: NumberInputProps) => {
    const {
        labelText,
        id: idProp,
        defaultValue = null,
        value: valueProp,
        onValueChange,
        ...restProps
    } = props
    const id = idProp || useId()
    const [value, setValue] = useControllableState({
        defaultProp: defaultValue,
        prop: valueProp,
        onChange: onValueChange,
    })
    const inputRef = useRef<HTMLInputElement>(null)
    const handleStepperClick = (evt: React.MouseEvent, direction: 'up' | 'down') => {
        if (!inputRef.current) return

        direction === 'up'
            ? inputRef.current.stepUp()
            : inputRef.current.stepDown()

        const newValue = parseFloat(inputRef.current.value)

        setValue?.(newValue)
    }
    return (
        <NumberInputRoot>
            { labelText ? (
                <FieldLabel htmlFor={id}>
                    { labelText }
                </FieldLabel>
            ) : null }

            <InputContainer>
                <NumberInputInput
                    ref={inputRef}
                    id={id}
                    type="number"
                    value={typeof value === 'number' ? value.toString() : ''}
                    onChange={evt => setValue?.(evt.target.value ? parseFloat(evt.target.value) : null)}
                    {...restProps}
                />

                <ActionsContainer>
                    <IconButton onClick={evt => handleStepperClick(evt, 'down')}>
                        <MinusIcon />
                    </IconButton>

                    <IconButton onClick={evt => handleStepperClick(evt, 'up')}>
                        <PlusIcon />
                    </IconButton>
                </ActionsContainer>
            </InputContainer>
        </NumberInputRoot>
    )
}

const NumberInputRoot = styled(Field)(
    ({}) => ({
    })
)

const InputContainer = styled.div(
    ({}) => ({
        position: 'relative',
    })
)

const NumberInputInput = styled(BaseInput)(
    ({}) => ({
        appearance: 'textfield',
        width: '100%',
        paddingInlineEnd: '84px',

        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            appearance: 'none',
        }
    })
)

const ActionsContainer = styled.div(
    ({}) => ({
        position: 'absolute',
        insetBlock: 0,
        insetInlineEnd: 0,
        display: 'flex',
        padding: '2px',
    })
)
