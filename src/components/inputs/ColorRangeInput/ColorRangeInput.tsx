import styled from '@emotion/styled'
import { Color, formatCss, p3 } from 'culori'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useControllableState } from '../../hooks'
import { clamp, invlerp, lerp, precision, round, ticks } from '../../../core'
import { BaseInput } from '../shared/BaseInput'

type BaseColorRangeInputProps<C extends Color> = {
    value?: C
    onChange?(value: C): void
    channel?: Extract<Exclude<keyof C, 'mode' | 'alpha'>, string>
    step?: number
}

export type ColorRangeInputProps<C extends Color> = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseColorRangeInputProps<C>>
    & BaseColorRangeInputProps<C>

export function ColorRangeInput<C extends Color>(props: ColorRangeInputProps<C>) {
    const {
        value,
        onChange,
        channel,
        step = .01,
        ...restProps
    } = props

    const channelValue = value[channel] as number

    const handleChange = (newChannelValue: number) => {
        onChange?.({
            ...value,
            [channel]: newChannelValue,
        })
    }

    return (
        <ColorRangeInputRoot {...restProps}>
            <Range
                color={value}
                channel={channel}
                value={channelValue}
                onChange={value => handleChange(value)}
                step={step}
            />
            <Input
                color={value}
                channel={channel}
                value={channelValue}
                onChange={value => handleChange(value)}
                step={step}
            />
        </ColorRangeInputRoot>
    )
}

const ColorRangeInputRoot = styled.div(
    () => ({
        display: 'flex',
        columnGap: '12px',
    })
)

type InputProps = {
    color?: Color
    channel?: string
    value?: number
    onChange?(value: number): void
    step?: number
}

const Input = (props: InputProps) => {
    const {
        color,
        channel,
        value: valueProp,
        onChange,
        step = .01,
    } = props
    const range = getRange(color, channel)
    const value = valueProp
    const handleChange = (newValue: number) => {
        onChange?.(newValue)
    }
    return (
        <InputRoot
            type="number"
            value={value}
            min={range[0]}
            max={range[1]}
            step={step}
            onChange={evt => handleChange(parseFloat(evt.target.value))}
        />
    )
}

const InputRoot = styled(BaseInput)({
    width: '100px',
})

type RangeProps = {
    color?: Color
    channel?: string
    value?: number
    onChange?(value: number): void
    step?: number
}

const Range = (props: RangeProps) => {
    const {
        color,
        channel,
        value: valueProp,
        onChange,
        step = .01,
    } = props
    const range = getRange(color, channel)
    const valueNormalized = invlerp(range[0], range[1], valueProp)
    const {
        sliderProps,
        trumbProps,
    } = useSlider({
        value: valueNormalized,
        onChange(value: number) {
            onChange?.(round(lerp(range[0], range[1], value), precision(step)))
        }
    })
    return (
        <RangeRoot
            {...sliderProps}
            style={{ backgroundImage: generateBackground(color, channel, range) }}
        >
            <RangeTrumb
                {...trumbProps}
                style={{ left: `${valueNormalized * 100}%`, backgroundColor: getCssColor(color) }}
            />
        </RangeRoot>
    )
}

const RangeRoot = styled.div({
    position: 'relative',
    touchAction: 'none',
    height: '48px',
    minWidth: '200px',
    flexGrow: 1,
    borderRadius: '8px',
    backgroundClip: 'content-box',
    border: '1px dashed rgba(0 0 0 / .1)',
})

const RangeTrumb = styled.div({
    position: 'absolute',
    insetBlock: 0,
    width: '10px',
    boxShadow: '0 0 0 1px white, 0 0 0 2px black',
    cursor: 'grab',
    translate: '-50%',
})

function generateBackground (color: Color, channel: string, range: number[]) {
    let processedRange = []
    if (channel === 'h') {
        processedRange = getHueScale()
    } else if (channel === 'l') {
        processedRange = getRangeWithoutEdges(ticks(range, 5))
    } else {
        processedRange = getRangeWithoutEdges(range)
    }
    const stops = processedRange.map(value => getCssColor({ ...color, [channel]: value })).join(', ')
    return `linear-gradient(to right ${color.mode === 'oklch' ? 'in oklch' : ''}, ${stops})`
}

type UseSliderProps = {
    value?: number
    onChange?(value: number): void
}

function useSlider (props: UseSliderProps) {
    const { value: valueProp, onChange } = props
    const [container, setContainer] = useState<HTMLDivElement>()
    const [trumb, setTrumb] = useState<HTMLDivElement>()
    const [value, setValue] = useControllableState<number>({
        defaultProp: 0,
        prop: valueProp,
        onChange,
    })
    const containerRectRef = useRef<DOMRect>(null)
    const pointerIdRef = useRef(null)
    useEffect(() => {
        if (container) {
            containerRectRef.current = container.getBoundingClientRect()
        }
    }, [container])
    const sliderProps = useMemo(() => ({
        ref: setContainer,
        onPointerDown(evt: React.PointerEvent) {
            const newLeft = evt.clientX - containerRectRef.current.left
            const newValue = clamp(newLeft, 0, containerRectRef.current.width) / containerRectRef.current.width
            setValue(newValue)
        },
    }), [])
    const trumbProps = useMemo(() => ({
        ref: setTrumb,
        onPointerDown(evt: React.PointerEvent) {
            if (trumb) {
                pointerIdRef.current = evt.pointerId
                trumb.setPointerCapture(pointerIdRef.current)
            }
        },
        onPointerMove(evt: React.PointerEvent) {
            if (pointerIdRef.current) {
                const newLeft = evt.clientX - containerRectRef.current.left
                const newValue = clamp(newLeft, 0, containerRectRef.current.width) / containerRectRef.current.width
                setValue(newValue)
            }
        },
        onPointerUp(evt: React.PointerEvent) {
            if (pointerIdRef.current) {
                trumb.releasePointerCapture(pointerIdRef.current)
                pointerIdRef.current = null
            }
        },
    }), [trumb])
    return {
        sliderProps,
        trumbProps,
    }
}

function getRange (color: Color, channel: string) {
    if (color.mode === 'okhsl') {
        return {
            h: [0, 360],
            s: [0, 1],
            l: [0, 1],
        }[channel]
    }
    if (color.mode === 'oklch') {
        return {
            l: [0, 1],
            c: [0, .4],
            h: [0, 360],
        }[channel]
    }

    return null
}

const STEP = .01

function getRangeWithoutEdges (range: number[]) {
    return range.map((v, i) => i === 0 ? (v + STEP) : (i === range.length - 1) ? (v - STEP) : v)
}

function getHueScale () {
    return new Array(360 / 30 + 1).fill(0).reduce((acc, _, i) => [...acc, i * 30], [])
}

function getCssColor (value: Color | string) {
    return typeof value === 'object' && value.mode === 'oklch' ? formatCss(value) : formatCss(p3(value))
}
