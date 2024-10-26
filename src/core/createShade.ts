import { formatHex, Okhsl, okhsl } from 'culori'
import { bezier, invlerp, lerp, range } from './math'
import { contrastAPCA } from './utils'

export const DEFAULT_TONES_SCALE = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000]
export const BLACK_CONTRAST_SCORE = [106, 0]
export const WHITE_CONTRAST_SCORE = [0, -107.9]

export const BLACK_HEX = '#000000'
export const WHITE_HEX = '#ffffff'
/**
 * Диапазон смещения цветовых оттенков
 * Положительное значение смещает вправо (от красного к оранжевому)
 * Отрицательное значение смещает влево (от оранжевого к красному)
 */
export const HUE_SHIFT = 5

export type OkhslShadeFnProps = {
    baseColor: string
    baseTone?: number
    tone: number
    scale: number[]
    useApca?: boolean
    fixBase?: boolean
    hueShift?: number
    decreaseSaturationRatio?: number
}
/**
 * Функция создания оттенка с использованием цветового пространства OKHSL
 * @param {object} props
 * @param {string} props.baseColor - опорный цвет в hex
 * @param {number} props.baseTone - желаемый оттенок
 * @param {number} props.tone - желаемый оттенок
 * @param {number[]} props.scale - шкала, в рамках которой определяется оттенок (как минимум должны присутствовать первое и последнее значение)
 * @param {boolean} props.useApca - использовать подгонку по шкале контрастности
 * @returns {string} итоговый цвет оттенка в hex
 */
export function createShade (props: OkhslShadeFnProps): string {
    const {
        baseColor,
        baseTone,
        tone,
        scale,
        useApca,
        fixBase,
        hueShift = 0,
        decreaseSaturationRatio,
    } = props
    const baseColorShadeNumber = baseTone ?? findClosestShadeNumber(baseColor, scale)
    const inputScaleValue = invlerp(scale.at(0), scale.at(-1), baseColorShadeNumber)
    const scaleValue = invlerp(scale.at(0), scale.at(-1), tone)
    const shadeColor = okhsl(baseColor)
    // сохраняем исходный цвет если используется подгонка по шкале контрастности
    if (!fixBase || tone !== baseColorShadeNumber) {
        if (hueShift > 0) {
            shadeColor.h = computeScaleHue(scaleValue, shadeColor.h, inputScaleValue, hueShift)
        }
        if (0 < decreaseSaturationRatio && decreaseSaturationRatio < 1) {
            shadeColor.s = computeScaleSaturationWithLocalPeak(scaleValue, shadeColor.s * decreaseSaturationRatio, shadeColor.s, inputScaleValue)
        }
        shadeColor.l = computeScaleLightness(scaleValue, shadeColor, useApca)
    }
    return formatHex(shadeColor)
}

const computeScaleHue = (scaleValue: number, baseHue: number, scaleInitial: number = 1, hueShift: number) => {
    return baseHue + hueShift * (scaleInitial - scaleValue)
}

/** Более простая фукнкция изменения насыщенности */
const computeScaleSaturation = (scaleValue: number, minSaturation: number, maxSaturation: number) => {
    const chromaDifference = maxSaturation - minSaturation
    return (
        -4 * chromaDifference * Math.pow(scaleValue, 2) +
        4 * chromaDifference * scaleValue +
        minSaturation
    )
}

const computeScaleSaturationWithLocalPeak = (scaleValue: number, minSaturation: number, maxSaturation: number, scalePeak: number) => {
    if (scaleValue < scalePeak) {
        const a = (minSaturation - maxSaturation) / Math.pow(0 - scalePeak, 2)
        return a * Math.pow(scaleValue - scalePeak, 2) + maxSaturation
    }

    const a = (minSaturation - maxSaturation) / Math.pow(1 - scalePeak, 2)
    return a * Math.pow(scaleValue - scalePeak, 2) + maxSaturation
}

const computeScaleLightness = (scaleValue: number, baseOkhsl: Okhsl, useApca: boolean = false) => {
    if (!useApca) {
        return 1 - scaleValue
    }

    if (scaleValue === 0) {
        return 1
    }

    if (scaleValue === 1) {
        return 0
    }

    // // const l = 1 - scaleValue
    // const l = 1 - Math.pow(scaleValue, 2)
    // // const l = 1 - Math.pow(scaleValue, 3)
    // // const l = bezier(scaleValue, [0, 1], [0.2, 0.8], [0.4, 0.6], [1, 0])[1]
    // console.log(`x: ${scaleValue}, l: ${l}`)
    // return l

    const fgHex = scaleValue < .5 ? BLACK_HEX : WHITE_HEX
    const contrastScore = scaleValue < .5
        ? lerp(BLACK_CONTRAST_SCORE[0], BLACK_CONTRAST_SCORE[1], scaleValue)
        : lerp(WHITE_CONTRAST_SCORE[0], WHITE_CONTRAST_SCORE[1], scaleValue)

    if (!contrastScore) return 1

    return findLightnessByContrastScore(baseOkhsl, fgHex, contrastScore)
}

export function findClosestShadeNumber (inputHex: string, scale = DEFAULT_TONES_SCALE) {
    const blackContrastScore = contrastAPCA(BLACK_HEX, inputHex)
    const whiteContrastScore = contrastAPCA(WHITE_HEX, inputHex)
    const blackToneNumber = range(BLACK_CONTRAST_SCORE[0], BLACK_CONTRAST_SCORE[1], scale.at(0), scale.at(-1), blackContrastScore)
    const whiteToneNumber = range(WHITE_CONTRAST_SCORE[0], WHITE_CONTRAST_SCORE[1], scale.at(0), scale.at(-1), whiteContrastScore)
    let inputToneNumber = 500
    if (whiteContrastScore === 0) {
        inputToneNumber = blackToneNumber
    } else if (blackContrastScore === 0) {
        inputToneNumber = whiteToneNumber
    } else {
        inputToneNumber = (blackToneNumber + whiteToneNumber) / 2
    }
    return scale.map(t => ([t, t - inputToneNumber])).reduce((t1, t2) => Math.abs(t1[1]) < Math.abs(t2[1]) ? t1 : t2)[0]
}

function findLightnessByContrastScore (baseOkhsl: Okhsl, fgHex: string, contrastScore: number) {
    let result = null
    let threshold = 110
    // поиск значения светлоты цвета, дающее наиболее близкое значение контрастности
    for (let testLightness = 0; testLightness < 100; testLightness++) {
        const l = testLightness / 100
        const bgHex = formatHex({ ...baseOkhsl, l })
        const resultScore = contrastAPCA(fgHex, bgHex)
        const delta = Math.abs(Math.abs(contrastScore) - Math.abs(resultScore))

        if (delta < threshold) {
            threshold = delta
            result = l
        }
    }
    return result
}

function findContrastScore (baseOkhsl: Okhsl, fgHex: string, contrastScore: number) {
    let result = null
    let threshold = 110
    // поиск значения светлоты цвета, дающее наиболее близкое значение контрастности
    for (let testLightness = 0; testLightness < 100; testLightness++) {
        const l = testLightness / 100
        const bgHex = formatHex({ ...baseOkhsl, l })
        const resultScore = contrastAPCA(fgHex, bgHex)
        const delta = Math.abs(Math.abs(contrastScore) - Math.abs(resultScore))

        if (delta < threshold) {
            threshold = delta
            result = l
        }
    }
    return result
}
