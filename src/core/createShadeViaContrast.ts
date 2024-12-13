import { Color, formatHex, Okhsl, okhsl } from 'culori'
import { invlerp, lerp, linear, range } from './math'
import {
    APCA_BLACK_ON_RANGE,
    APCA_ON_BLACK_RANGE,
    APCA_ON_WHITE_RANGE,
    APCA_WHITE_ON_RANGE,
    BLACK_HEX,
    contrastAPCA,
    deltaE,
    findNearestValueInScale,
    getColorInfo,
    uniqueId,
    WHITE_HEX
} from './utils'
import { CreateShadeFn, CreateShadeFnOptions, ShadeInfo } from './types'

export type CreateShadeViaContrastFnOptions = CreateShadeFnOptions & {
    hueShift?: number
    decreaseSaturationRatio?: number
    contrastScore?: number
}
export type CreateShadeViaContrastFn = CreateShadeFn<CreateShadeViaContrastFnOptions>

/**
 * Функция создания оттенка с использованием цветового пространства OKHSL
 * @param {string} inputColor - опорный цвет в hex
 * @param {number} tone - желаемый оттенок
 * @param {number[]} scale - шкала, в рамках которой определяется оттенок (как минимум должны присутствовать первое и последнее значение)
 * @param {object} opts
 * @param {boolean} opts.hueShift - смещение цветового тона
 * @param {boolean} opts.decreaseSaturationRatio - коэффициент уменьшения насыщенности
 * @param {boolean} opts.contrastScore - фиксированное значение контрастности
 * @returns {string} итоговый цвет оттенка в hex
 */
export const createShadeViaContrast: CreateShadeViaContrastFn = (inputColor: string | Color, tone: number, scale: number[], options?: CreateShadeViaContrastFnOptions): ShadeInfo => {
    const {
        hueShift = 0,
        decreaseSaturationRatio = 0,
        contrastScore,
    } = options

    const baseColor = okhsl(inputColor)
    const baseTone = findTone(inputColor, scale)
    const baseScaleValue = invlerp(scale.at(0), scale.at(-1), baseTone)
    const nearestTone = findNearestValueInScale(baseTone, scale)
    const nearestScaleValue = invlerp(scale.at(0), scale.at(-1), nearestTone)
    const shadeScaleValue = invlerp(scale.at(0), scale.at(-1), tone)
    const shadeColor = { ...baseColor }

    if (hueShift !== 0) {
        shadeColor.h = computeScaleHue(shadeScaleValue, shadeColor.h, nearestScaleValue, hueShift)
    }

    if (0 < decreaseSaturationRatio && decreaseSaturationRatio < 1) {
        shadeColor.s = computeScaleSaturation(shadeScaleValue, shadeColor.s * (1 - decreaseSaturationRatio), shadeColor.s, nearestScaleValue)
    }

    shadeColor.l = computeScaleLightness(shadeScaleValue, shadeColor, contrastScore)

    return {
        id: uniqueId(),
        number: tone,
        normalized: shadeScaleValue,
        ...getColorInfo(shadeColor),
        delta: deltaE(formatHex(baseColor), formatHex(shadeColor)),
    }
}

createShadeViaContrast.findTone = (color: string | Color, scale: number[]) => {
    return findTone(color, scale)
}

createShadeViaContrast.findScaleValue = (color: string | Color, scale: number[]) => {
    return invlerp(scale.at(0), scale.at(-1), findTone(color, scale))
}

function computeScaleHue (scaleValue: number, baseHue: number, scaleInitial: number = 1, hueShift: number) {
    return linear(scaleValue, -hueShift, scaleInitial, baseHue)
}

function computeScaleSaturation (scaleValue: number, minSaturation: number, maxSaturation: number, scalePeak: number) {
    if (scaleValue < scalePeak) {
        const a = (minSaturation - maxSaturation) / Math.pow(0 - scalePeak, 2)
        return a * Math.pow(scaleValue - scalePeak, 2) + maxSaturation
    }

    const a = (minSaturation - maxSaturation) / Math.pow(1 - scalePeak, 2)
    return a * Math.pow(scaleValue - scalePeak, 2) + maxSaturation
}

function computeScaleLightness (scaleValue: number, baseOkhsl: Okhsl, score?: number) {
    if (scaleValue === 0) return 1
    if (scaleValue === 1) return 0

    const fgHex = scaleValue <= .5 ? BLACK_HEX : WHITE_HEX

    const contrastScore = score || scaleValue <= .5
        ? lerp(APCA_ON_BLACK_RANGE.at(0), APCA_ON_BLACK_RANGE.at(-1), scaleValue)
        : lerp(APCA_ON_WHITE_RANGE.at(0), APCA_ON_WHITE_RANGE.at(-1), scaleValue)

    return findLightnessByContrastScore(baseOkhsl, fgHex, contrastScore)
}

function findLightnessByContrastScore (baseOkhsl: Okhsl, fgHex: string, contrastScore: number) {
    let result = null
    let threshold = 110
    // поиск значения светлоты цвета, дающее наиболее близкое значение контрастности
    for (let testLightness = 0; testLightness < 100; testLightness++) {
        const l = testLightness / 100
        const bgHex = formatHex({ ...baseOkhsl, l })
        const resultScore = contrastAPCA(bgHex, fgHex)
        const delta = Math.abs(Math.abs(contrastScore) - Math.abs(resultScore))

        if (delta < threshold) {
            threshold = delta
            result = l
        }
    }
    return result
}

export function findTone (inputColor: string | Color, scale: number[]) {
    const inputHex = formatHex(inputColor)
    const blackContrastScore = contrastAPCA(BLACK_HEX, inputHex)
    const whiteContrastScore = contrastAPCA(WHITE_HEX, inputHex)
    const blackToneNumber = range(APCA_BLACK_ON_RANGE[0], APCA_BLACK_ON_RANGE[1], scale.at(0), scale.at(-1), blackContrastScore)
    const whiteToneNumber = range(APCA_WHITE_ON_RANGE[0], APCA_WHITE_ON_RANGE[1], scale.at(0), scale.at(-1), whiteContrastScore)
    let inputTone = 500
    if (whiteContrastScore === 0) {
        inputTone = blackToneNumber
    } else if (blackContrastScore === 0) {
        inputTone = whiteToneNumber
    } else {
        inputTone = (blackToneNumber + whiteToneNumber) / 2
    }
    return inputTone
}
