import { css } from '@emotion/react'

export const resetStyles = css({
    padding: 0,
    margin: 0,
    border: 0,
    outline: 0,
    boxShadow: 'none',
    background: 'none',
})

export const baseStyles = css({
    display: 'flex',
    borderRadius: '6px',
    fontSize: '1rem',
    backgroundColor: 'rgba(0 0 0 / .1)',
    cursor: 'pointer',

    '&:focus': {
        boxShadow: '0 0 0 1px white, 0 0 0 3px black',
    },
})
