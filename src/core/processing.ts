import { linear } from './math'

export type ComplexHueShiftOptions = {
    point1: number
    shift1: number
    point2: number
    shift2: number
}

export type HueShiftOptions = number | ComplexHueShiftOptions

export function computeScaleHue (scaleValue: number, baseHue: number, scaleInitial: number = 1, hueShift: HueShiftOptions) {
    if (typeof hueShift === 'number') {
        return linear(scaleValue, -hueShift, scaleInitial, baseHue)
    }
    let computeHueShift = 0
    if (hueShift.point1 <= baseHue && baseHue < hueShift.point2) {
        const shiftedBaseHue = (baseHue - hueShift.point1) % 360
        computeHueShift = ((hueShift.shift2 - hueShift.shift1) / (hueShift.point2 - hueShift.point1)) * shiftedBaseHue + hueShift.shift1
    } else {
        const shiftedBaseHue = (baseHue - (hueShift.point2 - 360)) % 360
        computeHueShift = ((hueShift.shift1 - hueShift.shift2) / (hueShift.point1 - (hueShift.point2 - 360))) * shiftedBaseHue + hueShift.shift2
    }
    return linear(scaleValue, -computeHueShift, scaleInitial, baseHue)
}
