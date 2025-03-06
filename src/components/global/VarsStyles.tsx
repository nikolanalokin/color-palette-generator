import { Global } from "@emotion/react"

export const VarsStyles = () => {
    return (
        <Global
            styles={{
                '--color-text-primary': 'rgba(0 0 0 / 1)',
                '--color-text-secondary': 'rgba(0 0 0 / .6)',
            }}
        />
    )
}
