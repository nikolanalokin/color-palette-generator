import styled from '@emotion/styled'

export const Section = styled.section<{ area?: string }>(
    ({ area }) => ({
        padding: '24px',
        backgroundColor: 'rgba(0 0 0 / .05)',
        borderRadius: '16px',

        ...(area && {
            gridArea: area,
        }),
    })
)
