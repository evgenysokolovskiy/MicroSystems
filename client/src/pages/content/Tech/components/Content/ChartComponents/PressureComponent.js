import React, { PureComponent } from 'react'
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    //CartesianGrid,
    Legend,
    BarChart,
    Bar,
    LabelList
} from 'recharts'

export default class PressureComponent extends PureComponent {
    render() {
        const { pressureSpeed, CustomizedAxisTick } = this.props
        // Для верного отображения столбцов из показателя скорости вычесть показатель давления
        const convertedDataPressureSpeed = pressureSpeed.map((item) => {
            const diff = item['speed'] - item['pressure']
            item['convertedSpeed'] = diff
            return item
        })

        return (
            <ResponsiveContainer width="100%" aspect={2.7 / 1.0}>
                <BarChart
                    data={convertedDataPressureSpeed}
                    syncId="composedChart"
                    margin={{
                        top: 0,
                        right: 20,
                        left: 10,
                        bottom: 40
                    }}
                >
                    {/*<CartesianGrid stroke="#000" strokeWidth={0.5} />*/}
                    <XAxis dataKey="date" key="date" tick={<CustomizedAxisTick />} />
                    <YAxis
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        scale="sqrt"
                        fill="#000"
                        fontSize={12}
                    />
                    <Legend wrapperStyle={{ paddingTop: '60px' }} />
                    <Bar
                        dataKey="speedElevator"
                        key="speedElevator"
                        stackId="a"
                        fill="lightcoral"
                        name="Скорость элеватора"
                    >
                        <LabelList dataKey="speedElevator" position="middle" />
                    </Bar>
                    <Bar
                        dataKey="pressure"
                        key="pressure"
                        stackId="a"
                        fill="#8884d8"
                        name="Давление"
                    >
                        <LabelList dataKey="pressure" position="middle" />
                    </Bar>

                    <Bar
                        dataKey="convertedSpeed"
                        key="convertedSpeed"
                        stackId="a"
                        fill="#82ca9d"
                        name="Скорость"
                    >
                        <LabelList dataKey="speed" position="middle" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        )
    }
}
