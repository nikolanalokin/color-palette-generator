import { css, Global } from '@emotion/react'

import Regular from '../../assets/fonts/golos-ui_regular.woff2'
import Medium from '../../assets/fonts/golos-ui_medium.woff2'
import Bold from '../../assets/fonts/golos-ui_bold.woff2'

export const FontStyles = () => {
    return (
        <Global
            styles={css`
                @font-face {
                    font-family: 'Golos';
                    src: local('Golos Regular'), url(${Regular}) format('woff2');
                    font-weight: 400;
                }

                @font-face {
                    font-family: 'Golos';
                    src: local('Golos Medium'), url(${Medium}) format('woff2');
                    font-weight: 500;
                }

                @font-face {
                    font-family: 'Golos';
                    src: local('Golos Bold'), url(${Bold}) format('woff2');
                    font-weight: 700;
                }
            `}
        />
    )
}
