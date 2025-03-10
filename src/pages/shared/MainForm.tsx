import styled from '@emotion/styled'
import { combine, createEvent, createStore } from 'effector'
import { useUnit } from 'effector-react'
import { Color, Mode, Okhsl } from 'culori'
import { Checkbox, ColorPicker, Field, FieldLabel, Form, FormControl, NumberInput, Option2, ScaleInput, Select2, TextInput } from '../../components'
import { createPalette, InterpolatorProps, PaletteInfo } from '../../engine'
import { PaletteDisplayLine } from './PaletteDisplayLine'
import { useControllableState } from '../../components/hooks'
import { Section } from './primitives'
import { Slider } from '../../components/inputs/Slider'
import { PalettePlots } from '../palette/shared/PalettePlots'

const setMode = createEvent<Mode>()
const setColor = createEvent<Color>()
const setScale = createEvent<number[]>()
const setInterpolators = createEvent<InterpolatorProps[]>()

const $mode = createStore<Mode>('okhsl')
const $color = createStore<Color>({
    mode: 'okhsl',
    h: 25,
    s: .9,
    l: .5,
}).on(setColor, (_, payload) => payload)
const $scale = createStore<number[]>([0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]).on(setScale, (_, payload) => payload)
const $interpolators = createStore<InterpolatorProps[]>([
    {
        channel: 'l',
        method: 'linear',
        form: 'concave',
        min: 0,
        max: 1,
    },
]).on(setInterpolators, (_, payload) => payload)

export const $palette = combine(
    {
        mode: $mode,
        color: $color,
        scale: $scale,
        interpolators: $interpolators,
    },
    (props) => createPalette(props)
)

export const MainForm = () => {
    const mode = useUnit($mode)
    const color = useUnit($color)
    const scale = useUnit($scale)
    const interpolators = useUnit($interpolators)
    const palette = useUnit($palette)

    return (
        <MainFormRoot>
            <Section area="picker">
                <Form css={{ gridArea: 'picker' }}>
                    {/* Ввод цвета */}
                    <ColorPicker
                        mode={mode}
                        value={color}
                        onValueChange={setColor}

                    />
                    {/* Название палитры */}
                    <TextInput
                        labelText="Название палитры"
                        value={palette?.inputColorName}
                        readOnly
                    />
                </Form>
            </Section>

            <Section area="settings">
                <Form css={{ gridArea: 'settings' }}>
                    <ScaleInput
                        value={scale}
                        onValueChange={setScale}
                        // css={{ width: '1024px' }}
                    />
                    {/* Настройки интерполяции */}
                    <InterpolatorEditor
                        mode={mode}
                        color={color}
                        value={interpolators}
                        onValueChange={setInterpolators}
                        // css={{ width: '1024px' }}
                    />
                </Form>
            </Section>

            <Section area="display">
                {/* Редактор оттенков */}
                <ShadesEditor palette={palette} css={{ gridArea: 'display' }} />
            </Section>

            <Section area="plots">
                <PalettePlots
                    palette={palette}
                />
            </Section>
            {/* Действия с результатом */}
        </MainFormRoot>
    )
}

const MainFormRoot = styled.div({
    width: '1600px',
    display: 'grid',
    gridTemplateAreas: `
        "picker settings"
        "display display"
        "plots plots"
    `,
    gridTemplateColumns: '400px 1fr',
    gap: '1rem',
    paddingBlock: '1rem',
})

const methodOptions = [
    {
        value: 'linear',
        label: 'Linear',
        description: 'Линейная интерполяция',
    },
    {
        value: 'quad',
        label: 'Quad',
        description: 'Интерполяция по квадратичной функции',
    },
    {
        value: 'cube',
        label: 'Cube',
        description: 'Интерполяция по кубической функции',
    },
    {
        value: 'bezier',
        label: 'Bezier',
        description: 'Безье',
        disabled: true,
    },
]

const InterpolatorEditor = (props) => {
    const {
        mode,
        color,
        palette,
        value: valueProp,
        onValueChange,
        ...restProps
    } = props
    const [value, setValue] = useControllableState({
        defaultProp: [],
        prop: valueProp,
        onChange: onValueChange,
    })
    const updateChannelValue = (channel: string, changes: any) => {
        setValue(prevValue => prevValue.map(v => v.channel === channel ? ({
            ...v,
            ...changes,
        }) : v))
    }
    return (
        <InterpolatorEditorRoot {...restProps}>
            { Object.keys(color).filter(key => !['mode', 'alpha'].includes(key)).map(channel => {
                const channelValue = value.find(v => v.channel === channel)
                const enabled = !!channelValue
                return (
                    <InterpolatorEditorRow key={channel}>
                        <FormControl>
                            <Checkbox
                                labelText={channel}
                                checked={enabled}
                                onValueChange={
                                    checked => setValue(prevValue => checked ? prevValue.concat({
                                        channel,
                                        min: 0,
                                        max: 1,
                                        method: 'linear',
                                        inverse: false,
                                        form: 'concave'
                                    }) : prevValue.filter(v => v.channel !== channel))
                                }
                            />
                        </FormControl>

                        { enabled ? (
                            <>
                                <Slider
                                    value={[channelValue.min, channelValue.max]}
                                    onValueChange={([min, max]) => updateChannelValue(channel, { min, max })}
                                    min={0}
                                    max={1}
                                    step={.01}
                                    css={{ width: '400px' }}
                                    marks={[...new Array(11)].map((_, i) => ({ label: String(i / 10), value: i / 10 }))}
                                />

                                {/* <NumberInput
                                    labelText="Min"
                                    value={channelValue.min}
                                    onValueChange={min => updateChannelValue(channel, { min })}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                />

                                <NumberInput
                                    labelText="Max"
                                    value={channelValue.max}
                                    onValueChange={max => updateChannelValue(channel, { max })}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                /> */}

                                <FormControl>
                                    <Checkbox
                                        labelText="Inverse"
                                        checked={channelValue.inverse}
                                        onValueChange={inverse => updateChannelValue(channel, { inverse })}
                                    />
                                </FormControl>

                                <Field css={{ flexBasis: '300px' }}>
                                    <FieldLabel>Функция</FieldLabel>
                                    <Select2
                                        value={channelValue.method}
                                        onValueChange={method => updateChannelValue(channel, { method })}
                                    >
                                        { methodOptions.map(o => (
                                            <Option2 key={o.value} value={o.value} disabled={o.disabled}>
                                                { o.label }
                                            </Option2>
                                        ))}
                                    </Select2>
                                </Field>

                                <Field css={{ flexBasis: '300px' }}>
                                    <FieldLabel>Форма</FieldLabel>
                                    <Select2
                                        value={channelValue.form}
                                        onValueChange={form => updateChannelValue(channel, { form })}
                                    >
                                        <Option2 value="concave">
                                            Concave
                                        </Option2>
                                        <Option2 value="convex">
                                            Convex
                                        </Option2>
                                    </Select2>
                                </Field>
                            </>
                        ) : null }

                    </InterpolatorEditorRow>
                )
            }) }
        </InterpolatorEditorRoot>
    )
}

const InterpolatorEditorRoot = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
})

const InterpolatorEditorRow = styled.div({
    display: 'flex',
    alignItems: 'flex-end',
    columnGap: '.75rem',
})

const ShadesEditor = (props) => {
    const { palette, ...restProps } = props
    return (
        <PaletteDisplayLine
            palette={palette}
            {...restProps}
        />
    )
}
