import styled from 'styled-components'
import { image1, image2, image3 } from '../../../../api/urls/'

export const Bg1 = styled.img`
    background: url(${image1}) 100% 100% no-repeat;
    background-size: cover;
    height: 80vh;
    margin: -1px;
`
export const Bg2 = styled(Bg1)`
    background-image: url(${image2});
`

export const Bg3 = styled(Bg1)`
    background-image: url(${image3});
`
