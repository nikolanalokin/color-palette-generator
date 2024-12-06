import { css, Global } from "@emotion/react"

export const GlobalStyles = () => {
    return (
        <Global
            styles={css`
                * {
                    box-sizing: border-box;
                }

                html {
                    font-family: "IBM Plex Mono", 'Courier New', Courier, monospace;
                    -webkit-font-smoothing: antialiased;
                }

                body {
                    min-height: 100vh;
                }

                #root {
                    height: 100%;
                    width: 100%;
                    min-height: inherit;
                }

                a {
                    text-decoration: none;
                    color: initial;
                }

                img, svg {
                    user-select: none;
                }
            `}
        />
    )
}
