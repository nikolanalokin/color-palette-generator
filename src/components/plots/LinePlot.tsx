import styled from '@emotion/styled'
import * as d3 from 'd3'
import { useRef, useEffect } from 'react'
import { useChartDimensions } from './useChartDimensions'

export type LinePlotProps = React.HTMLAttributes<HTMLDivElement> & {
    data: [number, number][]
    xMin?: number
    xMax?: number
    yMin?: number
    yMax?: number
}

export const LinePlot = (props: LinePlotProps) => {
    const { data, xMin, xMax, yMin, yMax, ...restProps } = props
    const [ref, dms] = useChartDimensions({
        height: 320,
        marginTop: 0,
        marginRight: 0,
        marginBottom: 20,
        marginLeft: 30,
    })
    const gx = useRef<SVGGElement>()
    const gy = useRef<SVGGElement>()
    const x = d3.scaleLinear([xMin, xMax], [dms.marginLeft, dms.boundedWidth])
    const y = d3.scaleLinear([yMin, yMax], [dms.boundedHeight, dms.marginTop])
    const line = d3.line(d => x(d[0]), d => y(d[1]))
    useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x])
    useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y])
    return (
        <PlotRoot {...restProps} ref={ref}>
            <svg width={dms.width} height={dms.height}>
                <g ref={gx} transform={`translate(0, ${dms.boundedHeight})`} />
                <g ref={gy} transform={`translate(${dms.marginLeft}, 0)`} />
                <path fill="none" stroke="currentColor" strokeWidth="1" d={line(data)} />
                <g fill="white" stroke="currentColor" strokeWidth="1">
                    { data.map((d, i) => (
                        <circle key={i} cx={x(d[0])} cy={y(d[1])} r="2" />
                    )) }
                </g>
            </svg>
        </PlotRoot>
    )
}

const PlotRoot = styled.div(() => ({
    width: '100%',
    height: '100%',
}))
