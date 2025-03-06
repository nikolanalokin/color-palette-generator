import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { bezier, clamp, Point, round } from '../../astral'
import { useCallbackRef, useControllableState } from '../hooks'
import styled from '@emotion/styled'

const scale = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

const plot = {
    w: 200,
    h: 200,
}

const legend = {
    w: 30,
    h: plot.h,
}

const padding = {
    l: 20,
    t: 20,
    r: 0,
    b: 4,
}

const gap = 20

export type BezierPlotProps = {
    p0?: Point
    onP0Change?(point: Point): void
    p1?: Point
    onP1Change?(point: Point): void
    p2?: Point
    onP2Change?(point: Point): void
}

export const BezierPlot: React.FC<BezierPlotProps> = props => {
    const {
        p0: p0Props,
        onP0Change,
        p1: p1Prop,
        onP1Change,
        p2: p2Props,
        onP2Change,
    } = props
    const [p0, setP0] = useControllableState<Point>({
        defaultProp: [0, 0],
        prop: p0Props,
        onChange: onP0Change,
    })
    const [p1, setP1] = useControllableState<Point>({
        defaultProp: [0.7, 0.3],
        prop: p1Prop,
        onChange: onP1Change,
    })
    const [p2, setP2] = useControllableState<Point>({
        defaultProp: [1, 1],
        prop: p2Props,
        onChange: onP2Change,
    })
    const normalizedScale = useMemo(() => scale.map(v => v / (scale.at(-1) - scale.at(0))), [scale])
    const points = useMemo(() => normalizedScale.map(v => bezier(v, p0, p1, p2)), [normalizedScale, p0, p1, p2])
    const size = {
        w: padding.l + plot.w + gap + legend.w + padding.r,
        h: padding.t + plot.h + padding.b,
    }
    const getPlotX = (x: number) => {
        return x * plot.w + padding.l
    }
    const getPlotY = (y: number) => {
        return y * plot.h + padding.t
    }
    const getLegendX = (x: number) => {
        return padding.l + plot.w + gap + x
    }
    const getLegendY = (y: number) => {
        return padding.t + y
    }

    const containerRef = useRef(null)
    useLayoutEffect(() => {
        setContainerRect(containerRef.current?.getBoundingClientRect())
    }, [])
    const [containerRect, setContainerRect] = useState<DOMRect>(null)
    const dragP0Props = useDrag({
        containerRect,
        onDragMove: (value: Point) => {
            setP0(value)
        }
    })
    const dragP1Props = useDrag({
        containerRect,
        onDragMove: (value: Point) => {
            setP1(value)
        }
    })
    const dragP2Props = useDrag({
        containerRect,
        onDragMove: (value: Point) => {
            setP2(value)
        }
    })
    return (
        <svg
            height={400}
            viewBox={`0 0 ${size.w} ${size.h}`}
        >
            {/* <g stroke="currentColor" strokeWidth={1} strokeOpacity={1}>
                <line x1={box.l} x2={box.r} y1={box.b} y2={box.b} />
                <line x1={box.l} x2={box.l} y1={box.t} y2={box.b} />
            </g> */}

            <rect x={getPlotX(0)} y={getPlotY(0)} width={plot.w} height={plot.h} fill="none" ref={containerRef} />
            <rect x={getLegendX(0)} y={getLegendY(0)} width={legend.w} height={legend.h} fill="none" />

            <g textAnchor="start">
                <Text x={getPlotX(0) - 2} y={getPlotY(0) - 10}>
                    ↑ channel
                </Text>
            </g>

            <g stroke="currentColor" strokeWidth={1} strokeOpacity={.1} strokeDasharray={2}>
                <line x1={getPlotX(0)} x2={getPlotX(1)} y1={getPlotY(0)} y2={getPlotY(0)} />
                <line x1={getPlotX(0)} x2={getPlotX(1)} y1={getPlotY(.2)} y2={getPlotY(.2)} />
                <line x1={getPlotX(0)} x2={getPlotX(1)} y1={getPlotY(.4)} y2={getPlotY(.4)} />
                <line x1={getPlotX(0)} x2={getPlotX(1)} y1={getPlotY(.6)} y2={getPlotY(.6)} />
                <line x1={getPlotX(0)} x2={getPlotX(1)} y1={getPlotY(.8)} y2={getPlotY(.8)} />
                <line x1={getPlotX(0)} x2={getPlotX(1)} y1={getPlotY(1)} y2={getPlotY(1)} />
            </g>

            <g stroke="currentColor" strokeWidth={1} strokeOpacity={.1} strokeDasharray={2}>
                <line x1={getPlotX(0)} x2={getPlotX(0)} y1={getPlotY(0)} y2={getPlotY(1)} />
                <line x1={getPlotX(.2)} x2={getPlotX(.2)} y1={getPlotY(0)} y2={getPlotY(1)} />
                <line x1={getPlotX(.4)} x2={getPlotX(.4)} y1={getPlotY(0)} y2={getPlotY(1)} />
                <line x1={getPlotX(.6)} x2={getPlotX(.6)} y1={getPlotY(0)} y2={getPlotY(1)} />
                <line x1={getPlotX(.8)} x2={getPlotX(.8)} y1={getPlotY(0)} y2={getPlotY(1)} />
                <line x1={getPlotX(1)} x2={getPlotX(1)} y1={getPlotY(0)} y2={getPlotY(1)} />
            </g>

            <g stroke="currentColor" strokeWidth={.5} strokeOpacity={.2} strokeDasharray={4}>
                <line x1={getPlotX(p0[0])} x2={getPlotX(p1[0])} y1={getPlotY(p0[1])} y2={getPlotY(p1[1])} />
                <line x1={getPlotX(p2[0])} x2={getPlotX(p1[0])} y1={getPlotY(p2[1])} y2={getPlotY(p1[1])} />
            </g>

            <g stroke="currentColor" strokeWidth={1} strokeOpacity={.6} fill="none">
                { points.map(point => (
                    <circle cx={getPlotX(point[0])} cy={getPlotY(point[1])} r={2} />
                )) }
            </g>

            <g stroke="currentColor" strokeWidth={1} strokeOpacity={1} fill="white">
                <circle cx={getPlotX(p0[0])} cy={getPlotY(p0[1])} r={3} {...dragP0Props} />
                <circle cx={getPlotX(p1[0])} cy={getPlotY(p1[1])} r={3} {...dragP1Props} />
                <circle cx={getPlotX(p2[0])} cy={getPlotY(p2[1])} r={3} {...dragP2Props} />
            </g>

            <g>
                { points.map((point, index) => (
                    <>
                        <circle cx={getLegendX(0)} cy={getLegendY(point[1] * legend.h)} r={2} />
                        <Text x={getLegendX(6)} y={getLegendY(point[1] * legend.h)} dy={2}>
                            { scale[index] }
                        </Text>
                    </>
                )) }
            </g>
        </svg>
    )
}

