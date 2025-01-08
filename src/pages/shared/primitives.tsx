import styled from '@emotion/styled'

export const Section = styled.section<{ area?: string }>(
    ({ area }) => ({
        // padding: '24px',
        // backgroundColor: 'rgba(0 0 0 / .05)',
        // borderRadius: '16px',

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
