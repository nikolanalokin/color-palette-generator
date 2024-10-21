import styled from '@emotion/styled'
import { Field } from './shared/Field'
import { Label } from './shared/Label'

type BaseSelectInputProps = {
    labelText?: string
    value?: string
    onChange?(value: string): void
}

export type SelectInputProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, keyof BaseSelectInputProps> & BaseSelectInputProps

export const SelectInput = (props: SelectInputProps) => {
    const {
        labelText,
        id,
        value,
        onChange,
        ...restProps
    } = props
    return (
        <SelectInputRoot>
            { labelText ? (
                <Label htmlFor={id}>
                    { labelText }
                </Label>
            ) : null }

            <select
                id={id}
                value={value}
                onChange={evt => onChange?.(evt.target.value)}
                {...restProps}
            />
        </SelectInputRoot>
    )
}

const SelectInputRoot = styled(Field)(
    () => ({

    })
)
