import { forwardRef } from 'react'
import styled from '@emotion/styled'
import { ShadeInfo } from '../../core'
import { AppPalette, removePalette } from '../../stores/app'
import { Link } from 'react-router-dom'
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogTitle, IconButton, useModal } from '../../components'
import { DeleteIcon, TableIcon, Trash2Icon, XIcon } from 'lucide-react'
import { PaletteContrastTable } from './PaletteContrastTable'

type BasePaletteCardProps = {
    data: AppPalette
}

export type PaletteCardProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BasePaletteCardProps> & BasePaletteCardProps

export const PaletteCard = forwardRef<HTMLDivElement, PaletteCardProps>(
    (props, forwardedRef) => {
        const {
            data,
            children,
            ...restProps
        } = props

        const {
            setModal,
            open,
            close,
        } = useModal()

        return (
            <PaletteCardRoot ref={forwardedRef} {...restProps}>
                <PaletteCardScaleContainer to={`/palette/${data.id}`}>
                    { data.palette.shades.map(shade => (
                        <PaletteCardShadeColor
                            key={shade.number}
                            shade={shade}
                        />
                    )) }
                </PaletteCardScaleContainer>

                <PaletteCardMetaContainer>
                    <Title>{ data.name }</Title>

                    <PaletteCardActions>
                        <IconButton onClick={() => open()}>
                            <TableIcon />
                        </IconButton>

                        <IconButton onClick={() => removePalette(data)}>
                            <Trash2Icon />
                        </IconButton>
                    </PaletteCardActions>
                </PaletteCardMetaContainer>

                <Dialog ref={setModal}>
                    <DialogHeader>
                        <DialogTitle>Таблица контрастности</DialogTitle>
                        <IconButton onClick={() => close()}>
                            <XIcon />
                        </IconButton>
                    </DialogHeader>
                    <DialogBody>
                        { open ? <PaletteContrastTable palette={data.palette} /> : null }
                    </DialogBody>
                </Dialog>
            </PaletteCardRoot>
        )
    }
)

const PaletteCardRoot = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '16px',
})

const PaletteCardMetaContainer = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
})

export const Title = styled.h3({
    paddingInline: '16px',
    fontSize: '1rem',
    margin: 0,
})

const PaletteCardActions = styled.div({
    display: 'flex',
})

const PaletteCardScaleContainer = styled(Link)(
    ({}) => ({
        width: '256px',
        borderRadius: '16px',
        backgroundColor: 'rgba(255 255 255 / 0.2)',
        border: '1px solid rgba(255 255 255 / 0.3)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0 0 0 / 0.1)',
        overflow: 'hidden',
        transition: 'all .2s',

        '&:hover': {
            translate: '0 -8px',
        }
    })
)

const PaletteCardShadeColor = styled.div<{ shade?: ShadeInfo }>(
    ({ shade }) => ({
        height: '32px',
        backgroundColor: shade.hex,
    })
)
