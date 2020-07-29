import React, { Suspense, lazy } from 'react'
import { Drawer } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import componentLoader from '../../../componentLoader'

const ChartComponent = lazy(() =>
    componentLoader(() => import('../Content/ChartComponents/ChartComponent'))
)

// Функция правильного отображения числовых значений для отсечек на XAxis
const CustomizedAxisTick = (props) => {
    const { x, y, payload } = props

    return (
        <g transform={`translate(${x}, ${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                fill="#000"
                transform="rotate(-35)"
                fontSize={12}
            >
                {payload.value}
            </text>
        </g>
    )
}

export const App = (props) => {
    const { source, param, prop, equipment, visible, handleClickCloseDrawer } = props

    const chart = source && param && prop && source[param] && source[param][prop] && (
        <ChartComponent
            source={source[param][prop]}
            prop={prop}
            equipment={equipment}
            CustomizedAxisTick={CustomizedAxisTick}
        />
    )

    const title = param && prop && equipment && (
        <h2 style={{ textAlign: 'center' }}>
            {param}, {prop}, {equipment}
        </h2>
    )

    return (
        <div>
            <Drawer
                height={'75vh'}
                placement="bottom"
                closable={false}
                onClose={handleClickCloseDrawer}
                visible={visible}
            >
                {visible && (
                    <Suspense
                        fallback={
                            <LoadingOutlined
                                className="loading"
                                style={{ fontSize: '20px', color: 'red' }}
                            />
                        }
                    >
                        {title}
                        {chart}
                    </Suspense>
                )}
            </Drawer>
        </div>
    )
}
