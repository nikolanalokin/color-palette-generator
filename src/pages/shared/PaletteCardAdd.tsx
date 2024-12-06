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

                <Description>
                    Создать палитру
                </Description>

                { children }
            </PaletteCardAddRoot>
        )
    }
)

const PaletteCardAddRoot = styled(Link)({
    minWidth: '300px',
    minHeight: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: '24px',
    borderRadius: '12px',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.16)',
    cursor: 'pointer',

    transition: 'box-shadow .2s ease',

    '&:hover': {
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    }
})

const Description = styled.div({
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: '1.25',
    fontWeight: 500,
})
