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
    safePolygon
} from '@floating-ui/react'
import type { Placement } from '@floating-ui/react'
import styled from '@emotion/styled'

interface TooltipProps {
    initialOpen?: boolean
    placement?: Placement
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function useTooltip (props: TooltipProps = {}) {
    const {
        initialOpen = false,
        placement = 'top',
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

    const hover = useHover(context, {
        move: false,
        enabled: controlledOpen == null,
        handleClose: safePolygon({
            blockPointerEvents: true,
        }),
    })
    const focus = useFocus(context, {
        enabled: controlledOpen == null
    })
    const dismiss = useDismiss(context)
    const role = useRole(context, { role: 'tooltip' })

    const interactions = useInteractions([hover, focus, dismiss, role])

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

type ContextType = ReturnType<typeof useTooltip> | null

const TooltipContext = createContext<ContextType>(null)

export const useTooltipContext = () => {
    const context = useContext(TooltipContext)

    if (context == null) {
        throw new Error('Tooltip components must be wrapped in <Tooltip />')
    }

    return context
}

export function Tooltip (props: { children: React.ReactNode } & TooltipProps) {
    const {
        children,
        ...restProps
    } = props
    // This can accept any props as options, e.g. `placement`,
    // or other positioning options.
    const tooltip = useTooltip(restProps)
    return (
        <TooltipContext.Provider value={tooltip}>
            { children }
        </TooltipContext.Provider>
    )
}

export const TooltipTrigger = forwardRef<
    HTMLElement,
    React.HTMLProps<HTMLElement> & { asChild?: boolean }
>(function TooltipTrigger (props, forwardedRef) {
    const { children, asChild = false, ...restProps } = props
    const context = useTooltipContext()
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
        <TooltipTriggerRoot
            ref={ref}
            // The user can style the trigger based on the state
            data-state={context.open ? 'open' : 'closed'}
            {...context.getReferenceProps(props)}
        >
            { children }
        </TooltipTriggerRoot>
    )
})

const TooltipTriggerRoot = styled.button({
    all: 'unset',
})

export const TooltipContent = forwardRef<
    HTMLDivElement,
    React.HTMLProps<HTMLDivElement>
>(
    function (props, forwardedRef) {
        const { style, ...restProps } = props
        const context = useTooltipContext()
        const ref = useMergeRefs([context.refs.setFloating, forwardedRef])

        if (!context.open) return null

        return (
            <FloatingPortal>
                <TooltipContentRoot
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

const TooltipContentRoot = styled.div({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.16)',
    backgroundColor: '#ffffff',
    padding: '16px',
})
