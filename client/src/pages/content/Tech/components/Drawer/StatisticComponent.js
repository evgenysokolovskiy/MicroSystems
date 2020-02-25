import React, { PureComponent } from 'react'
import { Statistic, Card, Row, Col, Typography, Icon } from 'antd'
const { Text } = Typography

export default class StatisticComponent extends PureComponent {
    render() {
        const { percentDiameter } = this.props

        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title={<Text>Диаметр</Text>}
                                value={Math.abs(percentDiameter) * 100}
                                precision={2}
                                valueStyle={{ color: percentDiameter ? '#cf1322' : '#3f8600' }}
                                prefix={
                                    <Icon
                                        type={
                                            percentDiameter > 0
                                                ? 'arrow-up'
                                                : percentDiameter < 0
                                                ? 'arrow-down'
                                                : null
                                        }
                                    />
                                }
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title={<Text>Непостоянство</Text>}
                                value={0}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<Icon type={null} />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title={<Text>Разноразмерность</Text>}
                                value={0}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<Icon type={null} />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title={<Text>Давление</Text>}
                                value={0}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<Icon type={null} />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title={<Text>Скорость</Text>}
                                value={0}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<Icon type={null} />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
