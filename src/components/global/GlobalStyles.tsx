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
                    font-optical-sizing: auto;
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

                ol {
                    margin: 0;
                    padding: 0;
                    margin-block-start: .5em;
                    padding-inline-start: 2em;
                }

                *::-webkit-scrollbar {
                    width: 12px;
                }

                *::-webkit-scrollbar-track {
                    background-color: transparent;
                }

                *::-webkit-scrollbar-thumb {
                    border: 4px solid transparent;
                    border-radius: 6px;
                    background-color: rgba(0 0 0 / 0.1);
                    background-clip: content-box;
                    min-height: 60px;
                }
            `}
        />
    )
}
