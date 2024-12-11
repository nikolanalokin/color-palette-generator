import styled from '@emotion/styled'
import { Toolbar } from '../components'
import { PaletteCardAdd } from './shared/PaletteCardAdd'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../stores/app'
import { PaletteCard } from './shared/PaletteCard'

export const Dashboard = () => {
    const { palettes } = useAppStore()
    const navigate = useNavigate()
    return (
        <>
            <Toolbar>Палитры</Toolbar>
            <DashboardRoot>
                <PalettesGrid>
                    { palettes.map(palette => (
                        <PaletteCard
                            key={palette.id}
                            data={palette}
                        />
                    )) }
                    <PaletteCardAdd to="/palette/new" />
                </PalettesGrid>
            </DashboardRoot>
        </>
    )
}

const DashboardRoot = styled.main({
    flexGrow: 1,
    paddingInline: '48px',
    paddingBlock: '24px',
})

const PalettesGrid = styled.section({
    display: 'flex',
    columnGap: '24px',
})
