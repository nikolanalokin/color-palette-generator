import { css } from '@emotion/react'

// border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
export const stylesTrigger = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 8px;
    padding-inline: 12px;
    width: 100%;
    height: 40px;
    border-radius: 6px;
    background-color: rgba(0 0 0 / .1);
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    border: 1px solid #000000;

    & > span {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }

    &:focus {
        outline: 2px solid transparent;
        outline-offset: 2px;
    }

    &::placeholder {
        color: rgba(0 0 0 / .64);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: .5;
    }
`

export const stylesTriggerIcon = css`
    height: 16px;
    width: 16px;
    opacity: .5;
`

export const stylesScrollUpButton = css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-block: 4px;
    cursor: default;
`

export const stylesScrollDownButton = css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-block: 4px;
    cursor: default;
`

export const stylesScrollIcon = css`
    height: 16px;
    width: 16px;
`

// border text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
export const stylesContent = css`
    position: relative;
    z-index: 50;
    max-height: 384px;
    min-width: 8rem;
    overflow: hidden;
    border: 1px solid #000000;
    border-radius: 6px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -2px rgba(0, 0, 0, .1);

    &[data-position="popper"] {
        &[data-side="bottom"] {
            translate: 0 4px;
        }
        &[data-side="left"] {
            translate: -4px;
        }
        &[data-side="right"] {
            translate: 4px;
        }
        &[data-side="top"] {
            translate: 0 -4px;
        }
    }
`

export const stylesViewport = css`
    padding: 4px;

    [data-position="popper"] & {
        width: 100%;
        min-width: var(--radix-select-trigger-width);
        height: var(--radix-select-trigger-height);
    }
`

export const stylesLabel = css`
    padding-block: 6px;
    padding-inline-start: 32px;
    padding-inline-end: 8px;
    font-size: 14px;
    font-weight: 600;
`

// "outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
export const stylesItem = css`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    cursor: default;
    user-select: none;
    padding-block: 6px;
    padding-inline-start: 32px;
    padding-inline-end: 8px;
    font-size: 14px;
    border-radius: 4px;
    outline: 2px solid transparent;
    outline-offset: 2px;

    &:focus {
        background-color: rgba(0 0 0 / .1);
    }
`

export const stylesItemIndicator = css`
    position: absolute;
    left: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 14px;
    width: 14px;
`

export const stylesItemIndicatorIcon = css`
    height: 16px;
    width: 16px;
`

// "-mx-1 my-1 h-px bg-muted"
export const stylesSeparator = css`
    margin-block: 4px;
    margin-inline: -4px;
`
