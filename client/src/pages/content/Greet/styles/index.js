import React from 'react'
import styled from 'styled-components'
import image1 from '../../../../images/image1.jpg'
import image2 from '../../../../images/image2.jpg'

export const Bg1 = styled.img`
    background: url(${image1}) 100% 100% no-repeat;
    background-size: cover;
    height: 80vh;
    margin: -1px;
`

export const Bg2 = styled(Bg1)`
    background-image: url(${image2});
`
