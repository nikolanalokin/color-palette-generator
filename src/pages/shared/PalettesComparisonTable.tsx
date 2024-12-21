import styled from '@emotion/styled'
import { AppPalette } from '../../stores/app'
import { useMemo } from 'react'
import { ShadeInfo } from '../../core'

export type PalettesComparisonTableProps = {
    palettes?: AppPalette[]
}

export const PalettesComparisonTable = (props: PalettesComparisonTableProps) => {
    const { palettes } = props
    const allTones = useMemo(() => {
        const allTonesSet = palettes.reduce((set, p) => (p.palette.shades.forEach(s => set.add(s.number)), set), new Set<number>())
        return [...allTonesSet.values()].sort((a, b) => a - b)
    }, [palettes])
    const allPalettesShadesMap = useMemo(() => {
        return palettes.reduce((acc, p) => {
            const shadesMap = p.palette.shades.reduce((acc, shade) => (acc.set(shade.number, shade), acc), new Map())
            acc[p.id] = shadesMap
            return acc
        }, {} as Record<string, Map<number, ShadeInfo>>)
    }, [palettes])
    return (
        <PalettesComparisonTableRoot>
           <PalettesComparisonTableTable>
               <tbody>
                   { allTones.map(tone => (
                       <tr key={tone}>
                            { palettes.map((palette) => {
                                const shadesMap = allPalettesShadesMap[palette.id]
                                return  (
                                    <td key={`${palette.id}_${tone}`}>
                                        { shadesMap.has(tone) ? (
                                            <ColorCell
                                                style={{
                                                    backgroundColor: shadesMap.get(tone).hex,
                                                }}
                                            />
                                        ) : null }
                                    </td>
                                )
                           }) }
                       </tr>
                   )) }
               </tbody>
           </PalettesComparisonTableTable>
        </PalettesComparisonTableRoot>
    )
}

const PalettesComparisonTableRoot = styled.div(
    () => ({
        display: 'grid',
    })
)

const PalettesComparisonTableTable = styled.table<any>({
    borderCollapse: 'collapse',
    borderColor: 'inherit',
    textIndent: 0,
    border: '1px solid black',

    '& th, & td': {
        padding: 0,
    },
})

const ColorCell = styled.div({
    width: '64px',
    height: '64px',
})
