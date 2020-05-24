import React, { PureComponent } from 'react'
import clonedeep from 'lodash.clonedeep'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ReferenceLine,
    CartesianGrid,
    Legend
} from 'recharts'

export default class AxisCardComponent extends PureComponent {
    render() {
        const { type: t, quality: q, mtime: m } = this.props
        const quality = clonedeep(q)['all']
        const mtime = new Date(m).getTime()
        const type = quality['types'][t]

        let startArr = [] //, endArr = []

        Object.entries(type).forEach(card => {
            Object.entries(card[1]).forEach(procedure => {
                if (procedure[1]['msBatchLoadingTime'])
                    startArr = [...startArr, procedure[1]['msBatchLoadingTime']]
                //endArr = [...endArr, procedure[1]['msUnloadingTime']]
            })
        })

        //const start = convertDateToString(Math.min(...startArr))
        //const end = convertDateToString(Math.max(...endArr))

        const minDate = Math.min(...startArr)
        //const maxDate = Math.max(...endArr)

        let data = []
        Object.entries(type).forEach((card, i) => {
            if (card[1]['running'] && !card[1]['running']['msBatchLoadingTime']) return
            if (card[1]['grinding'] && !card[1]['grinding']['msBatchLoadingTime']) return
            //if (card[1]['rough'] && !card[1]['rough']['msBatchLoadingTime']) return
            //if (card[1]['clean'] && !card[1]['clean']['msBatchLoadingTime']) return
            //if (card[1]['final'] && !card[1]['final']['msBatchLoadingTime']) return

            data = [
                ...data,
                {
                    // Наименование карты
                    name: card[0],

                    // *** ОБКАТКА

                    // 1) Промежуток до
                    spaceBeforeRunningClosed: (() =>
                        card[1]['running']
                            ? card[1]['running']['msBatchLoadingTime'] - minDate
                            : 0)(),
                    // 2) Технология
                    runningTechnology: (() => {
                        let val
                        if (card[1]['running']) {
                            if (
                                card[1]['running']['msUnloadingTime'] >
                                card[1]['running']['msUnloadingTechnologyTime']
                            ) {
                                val =
                                    card[1]['running']['msUnloadingTechnologyTime'] -
                                    card[1]['running']['msBatchLoadingTime']
                            } else {
                                val =
                                    card[1]['running']['msUnloadingTime'] -
                                    card[1]['running']['msBatchLoadingTime']
                            }
                        } else {
                            val = 0
                        }
                        return val
                    })(),
                    // 3) Остаток (факт - технология)
                    runningClosed: (() => {
                        let val
                        if (card[1]['running']) {
                            if (
                                card[1]['running']['msUnloadingTime'] >
                                card[1]['running']['msUnloadingTechnologyTime']
                            ) {
                                val =
                                    card[1]['running']['msUnloadingTime'] -
                                    card[1]['running']['msUnloadingTechnologyTime']
                            }
                        } else {
                            val = 0
                        }
                        return val
                    })(),

                    // *** ШЛИФОВКА

                    // 1) Промежуток между обкаткой и шлифовкой
                    spaceBeforeGrindingClosed: (() =>
                        !card[1]['grinding']
                            ? 0
                            : card[1]['running']
                            ? card[1]['grinding']['msBatchLoadingTime'] -
                              card[1]['running']['msUnloadingTime']
                            : card[1]['grinding']['msBatchLoadingTime'] - minDate)(),

                    // 2) Технология
                    grindingTechnology: (() => {
                        let val
                        if (card[1]['grinding']) {
                            if (
                                card[1]['grinding']['msUnloadingTime'] >
                                card[1]['grinding']['msUnloadingTechnologyTime']
                            ) {
                                val =
                                    card[1]['grinding']['msUnloadingTechnologyTime'] -
                                    card[1]['grinding']['msBatchLoadingTime']
                            } else {
                                val =
                                    card[1]['grinding']['msUnloadingTime'] -
                                    card[1]['grinding']['msBatchLoadingTime']
                            }
                        } else {
                            val = 0
                        }
                        return val
                    })(),

                    // 3) Остаток (факт - технология)
                    grindingClosed: (() => {
                        let val
                        if (card[1]['grinding']) {
                            if (
                                card[1]['grinding']['msUnloadingTime'] >
                                card[1]['grinding']['msUnloadingTechnologyTime']
                            ) {
                                val =
                                    card[1]['grinding']['msUnloadingTime'] -
                                    card[1]['grinding']['msUnloadingTechnologyTime']
                            }
                        } else {
                            val = 0
                        }
                        return val
                    })(),

                    spaceAfterMtimeBeforeGrindingFuture: (() => {
                        let val
                        if (!card[1]['grinding'] && card[1]['running']) {
                            val = 86400000
                        }
                        return val
                    })(),

                    grindingFuture: (() => {
                        let val
                        if (!card[1]['grinding'] && card[1]['running']) {
                            val = 86400000
                        }
                        return val
                    })(),

                    /*
                    spaceBeforeCleanClosed: (() =>
                        !card[1]['clean']
                            ? 0
                            : card[1]['grinding']
                            ? card[1]['clean']['msBatchLoadingTime'] -
                              card[1]['grinding']['msUnloadingTime']
                            : card[1]['running']
                            ? card[1]['clean']['msBatchLoadingTime'] -
                              card[1]['running']['msUnloadingTime']
                            : card[1]['clean']['msBatchLoadingTime'] - minDate)(),
                    cleanClosed: (() =>
                        card[1]['clean']
                            ? card[1]['clean']['msUnloadingTime'] -
                              card[1]['clean']['msBatchLoadingTime']
                            : 0)(),
                    */
                }
            ]

            let lastClosed = 0
            if (data[i]) {
                /*
                if (data[i]['cleanClosed'] !== 0) {
                    lastClosed = card[1]['clean']['msUnloadingTime']
                }
                */
                if (data[i]['grindingClosed'] !== 0 || data[i]['grindingTechnology'] !== 0) {
                    lastClosed = Math.max(
                        card[1]['grinding']['msUnloadingTime'],
                        card[1]['grinding']['msUnloadingTechnologyTime']
                    )
                } else if (data[i]['runningClosed'] !== 0 || data[i]['runningTechnology'] !== 0) {
                    lastClosed = Math.max(
                        card[1]['running']['msUnloadingTime'],
                        card[1]['running']['msUnloadingTechnologyTime']
                    )
                } else {
                    lastClosed = 0
                }

                data[i]['spaceBeforeMtime'] = mtime - lastClosed
            }
        })

        return (
            <ResponsiveContainer width="100%" aspect={1.5 / 1}>
                <BarChart
                    data={data}
                    width={1500}
                    height={1000}
                    layout="vertical"
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis type="category" dataKey="name" />
                    <XAxis type="number" domain={['dataMin', 'dataMax']} />
                    <Legend />
                    <Bar
                        dataKey="spaceBeforeRunningClosed"
                        stackId="a"
                        background
                        fill="rgba(0,0,0,0)"
                        legendType="none"
                    />
                    <Bar dataKey="runningTechnology" stackId="a" fill="#82ca9d" name="обкатка" />
                    <Bar dataKey="runningClosed" stackId="a" fill="#ccc" legendType="none" />
                    <Bar
                        dataKey="spaceBeforeGrindingClosed"
                        stackId="a"
                        fill="rgba(0,0,0,0)"
                        legendType="none"
                    />
                    <Bar dataKey="grindingTechnology" stackId="a" fill="#8884d8" name="шлифовка" />
                    <Bar dataKey="grindingClosed" stackId="a" fill="#ccc" legendType="none" />
                    <Bar
                        dataKey="spaceBeforeMtime"
                        stackId="a"
                        fill="rgba(0,0,0,0)"
                        legendType="none"
                    />
                    <ReferenceLine
                        x={mtime - minDate}
                        stroke="rgba(230,200,215,0.2)"
                        strokeWidth={60}
                    />
                    <ReferenceLine x={mtime - minDate} stroke="red" />



                    <Bar
                        dataKey="spaceAfterMtimeBeforeGrindingFuture"
                        stackId="a"
                        fill="red"
                        legendType="none"
                    />
                    <Bar dataKey="grindingFuture" stackId="a" fill="#8884d8" name="шлифовка" />




                </BarChart>
            </ResponsiveContainer>
        )
    }
}
