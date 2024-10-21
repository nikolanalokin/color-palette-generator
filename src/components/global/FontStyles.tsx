import { css, Global } from '@emotion/react'

import ManropeExtraLight from '../../assets/fonts/manrope/Manrope-ExtraLight.woff2'
import ManropeLight from '../../assets/fonts/manrope/Manrope-Light.woff2'
import ManropeRegular from '../../assets/fonts/manrope/Manrope-Regular.woff2'
import ManropeMedium from '../../assets/fonts/manrope/Manrope-Medium.woff2'
import ManropeSemiBold from '../../assets/fonts/manrope/Manrope-SemiBold.woff2'
import ManropeBold from '../../assets/fonts/manrope/Manrope-Bold.woff2'
import ManropeExtraBold from '../../assets/fonts/manrope/Manrope-ExtraBold.woff2'

export const FontStyles = () => {
    return (
        <Global
            styles={css`
                @font-face {
                    font-family: 'Manrope';
                    src: local('Manrope Extra Light'), url(${ManropeExtraLight}) format('woff2');
                    font-weight: 200;
                }

                @font-face {
                    font-family: 'Manrope';
                    src: local('Manrope Light'), url(${ManropeLight}) format('woff2');
                    font-weight: 300;
                }

                @font-face {
                    font-family: 'Manrope';
                    src: local('Manrope Regular'), url(${ManropeRegular}) format('woff2');
                    font-weight: 400;
                }

                @font-face {
                    font-family: 'Manrope';
                    src: local('Manrope Medium'), url(${ManropeMedium}) format('woff2');
                    font-weight: 500;
                }

                @font-face {
                    font-family: 'Manrope';
                    src: local('Manrope Semi Bold'), url(${ManropeSemiBold}) format('woff2');
                    font-weight: 600;
                }

                @font-face {
                    font-family: 'Manrope';
                    src: local('Manrope Bold'), url(${ManropeBold}) format('woff2');
                    font-weight: 700;
                }

                @font-face {
                    font-family: 'Manrope';
                    src: local('Manrope Extra Bold'), url(${ManropeExtraBold}) format('woff2');
                    font-weight: 800;
                }
            `}
        />
    )
}
