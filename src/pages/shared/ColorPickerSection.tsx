import styled from '@emotion/styled'
import { ColorRangeInput, OkhslColorPicker } from '../../components'
import { Color, Oklch, oklch } from 'culori'
import { useState } from 'react'
import { Section } from './primitives'

export type ColorPickerSectionProps = {
    color?: Oklch
    onColorChange?(color: Oklch): void
}

export const ColorPickerSection = (props: ColorPickerSectionProps) => {
    return (
        <Section>
            <OkhslColorPicker />
        </Section>
    )
}
