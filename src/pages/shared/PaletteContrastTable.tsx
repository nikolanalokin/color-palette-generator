import styled from '@emotion/styled'
import { contrastAPCA, Palette } from '../../core'
import { wcagContrast } from 'culori'
import { useState } from 'react'
import { SelectInput } from '../../components/inputs/SelectInput'

export type PaletteContrastTableProps = {
    palette?: Palette
}

export const PaletteContrastTable = (props: PaletteContrastTableProps) => {
    const shades = props.palette.shades
    const [method, setMethod] = useState('apca')
    const [level, setLevel] = useState('all')
    const contrast = method === 'apca' ? contrastAPCA : wcagContrast
    const [mousePos, setMousePos] = useState({ col: null, row: null })
    const handleMouseEnter = (evt: React.MouseEvent<HTMLTableCellElement>) => {
        if (evt.currentTarget) {
            const { col, row } = evt.currentTarget.dataset
            setMousePos({
                col: +col,
                row: +row,
            })
        }
    }
    const handleMouseLeave = () => {
        setMousePos({ col: null, row: null })
    }

    return (
        <PaletteContrastTableRoot>
           <Filters>
                <SelectInput
                    id="method"
                    labelText="Метод расчёта контрастности"
                    value={method}
                    onChange={setMethod}
                >
                    <option value="apca">APCA</option>
                    <option value="wcag">WCAG</option>
                </SelectInput>

               <SelectInput
                   id="level"
                   labelText="Допустимый уровень контрастности"
                   value={level}
                   onChange={setLevel}
                >
                    <option value="all">Все уровни</option>
                    <option value="AA">{ {
                        apca: '60+',
                        wcag: '4.5+ (AA)',
                    }[method] }</option>
                    <option value="AAA">{ {
                        apca: '75+',
                        wcag: '7+ (AAA)',
                    }[method] }</option>
               </SelectInput>
           </Filters>
           <Table selectedCol={mousePos.col} selectedRow={mousePos.row}>
               <thead>
                   <tr>
                       <th></th>
                       { shades.map(shadeV => (
                           <th key={shadeV.number}>
                               <HeaderCell>
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
                               <HeaderCell>
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
           </Table>
        </PaletteContrastTableRoot>
    )
}

const PaletteContrastTableRoot = styled.div(
    () => ({
        display: 'grid',
        justifyItems: 'center',
        gap: '16px',
    })
)

const Filters = styled.div(
    () => ({
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'auto',
        gap: '12px',
    })
)

const HeaderCell = styled.div({
    display: 'grid',
    height: '48px',
    borderRadius: '4px',
    placeItems: 'center',
    color: '#a3a3a3',
    fontSize: '14px',
    fontWeight: 400,
})

const Cell = styled.div({
    display: 'grid',
    height: '48px',
    borderRadius: '4px',
    placeItems: 'center',
    transition: 'box-shadow .2s ease',
})

const ColorCell = styled(Cell)({
    fontSize: '14px',
    fontWeight: 600,
})

const PlaceholderCell = styled(Cell)({
    backgroundImage: 'linear-gradient(-45deg, rgb(0 0 0 / 6%) 26%, rgb(0 0 0 / 3%) 0, rgb(0 0 0 / 3%) 50%, rgb(0 0 0 / 6%) 0, rgb(0 0 0 / 6%) 75%, rgb(0 0 0 / 3%) 0, rgb(0 0 0 / 3%))',
    transition: 'box-shadow .2s ease',
})

const Table = styled.table<any>(
    ({ selectedCol, selectedRow }) => ({
        borderCollapse: 'collapse',
        borderColor: 'inherit',
        textIndent: 0,
        tableLayout: 'fixed',
        width: '1240px',

        '& th, & td': {
            padding: '3px',
        },

        ...(selectedRow !== null && {
            [`tbody tr:nth-of-type(${selectedRow + 1}) td ${ColorCell}`]: {
                boxShadow: '0 0 0 1px white, 0 0 0 2px rgba(0, 0, 0, 0.5)'
            },
        }),

        ...(selectedCol !== null && {
            [`tbody tr td:nth-of-type(${selectedCol + 1}) ${ColorCell}`]: {
                boxShadow: '0 0 0 1px white, 0 0 0 2px rgba(0, 0, 0, 0.5)'
            },
        }),
    })
)
