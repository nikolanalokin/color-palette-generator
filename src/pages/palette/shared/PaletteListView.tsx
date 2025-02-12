import styled from '@emotion/styled'
import { CopyIcon, Trash2Icon, Settings2Icon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { copyPalette, removePalette } from '../../../stores'
import { IconButton } from '../../../components'
import { PaletteVO } from '../../../types'

export type PaletteListViewProps = {
    palettes?: PaletteVO[]
}

export const PaletteListView = (props: PaletteListViewProps) => {
    const { palettes } = props
    const navigate = useNavigate()
    // const {
    //     isOpen,
    //     setModal,
    //     open,
    //     close,
    // } = useModal()
    // const [contrastTablePalette, setContrastTablePalette] = useState(null)
    return (
        <PaletteListViewRoot>
            { palettes.map(palette => {
                return (
                    <Item key={palette.id}>
                        <ItemContent>
                            <ItemTitle>
                                <Name data-suggestion={!palette.name}>
                                    { palette.name || palette.inputColorName }
                                </Name>
                            </ItemTitle>

                            <ItemColorsContainer>
                                { palette.shades.map(shade => (
                                    <ItemColor
                                        key={shade.number}
                                        style={{
                                            backgroundColor: shade.hex,
                                            color: shade.normalized >= .5 ? 'white' : 'black'
                                        }}
                                    >
                                        { shade.number }
                                    </ItemColor>
                                )) }
                            </ItemColorsContainer>
                        </ItemContent>

                        <ItemActions>
                            <PaletteActions>
                                {/* <InfoTooltip message="Таблица контрастности">
                                    <IconButton onClick={() => {
                                        setContrastTablePalette(palette)
                                        open()
                                    }}>
                                        <TableIcon />
                                    </IconButton>
                                </InfoTooltip> */}

                                <IconButton onClick={() => navigate(`/dashboard/palettes/${palette.id}`)}>
                                    <Settings2Icon />
                                </IconButton>

                                <IconButton onClick={() => copyPalette(palette)}>
                                    <CopyIcon />
                                </IconButton>

                                <IconButton onClick={() => removePalette(palette)}>
                                    <Trash2Icon />
                                </IconButton>
                            </PaletteActions>
                        </ItemActions>
                    </Item>
                )
            }) }

            {/* <Dialog ref={setModal}>
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
                    { isOpen && contrastTablePalette ? <PaletteContrastTable palette={contrastTablePalette.palette} /> : null }
                </DialogBody>
            </Dialog> */}
        </PaletteListViewRoot>
    )
}

const PaletteListViewRoot = styled.div({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})

const Name = styled.div({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    '&[data-suggestion="true"]': {
        fontWeight: 400,
        color: 'rgba(0 0 0 / .6)',
    }
})

const PaletteActions = styled.div({
    display: 'flex',
})

const Item = styled.div({
    display: 'flex',
    alignItems: 'center',
    columnGap: '12px',
})

const ItemContent = styled.div({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    rowGap: '12px',
})

const ItemTitle = styled.div({
    fontSize: '1rem',
    fontWeight: 600,
})

const ItemColorsContainer = styled.div({
    display: 'flex',
})

const ItemColor = styled.div({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingInline: '16px',
    height: '56px',
    fontSize: '.75rem',
    fontWeight: 500,
})

const ItemActions = styled.div({
    display: 'flex',
    columnGap: '4px',
})