const Text = styled.text({
    fontSize: '7px',
    fill: 'rgba(0 0 0 / .6)',
})

function useDrag ({
    containerRect,
    onDragStart,
    onDragMove,
    onDragEnd,
    disabled,
}: any) {
    const elementRef = useRef(null)
    const pointerIdRef = useRef(null)
    const onPointerDown = useCallbackRef((evt: React.PointerEvent) => {
        if (disabled) return false
        if (elementRef.current) {
            pointerIdRef.current = evt.pointerId
            elementRef.current.setPointerCapture(pointerIdRef.current)
            onDragStart?.()
        }
    })
    const onPointerMove = useCallbackRef((evt: React.PointerEvent) => {
        if (disabled) return false
        if (pointerIdRef.current) {
            const newLeft = evt.clientX - containerRect.left
            const newTop = evt.clientY - containerRect.top
            onDragMove?.([
                round(clamp(newLeft, 0, containerRect.width) / containerRect.width),
                round(clamp(newTop, 0, containerRect.height) / containerRect.height),
            ])
        }
    })
    const onPointerUp = useCallbackRef((evt: React.PointerEvent) => {
        if (disabled) return false
        if (pointerIdRef.current) {
            elementRef.current.releasePointerCapture(pointerIdRef.current)
            pointerIdRef.current = null
            onDragEnd?.()
        }
    })
    return {
        ref: elementRef,
        onPointerDown,
        onPointerMove,
        onPointerUp,
        style: { cursor: 'pointer' },
    }
}
