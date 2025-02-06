import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { usePageNav } from '../shared/usePageNav'
import { Section } from '../shared/primitives'
import { Form } from '../../components'
import { OkhslHueShiftProcessorForm, OkhslHueShiftRotateProcessorForm, OkhslLightnessBezierProcessorForm, OkhslLightnessLinearProcessorForm, OkhslSaturationProcessorForm } from '../../components/forms'

export const TemplateIndex = () => {
    const navigate = useNavigate()

    usePageNav('Шаблоны', { to: '/dashboard' })

    return (
        <TemplateIndexRoot>
            <TemplateIndexMainSection>
                <Section>
                    <Form>
                        <OkhslHueShiftProcessorForm />
                        <OkhslHueShiftRotateProcessorForm />
                        <OkhslLightnessBezierProcessorForm />
                        <OkhslLightnessLinearProcessorForm />
                        <OkhslSaturationProcessorForm />
                    </Form>
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
