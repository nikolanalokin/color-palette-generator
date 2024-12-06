import styled from '@emotion/styled'
import { useRef, useState } from 'react'
import { storage } from '../services/storage'
import { Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter, Button, useModal, IconButton } from '../components'
import { ExternalLink } from 'lucide-react'
import { PaletteCardAdd } from './shared/PaletteCardAdd'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../stores/app'
import { PaletteCard } from './shared/PaletteCard'

export const Dashboard = () => {
    const { palettes } = useAppStore()
    const navigate = useNavigate()
    const {
        setModal,
        open,
        close,
    } = useModal()
    return (
        <DashboardRoot>
            <PalettesGrid>
                { palettes.map(palette => (
                    <PaletteCard data={palette} />
                )) }
                <PaletteCardAdd to="/palette/new" />
            </PalettesGrid>
            {/* <Button onClick={() => open()} startIcon={<ExternalLink />}>Открыть</Button>
            <IconButton><ExternalLink /></IconButton>

            <Dialog ref={setModal}>
                <DialogHeader>
                    <DialogTitle>Таблица контрастности</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    Я виден. Привет! 👋
                </DialogBody>
                <DialogFooter>
                    <Button onClick={() => close()}>закрыть</Button>
                </DialogFooter>
            </Dialog> */}
        </DashboardRoot>
    )
}

const DashboardRoot = styled.main({
    flexGrow: 1,
    display: 'flex',
    paddingInline: '48px',
    paddingBlock: '24px',
})

const PalettesGrid = styled.section({
    display: 'grid',
    gridAutoRows: 'min-content',
    gap: '36px',
})
