import styled from '@emotion/styled'

export const Field = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '8px',
})

export const Label = styled.label({
    fontSize: '0.875rem',
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
