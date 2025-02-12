import styled from '@emotion/styled'
import { CopyIcon, Trash2Icon, Settings2Icon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { copySet, removeSet } from '../../../stores'
import { IconButton } from '../../../components'
import { PaletteVO, SetVO } from '../../../types'

export type SetListViewProps = {
    sets?: SetVO[]
    palettes?: PaletteVO[]
}

export const SetListView = (props: SetListViewProps) => {
    const { sets, palettes } = props
    const navigate = useNavigate()
    return (
        <SetListViewRoot>
            { sets.map(set => {
                const setPalettes = palettes.filter(p => set.paletteIds.includes(p.id))
                return (
                    <Item key={set.id}>
                        <ItemContent>
                            <ItemTitle>
                                <Name>
                                    { set.name }
                                </Name>
                            </ItemTitle>

                            <ItemColorsContainer>
                                { setPalettes.map(setPalette => {
                                    return (
                                        <ItemColor
                                            key={setPalette.id}
                                            style={{
                                                backgroundColor: setPalette.inputShade.hex,
                                                color: setPalette.inputShade.normalized >= .5 ? 'white' : 'black'
                                            }}
                                        >
                                            { setPalette.name }
                                        </ItemColor>
                                    )
                                }) }
                            </ItemColorsContainer>
                        </ItemContent>

                        <ItemActions>
                            <PaletteActions>
                                <IconButton onClick={() => navigate(`/dashboard/sets/${set.id}`)}>
                                    <Settings2Icon />
                                </IconButton>

                                <IconButton onClick={() => copySet(set)}>
                                    <CopyIcon />
                                </IconButton>

                                <IconButton onClick={() => removeSet(set)}>
                                    <Trash2Icon />
                                </IconButton>
                            </PaletteActions>
                        </ItemActions>
                    </Item>
                )
            }) }
        </SetListViewRoot>
    )
}

const SetListViewRoot = styled.div({
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
