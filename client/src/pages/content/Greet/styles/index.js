import React from 'react'
import styled from 'styled-components'

import image1 from '../../../../images/image1.jpg'
import image2 from '../../../../images/image2.jpg'
import image3 from '../../../../images/image3.jpg'
import image4 from '../../../../images/image4.jpg'

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

export const Bg4 = styled(Bg1)`
    background-image: url(${image4});
`
