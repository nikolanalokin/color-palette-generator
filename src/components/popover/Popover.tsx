import {
    useState,
    useMemo,
    useContext,
    forwardRef,
    isValidElement,
    cloneElement,
    createContext
} from 'react'
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useHover,
    useFocus,
    useDismiss,
    useRole,
    useInteractions,
    useMergeRefs,
    FloatingPortal,
    safePolygon,
    useClick
} from '@floating-ui/react'
import type { Placement } from '@floating-ui/react'
import styled from '@emotion/styled'

interface PopoverProps {
    initialOpen?: boolean
    placement?: Placement
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function usePopover (props: PopoverProps = {}) {
    const {
        initialOpen = false,
        placement = 'bottom',
        open: controlledOpen,
        onOpenChange: setControlledOpen
    } = props

    const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)

    const open = controlledOpen ?? uncontrolledOpen
    const setOpen = setControlledOpen ?? setUncontrolledOpen

    const data = useFloating({
        placement,
        open,
        onOpenChange: setOpen,
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(8),
            flip({
                crossAxis: placement.includes('-'),
                fallbackAxisSideDirection: 'start',
                padding: 8
            }),
            shift({ padding: 8 })
        ]
    })

    const context = data.context

    const click = useClick(context, {
        enabled: controlledOpen == null
    })
    const dismiss = useDismiss(context)
    const role = useRole(context)

    const interactions = useInteractions([click, dismiss, role])

    return useMemo(
        () => ({
            open,
            setOpen,
            ...interactions,
            ...data
        }),
        [open, setOpen, interactions, data]
    )
}

type ContextType = ReturnType<typeof usePopover> | null

const PopoverContext = createContext<ContextType>(null)

export const usePopoverContext = () => {
    const context = useContext(PopoverContext)

    if (context == null) {
        throw new Error('Popover components must be wrapped in <Popover />')
    }

    return context
}

export function Popover (props: { children: React.ReactNode } & PopoverProps) {
    const {
        children,
        ...restProps
    } = props
    // This can accept any props as options, e.g. `placement`,
    // or other positioning options.
    const popover = usePopover(restProps)
    return (
        <PopoverContext.Provider value={popover}>
            { children }
        </PopoverContext.Provider>
    )
}

export const PopoverTrigger = forwardRef<
    HTMLElement,
    React.HTMLProps<HTMLElement> & { asChild?: boolean }
>(function PopoverTrigger (props, forwardedRef) {
    const { children, asChild = false, ...restProps } = props
    const context = usePopoverContext()
    const childrenRef = (children as any).ref
    const ref = useMergeRefs([context.refs.setReference, forwardedRef, childrenRef])

    // `asChild` allows the user to pass any element as the anchor
    if (asChild && isValidElement(children)) {
        return cloneElement(
            children,
            context.getReferenceProps({
                ref,
                ...restProps,
                ...children.props,
                'data-state': context.open ? 'open' : 'closed'
            })
        )
    }

    return (
        <PopoverTriggerRoot
            ref={ref}
            // The user can style the trigger based on the state
            data-state={context.open ? 'open' : 'closed'}
            {...context.getReferenceProps(props)}
        >
            { children }
        </PopoverTriggerRoot>
    )
})

const PopoverTriggerRoot = styled.button({
    all: 'unset',
})

export const PopoverContent = forwardRef<
    HTMLDivElement,
    React.HTMLProps<HTMLDivElement>
>(
    function (props, forwardedRef) {
        const { style, ...restProps } = props
        const context = usePopoverContext()
        const ref = useMergeRefs([context.refs.setFloating, forwardedRef])

        if (!context.open) return null

        return (
            <FloatingPortal>
                <PopoverContentRoot
                    ref={ref}
                    style={{
                        ...context.floatingStyles,
                        ...style
                    }}
                    {...context.getFloatingProps(restProps)}
                />
            </FloatingPortal>
        )
    }
)

const PopoverContentRoot = styled.div({
    display: 'flex',
    flexDirection: 'column',
    paddingBlock: '8px',
    paddingInline: '12px',
    borderRadius: '8px',
    fontSize: '0.75rem',
    backgroundColor: 'rgba(255 255 255 / 0.5)',
    border: '1px solid rgba(255 255 255 / 0.3)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 30px rgba(0 0 0 / 0.1)',
})

export type InfoPopoverProps = PopoverProps & {
    message?: React.ReactNode
}

export const InfoPopover: React.FC<React.PropsWithChildren<InfoPopoverProps>> = props => {
    const { message, children, ...restProps } = props
    return (
        <Popover {...restProps}>
            <PopoverTrigger asChild>
                { children }
            </PopoverTrigger>
            <PopoverContent>
                { message }
            </PopoverContent>
        </Popover>
    )
}
