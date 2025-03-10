import styled from '@emotion/styled'
import { forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Field, FieldLabel } from './shared'
import { useCallbackRef, useControllableState } from '../hooks'
import { InfoTooltip } from '../tooltip'
import { findNearestValueInScale, ticks } from '../../astral'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { IconButton } from '../buttons'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import { roundToStepPrecision, snapValueToStep } from '../hooks/useNumberInputState'

type BaseSliderProps = {
    labelText?: string
    defaultValue?: number[]
    value?: number[]
    onValueChange?(value: number[]): void
    min?: number
    max?: number
    step?: number
    marks?: boolean | SliderMark[]
    disabledEdge?: boolean
}

type SliderMark = {
    value: number
    label: string
}

export type SliderProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseSliderProps > & BaseSliderProps

export const Slider = (props: SliderProps) => {
    const {
        labelText,
        defaultValue = [0],
        value: valueProp,
        onValueChange,
        min = 0,
        max = 10,
        step = 1,
        marks: marksProp,
        disabledEdge,
        ...restProps
    } = props

    const [values, setValues] = useControllableState({
        defaultProp: defaultValue,
        prop: valueProp,
        onChange: onValueChange,
    })

    const marks = useMemo(
        () => marksProp === true
            ? ticks([min, max], ((max - min) / step) + 1).map(v => ({ label: String(roundToStepPrecision(v, step)), value: v } as SliderMark))
            : Array.isArray(marksProp)
                ? marksProp
                : null,
        [marksProp, min, max, step]
    )

    const containerRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        setContainerRect(containerRef.current?.getBoundingClientRect())
    }, [])

    const [containerRect, setContainerRect] = useState<DOMRect>(null)

    const handleDoubleClick = useCallbackRef((evt: React.PointerEvent<HTMLDivElement>) => {
        const newLeft = evt.clientX - containerRect.left
        const newNormalizedValue = clamp(newLeft, 0, containerRect.width) / containerRect.width
        const newValue = snapValueToStep(newNormalizedValue * (max - min), min, max, step)
        setValues([...values, newValue].sort((a, b) => a - b))
    })

    const handleRemoveValue = useCallbackRef((value: number) => {
        setValues(values.filter(v => v !== value))
    })

    return (
        <SliderRoot {...restProps}>
            { labelText ? (
                <SliderLabel>
                    { labelText }
                </SliderLabel>
            ) : null }

            <SliderTrackContainer
                ref={containerRef}
                onDoubleClick={handleDoubleClick}
            >
                <SliderTrack />

                { marks?.map((mark, index) => {
                    const normalizedValue = mark.value / (max - min)
                    return (
                        <SliderMark
                            key={index}
                            style={{ left: `${normalizedValue * 100}%` }}
                        >
                            { mark.label }
                        </SliderMark>
                    )
                }) }

                { values.map((value, index) => {
                    return (
                        <SliderTrumb
                            key={index}
                            containerRect={containerRect}
                            value={value}
                            onValueChange={(newValue: number) => {
                                if (disabledEdge && (newValue === min || newValue === max)) {
                                    return
                                }
                                const valuesCopy = [...values]
                                valuesCopy[index] = newValue
                                setValues(valuesCopy)
                            }}
                            min={min}
                            max={max}
                            step={step}
                            onEnd={() => setValues([...values].sort((a, b) => a - b))}
                            onRemove={handleRemoveValue}
                            disabled={disabledEdge && (index === 0 || index === values.length - 1)}
                        />
                    )
                }) }
            </SliderTrackContainer>
        </SliderRoot>
    )
}

const SliderRoot = styled(Field)({
    width: '100%',
    display: 'flex',
})

const SliderLabel = styled(FieldLabel)({
    display: 'flex',
    justifyContent: 'space-between',
})

const SliderTrackContainer = styled.div({
    position: 'relative',
    display: 'flex',
    height: '4px',
    boxSizing: 'content-box',
    paddingBlock: '32px',
    marginInline: '8px',
})

const SliderTrack = styled.div({
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 'inherit',
    translate: '0 -50%',
    backgroundColor: 'rgba(0 0 0 / .1)',
})

const SliderMark = styled.div({
    position: 'absolute',
    bottom: '4px',
    translate: '-50%',
    display: 'flex',
    height: '.75rem',
    fontSize: '.75rem',
    lineHeight: 1,
    color: 'rgba(0 0 0 / .6)',
    userSelect: 'none',

    '&::after': {
        position: 'absolute',
        content: '""',
        top: '-4px',
        height: '3px',
        left: '50%',
        translate: '-50%',
        width: '1px',
        backgroundColor: 'rgba(0 0 0 / .6)',
    }
})

type SliderTrumbProps = {
    containerRect: DOMRect
    value: number
    onValueChange(value: number): void
    min: number
    max: number
    step: number
    disabled?: boolean
    onStart?(): void
    onEnd?(): void
    onRemove?(value: number): void
}

