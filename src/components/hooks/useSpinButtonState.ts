import { useMemo } from 'react'
import { useControllableState } from './useControllableState'

interface SpinButtonStateProps {
    defaultValue?: number
    value?: number
    onChange?: (value: number) => void
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    readOnly?: boolean
}

function useSpinButtonState (props: SpinButtonStateProps) {
    const [value, setValue] = useControllableState({
        defaultProp: props.defaultValue,
        prop: props.value,
        onChange: props.onChange,
    })
    const minValue = props.min
    const maxValue = props.max
    const stepValue = (props.step !== undefined && !isNaN(props.step)) ? props.step : 1

    function nextStep (operation: '+' | '-', minMax: number = 0) {
        if (isNaN(value)) {
            return minMax
        }
        return operation === '+' ? value + stepValue : value - stepValue
    }

    function increment () {
        if (props.readOnly || props.disabled) {
            return
        }

        const newValue = nextStep('+', minValue)

        if (newValue > maxValue) {
            return
        }

        setValue(newValue)
    }

    function decrement () {
        if (props.readOnly || props.disabled) {
            return
        }

        const newValue = nextStep('-', maxValue)

        if (newValue < minValue) {
            return
        }

        setValue(newValue)
    }

    const canIncrement = useMemo(() => (
            !props.disabled &&
            !props.readOnly &&
        (
            isNaN(value) ||
            (maxValue === undefined || isNaN(maxValue)) ||
            handleOperation('+', value, stepValue) <= maxValue
        )
    ), [props.disabled, props.readOnly, minValue, maxValue, stepValue, value]);

    const canDecrement = useMemo(() => (
        !props.disabled &&
        !props.readOnly &&
        (
            isNaN(value) ||
            (minValue === undefined || isNaN(minValue)) ||
            handleOperation('-', value, stepValue) >= minValue
        )
    ), [props.disabled, props.readOnly, minValue, maxValue, stepValue, value]);

    return {
        value,
        increment,
        decrement,
        canIncrement,
        canDecrement,
        disabled: props.disabled || false,
        readOnly: props.readOnly || false,
    }
}

type SpinButtonStateReturn = ReturnType<typeof useSpinButtonState>

export {
    useSpinButtonState
}

export type {
    SpinButtonStateProps,
    SpinButtonStateReturn,
}

function handleOperation (operator: '+' | '-', value1: number, value2: number) {
    return operator === '+' ? value1 + value2 : value1 - value2
}
