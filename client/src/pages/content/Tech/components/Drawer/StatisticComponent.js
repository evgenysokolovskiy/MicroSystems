import React, { PureComponent } from 'react'
import { Statistic, Card, Row, Col, Typography, Icon } from 'antd'
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

        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title={<Text>Диаметр</Text>}
                                value={Math.abs(differenceDiameter)}
                                precision={2}
                                valueStyle={{ color: differenceDiameter ? '#cf1322' : '#3f8600' }}
                                prefix={
                                    <Icon
                                        type={
                                            differenceDiameter > 0
                                                ? 'arrow-up'
                                                : differenceDiameter < 0
                                                ? 'arrow-down'
                                                : null
                                        }
                                    />
                                }
                                suffix="(мкр)"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title={<Text>Непостоянство</Text>}
                                value={Math.abs(differenceInconstancy)}
                                precision={2}
                                valueStyle={{
                                    color: differenceInconstancy > 0 ? '#cf1322' : '#3f8600'
                                }}
                                prefix={
                                    <Icon
                                        type={
                                            differenceInconstancy > 0
                                                ? 'arrow-up'
                                                : differenceInconstancy < 0
                                                ? 'arrow-down'
                                                : null
                                        }
                                    />
                                }
                                suffix="(мкр)"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title={<Text>Разноразмерность</Text>}
                                value={Math.abs(differenceDimension)}
                                precision={2}
                                valueStyle={{
                                    color: differenceDimension > 0 ? '#cf1322' : '#3f8600'
                                }}
                                prefix={
                                    <Icon
                                        type={
                                            differenceDimension > 0
                                                ? 'arrow-up'
                                                : differenceDimension < 0
                                                ? 'arrow-down'
                                                : null
                                        }
                                    />
                                }
                                suffix="(мкр)"
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title={<Text>Давление</Text>}
                                value={Math.abs(differencePressure)}
                                precision={2}
                                valueStyle={{ color: differencePressure ? '#cf1322' : '#3f8600' }}
                                prefix={
                                    <Icon
                                        type={
                                            differencePressure > 0
                                                ? 'arrow-up'
                                                : differencePressure < 0
                                                ? 'arrow-down'
                                                : null
                                        }
                                    />
                                }
                                suffix="(Па)"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title={<Text>Скорость</Text>}
                                value={Math.abs(differenceSpeed)}
                                precision={2}
                                valueStyle={{ color: differenceSpeed ? '#cf1322' : '#3f8600' }}
                                prefix={
                                    <Icon
                                        type={
                                            differenceSpeed > 0
                                                ? 'arrow-up'
                                                : differenceSpeed < 0
                                                ? 'arrow-down'
                                                : null
                                        }
                                    />
                                }
                                suffix="(об/мин)"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
