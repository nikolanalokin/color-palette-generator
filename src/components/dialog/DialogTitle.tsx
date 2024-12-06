import styled from '@emotion/styled'

type BaseDialogTitleProps = {}

export type DialogTitleProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseDialogTitleProps> & BaseDialogTitleProps

export const DialogTitle = (props: DialogTitleProps) => {
    const {
        children,
        ...restProps
    } = props

    return (
        <DialogTitleRoot {...restProps}>
            { children }
        </DialogTitleRoot>
    )
}

const DialogTitleRoot = styled.div({
    fontSize: '1.5rem',
    lineHeight: '1.875rem',
    fontWeight: 600,
})
