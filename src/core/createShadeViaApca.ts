import { Color, formatHex, Okhsl, okhsl } from 'culori'
import { invlerp, lerp, linear, range } from './math'
import {
    APCA_BLACK_ON_RANGE,
    APCA_ON_BLACK_RANGE,
    APCA_ON_WHITE_RANGE,
    APCA_WHITE_ON_RANGE,
    BLACK_HEX,
    contrastAPCA,
    findNearestValueInScale,
    getColorInfo,
    WHITE_HEX
} from './utils'
import { ColorInfo } from './types'

export type ShadeFnOptions = {
    baseColor: Color | string
    baseTone?: number
    tone: number
    scale: number[]
    fixBase?: boolean
    hueShift?: number
    decreaseSaturationRatio?: number
    contrastScore?: number
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
 * @param {boolean} opts.contrastScore - фиксированное значение контрастности
 * @returns {string} итоговый цвет оттенка в hex
 */
export function createShadeViaApca (opts: ShadeFnOptions): ShadeFnResult {
    const {
        baseColor,
        baseTone,
        tone,
        scale,
        fixBase,
        hueShift = 0,
        decreaseSaturationRatio = 0,
        contrastScore,
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

        shadeColor.l = computeScaleLightnessByAPCA(scaleValue, shadeColor, contrastScore)
    }

    return getColorInfo(shadeColor)
}

function computeScaleHue (scaleValue: number, baseHue: number, scaleInitial: number = 1, hueShift: number) {
    return linear(scaleValue, -hueShift, scaleInitial, baseHue)
    // return baseHue + hueShift * (scaleInitial - scaleValue)
}

function computeScaleSaturationWithLocalPeak (scaleValue: number, minSaturation: number, maxSaturation: number, scalePeak: number) {
    if (scaleValue < scalePeak) {
        const a = (minSaturation - maxSaturation) / Math.pow(0 - scalePeak, 2)
        return a * Math.pow(scaleValue - scalePeak, 2) + maxSaturation
    }

    const a = (minSaturation - maxSaturation) / Math.pow(1 - scalePeak, 2)
    return a * Math.pow(scaleValue - scalePeak, 2) + maxSaturation
}

function computeScaleLightnessByAPCA (scaleValue: number, baseOkhsl: Okhsl, score?: number) {
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

export function findClosestShadeNumber (inputColor: Color | string, scale: number[]) {
    const inputHex = formatHex(inputColor)
    const blackContrastScore = contrastAPCA(BLACK_HEX, inputHex)
    const whiteContrastScore = contrastAPCA(WHITE_HEX, inputHex)
    const blackToneNumber = range(APCA_BLACK_ON_RANGE[0], APCA_BLACK_ON_RANGE[1], scale.at(0), scale.at(-1), blackContrastScore)
    const whiteToneNumber = range(APCA_WHITE_ON_RANGE[0], APCA_WHITE_ON_RANGE[1], scale.at(0), scale.at(-1), whiteContrastScore)
    let inputScaleNumber = 500
    if (whiteContrastScore === 0) {
        inputScaleNumber = blackToneNumber
    } else if (blackContrastScore === 0) {
        inputScaleNumber = whiteToneNumber
    } else {
        inputScaleNumber = (blackToneNumber + whiteToneNumber) / 2
    }
    return findNearestValueInScale(inputScaleNumber, scale)
}
