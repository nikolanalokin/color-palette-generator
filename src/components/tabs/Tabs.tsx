import { createContext, forwardRef, useContext, useMemo } from 'react'
import styled from '@emotion/styled'
import { useControllableState } from '../hooks'

type BaseTabsProps = {
    defaultValue?: string
    value?: string
    onChange?(value: string): void
}

export type TabsProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseTabsProps> & BaseTabsProps

export type TabsState = {
    tab: string
    setTab(value: string): void
}

const TabsContext = createContext(null)

export function useTabsContext () {
    return useContext(TabsContext) as TabsState
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
    (props, forwardedRef) => {
        const {
            defaultValue,
            value: valueProp,
            onChange,
            children,
            ...restProps
        } = props

        const [value, setValue] = useControllableState({
            defaultProp: defaultValue,
            prop: valueProp,
            onChange: onChange,
        })

        const contextState = useMemo(() => ({
            tab: value,
            setTab: setValue,
        }), [value, setValue])

        return (
            <TabsContext.Provider value={contextState}>
                {/* <TabsRoot ref={forwardedRef} {...restProps}> */}
                    { children }
                {/* </TabsRoot> */}
            </TabsContext.Provider>
        )
    }
)

const TabsRoot = styled.div(
    {

    }
)
