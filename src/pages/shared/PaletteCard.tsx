import { forwardRef } from 'react'
import styled from '@emotion/styled'
import { PaletteInfo } from '../../core'

type BasePaletteCardProps = {
    data: PaletteInfo
}

export type PaletteCardProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BasePaletteCardProps> & BasePaletteCardProps

export const PaletteCard = forwardRef<HTMLDivElement, PaletteCardProps>(
    (props, forwardedRef) => {
        const {
            children,
            ...restProps
        } = props

        return (
            <PaletteCardRoot ref={forwardedRef} {...restProps}>
                { children }
            </PaletteCardRoot>
        )
    }
)

const PaletteCardRoot = styled.div(
    {

    }
)
