import { useCallback, useMemo, useState } from 'react'
import { NumberFormatter, NumberParser } from '../internationalized'
import { useControllableState } from './useControllableState'

interface NumberInputStateProps {
    defaultValue?: number
    value?: number
    onChange?: (value: number) => void
    minValue?: number
    maxValue?: number
    step?: number
    locale?: string
    formatOptions?: Intl.NumberFormatOptions
    disabled?: boolean
    readOnly?: boolean
}

function useNumberInputState (props: NumberInputStateProps) {
    let {
        defaultValue,
        value,
        onChange,
        minValue,
        maxValue,
        step,
        locale = 'ru-RU',
        formatOptions,
        disabled,
        readOnly,
    } = props

    // нормализуем входные параметры
    if (value === null) {
        value = NaN
    }

    if (value !== undefined && !isNaN(value)) {
        if (step !== undefined && !isNaN(step)) {
            value = snapValueToStep(value, minValue, maxValue, step)
        } else {
            value = clamp(value, minValue, maxValue)
        }
    }

    if (!isNaN(defaultValue)) {
        if (step !== undefined && !isNaN(step)) {
            defaultValue = snapValueToStep(defaultValue, minValue, maxValue, step)
        } else {
            defaultValue = clamp(defaultValue, minValue, maxValue)
        }
    }

    const [numberValue, setNumberValue] = useControllableState<number>({
        defaultProp: isNaN(defaultValue) ? NaN : defaultValue,
        prop: value,
        onChange,
    })
    const [inputValue, setInputValue] = useState(() => isNaN(numberValue) ? '' : new NumberFormatter(locale, formatOptions).format(numberValue))

    const parser = useMemo(() => new NumberParser(locale, formatOptions), [locale, formatOptions])
    const formatter = useMemo(() => new NumberFormatter(locale, formatOptions), [locale, formatOptions])
    const format = useCallback((value: number) => (isNaN(value) || value === null) ? '' : formatter.format(value), [formatter])

    const clampStep = (step !== undefined && !isNaN(step)) ? step : 1

    const [prevValue, setPrevValue] = useState(numberValue)
    const [prevLocale, setPrevLocale] = useState(locale)
    const [prevFormatOptions, setPrevFormatOptions] = useState(formatOptions)

    if (!Object.is(numberValue, prevValue) || locale !== prevLocale || formatOptions !== prevFormatOptions) {
        setInputValue(format(numberValue))
        setPrevValue(numberValue)
        setPrevLocale(locale)
        setPrevFormatOptions(formatOptions)
    }

    const parsedValue = useMemo(() => parser.parse(inputValue), [parser, inputValue])

    const commit = () => {
        // Set to empty state if input value is empty
        if (!inputValue.length) {
            setNumberValue(NaN)
            setInputValue(value === undefined ? '' : format(numberValue))
            return
        }

        // if it failed to parse, then reset input to formatted version of current number
        if (isNaN(parsedValue)) {
            setInputValue(format(numberValue))
            return
        }

        // Clamp to min and max, round to the nearest step, and round to specified number of digits
        let clampedValue: number
        if (step === undefined || isNaN(step)) {
            clampedValue = clamp(parsedValue, minValue, maxValue)
        } else {
            clampedValue = snapValueToStep(parsedValue, minValue, maxValue, step)
        }

        clampedValue = parser.parse(format(clampedValue))
        setNumberValue(clampedValue)

        // in a controlled state, the numberValue won't change, so we won't go back to our old input without help
        setInputValue(format(value === undefined ? clampedValue : numberValue))
    }

    let safeNextStep = (operation: '+' | '-', minMax: number = 0) => {
        let prev = parsedValue

        if (isNaN(prev)) {
            // if the input is empty, start from the min/max value when incrementing/decrementing,
            // or zero if there is no min/max value defined.
            let newValue = isNaN(minMax) ? 0 : minMax
            return snapValueToStep(newValue, minValue, maxValue, clampStep)
        } else {
            // otherwise, first snap the current value to the nearest step. if it moves in the direction
            // we're going, use that value, otherwise add the step and snap that value.
            let newValue = snapValueToStep(prev, minValue, maxValue, clampStep)
            if ((operation === '+' && newValue > prev) || (operation === '-' && newValue < prev)) {
                return newValue
            }

            return snapValueToStep(
                handleDecimalOperation(operation, prev, clampStep),
                minValue,
                maxValue,
                clampStep
            )
        }
    }

    let canIncrement = useMemo(() => (
        !disabled &&
        !readOnly &&
        (
            isNaN(parsedValue) ||
            (maxValue === undefined || isNaN(maxValue)) ||
            snapValueToStep(parsedValue, minValue, maxValue, clampStep) > parsedValue ||
            handleDecimalOperation('+', parsedValue, clampStep) <= maxValue
        )
    ), [disabled, readOnly, minValue, maxValue, clampStep, parsedValue])

    let canDecrement = useMemo(() => (
        !disabled &&
        !readOnly &&
        (
            isNaN(parsedValue) ||
            (minValue === undefined || isNaN(minValue)) ||
            snapValueToStep(parsedValue, minValue, maxValue, clampStep) < parsedValue ||
            handleDecimalOperation('-', parsedValue, clampStep) >= minValue
        )
    ), [disabled, readOnly, minValue, maxValue, clampStep, parsedValue])

    let increment = () => {
        let newValue = safeNextStep('+', minValue)

        // if we've arrived at the same value that was previously in the state, the
        // input value should be updated to match
        // ex type 4, press increment, highlight the number in the input, type 4 again, press increment
        // you'd be at 5, then incrementing to 5 again, so no re-render would happen and 4 would be left in the input
        if (newValue === numberValue) {
            setInputValue(format(newValue))
        }

        setNumberValue(newValue)
    }

    let decrement = () => {
        let newValue = safeNextStep('-', maxValue)

        if (newValue === numberValue) {
            setInputValue(format(newValue))
        }

        setNumberValue(newValue)
    }

    let incrementToMax = () => {
        if (maxValue != null) {
            setNumberValue(snapValueToStep(maxValue, minValue, maxValue, clampStep))
        }
    }

    let decrementToMin = () => {
        if (minValue != null) {
            setNumberValue(minValue)
        }
    }

    const validate = (value: string) => parser.isValidPartialNumber(value, minValue, maxValue)

    return {
        commit,
        canIncrement,
        canDecrement,
        increment,
        incrementToMax,
        decrement,
        decrementToMin,
        validate,
        minValue,
        maxValue,
        numberValue: parsedValue,
        setNumberValue,
        setInputValue,
        inputValue,
        disabled: props.disabled || false,
        readOnly: props.readOnly || false,
    }
}

