import { useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { TableIcon, CopyIcon, Trash2Icon, Settings2Icon, XIcon } from 'lucide-react'
import { $appPalettes, AppPalette, AppSet, copyAppPalette, removeAppPalette, removeAppSet } from '../../stores'
import { ShadeInfo } from '../../core'
import { Button, Dialog, DialogBody, DialogHeader, DialogTitle, IconButton, InfoTooltip, useModal } from '../../components'
import { useNavigate } from 'react-router-dom'
import { PaletteContrastTable } from './PaletteContrastTable'
import { AddPaletteButton } from './AddPaletteButton'
import { useUnit } from 'effector-react'

export type SetsTableProps = {
    sets?: AppSet[]
}

export const SetsTable = (props: SetsTableProps) => {
    const { sets } = props
    const navigate = useNavigate()
    const appPalettes = useUnit($appPalettes)
    return (
        <SetsTableRoot>
            <SetsTableContainer>
                <SetsTableTable>
                    <thead>
                        <tr>
                            <th />
                            <th>
                                <Header>Палитры</Header>
                            </th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        { sets.map((set) => (
                            <tr key={set.id}>
                                <td>
                                    <SetName>
                                        { set.name }
                                    </SetName>
                                </td>
                                <td>
                                    <ColorCellContainer>
                                        { set.palettes.map(paletteId => {
                                            const palette = appPalettes.find(p => p.id === paletteId)
                                            const inputShade = palette.palette.inputShade
                                            return  (
                                                // <InfoTooltip message={palette.name || palette.palette.name}>
                                                    <ColorCell
                                                        key={palette.id}
                                                        style={{
                                                            backgroundColor: inputShade.hex,
                                                            color: inputShade.normalized >= .5 ? 'white' : 'black'
                                                        }}
                                                    />
                                                // </InfoTooltip>
                                            )
                                        }) }
                                    </ColorCellContainer>
                                </td>
                                <td>
                                    <PaletteActions>
                                        <IconButton onClick={() => navigate(`/dashboard/sets/${set.id}`)}>
                                            <Settings2Icon />
                                        </IconButton>

                                        <IconButton onClick={() => removeAppSet(set)}>
                                            <Trash2Icon />
                                        </IconButton>
                                    </PaletteActions>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </SetsTableTable>
            </SetsTableContainer>
        </SetsTableRoot>
    )
}

const SetsTableRoot = styled.div({
    display: 'flex',
})

const SetsTableContainer = styled.div(
    () => ({
        display: 'flex',
    })
)

const SetsTableTable = styled.table({
    borderCollapse: 'collapse',
    borderColor: 'inherit',
    textIndent: 0,

    '& th, & td': {
        padding: 0,
    },

    '& td:first-of-type': {
        maxWidth: '20ch',
        paddingInlineEnd: '16px',
    },

    '& td:last-of-type': {
        paddingInlineStart: '16px',
    },
})

const Header = styled.div({
    display: 'flex',
    justifyContent: 'center',
    fontSize: '.75rem',
    fontWeight: 500,
    color: 'rgba(0 0 0 / .6)',
    paddingBlockEnd: '12px',
})

const SetName = styled.div({
    fontSize: '.875rem',
    fontWeight: 600,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
})

const ColorCellContainer = styled.div({
    display: 'flex',
})

const ColorCell = styled.div({
    width: '60px',
    height: '60px',
    display: 'grid',
    placeItems: 'center',
    fontSize: '.75rem',
    fontWeight: 500,
})

const PaletteActions = styled.div({
    display: 'flex',
})
