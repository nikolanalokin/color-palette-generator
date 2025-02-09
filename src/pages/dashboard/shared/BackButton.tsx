import { useNavigate } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { ArrowLeftIcon } from 'lucide-react'
import { IconButton } from '../../../components'
import { $backOptions } from '../../../stores'

export const BackButton = () => {
    const navigate = useNavigate()
    const backOptions = useUnit($backOptions)
    if (!backOptions) return null
    return (
        <IconButton onClick={() => navigate(backOptions.to, backOptions.options)}>
            <ArrowLeftIcon />
        </IconButton>
    )
}
