import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { $appPalettes } from '../../stores'
import { usePageNav } from '../shared/usePageNav'
import { AddPaletteButton } from '../shared/AddPaletteButton'
import { PalettesTable } from '../shared/PalettesTable'

export const PaletteIndex = () => {
    const navigate = useNavigate()

    usePageNav('Палитры', { to: '/dashboard' })

    const appPalettes = useUnit($appPalettes)

    return (
        <PaletteIndexRoot>
            <PaletteIndexMainSection>
                <PalettesViewTableContainer>
                    <PalettesTableToolbar>
                        <AddPaletteButton onClick={() => navigate('new')}>
                            <span>Добавить палитру</span>
                        </AddPaletteButton>
                    </PalettesTableToolbar>

                    <PalettesTable palettes={appPalettes} />
                </PalettesViewTableContainer>
            </PaletteIndexMainSection>
        </PaletteIndexRoot>
    )
}

const PaletteIndexRoot = styled.main({
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
})

const PaletteIndexMainSection = styled.main({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})

const PalettesViewTableContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})

const PalettesTableToolbar = styled.div(
    () => ({
        display: 'flex',
    })
)
