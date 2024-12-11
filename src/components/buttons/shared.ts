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
    lineHeight: '1.25rem',
    fontWeight: 600,
    backgroundColor: 'rgba(0 0 0 / 0)',
    cursor: 'pointer',
    transition: 'background-color .2s',

    '&:focus': {
        outline: '2px solid black',
    },

    '&:hover': {
        backgroundColor: 'rgba(0 0 0 / .05)',
    },

    '&:active': {
        backgroundColor: 'rgba(0 0 0 / .1)',
    },
})
