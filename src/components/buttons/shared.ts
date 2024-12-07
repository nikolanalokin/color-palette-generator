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
    backgroundColor: 'rgba(0 0 0 / 0)',
    cursor: 'pointer',
    transition: 'all .2s',

    '&:focus': {
        boxShadow: '0 0 0 1px white, 0 0 0 3px black',
    },

    '&:hover': {
        backgroundColor: 'rgba(0 0 0 / .05)',
    },

    '&:active': {
        backgroundColor: 'rgba(0 0 0 / .1)',
    },
})
