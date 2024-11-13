import styled from '@emotion/styled'
import { Field, Label } from './shared'

type BaseRangeInputProps = {
    labelText?: string
    value?: number
    onChange?(value: number): void
}

export type RangeInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseRangeInputProps> & BaseRangeInputProps

export const RangeInput = (props: RangeInputProps) => {
    const {
        labelText,
        id,
        step = 1,
        value,
        onChange,
        ...restProps
    } = props
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

const RangeInputLabel = styled(Label)(
    () => ({
        display: 'flex',
        justifyContent: 'space-between',
    })
)
