import { forwardRef } from 'react'
import styled from '@emotion/styled'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

type BasePaletteCardAddProps = {}

export type PaletteCardAddProps = Omit<React.ComponentPropsWithoutRef<typeof Link>, keyof BasePaletteCardAddProps> & BasePaletteCardAddProps

export const PaletteCardAdd = forwardRef<React.ElementRef<typeof Link>, PaletteCardAddProps>(
    (props, forwardedRef) => {
        const {
            children,
            ...restProps
        } = props

        return (
            <PaletteCardAddRoot ref={forwardedRef} {...restProps}>
                <Plus size={48} />
            </PaletteCardAddRoot>
        )
    }
)

const PaletteCardAddRoot = styled(Link)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: '24px',
    width: '256px',
    minHeight: '256px',
    borderRadius: '16px',
    backgroundColor: 'rgba(255 255 255 / 0.2)',
    border: '1px dashed rgba(0 0 0 / 0.2)',
    color: '#666666',
    cursor: 'pointer',

    transition: 'all .2s ease',

    '&:hover': {
        backgroundColor: 'rgba(0 0 0 / 0.06)',
    }
})

const Description = styled.div({
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: '1.25',
    fontWeight: 500,
})
