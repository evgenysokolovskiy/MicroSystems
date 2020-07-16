import React from 'react'
// Antd
import { Carousel } from 'antd'
// Стили
import { Bg1, Bg2, Bg3, Bg4 } from '../styles/'

export default function App() {
    return (
        <Carousel effect="fade">
            <Bg1 />
            <Bg2 />
            <Bg3 />
            <Bg4 />
        </Carousel>
    )
}