function roundToStepPrecision (value: number, step: number) {
    let roundedValue = value
    let stepString = step.toString()
    let pointIndex = stepString.indexOf('.')
    let precision = pointIndex >= 0 ? stepString.length - pointIndex : 0
    if (precision > 0) {
        let pow = Math.pow(10, precision)
        roundedValue = Math.round(roundedValue * pow) / pow
    }
    return roundedValue
}

function snapValueToStep (value: number, min: number | undefined, max: number | undefined, step: number) {
    min = Number(min)
    max = Number(max)

    let remainder = ((value - (isNaN(min) ? 0 : min)) % step)
    let snappedValue = roundToStepPrecision(Math.abs(remainder) * 2 >= step
        ? value + Math.sign(remainder) * (step - Math.abs(remainder))
        : value - remainder, step)

    if (!isNaN(min)) {
        if (snappedValue < min) {
            snappedValue = min
        } else if (!isNaN(max) && snappedValue > max) {
            snappedValue = min + Math.floor(roundToStepPrecision((max - min) / step, step)) * step
        }
    } else if (!isNaN(max) && snappedValue > max) {
        snappedValue = Math.floor(roundToStepPrecision(max / step, step)) * step
    }

    // correct floating point behavior by rounding to step precision
    snappedValue = roundToStepPrecision(snappedValue, step)

    return snappedValue
}

function clamp (value: number, min: number = -Infinity, max: number = Infinity) {
    return Math.min(Math.max(value, min), max)
}

function handleDecimalOperation (operator: '-' | '+', value1: number, value2: number): number {
    let result = operator === '+' ? value1 + value2 : value1 - value2

    // Check if we have decimals
    if (value1 % 1 !== 0 || value2 % 1 !== 0) {
        const value1Decimal = value1.toString().split('.')
        const value2Decimal = value2.toString().split('.')
        const value1DecimalLength = (value1Decimal[1] && value1Decimal[1].length) || 0
        const value2DecimalLength = (value2Decimal[1] && value2Decimal[1].length) || 0
        const multiplier = Math.pow(10, Math.max(value1DecimalLength, value2DecimalLength))

        // Transform the decimals to integers based on the precision
        value1 = Math.round(value1 * multiplier)
        value2 = Math.round(value2 * multiplier)

        // Perform the operation on integers values to make sure we don't get a fancy decimal value
        result = operator === '+' ? value1 + value2 : value1 - value2

        // Transform the integer result back to decimal
        result /= multiplier
    }

    return result
}

export {
    useNumberInputState
}

export type {
    NumberInputStateProps
}
