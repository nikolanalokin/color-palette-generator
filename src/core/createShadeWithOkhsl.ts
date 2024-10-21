import { formatHex, Okhsl, okhsl } from 'culori'
import { invlerp, lerp, range } from './math'
import { contrastAPCA } from './utils'

export const DEFAULT_TONES_SCALE = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000]
export const BLACK_CONTRAST_SCORE = [106, 0]
export const WHITE_CONTRAST_SCORE = [0, -107.9]
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
export function createShadeWithOkhsl (props: OkhslShadeFnProps): string {
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
        shadeColor.h = computeScaleHue(scaleValue, shadeColor.h, inputScaleValue, hueShift)
        if (decreaseSaturationRatio) {
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

    const fgColor = scaleValue < .5 ? 'black' : 'white'
    const contrastScore = scaleValue < .5
        ? lerp(BLACK_CONTRAST_SCORE[0], BLACK_CONTRAST_SCORE[1], scaleValue)
        : lerp(WHITE_CONTRAST_SCORE[0], WHITE_CONTRAST_SCORE[1], scaleValue)

    if (!contrastScore) return 1

    let lightness = null
    let threshold = 110

    // поиск значения светлоты цвета, дающее наиболее близкое значение контрастности
    for (let testLightness = 0; testLightness < 100; testLightness++) {
        const l = testLightness / 100
        const bgColor = formatHex({ ...baseOkhsl, l })
        const resultScore = contrastAPCA(fgColor, bgColor)
        const delta = Math.abs(Math.abs(contrastScore) - Math.abs(resultScore))

        if (delta < threshold) {
            threshold = delta
            lightness = l
        }
    }

    return lightness
}

export function findClosestShadeNumber (inputColor: string, scale = DEFAULT_TONES_SCALE) {
    const blackContrastScore = contrastAPCA('black', inputColor)
    const whiteContrastScore = contrastAPCA('white', inputColor)
    const averageToneNumber = (
        range(BLACK_CONTRAST_SCORE[0], BLACK_CONTRAST_SCORE[1], scale.at(0), scale.at(-1), blackContrastScore) +
        range(WHITE_CONTRAST_SCORE[0], WHITE_CONTRAST_SCORE[1], scale.at(0), scale.at(-1), whiteContrastScore)
    ) / 2
    return scale.map(t => ([t, t - averageToneNumber])).reduce((t1, t2) => Math.abs(t1[1]) < Math.abs(t2[1]) ? t1 : t2)[0]
}
