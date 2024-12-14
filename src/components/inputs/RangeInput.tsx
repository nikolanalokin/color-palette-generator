import styled from '@emotion/styled'
import { Field, FieldLabel } from './shared'
import { useId } from 'react'

type BaseRangeInputProps = {
    labelText?: string
    value?: number
    onChange?(value: number): void
}

export type RangeInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseRangeInputProps> & BaseRangeInputProps

export const RangeInput = (props: RangeInputProps) => {
    const {
        labelText,
        id: idProp,
        step = 1,
        value,
        onChange,
        ...restProps
    } = props
    const id = idProp || useId()
    return (
        <RangeInputRoot>
            <RangeInputLabel htmlFor={id}>
                <span>{ labelText }</span>
                <span>{ value }</span>
            </RangeInputLabel>

            <input
                id={id}
                type="range"
                step={step}
                value={value}
                onChange={evt => onChange?.(+evt.target.value)}
                {...restProps}
            />
        </RangeInputRoot>
    )
}

const RangeInputRoot = styled(Field)(
    () => ({

    })
)

const RangeInputLabel = styled(FieldLabel)(
    () => ({
        display: 'flex',
        justifyContent: 'space-between',
    })
)
