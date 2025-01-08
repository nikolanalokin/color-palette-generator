import { forwardRef } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { CopyIcon, TableIcon, Trash2Icon, XIcon } from 'lucide-react'
import { ShadeInfo } from '../../core'
import { $appPalettes, AppSet, copyAppPalette, removeAppPalette } from '../../stores'
import { Dialog, DialogBody, DialogHeader, DialogTitle, IconButton, InfoTooltip, useModal } from '../../components'
import { PaletteContrastTable } from './PaletteContrastTable'
import { useUnit } from 'effector-react'

type BaseSetCardProps = {
    data: AppSet
}

export type SetCardProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseSetCardProps> & BaseSetCardProps

export const SetCard = forwardRef<HTMLDivElement, SetCardProps>(
    (props, forwardedRef) => {
        const {
            data,
            children,
            ...restProps
        } = props

        const appPalettes = useUnit($appPalettes)

        return (
            <SetCardRoot ref={forwardedRef} {...restProps}>
                <SetCardPalettesContainer to={`/sets/${data.id}`}>
                    { data.palettes.map(paletteId => {
                        const palette = appPalettes.find(p => p.id === paletteId)
                        return (
                            <SetCardPalette
                                key={palette.id}
                                css={{ backgroundColor: palette.palette.inputShade.hex }}
                            />
                        )
                    }) }
                </SetCardPalettesContainer>

                <SetCardMetaContainer>
                    <Title>{ data.name }</Title>
                </SetCardMetaContainer>
            </SetCardRoot>
        )
    }
)

const SetCardRoot = styled.div(
    ({}) => ({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '16px',
    })
)

const SetCardMetaContainer = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
})

export const Title = styled.h3({
    paddingInline: '16px',
    fontSize: '1rem',
    margin: 0,
})

const SetCardPalettesContainer = styled(Link)(
    ({}) => ({
        minWidth: '256px',
        borderRadius: '16px',
        backgroundColor: 'rgba(255 255 255 / 0.2)',
        border: '1px solid rgba(255 255 255 / 0.3)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0 0 0 / 0.1)',
        overflow: 'hidden',
        transition: 'translate .2s',

        '&:hover': {
            translate: '0 -8px',
        }
    })
)

const SetCardPalette = styled.div({
    height: '32px',
    width: '32px',
})
