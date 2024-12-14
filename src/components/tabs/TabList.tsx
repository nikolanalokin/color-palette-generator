import { forwardRef } from 'react'
import styled from '@emotion/styled'

type BaseTabListProps = {

}

export type TabListProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseTabListProps> & BaseTabListProps

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
    (props, forwardedRef) => {
        const {
            children,
            ...restProps
        } = props

        return (
            <TabListRoot
                ref={forwardedRef}
                {...restProps}
            >
                { children }
            </TabListRoot>
        )
    }
)

const TabListRoot = styled.div(
    {
        display: 'flex',
    }
)
