import styled from '@emotion/styled'
import { Label } from './shared/Label'
import { Field } from './shared/Field'

type BaseColorRangeInputProps = {
    labelText?: string
    value?: string
    onChange?(value: string): void
}

export type ColorRangeInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseColorRangeInputProps> & BaseColorRangeInputProps

export const ColorRangeInput = (props: ColorRangeInputProps) => {
    const {
        labelText,
        id,
        value,
        onChange,
        ...restProps
    } = props

    return (
        <ColorRangeInputRoot>
            { labelText ? (
                <Label htmlFor={id}>
                    { labelText }
                </Label>
            ) : null }

            <Container>
                <Range />
                <input
                    id={id}
                    type="text"
                    value={value}
                    onChange={evt => onChange?.(evt.target.value)}
                    {...restProps}
                />
            </Container>
        </ColorRangeInputRoot>
    )
}

const ColorRangeInputRoot = styled(Field)(
    () => ({

    })
)

const Container = styled.input({

})

const Input = styled.input({

})

const Range = (props) => {

    return (
        <RangeRoot>

        </RangeRoot>
    )
}

const RangeRoot = styled.div({

})
