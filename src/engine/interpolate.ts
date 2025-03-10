import { Color, getMode } from 'culori'
import { bezier, invlerp, lerp, linear, range } from './math'

export function interpolateChannel () {

}

export type InterpolatorProps = {
    channel: string
    min?: number
    max?: number
    method?: 'linear' | 'quad' | 'cube'
    inverse?: boolean
    form?: 'concave' | 'convex'
}

export function interpolate<C extends Color>(color: C, scaleValue: number, props: InterpolatorProps): C {
    const {
        channel,
        min = 0,
        max = 1,
        inverse,
        method = 'linear',
        form = 'concave',
    } = props

    const definition = getMode(color.mode)

    let channelRange = [0, 1], channelValue = color[channel]

    if ('ranges' in definition) {
        channelRange = definition.ranges[channel]
    }

    const scaledScaleValue = range(0, 1, min, max, scaleValue)

    if (method === 'linear') {
        channelValue = linear(scaledScaleValue)
    }

    if (method === 'quad') {
        if (form === 'concave') {
            channelValue = Math.pow(scaledScaleValue, 2)
        } else {
            channelValue = Math.sqrt(scaledScaleValue) // 1 - Math.pow(scaledScaleValue, 2)
        }
    }

    if (method === 'cube') {
        if (form === 'concave') {
            channelValue = Math.pow(scaledScaleValue, 3) // 1 - Math.pow(scaledScaleValue, 3)
        } else {
            channelValue = Math.cbrt(scaledScaleValue)
        }
    }

    if (inverse) {
        channelValue = 1 - channelValue
    }

    if (inverse) {
        channelValue = range(1, 0, channelRange[1], channelRange[0], channelValue)
    } else {
        channelValue = range(0, 1, channelRange[0], channelRange[1], channelValue)
    }

    return {
        ...color,
        [channel]: channelValue,
    }
}

function linearInterpolate (scaleValue: number, props) {
    const scaledScaleValue = range(0, 1, props.min, props.max, scaleValue)
    let channelValue = linear(scaledScaleValue)
    if (props.inverse) {
        channelValue = 1 - channelValue
    }
    return channelValue
}

function quadInterpolate (scaleValue: number, props) {
    const scaledScaleValue = range(0, 1, props.min, props.max, scaleValue)
    let channelValue
    if (props.form === 'concave') {
        channelValue = Math.pow(scaledScaleValue, 2)
    } else {
        channelValue = Math.sqrt(scaledScaleValue)
    }
    if (props.inverse) {
        channelValue = 1 - channelValue
    }
    return channelValue
}

function cubeInterpolate (scaleValue: number, props) {
    const scaledScaleValue = range(0, 1, props.min, props.max, scaleValue)
    let channelValue
    if (props.form === 'concave') {
        channelValue = Math.pow(scaledScaleValue, 3)
    } else {
        channelValue = Math.cbrt(scaledScaleValue)
    }
    if (props.inverse) {
        channelValue = 1 - channelValue
    }
    return channelValue
}

function bezierInterpolate (scaleValue: number, props) {
    let channelValue = bezier(scaleValue, props.p0, props.p1, props.p2)[1]
    return channelValue
}
