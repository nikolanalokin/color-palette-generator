import styled from '@emotion/styled'

export const List = styled.div({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
})

export const ListTitle = styled.div({
    paddingBlock: '12px',
    fontSize: '0.875rem',
    color: 'rgba(0 0 0 / .6)',
})

export const ListItem = styled.div({
    display: 'flex',
    alignItems: 'center',
    paddingBlock: '4px',
    columnGap: '12px',
})

export const ListItemContent = styled.div({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    rowGap: '4px',
})

export const ListItemTitle = styled.div({
    fontSize: '0.875rem',
    fontWeight: 600,
})

export const ListItemSubtitle = styled.div({
    fontSize: '0.75rem',
    color: 'rgba(0 0 0 / .6)',
})

export const ListItemAction = styled.div({
    display: 'flex',
    columnGap: '4px',
})
