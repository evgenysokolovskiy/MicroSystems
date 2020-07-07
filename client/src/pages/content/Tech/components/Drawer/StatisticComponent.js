import React, { PureComponent } from 'react'
import { Statistic, Card, Row, Col, Typography } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
const { Text } = Typography

export default class StatisticComponent extends PureComponent {
    render() {
        const {
            // Диаметр
            differenceDiameter,
            // Непостоянство
            differenceInconstancy,
            // Разноразмерность
            differenceDimension,
            // Давление
            differencePressure,
            // Скорость
            differenceSpeed
        } = this.props

        // Иконки стрелок
        const iconDifferenceDiameter =
            differenceDiameter > 0 ? (
                <ArrowUpOutlined />
            ) : differenceDiameter < 0 ? (
                <ArrowDownOutlined />
            ) : null
        const iconDifferenceInconstancy =
            differenceInconstancy > 0 ? (
                <ArrowUpOutlined />
            ) : differenceInconstancy < 0 ? (
                ArrowDownOutlined
            ) : null
        const iconDifferenceDimension =
            differenceDimension > 0 ? (
                <ArrowUpOutlined />
            ) : differenceDimension < 0 ? (
                ArrowDownOutlined
            ) : null
        const iconDifferencePressure =
            differencePressure > 0 ? (
                <ArrowUpOutlined />
            ) : differencePressure < 0 ? (
                ArrowDownOutlined
            ) : null
        const iconDifferenceSpeed =
            differenceSpeed > 0 ? (
                <ArrowUpOutlined />
            ) : differenceSpeed < 0 ? (
                ArrowDownOutlined
            ) : null

        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                key="differenceDiameter"
                                title={<Text>Диаметр</Text>}
                                value={Math.abs(differenceDiameter)}
                                precision={2}
                                valueStyle={{ color: differenceDiameter ? '#cf1322' : '#3f8600' }}
                                prefix={iconDifferenceDiameter}
                                suffix="(мкр)"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                key="differenceInconstancy"
                                title={<Text>Непостоянство</Text>}
                                value={Math.abs(differenceInconstancy)}
                                precision={2}
                                valueStyle={{
                                    color: differenceInconstancy > 0 ? '#cf1322' : '#3f8600'
                                }}
                                prefix={iconDifferenceInconstancy}
                                suffix="(мкр)"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                key="differenceDimension"
                                title={<Text>Разноразмерность</Text>}
                                value={Math.abs(differenceDimension)}
                                precision={2}
                                valueStyle={{
                                    color: differenceDimension > 0 ? '#cf1322' : '#3f8600'
                                }}
                                prefix={iconDifferenceDimension}
                                suffix="(мкр)"
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                key="differencePressure"
                                title={<Text>Давление</Text>}
                                value={Math.abs(differencePressure)}
                                precision={2}
                                valueStyle={{ color: differencePressure ? '#cf1322' : '#3f8600' }}
                                prefix={iconDifferencePressure}
                                suffix="(Па)"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                key="differenceSpeed"
                                title={<Text>Скорость</Text>}
                                value={Math.abs(differenceSpeed)}
                                precision={2}
                                valueStyle={{ color: differenceSpeed ? '#cf1322' : '#3f8600' }}
                                prefix={iconDifferenceSpeed}
                                suffix="(об/мин)"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
