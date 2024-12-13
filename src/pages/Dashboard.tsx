import styled from '@emotion/styled'
import { Button, Toolbar } from '../components'
import { PaletteCardAdd } from './shared/PaletteCardAdd'
import { useNavigate } from 'react-router-dom'
import { $appPalettes } from '../stores/app'
import { PaletteCard } from './shared/PaletteCard'
import { useUnit } from 'effector-react'

export const Dashboard = () => {
    const appPalettes = useUnit($appPalettes)
    const navigate = useNavigate()
    return (
        <DashboardRoot>
            <Toolbar>
                <Button onClick={() => navigate('/palette/new')}>Добавить палитру</Button>
            </Toolbar>

            <PalettesGrid>
                { appPalettes.map(palette => (
                    <PaletteCard
                        key={palette.id}
                        data={palette}
                    />
                )) }
                {/* <PaletteCardAdd to="/palette/new" /> */}
            </PalettesGrid>
        </DashboardRoot>
    )
}

const DashboardRoot = styled.main({
    flexGrow: 1,
})

const PalettesGrid = styled.section({
    paddingInline: '48px',
    paddingBlock: '24px',
    display: 'flex',
    columnGap: '24px',
})
