import styled from '@emotion/styled'
import { contrastAPCA, PaletteInfo } from '../../core'
import { useState } from 'react'
import { Field, FieldLabel, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components'
import { contrastWCAG } from '../../core/utils'
import { ToggleButtonGroup } from '../../components/buttons/ToggleButtonGroup'
import { ToggleButton } from '../../components/buttons/ToggleButton'

export type PaletteContrastTableProps = {
    palette?: PaletteInfo
}

export const PaletteContrastTable = (props: PaletteContrastTableProps) => {
    const shades = props.palette.shades
    const [method, setMethod] = useState('apca')
    const [level, setLevel] = useState('all')
    const contrast = method === 'apca' ? contrastAPCA : contrastWCAG
    return (
        <PaletteContrastTableRoot>
           <PaletteContrastTableFilters>
                <Field>
                    <FieldLabel>Метод расчёта контрастности</FieldLabel>
                    <ToggleButtonGroup value={method} onChange={setMethod}>
                        <ToggleButton value="apca">APCA</ToggleButton>
                        <ToggleButton value="wcag">WCAG</ToggleButton>
                    </ToggleButtonGroup>
                </Field>

                <Field>
                    <FieldLabel>Допустимый уровень контрастности</FieldLabel>
                    <ToggleButtonGroup value={level} onChange={setLevel}>
                        <ToggleButton value="all">
                            Все уровни
                        </ToggleButton>
                        <ToggleButton value="AA">
                            { {
                                apca: '60+',
                                wcag: '4.5+ (AA)',
                            }[method] }
                        </ToggleButton>
                        <ToggleButton value="AAA">
                            { {
                                apca: '75+',
                                wcag: '7+ (AAA)',
                            }[method] }
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Field>
           </PaletteContrastTableFilters>

           <PaletteContrastTableTable>
               <thead>
                   <tr>
                       <th>
                           <HeaderCell data-col>
                               bg\fg
                           </HeaderCell>
                        </th>
                       { shades.map(shadeV => (
                           <th key={shadeV.number}>
                               <HeaderCell data-col>
                                   { shadeV.number }
                               </HeaderCell>
                           </th>
                       )) }
                   </tr>
               </thead>
               <tbody>
                   { shades.map((shadeH, rowIndex) => (
                       <tr key={shadeH.number}>
                           <th>
                               <HeaderCell data-row>
                                   { shadeH.number }
                               </HeaderCell>
                           </th>

                           { shades.map((shadeV) => {
                               const score = contrast(shadeV.hex, shadeH.hex)
                               const show = method == 'apca'
                                   ? (level === 'AA' ? Math.abs(score) >= 60 : level === 'AAA' ? Math.abs(score) >= 75 : true)
                                   : (level === 'AA' ? score >= 4.5 : level === 'AAA' ? score >= 7 : true)
                               return (
                                   <td key={shadeV.number}>
                                       { show ? (
                                           <ColorCell
                                               style={{
                                                   backgroundColor: shadeH.hex,
                                                   color: shadeV.hex,
                                               }}
                                           >
                                               { score.toFixed(2) }
                                           </ColorCell>
                                       ) : <PlaceholderCell /> }
                                   </td>
                               )
                           }) }
                       </tr>
                   )) }
               </tbody>
           </PaletteContrastTableTable>
        </PaletteContrastTableRoot>
    )
}

const PaletteContrastTableRoot = styled.div(
    () => ({
        display: 'grid',
        gap: '16px',
    })
)

const PaletteContrastTableFilters = styled.div(
    () => ({
        display: 'flex',
        columnGap: '32px',
    })
)

const HeaderCell = styled.div({
    display: 'grid',
    borderRadius: '4px',
    alignItems: 'center',
    color: '#a3a3a3',
    fontSize: '.875rem',
    fontWeight: 400,

    '&[data-col]': {
        justifyItems: 'center',
        paddingBlock: '12px',
    },

    '&[data-row]': {
        justifyItems: 'start',
        paddingInlineEnd: '12px',
    },
})

const Cell = styled.div({
    display: 'grid',
    borderRadius: '4px',
    placeItems: 'center',
    width: '72px',
    height: '48px',
    transition: 'box-shadow .2s ease',
})

const ColorCell = styled(Cell)({
    fontSize: '.75rem',
    fontWeight: 700,
})

const PlaceholderCell = styled(Cell)({
    backgroundImage: 'linear-gradient(-45deg, rgb(0 0 0 / 6%) 26%, rgb(0 0 0 / 3%) 0, rgb(0 0 0 / 3%) 50%, rgb(0 0 0 / 6%) 0, rgb(0 0 0 / 6%) 75%, rgb(0 0 0 / 3%) 0, rgb(0 0 0 / 3%))',
    transition: 'box-shadow .2s ease',
})

const PaletteContrastTableTable = styled.table<any>({
    borderCollapse: 'collapse',
    borderColor: 'inherit',
    textIndent: 0,

    '& th, & td': {
        padding: '2px',
    },
})
