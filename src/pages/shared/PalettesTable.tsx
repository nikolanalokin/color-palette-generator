import { useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { TableIcon, CopyIcon, Trash2Icon, Settings2Icon, XIcon } from 'lucide-react'
import { AppPalette, copyAppPalette, removeAppPalette } from '../../stores/app'
import { ShadeInfo } from '../../core'
import { Dialog, DialogBody, DialogHeader, DialogTitle, IconButton, InfoTooltip, useModal } from '../../components'
import { useNavigate } from 'react-router-dom'
import { PaletteContrastTable } from './PaletteContrastTable'

export type PalettesTableProps = {
    palettes?: AppPalette[]
}

export const PalettesTable = (props: PalettesTableProps) => {
    const { palettes } = props
    const navigate = useNavigate()
    const {
        setModal,
        open,
        close,
    } = useModal()
    const [contrastTablePalette, setContrastTablePalette] = useState(null)
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
        <PalettesTableRoot>
            <PalettesTableTable>
                <thead>
                    <tr>
                        <th />
                        { allTones.map(tone => (
                            <td key={tone}>
                                <Header>
                                    { tone }
                                </Header>
                            </td>
                        )) }
                        <th />
                    </tr>
                </thead>
                <tbody>
                    { palettes.map((palette) => (
                        <tr key={palette.id}>
                            <td>
                                <PaletteName data-suggestion={!palette.name}>
                                    { palette.name || palette.palette.name }
                                </PaletteName>
                            </td>
                            { allTones.map(tone => {
                                    const shadesMap = allPalettesShadesMap[palette.id]
                                    const shade = shadesMap.get(tone)
                                    return  (
                                        <td key={`${palette.id}_${tone}`}>
                                            { shade ? (
                                                <ColorCell
                                                    style={{
                                                        backgroundColor: shadesMap.get(tone).hex,
                                                        color: shade.normalized >= .5 ? 'white' : 'black'
                                                    }}
                                                >
                                                    { shade.normalized >= .5 ? Math.round(shade.apca.whiteOn) : Math.round(shade.apca.blackOn) }
                                                </ColorCell>
                                            ) : null }
                                        </td>
                                    )
                            }) }
                            <td>
                                <PaletteActions>
                                    <InfoTooltip message="Таблица контрастности">
                                        <IconButton onClick={() => {
                                            setContrastTablePalette(palette)
                                            open()
                                        }}>
                                            <TableIcon />
                                        </IconButton>
                                    </InfoTooltip>

                                    <IconButton onClick={() => navigate(`/palette/${palette.id}`)}>
                                        <Settings2Icon />
                                    </IconButton>

                                    <IconButton onClick={() => copyAppPalette(palette)}>
                                        <CopyIcon />
                                    </IconButton>

                                    <IconButton onClick={() => removeAppPalette(palette)}>
                                        <Trash2Icon />
                                    </IconButton>
                                </PaletteActions>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </PalettesTableTable>

            <Dialog ref={setModal}>
                <DialogHeader>
                    <DialogTitle>Таблица контрастности</DialogTitle>
                    <IconButton onClick={() => {
                        close()
                        setContrastTablePalette(null)
                    }}>
                        <XIcon />
                    </IconButton>
                </DialogHeader>
                <DialogBody>
                    { open && contrastTablePalette ? <PaletteContrastTable palette={contrastTablePalette.palette} /> : null }
                </DialogBody>
            </Dialog>
        </PalettesTableRoot>
    )
}

const PalettesTableRoot = styled.div(
    () => ({
        // display: 'grid',
    })
)

const PalettesTableTable = styled.table({
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