const SliderTrumb: React.FC<Omit<React.HTMLAttributes<HTMLDivElement>, keyof SliderTrumbProps> & SliderTrumbProps> = props => {
    const {
        containerRect,
        value,
        onValueChange,
        min,
        max,
        step,
        disabled,
        onStart,
        onEnd,
        onRemove,
        ...restProps
    } = props
    const trumbRef = useRef<HTMLDivElement>(null)
    const pointerIdRef = useRef(null)
    const handlePointerDown = useCallbackRef((evt: React.PointerEvent<HTMLDivElement>) => {
        if (disabled) return false
        if (trumbRef.current) {
            pointerIdRef.current = evt.pointerId
            trumbRef.current.setPointerCapture(pointerIdRef.current)
            onStart?.()
        }
    })
    const handlePointerMove = useCallbackRef((evt: React.PointerEvent) => {
        if (disabled) return false
        if (pointerIdRef.current) {
            const newLeft = evt.clientX - containerRect.left
            const newNormalizedValue = clamp(newLeft, 0, containerRect.width) / containerRect.width
            const newValue =  newNormalizedValue * (max - min)
            if (Math.abs(newValue - value) > step / 2) {
                onValueChange?.(roundToStepPrecision(value + (step * Math.sign(newValue - value)), step))
            }
        }
    })
    const handlePointerUp = useCallbackRef((evt: React.PointerEvent<HTMLDivElement>) => {
        if (disabled) return false
        if (pointerIdRef.current) {
            trumbRef.current.releasePointerCapture(pointerIdRef.current)
            pointerIdRef.current = null
            onEnd?.()
        }
    })
    const handleDoubleClick = useCallbackRef((evt: React.PointerEvent<HTMLDivElement>) => {
        if (disabled) return false
        evt.stopPropagation()
        onRemove?.(value)
    })
    const normalizedValue = value / (max - min)
    return (
        <InfoTooltip message={value}>
            <SliderTrumbRoot
                ref={trumbRef}
                style={{ left: `${normalizedValue * 100}%` }}
                data-disabled={disabled}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onDoubleClick={handleDoubleClick}
                {...restProps}
            />
        </InfoTooltip>
    )
}

const SliderTrumbRoot = styled.div({
    position: 'absolute',
    top: '50%',
    translate: '-50% -50%',
    width: '16px',
    height: '16px',
    backgroundColor: 'rgba(0 0 0 / 1)',
    borderRadius: '50%',
    cursor: 'pointer',

    '&[data-disabled="true"]': {
        border: '2px solid rgba(0 0 0 / 1)',
        backgroundColor: 'rgba(255 255 255 / 1)',
        cursor: 'not-allowed',
    },
})

// type UseSliderProps = {}

// function useSlider(props: UseSliderProps) {
//     const { value: valueProp, onChange } = props
//     const [container, setContainer] = useState<HTMLDivElement>()
//     const [trumb, setTrumb] = useState<HTMLDivElement>()
//     const [value, setValue] = useControllableState<number>({
//         defaultProp: 0,
//         prop: valueProp,
//         onChange,
//     })
//     const containerRectRef = useRef<DOMRect>(null)
//     const pointerIdRef = useRef(null)
//     useEffect(() => {
//         if (container) {
//             containerRectRef.current = container.getBoundingClientRect()
//         }
//     }, [container])
//     const sliderProps = useMemo(
//         () => ({
//             ref: setContainer,
//             onPointerDown(evt: React.PointerEvent) {
//                 const newLeft = evt.clientX - containerRectRef.current.left
//                 const newValue =
//                     clamp(newLeft, 0, containerRectRef.current.width) /
//                     containerRectRef.current.width
//                 setValue(newValue)
//             },
//         }),
//         []
//     )
//     const trumbProps = useMemo(
//         () => ({
//             ref: setTrumb,
//             onPointerDown(evt: React.PointerEvent) {
//                 if (trumb) {
//                     pointerIdRef.current = evt.pointerId
//                     trumb.setPointerCapture(pointerIdRef.current)
//                 }
//             },
//             onPointerMove(evt: React.PointerEvent) {
//                 if (pointerIdRef.current) {
//                     const newLeft = evt.clientX - containerRectRef.current.left
//                     const newValue =
//                         clamp(newLeft, 0, containerRectRef.current.width) /
//                         containerRectRef.current.width
//                     setValue(newValue)
//                 }
//             },
//             onPointerUp(evt: React.PointerEvent) {
//                 if (pointerIdRef.current) {
//                     trumb.releasePointerCapture(pointerIdRef.current)
//                     pointerIdRef.current = null
//                 }
//             },
//         }),
//         [trumb]
//     )
//     return {
//         sliderProps,
//         trumbProps,
//     }
// }

const clamp = (a: number, min: number = 0, max: number = 1) => Math.min(max, Math.max(min, a))
