import { useEffect, useState } from 'react'

export function useModal () {
    const [modal, setModal] = useState<HTMLDialogElement>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    useEffect(() => {
        const handleClose = () => setIsOpen(false)
        modal?.addEventListener('close', handleClose)
        return () => {
            modal?.removeEventListener('close', handleClose)
        }
    }, [modal])
    const open = () => {
        modal.showModal()
        setIsOpen(true)
    }
    const close = () => {
        modal.close()
    }
    return {
        isOpen,
        setModal,
        open,
        close,
    }
}
