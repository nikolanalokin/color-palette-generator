import styled from '@emotion/styled'
import './ContentLoader.css'

export const ContentLoader = () => {
    return (
        <ContentLoaderRoot>
            <div className="loader" />
        </ContentLoaderRoot>
    )
}

const ContentLoaderRoot = styled.div({
    position: 'absolute',
    inset: 0,
    display: 'grid',
    placeItems: 'center',
    backgroundColor: 'rgba(255 255 255 / .75)'
})
