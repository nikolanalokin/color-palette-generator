import styled from '@emotion/styled'
import { ShadeInfo } from '../../core'
import * as Plot from "@observablehq/plot"
import { useEffect, useRef } from 'react'

const defaultMargin = { top: 20, right: 20, bottom: 32, left: 40 }

export type PlotLinePlotProps = React.HTMLAttributes<HTMLDivElement> & {
    data: ShadeInfo[]
    getX: (d: ShadeInfo) => number
    getY: (d: ShadeInfo) => number
    xDomain: [number, number]
    yDomain: [number, number]
    xLabel: string
    yLabel: string
    dotFill?(d: [number, number]): string
    width?: number
    height?: number
    margin?: { top: number; right: number; bottom: number; left: number }
}

export const PlotLinePlot = (props: PlotLinePlotProps) => {
    const {
        data,
        getX,
        getY,
        xDomain,
        yDomain,
        xLabel,
        yLabel,
        dotFill = () => 'white',
        width,
        height,
        margin = defaultMargin,
        ...restProps
    } = props

    const containerRef = useRef<HTMLDivElement>()

    useEffect(() => {
        if (data === undefined) return
        const plot = Plot.plot({
            width: width,
            height: height,
            grid: true,
            x: { domain: xDomain, label: xLabel },
            y: { domain: yDomain, label: yLabel },
            marks: [
                Plot.line(data.map(d => [getX(d), getY(d)]), { curve: 'linear', strokeWidth: 1 }),
                Plot.dot(data.map(d => [getX(d), getY(d)]), { tip: { fontSize: 12 }, r: 4, fill: dotFill, stroke: 'black' }),
            ]
        })
        containerRef.current.append(plot)
        return () => plot.remove()
    }, [data])

    return (
        <PlotRoot {...restProps} ref={containerRef} />
    )
}

const PlotRoot = styled.div({
    position: 'relative'
})
