import { forwardRef } from 'react'
import styled from '@emotion/styled'

type BaseToolbarProps = {

}

export type ToolbarProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseToolbarProps> & BaseToolbarProps

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
    (props, forwardedRef) => {
        const {
            children,
            ...restProps
        } = props

        return (
            <ToolbarRoot ref={forwardedRef} {...restProps}>
                { children }
            </ToolbarRoot>
        )
    }
)

const ToolbarRoot = styled.header({
    paddingInline: '48px',
    paddingBlock: '24px',
    fontSize: '18px',
    fontWeight: 600,
})