import { forwardRef } from 'react'
import styled from '@emotion/styled'
import { useTabsContext } from './Tabs'

type BaseTabPanelProps = {
    value?: string
}

export type TabPanelProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseTabPanelProps> & BaseTabPanelProps

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
    (props, forwardedRef) => {
        const {
            value,
            children,
            ...restProps
        } = props
        const context = useTabsContext()
        const open = value === context.tab
        return open ? (
            <>
                {/* <TabPanelRoot
                    ref={forwardedRef}
                    {...restProps}
                > */}
                    { children }
                {/* </TabPanelRoot> */}
            </>
        ) : null
    }
)

const TabPanelRoot = styled.div(
    {

    }
)
