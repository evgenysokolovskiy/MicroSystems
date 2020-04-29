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
                    name: card[0],
                    spaceBeforeRunningClosed: (() =>
                        card[1]['running']
                            ? card[1]['running']['msBatchLoadingTime'] - minDate
                            : 0)(),
                    runningClosed: (() =>
                        card[1]['running']
                            ? card[1]['running']['msUnloadingTime'] -
                              card[1]['running']['msBatchLoadingTime']
                            : 0)(),
                    spaceBeforeGrindingClosed: (() =>
                        !card[1]['grinding']
                            ? 0
                            : card[1]['running']
                            ? card[1]['grinding']['msBatchLoadingTime'] -
                              card[1]['running']['msUnloadingTime']
                            : card[1]['grinding']['msBatchLoadingTime'] - minDate)(),
                    grindingClosed: (() =>
                        card[1]['grinding']
                            ? card[1]['grinding']['msUnloadingTime'] -
                              card[1]['grinding']['msBatchLoadingTime']
                            : 0)()
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
                if (data[i]['grindingClosed'] !== 0) {
                    lastClosed = card[1]['grinding']['msUnloadingTime']
                } else if (data[i]['runningClosed'] !== 0) {
                    lastClosed = card[1]['running']['msUnloadingTime']
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
                    <Bar dataKey="runningClosed" stackId="a" fill="#8884d8" name="обкатка" />
                    <Bar
                        dataKey="spaceBeforeGrindingClosed"
                        stackId="a"
                        fill="rgba(0,0,0,0)"
                        legendType="none"
                    />
                    <Bar dataKey="grindingClosed" stackId="a" fill="#82ca9d" name="шлифовка" />
                    <Bar
                        dataKey="spaceBeforeCleanClosed"
                        stackId="a"
                        fill="rgba(0,0,0,0)"
                        legendType="none"
                    />
                    <Bar dataKey="cleanClosed" stackId="a" fill="lightcoral" name="Доводка №3" />
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
                </BarChart>
            </ResponsiveContainer>
        )
    }
}
