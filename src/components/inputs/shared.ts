import styled from '@emotion/styled'

export const Field = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '8px',
})

export const Label = styled.label({
    fontSize: '14px',
})

export const BaseInput = styled.input({
    margin: 0,
    border: 0,
    fontSize: '14px',
    lineHeight: '20px',
    paddingInline: '12px',
    height: '40px',
    borderRadius: '6px',
    backgroundColor: 'rgba(0 0 0 / .1)',

    '&:focus': {
        outline: '2px solid transparent',
        outlineOffset: '2px',
        boxShadow: '0 0 0 1px white, 0 0 0 3px black',
    },
})

export const BaseSelect = styled.select({
    margin: 0,
    border: 0,
    fontSize: '14px',
    lineHeight: '20px',
    paddingInline: '12px',
    height: '40px',
    borderRadius: '6px',
    backgroundColor: 'rgba(0 0 0 / .1)',

    '&:focus': {
        outline: '2px solid transparent',
        outlineOffset: '2px',
        boxShadow: '0 0 0 1px white, 0 0 0 3px black',
    },
})
