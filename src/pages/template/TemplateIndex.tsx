import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { usePageNav } from '../shared/usePageNav'
import { Section } from '../shared/primitives'

export const TemplateIndex = () => {
    const navigate = useNavigate()

    usePageNav('Шаблоны', { to: '/dashboard' })

    return (
        <TemplateIndexRoot>
            <TemplateIndexMainSection>
                <Section>

                </Section>
            </TemplateIndexMainSection>
        </TemplateIndexRoot>
    )
}

const TemplateIndexRoot = styled.main({
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
})

const TemplateIndexMainSection = styled.main({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '24px',
})
