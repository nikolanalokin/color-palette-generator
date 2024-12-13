import React, { useState, useRef, useCallback, useMemo, createContext, useContext } from 'react'
import {
    useInteractions,
    useFloating,
    autoUpdate,
    flip,
    useListNavigation,
    useTypeahead,
    useClick,
    useDismiss,
    useRole,
    FloatingFocusManager,
    FloatingList,
    useListItem,
    size,
    offset,
    FloatingPortal
} from '@floating-ui/react'
import styled from '@emotion/styled'
import { resetStyles } from '../buttons/shared'
import { CheckIcon, ChevronDown } from 'lucide-react'
import { createPortal } from 'react-dom'

interface SelectContextValue {
    value: string | null
    activeIndex: number | null
    selectedIndex: number | null
    valueNode: HTMLElement
    getItemProps: ReturnType<typeof useInteractions>["getItemProps"]
    handleSelect(value: string, index: number | null): void
}

const SelectContext = createContext<SelectContextValue>(
    {} as SelectContextValue
)

export type SelectProps = React.HTMLAttributes<HTMLDivElement> & {
    value?: string
    onValueChange?(value: string): void
    placeholder?: string
}

export const Select2: React.FC<SelectProps> = props => {
    const { value: valueProp, onValueChange, placeholder, children, ...restProps } = props

    const [isOpen, setIsOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null)
    const [valueNode, setValueNode] = useState(null)

    const { refs, floatingStyles, context } = useFloating({
        placement: 'bottom-start',
        open: isOpen,
        onOpenChange: setIsOpen,
        whileElementsMounted: autoUpdate,
        middleware: [
            offset({
                mainAxis: 6,
            }),
            flip(),
            size({
                apply({ rects, elements, availableHeight }) {
                    Object.assign(elements.floating.style, {
                        maxHeight: `${availableHeight}px`,
                        width: `${rects.reference.width}px`,
                    })
                },
            }),
        ],
    })

    const fragmentRef = useRef(new DocumentFragment())

    const elementsRef = useRef<Array<HTMLElement | null>>([])
    const labelsRef = useRef<Array<string | null>>([])

    const handleSelect = useCallback((value: string, index: number | null) => {
        setSelectedIndex(index)
        setIsOpen(false)
        if (index !== null) {
            setSelectedLabel(labelsRef.current[index])
        }
        onValueChange?.(value)
    }, [onValueChange])

    const listNav = useListNavigation(context, {
        listRef: elementsRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex,
    })
    const click = useClick(context)
    const dismiss = useDismiss(context)
    const role = useRole(context, { role: 'listbox' })

    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
        listNav,
        click,
        dismiss,
        role
    ])

    const selectContext = useMemo(
        () => ({
            value: valueProp,
            valueNode,
            activeIndex,
            selectedIndex,
            getItemProps,
            handleSelect,
        }),
        [valueProp, valueNode, activeIndex, selectedIndex, getItemProps, handleSelect]
    )

    return (
        <>
            <SelectRoot ref={refs.setReference} tabIndex={0} {...getReferenceProps(restProps)}>
                <SelectValue ref={setValueNode} />
                <SelectIcon>
                    <ChevronDown />
                </SelectIcon>
            </SelectRoot>
            <SelectContext.Provider value={selectContext}>
                { isOpen ? (
                    <FloatingPortal>
                        <FloatingFocusManager context={context} modal={false}>
                            <SelectPopover
                                ref={refs.setFloating}
                                style={floatingStyles}
                                {...getFloatingProps()}
                            >
                                <FloatingList elementsRef={elementsRef}>
                                    { children }
                                </FloatingList>
                            </SelectPopover>
                        </FloatingFocusManager>
                    </FloatingPortal>
                ) : createPortal((
                    <FloatingList elementsRef={elementsRef}>
                        { children }
                    </FloatingList>
                ), fragmentRef.current) }
            </SelectContext.Provider>
        </>
    )
}

const SelectRoot = styled.div(
    {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        columnGap: '8px',
        height: '36px',
        fontSize: '0.875rem',
        lineHeight: '1rem',
        paddingInline: '12px',
        borderRadius: '6px',
        backgroundColor: 'rgba(0 0 0 / .1)',
        cursor: 'pointer',

        '&:focus': {
            outline: '2px solid black',
        },
    }
)

const SelectValue = styled.div({
    width: 0,
    flexGrow: 1,
    paddingBlock: '10px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
})

const SelectIcon = styled.div({
    display: 'flex',
    flexShrink: 0,
    paddingBlock: '8px',

    '& svg': {
        width: '1.25rem',
        height: '1.25rem',
    }
})

const SelectPopover = styled.div({
    paddingInline: '4px',
    paddingBlock: '4px',
    borderRadius: '6px',
    backgroundColor: 'rgba(255 255 255 / 0.5)',
    border: '1px solid rgba(255 255 255 / 0.3)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 30px rgba(0 0 0 / 0.1), 0 0 0 1px black',
})

export type OptionProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value?: string
}

export const Option2: React.FC<OptionProps> = props => {
    const { value: valueProp, children, ...restProps } = props
    const {
        value,
        valueNode,
        activeIndex,
        selectedIndex,
        getItemProps,
        handleSelect,
    } = useContext(SelectContext)

    const { ref, index } = useListItem()

    const isActive = activeIndex === index
    const isSelected = valueProp === value // selectedIndex === index

    return (
        <>
            <OptionRoot
                ref={ref}
                role="option"
                aria-selected={isActive && isSelected}
                data-selected={isSelected}
                data-active={isActive}
                tabIndex={isActive ? 0 : -1}
                {...getItemProps({
                    ...restProps,
                    onClick: evt => {
                        restProps?.onClick?.(evt as any)
                        handleSelect(valueProp, index)
                    },
                })}
            >
                <OptionIcon>
                    { isSelected ? <CheckIcon /> : null }
                </OptionIcon>
                { children }
            </OptionRoot>
            { isSelected && valueNode ? createPortal(children, valueNode) : null }
        </>
    )
}

const OptionRoot = styled.button(
    resetStyles,
    {
        width: '100%',
        display: 'flex',
        columnGap: '8px',
        alignItems: 'flex-start',
        paddingBlock: '6px',
        paddingInline: '8px',
        borderRadius: '4px',
        fontSize: '0.875rem',
        lineHeight: '1rem',
        fontWeight: 400,
        textAlign: 'start',
        backgroundColor: 'rgba(0 0 0 / 0)',
        cursor: 'pointer',
        transition: 'all .2s',

        // '&:focus': {
        //     backgroundColor: 'rgba(0 0 0 / .05)',
        // },

        '&:hover': {
            backgroundColor: 'rgba(0 0 0 / .05)',
        },

        '&:active': {
            backgroundColor: 'rgba(0 0 0 / .1)',
        },

        '&[data-selected="true"]': {
            backgroundColor: 'rgba(0 0 0 / .05)',
        },

        '&[data-active="true"]': {
            backgroundColor: 'rgba(0 0 0 / .1)',
        },
    }
)

const OptionIcon = styled.div({
    display: 'flex',
    flexShrink: 0,
    width: '1.25rem',

    '& svg': {
        width: '1rem',
        height: '1rem',
    }
})
