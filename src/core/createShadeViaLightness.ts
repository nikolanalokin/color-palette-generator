import { Color, okhsl } from 'culori'
import { bezier, invlerp, lerp, linear, Point } from './math'
import { findNearestValueInScale, getColorInfo } from './utils'
import { ColorInfo } from './types'

export type ShadeFnOptions = {
    baseColor: Color | string
    baseTone?: number
    tone: number
    scale: number[]
    fixBase?: boolean
    hueShift?: number
    decreaseSaturationRatio?: number
}

export type ShadeFnResult = ColorInfo

/**
 * Функция создания оттенка с использованием цветового пространства OKHSL
 * @param {object} opts
 * @param {string} opts.baseColor - опорный цвет в hex
 * @param {number} opts.baseTone - желаемый оттенок
 * @param {number} opts.tone - желаемый оттенок
 * @param {number[]} opts.scale - шкала, в рамках которой определяется оттенок (как минимум должны присутствовать первое и последнее значение)
 * @param {boolean} opts.fixBase - зафиксировать входной цвет
 * @param {boolean} opts.hueShift - смещение цветового тона
 * @param {boolean} opts.decreaseSaturationRatio - коэффициент уменьшения насыщенности
 * @returns {string} итоговый цвет оттенка в hex
 */
export function createShadeViaLightness (opts: ShadeFnOptions): ShadeFnResult {
    const {
        baseColor,
        baseTone,
        tone,
        scale,
        fixBase,
        hueShift = 0,
        decreaseSaturationRatio = 0,
    } = opts

    const baseColorShadeNumber = baseTone ?? findClosestShadeNumber(baseColor, scale)
    const inputScaleValue = invlerp(scale.at(0), scale.at(-1), baseColorShadeNumber)
    const scaleValue = invlerp(scale.at(0), scale.at(-1), tone)
    const shadeColor = { ...okhsl(baseColor) }

    // сохраняем исходный цвет если используется подгонка по шкале контрастности
    if (!fixBase || tone !== baseColorShadeNumber) {
        if (hueShift !== 0) {
            shadeColor.h = computeScaleHue(scaleValue, shadeColor.h, inputScaleValue, hueShift)
        }

        if (0 < decreaseSaturationRatio && decreaseSaturationRatio < 1) {
            shadeColor.s = computeScaleSaturationWithLocalPeak(scaleValue, shadeColor.s * (1 - decreaseSaturationRatio), shadeColor.s, inputScaleValue)
        }

        shadeColor.l = computeScaleLightness(scaleValue)
    }

    return getColorInfo(shadeColor)
}

function computeScaleHue (scaleValue: number, baseHue: number, scaleInitial: number = 1, hueShift: number) {
    return linear(scaleValue, -hueShift, scaleInitial, baseHue)
}

const P0: Point = [0, 0]
const P1: Point = [0.7, 0.15]
const P2: Point = [1, 1]

function computeScaleLightness (scaleValue: number) {
    const l = 1 - scaleValue
    // const l = 1 - Math.pow(scaleValue, 2)
    // const l = 1 - Math.pow(scaleValue, 3)
    // const l = bezier(scaleValue, [0, 1], [0.2, 0.8], [0.4, 0.6], [1, 0])[1]
    // console.log(`x: ${scaleValue}, l: ${l}`)
    return l

    const scalePoint = bezier(scaleValue, P0, P1, P2)

    // const scalePoint = bezier(
    //     scaleValue,
    //     [0, 0],
    //     [0.3, 0.1],
    //     [0.8, 0.2],
    //     [1, 1],
    // )

    return 1 - scalePoint[1]
}

function computeScaleSaturationWithLocalPeak (scaleValue: number, minSaturation: number, maxSaturation: number, scalePeak: number) {
    if (scaleValue < scalePeak) {
        const a = (minSaturation - maxSaturation) / Math.pow(0 - scalePeak, 2)
        return a * Math.pow(scaleValue - scalePeak, 2) + maxSaturation
    }

    const a = (minSaturation - maxSaturation) / Math.pow(1 - scalePeak, 2)
    return a * Math.pow(scaleValue - scalePeak, 2) + maxSaturation
}

/** Более простая фукнкция изменения насыщенности */
function computeScaleSaturation (scaleValue: number, minSaturation: number, maxSaturation: number) {
    const chromaDifference = maxSaturation - minSaturation
    return (
        -4 * chromaDifference * Math.pow(scaleValue, 2) +
        4 * chromaDifference * scaleValue +
        minSaturation
    )
}

export function findClosestShadeNumber (inputColor: Color | string, scale: number[]) {
    const inputOkhls = okhsl(inputColor)

    const b = 1 - inputOkhls.l
    const p0 = P0[1]
    const p1 = P1[1]
    const p2 = P2[1]

    const scaleValue = (p0 - p1 + Math.sqrt(b * (p0 - 2 * p1 + p2) + Math.pow(p1, 2) - p0 * p2)) / (p0 - 2 * p1 + p2)
    // const scaleValue = Math.sqrt((inputOkhls.l - P0[1]) / (P2[1] - P1[1]))

    const inputScaleNumber = lerp(scale.at(0), scale.at(-1), scaleValue)
    return findNearestValueInScale(inputScaleNumber, scale)
}

// const MAX_YELLOW_SHIFT = 10
// const YELLOW_HUE = 110
// const MAX_BLUE_SHIFT = -20
// const BLUE_HUE = 264

// function computeScaleHue (scaleValue: number, baseHue: number, scaleInitial: number = 1) {
//     let hueShift = 0
//     if (YELLOW_HUE <= baseHue && baseHue < BLUE_HUE) {
//         const shftedBaseHue = (baseHue - 110) % 360
//         hueShift = ((MAX_BLUE_SHIFT - MAX_YELLOW_SHIFT) / (BLUE_HUE - YELLOW_HUE)) * shftedBaseHue + MAX_YELLOW_SHIFT
//     } else {
//         const shftedBaseHue = (baseHue + 96) % 360
//         hueShift = ((MAX_YELLOW_SHIFT - MAX_BLUE_SHIFT) / (YELLOW_HUE + 96)) * shftedBaseHue + MAX_BLUE_SHIFT
//     }
//     return baseHue + hueShift * (scaleInitial - scaleValue)
// }

// const y1 = MAX_YELLOW_SHIFT
// const y2 = MAX_BLUE_SHIFT
// const x1 = Math.cos(toRad(YELLOW_HUE)) * (y1 / Math.sin(toRad(YELLOW_HUE)))
// const x2 = Math.cos(toRad(BLUE_HUE)) * (y2 / Math.sin(toRad(BLUE_HUE)))
// const r1 = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2))
// const r2 = Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2))
