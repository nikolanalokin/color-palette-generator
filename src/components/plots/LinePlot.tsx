import styled from '@emotion/styled'
import { useMemo } from 'react'
import { ShadeInfo } from '../../core'
import { scaleLinear } from '@visx/scale'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { LinePath } from '@visx/shape'
import { curveLinear } from '@visx/curve'
import { Group } from '@visx/group'
import { MarkerCircle } from '@visx/marker'
import { Grid } from '@visx/grid'

const defaultMargin = { top: 20, right: 20, bottom: 32, left: 40 }

export type LinePlotProps = React.SVGAttributes<SVGSVGElement> & {
    data: ShadeInfo[]
    getX: (d: ShadeInfo) => number
    getY: (d: ShadeInfo) => number
    xDomain?: [number, number]
    yDomain?: [number, number]
    width?: number
    height?: number
    margin?: { top: number; right: number; bottom: number; left: number }
}

export const LinePlot = (props: LinePlotProps) => {
    const {
        data,
        getX,
        getY,
        xDomain,
        yDomain,
        width,
        height,
        margin = defaultMargin,
        ...restProps
    } = props

    // bounds
    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom

    const xScale = useMemo(
        () => scaleLinear({
            domain: xDomain ?? [Math.min(...data.map(getX)), Math.max(...data.map(getX))],
            range: [0, xMax],
        }),
        [data, xMax]
    )

    const yScale = useMemo(
        () => scaleLinear({
            domain: yDomain ?? [Math.min(...data.map(getY)), Math.max(...data.map(getY))],
            range: [yMax, 0],
        }),
        [data, yMax]
    )

    return (
        <PlotRoot>
            <svg {...restProps} width={width} height={height}>
                {/* сетка */}
                <Grid
                    top={margin.top}
                    left={margin.left}
                    width={xMax}
                    height={yMax}
                    xScale={xScale}
                    yScale={yScale}
                    stroke='black'
                    strokeOpacity={0.1}
                />

                <MarkerCircle
                    id="marker-circle"
                    fill="#333333"
                    size={2}
                    refX={2}
                />

                <Group
                    top={margin.top}
                    left={margin.left}
                >
                    <LinePath<ShadeInfo>
                        curve={curveLinear}
                        data={data}
                        x={(d) => xScale(getX(d)) ?? 0}
                        y={(d) => yScale(getY(d)) ?? 0}
                        stroke="#333333"
                        strokeWidth={1}
                        strokeOpacity={1}
                        shapeRendering="geometricPrecision"
                        markerMid="url(#marker-circle)"
                        markerStart="url(#marker-circle)"
                        markerEnd="url(#marker-circle)"
                    />
                </Group>

                {/* оси */}
                <AxisLeft
                    top={margin.top}
                    left={margin.left}
                    scale={yScale}
                    tickLabelProps={{
                        fill: 'black',
                        fontSize: 12,
                        fontFamily: '"IBM Plex Mono", "Courier New", Courier, monospace',
                        textAnchor: 'end',
                    }}
                />
                <AxisBottom
                    top={yMax + margin.top}
                    left={margin.left}
                    scale={xScale}
                    tickFormat={x => String(x)}
                    tickLabelProps={{
                        fill: 'black',
                        fontSize: 12,
                        fontFamily: '"IBM Plex Mono", "Courier New", Courier, monospace',
                        textAnchor: 'middle',
                    }}
                />
            </svg>
        </PlotRoot>
    )
}

const PlotRoot = styled.div({
    position: 'relative'
})
