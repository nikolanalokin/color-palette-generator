import styled from '@emotion/styled'
import { Field, FieldLabel } from './shared'
import { useId } from 'react'
import { useControllableState } from '../hooks'

type BaseTextareaProps = {
    labelText?: string
    value?: string
    onValueChange?(value: string): void
}

export type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof BaseTextareaProps> & BaseTextareaProps

export const Textarea = (props: TextareaProps) => {
    const {
        labelText,
        id: idProp,
        value: valueProp,
        onValueChange,
        ...restProps
    } = props
    const id = idProp || useId()
    const [value, setValue] = useControllableState({
        defaultProp: '',
        prop: valueProp,
        onChange: onValueChange,
    })
    return (
        <TextareaRoot>
            { labelText ? (
                <FieldLabel htmlFor={id}>
                    { labelText }
                </FieldLabel>
            ) : null }

            <TextareaTextarea
                as="textarea"
                id={id}
                value={value}
                onChange={evt => setValue?.(evt.target.value)}
                {...restProps}
            />
        </TextareaRoot>
    )
}

const TextareaRoot = styled(Field)(
    () => ({
        width: '100%',
    })
)

const TextareaTextarea = styled.textarea(
    ({}) => ({
        margin: 0,
        border: 0,
        padding: 0,
        fontSize: '0.875rem',
        lineHeight: 1.5,
        paddingBlock: '6px',
        paddingInline: '12px',
        height: '40px',
        borderRadius: '6px',
        backgroundColor: 'rgba(0 0 0 / .1)',
        minBlockSize: '4.6875rem',
        resize: 'vertical',
        width: '100%',

        '&:focus': {
            outline: '2px solid black',
        },
    })
)
