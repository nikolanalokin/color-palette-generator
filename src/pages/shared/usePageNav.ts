import { useEffect } from 'react'
import { setAppTitle, setBackOptions } from '../../stores'
import { NavigateOptions, To } from 'react-router-dom'

export function usePageNav (title: string, backOptions: {
    to: To
    options?: NavigateOptions
} = null) {
    useEffect(() => {
        setAppTitle(title || '')
        setBackOptions(backOptions)
        return () => {
            setAppTitle('')
            setBackOptions(null)
        }
    }, [])
}
