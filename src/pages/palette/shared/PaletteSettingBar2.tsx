import styled from '@emotion/styled'
import { Color, Okhsl } from 'culori'
import {
    Button,
    Checkbox,
    ColorPicker,
    Field,
    FieldLabel,
    IconButton,
    Option2,
    Select2,
} from '../../../components'
import { resetStyles } from '../../../components/buttons/shared'
import { CheckIcon } from 'lucide-react'
import { ProcessorsInput } from '../../shared/ProcessorsInput'
import { PaletteVO, ProcessorVO } from '../../../types'
import { useUnit } from 'effector-react'
import { $templates } from '../../../stores/template'
import { useState } from 'react'

export type PaletteSettingBarProps = {
    name?: string
    onNameChange?(value: string): void
    color?: string | Color
    onColorChange?(value: string | Color): void
    processors?: ProcessorVO[]
    onProcessorsChange?(value: ProcessorVO[]): void
    templateId?: string
    onTemplateIdChange?(value: string): void
    palette?: PaletteVO
    onSave?(): void
}

export const PaletteSettingBar2 = (props: PaletteSettingBarProps) => {
    const {
        name,
        onNameChange,
        color,
        onColorChange,
        processors,
        onProcessorsChange,
        templateId,
        onTemplateIdChange,
        palette,
        onSave,
    } = props

    const templates = useUnit($templates)

    const [useTemplate, setUseTemplate] = useState(Boolean(templateId))

    return (
        <PaletteSettingBarRoot>
            <NameInputContainer>
                <NameInputRow>
                    <NameInput
                        value={name}
                        onChange={evt => onNameChange?.(evt.target.value)}
                        placeholder={palette?.inputColorName}
                    />

                    <IconButton onClick={() => onNameChange?.(palette?.inputColorName)}>
                        <CheckIcon />
                    </IconButton>
                </NameInputRow>

                { name ? <NameSuggestion>{ palette?.inputColorName }</NameSuggestion> : null }
            </NameInputContainer>

            <ColorPicker
                mode="okhsl"
                value={color}
                onValueChange={(value: Okhsl) => onColorChange?.(value)}
            />

            <Checkbox
                id="useTemplate"
                labelText="Использовать шаблон"
                checked={useTemplate}
                onValueChange={checked => {
                    if (!checked) {
                        onTemplateIdChange?.(null)
                    }
                    setUseTemplate(checked)
                }}
            />

            { useTemplate ? (
                <Field>
                    <FieldLabel>Шаблон</FieldLabel>
                    <Select2
                        value={templateId}
                        onValueChange={value => onTemplateIdChange?.(value)}
                    >
                        { templates.map(t => (
                            <Option2 key={t.id} value={t.id}>
                                { t.name }
                            </Option2>
                        ))}
                    </Select2>
                </Field>
            ) : (
                <ProcessorsInput
                    value={processors}
                    onValueChange={value => onProcessorsChange?.(value)}
                    orientation="vertical"
                />
            ) }

            <Button onClick={() => onSave?.()}>
                Сохранить
            </Button>
        </PaletteSettingBarRoot>
    )
}

const PaletteSettingBarRoot = styled.div(
    ({}) => ({
        // maxHeight: '100%',
        // width: '384px',
        // paddingInlineStart: '16px',
        // paddingInlineEnd: '4px',
        // paddingBlock: '16px',
        // borderRadius: '16px',
        // backgroundColor: 'rgba(255 255 255 / 0.5)',
        // border: '1px solid rgba(255 255 255 / 0.3)',
        // backdropFilter: 'blur(10px)',
        // boxShadow: '0 4px 30px rgba(0 0 0 / 0.1)',
        display: 'grid',
        rowGap: '16px',
        // overflowY: 'auto',
        // scrollbarGutter: 'stable',
        // overscrollBehaviorY: 'contain',
    })
)

const NameInputContainer = styled.div(
    ({}) => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '4px',
    })
)

const NameInputRow = styled.div(
    ({}) => ({
        display: 'flex',
        justifyContent: 'space-between',
    })
)

const NameSuggestion = styled.div(
    ({}) => ({
        fontSize: '.75rem',
        color: 'rgba(0 0 0 / .6)',
    })
)

export const NameInput = styled.input(
    resetStyles,
    {
        fontSize: '1.5rem',
        fontWeight: 700,

        '&::placeholder': {
            color: 'rgba(0 0 0 / .6)',
        },
    }
)

const ColorRectContainer = styled.div(
    ({}) => ({
        height: '64px',
    })
)

const ColorRect = styled.input`
    height: 100%;
    width: 100%;
    border-radius: 4px;

    appearance: none;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;

    &::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    &::-webkit-color-swatch {
        border: none;
    }
`

const SwitchContainer = styled.div(
    ({}) => ({
        display: 'flex',
        columnGap: '8px',
        alignItems: 'center',
    })
)

const ComplexHueShiftContainer = styled.div(
    ({}) => ({
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
    })
)
