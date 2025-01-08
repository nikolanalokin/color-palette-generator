import { ArrowLeftIcon } from 'lucide-react'
import { IconButton } from '../../components'
import { useNavigate } from 'react-router-dom'
import { $backOptions } from '../../stores'
import { useUnit } from 'effector-react'
import { VerticalDivider } from '../shared/primitives'

export const BackButton = () => {
    const navigate = useNavigate()
    const backOptions = useUnit($backOptions)
    if (!backOptions) return null
    return (
        <>
            <IconButton onClick={() => navigate(backOptions.to, backOptions.options)}>
                <ArrowLeftIcon />
            </IconButton>

            <VerticalDivider />
        </>
    )
}
