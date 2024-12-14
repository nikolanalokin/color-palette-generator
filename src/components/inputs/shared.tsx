import styled from '@emotion/styled'

export const Field = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '6px',
})

export const FieldLabel = styled.label({
    fontSize: '0.875rem',
})

export const FormGroupRoot = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '12px',
})

export type FormGroupProps = React.HTMLAttributes<HTMLDivElement> & {
    labelText?: React.ReactNode
}

export const FormGroup: React.FC<FormGroupProps> = props => {
    const { labelText, children, ...restProps } = props
    return (
        <FormGroupRoot {...restProps}>
            { labelText ? <FormGroupLabel>{ labelText }</FormGroupLabel> : null }
            <FormFields>
                { children }
            </FormFields>
        </FormGroupRoot>
    )
}

export const FormFields = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '16px',
})

export const FormGroupLabel = styled.label({
    fontSize: '1rem',
    fontWeight: 500,
})

export const BaseInput = styled.input({
    margin: 0,
    border: 0,
    padding: 0,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    paddingInline: '12px',
    height: '40px',
    borderRadius: '6px',
    backgroundColor: 'rgba(0 0 0 / .1)',

    '&:focus': {
        outline: '2px solid black',
    },
})

export const BaseSelect = styled.select({
    margin: 0,
    border: 0,
    padding: 0,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    paddingInline: '12px',
    height: '40px',
    borderRadius: '6px',
    backgroundColor: 'rgba(0 0 0 / .1)',

    '&:focus': {
        outline: '2px solid black',
    },
})
