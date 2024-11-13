import { useRef } from 'react'
import { useResizeObserver } from '../hooks'

export const PlotContainer = (props) => {
    const ref = useRef(null)
    const size = useResizeObserver({ ref })

    return (
        <div ref={ref} style={{ height: '300px' }}>
            { props.children(size) }
        </div>
    )
}
