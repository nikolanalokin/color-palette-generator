import styled from '@emotion/styled'

export const Section = styled.section<{ area?: string }>(
    ({ area }) => ({
        paddingInline: '1.5rem',
        paddingBlock: '1.5rem',
        borderRadius: '16px',
        backgroundColor: 'rgba(255 255 255 / 0.75)',
        border: '2px solid rgba(255 255 255 / 0.3)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 0 2px rgba(0 0 0 / 0.1)',

        ...(area && {
            gridArea: area,
        }),
    })
)

export const PageTitle = styled.h1({
    margin: 0,
    fontSize: '1.25rem',
    lineHeight: '1.5rem',
    fontWeight: 600,
})

export const Spacer = styled.div({
    flexGrow: 1,
})

export const VerticalDivider = styled.div({
    height: '1em',
    width: '1px',
    backgroundColor: 'rgba(0 0 0 / 1)',
    flexShrink: 0,
})
