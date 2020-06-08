import React, { PureComponent } from 'react'
import ChartComponent from './ChartComponents/ChartComponent'
import { Layout, Menu, Tabs } from 'antd'

const { Content } = Layout
const { TabPane } = Tabs

// Функция правильного отображения числовых значений для отсечек на XAxis
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

export default class TabsComponent extends PureComponent {
    handleChangeParam = e => {
        this.props.handleClickParam(e)
    }

    handleChangeProp = e => {
        this.props.handleClickProp(e)
    }

    render() {
        let { param, prop, percent, source } = this.props

        if (!param) {
            param = Object.keys(source)[0]
        }
        if (!prop) {
            prop = Object.keys(source[param])[0]
            this.props.handleClickProp(Object.keys(source[param])[0])
        }
        if (!Object.keys(source[param]).includes(prop)) {
            prop = Object.keys(source[param])[0]
            this.props.handleClickProp(Object.keys(source[param])[0])
        }

        const chart = source && (
            <ChartComponent source={source[param][prop]} CustomizedAxisTick={CustomizedAxisTick} />
        )

        return <>{chart}</>
    }
}

/*

// Параметры (компонент)
const params = (
    <Tabs type="card" defaultActiveKey={param} onChange={this.handleChangeParam}>
        {Object.keys(source).map(param => (
            <TabPane tab={param} key={param} />
        ))}
    </Tabs>
)

// Свойства (компонент)
const props = (
    <Tabs type="card" defaultActiveKey={prop} onChange={this.handleChangeProp}>
        {Object.keys(source[param]).map(p => (
            <TabPane tab={p} key={p} />
        ))}
    </Tabs>
)

        
const SHP_NAMES = {
    params: {
        dieselFuelMD: 'Дизельное топливо МД',
        dieselFuelMK: 'Дизельное топливо МК',
        industrialOil: 'Масло индустриальное И-20А',
        quenchingOil: 'Масло закалочное ТермОйл с агрегата Шварц',
        paste1Finishing: 'Паста 1 доводка',
        paste2Finishing: 'Паста 2 доводка',
        paste3Finishing: 'Паста 3 доводка',
        paste4Finishing: 'Паста 4 доводка',
        predocol: 'Предокол'
    },
    props: {
        inhibitor: 'Ингибитор, %',
        viscosity: 'Вязкость, мм2/сек',
        h2o: 'H2O, %',
        mechanicalAdmixture: 'Механические примеси, %',
        metalInclusions: 'Металлические включения',
        flashPoint: 't вспышки, не менее град С',
        oleicAcid: 'Олеиновая кислота, %',
        acidNumber: 'Кислотное число, мг.кон'
    }
}

const inns = ['Сводная', 140042, 160012, 160014, 160047, 170032, 170084, 170092]

// Оборудование (компонент)
const equipment = (
    <Tabs type="card" defaultActiveKey="1">
        {inns.map(param => (
            <TabPane tab={param} key={param} />
        ))}
    </Tabs>
)

// Свойства (компонент)
const menu = (
    <Menu mode="inline" theme="light" defaultSelectedKeys={['Ингибитор, %']}>
        {Object.values(SHP_NAMES['props']).map(prop => (
            <Menu.Item key={prop}>
                <span>{prop}</span>
            </Menu.Item>
        ))}
    </Menu>
)

<Content style={{ minHeight: '80vh', padding: '0 10px' }}>
    <Layout style={{ background: '#fff' }} className="ant-layout-has-sider">
        <div style={{ width: '20vw' }}>{menu}</div>
        <div style={{ width: '73vw' }}>
            <TableComponent />
        </div>
    </Layout>
</Content>

*/
