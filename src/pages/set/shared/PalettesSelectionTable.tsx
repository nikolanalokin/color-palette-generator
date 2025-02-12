import styled from '@emotion/styled'
import { Checkbox } from '../../../components'
import { useControllableState } from '../../../components/hooks'
import { PaletteVO } from '../../../types'

interface BasePalettesSelectionTableProps {
    palettes: PaletteVO[]
    value?: string[]
    onValueChange?(value: string[]): void
}

export type PalettesSelectionTableProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BasePalettesSelectionTableProps> & BasePalettesSelectionTableProps

export const PalettesSelectionTable: React.FC<PalettesSelectionTableProps> = props => {
    const {
        palettes,
        value: valueProp,
        onValueChange,
        ...restProps
    } = props
    const [value, setValue] = useControllableState({
        defaultProp: [],
        prop: valueProp,
        onChange: onValueChange,
    })
    return (
        <PalettesSelectionTableRoot {...restProps}>
            <PalettesTableTable>
                <tbody>
                    { palettes.map((palette) => {
                        const checked = value.includes(palette.id)
                        return (
                            <tr key={palette.id} data-checked={checked}>
                                <td>
                                    <Checkbox
                                        checked={checked}
                                        onValueChange={checked => setValue(
                                            checked
                                                ? [...value, palette.id]
                                                : value.filter(p => p !== palette.id)
                                        )}
                                    />
                                </td>
                                <td>
                                    <PaletteName data-suggestion={!palette.name}>
                                        { palette.name || palette.inputColorName }
                                    </PaletteName>
                                </td>
                                <td>
                                    <ColorCellContainer>
                                        { palette.shades.map(shade => (
                                            <ColorCell
                                                key={shade.number}
                                                style={{
                                                    backgroundColor: shade.hex,
                                                    color: shade.normalized >= .5 ? 'white' : 'black'
                                                }}
                                            >
                                                { shade.number }
                                            </ColorCell>
                                        )) }
                                    </ColorCellContainer>
                                </td>
                            </tr>
                        )
                    }) }
                </tbody>
            </PalettesTableTable>

            <PalettesTableCaption>
                Выбрано палитр: <b>{ value.length }</b>
            </PalettesTableCaption>
        </PalettesSelectionTableRoot>
    )
}

const PalettesSelectionTableRoot = styled.main({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '16px',
})

const PalettesTableTable = styled.table({
    borderCollapse: 'collapse',
    borderColor: 'inherit',
    textIndent: 0,

    '& th, & td': {
        padding: 0,
    },

    '& td:first-of-type': {
        width: '24px',
    },

    '& td:nth-of-type(2)': {
        width: '16ch',
        paddingInline: '16px',
    },
})

const PaletteName = styled.div({
    fontSize: '.875rem',
    fontWeight: 600,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    '&[data-suggestion="true"]': {
        fontWeight: 400,
        color: 'rgba(0 0 0 / .6)',
    }
})

const ColorCellContainer = styled.div({
    display: 'flex',

    '[data-checked="false"] &': {
        opacity: .75,
    }
})

const ColorCell = styled.div({
    flex: 1,
    minWidth: '60px',
    height: '60px',
    display: 'grid',
    placeItems: 'center',
    fontSize: '.75rem',
    fontWeight: 500,
})

const PalettesTableCaption = styled.div({
    fontSize: '.875rem',
    fontWeight: 500,
})
