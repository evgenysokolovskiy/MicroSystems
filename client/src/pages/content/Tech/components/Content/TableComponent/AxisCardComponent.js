import React, { PureComponent } from 'react'
import { convertDateToString } from '../../../helpers/calculateDates'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LabelList, ReferenceLine, CartesianGrid, Tooltip, Legend } from 'recharts'



const data = [
  {
    name: 'Page A', space: 800, running: 4000, grinding: 2400,
  },
  {
    name: 'Page B', space: 1200, running: 3000, grinding: 1398,
  },
  {
    name: 'Page C', space: 150, running: 2000, grinding: 9800,
  },
  {
    name: 'Page D', space: 500, running: 2780, grinding: 3908,
  },
  {
    name: 'Page E', space: 350, running: 1890, grinding: 4800,
  },
  {
    name: 'Page F', space: 960, running: 2390, grinding: 3800,
  },
  {
    name: 'Page G', space: 200, running: 3490, grinding: 4300,
  },
];


/*
const data = [
    { name: 'a', foo: [-10, 10] },
    { name: 'b', foo: [-4, 8] },
    { name: 'c', foo: [0, 9] },
    { name: 'd', foo: [2, 15] }
]
*/

class CustomizedLabel extends PureComponent {
  render() {
    const {
      x, y, stroke, value,
    } = this.props;

    return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
  }
}

const CustomizedAxisTick = props => {
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

export default class AxisCardComponent extends PureComponent {
    /*
    state = {
        mtime: new Date(this.props.mtime).getTime()
    }
    */

    render() {
        const { quality } = this.props
        //const { mtime } = this.state
/*
        const type = quality['types']['9.525']
        let data = [], startArr = [], endArr = []
        Object.entries(type).forEach(card => {
            Object.entries(card[1]).forEach(procedure => {
                data = [...data, {
                    name: card[0],
                    running: (() => procedure[0] === 'running' ? [+procedure[1]['msBatchLoadingTime'], procedure[1]['msUnloadingTime']] : [])(),
                    grinding: (() => procedure[0] === 'grinding' ? [+procedure[1]['msBatchLoadingTime'], procedure[1]['msUnloadingTime']] : [])()
                }]

                startArr = [...startArr, procedure[1]['msBatchLoadingTime']]
                endArr = [...endArr, procedure[1]['msUnloadingTime']]
            })
        })
*/
        //const start = convertDateToString(Math.min(...startArr))
        //const end = convertDateToString(Math.max(...endArr))

        //data[21]['xAxis'] = [Math.min(...startArr), Math.max(...endArr)]

        //console.log(data)


        //console.log(startArr, endArr )







/*
const type = quality['types']['9.525']
let data = []
Object.entries(type).forEach(card => {
    Object.entries(card[1]).forEach(procedure => {
        console.log( procedure[1]['msUnloadingTime'] - procedure[1]['msBatchLoadingTime'] )
        data = [...data, {
            name: card[0],
            running: (() => procedure[0] === 'running' ? procedure[1]['msUnloadingTime'] - procedure[1]['msBatchLoadingTime'] : 0)(),
            grinding: (() => procedure[0] === 'grinding' ? procedure[1]['msUnloadingTime'] - procedure[1]['msBatchLoadingTime'] : 0)()
        }]

        //startArr = [...startArr, procedure[1]['msBatchLoadingTime']]
        //endArr = [...endArr, procedure[1]['msUnloadingTime']]
    })
})
*/
//console.log(data)














        return (
            <ResponsiveContainer width="100%" aspect={10.0 / 2.7}>
                  <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                      top: 20, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis type="category" dataKey="name" />
                    <XAxis type="number" />
                    <Legend />
                    <Bar dataKey="space" stackId="a" fill="rgba(0,0,0,0)" />
                    <Bar dataKey="running" stackId="a" fill="#8884d8" />
                    <Bar dataKey="space" stackId="a" fill="rgba(0,0,0,0)" />
                    <Bar dataKey="grinding" stackId="a" fill="#82ca9d" />
                    <ReferenceLine x={2500} stroke="rgba(230,200,215,0.2)" strokeWidth={60} />
                    <ReferenceLine x={2500} stroke="red" />
                  </BarChart>
            </ResponsiveContainer>
        )
    }
}

/*

            <ResponsiveContainer width="100%" aspect={10.0 / 4.7}>
                <BarChart
                    data={data} 
                    layout="vertical"
                    margin={{
                        top: 0,
                        right: 20,
                        left: 10,
                        bottom: 40
                    }}
                >
                    <XAxis />                  
                    <YAxis type="category"  />

                    <Bar
                        dataKey="running"
                        key="running"
                        //stackId="b"
                        background
                        fill="#8884d8"
                        name="Обкатка"
                    />
                    
                    <Bar
                        dataKey="grinding"
                        key="grinding"
                        //stackId="b"
                        background
                        fill="lightcoral"
                        name="Шлифовка"
                    />
                    
                </BarChart>
            </ResponsiveContainer>

*/