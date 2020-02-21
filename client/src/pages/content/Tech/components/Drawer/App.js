import React, { PureComponent, Suspense, lazy } from 'react'
import { Drawer, Icon, Typography, Statistic, Card, Row, Col, InputNumber } from 'antd'

const TableComponent = lazy(() => import('./TableComponent'))
const PercentPieChartComponent = lazy(() => import('./PercentPieChartComponent'))
const { Title, Text } = Typography

export default class App extends PureComponent {
    state = {
        diff: null,
        percentDiameter: null
    }
    onGetData = data => {
        const { diff, percentDiameter } = data
        this.setState({
            diff,
            percentDiameter
        })
    }
    render() {
        const {
            visible,
            handleClickCloseTechDrawer,
            technology,
            fact,
            techTargetTimeStamp: date,
            changeTechTargetTimeStamp
        } = this.props

        const { diff, percentDiameter } = this.state


        return (
            <div>
                <Drawer
                    width={'50vw'}
                    placement="right"
                    closable={false}
                    onClose={handleClickCloseTechDrawer}
                    visible={visible}
                >
                    {visible && (
                        <Suspense
                            fallback={
                                <Icon
                                    type="loading"
                                    className="loading"
                                    style={{ fontSize: '20px', color: 'red' }}
                                />
                            }
                        >
                            <Title level={4}>Временная отметка: {date}</Title>


  <div style={{ background: '#ECECEC', padding: '30px' }}>
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          <Statistic
            title={<Text>Диаметр</Text>}
            value={182.12}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<Icon type="arrow-up" />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={<Text>Непостоянство</Text>}
            value={9.3}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<Icon type="arrow-down" />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={<Text>Размерность</Text>}
            value={9.3}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<Icon type="arrow-down" />}
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
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<Icon type="arrow-up" />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={<Text>Скорость</Text>}
            value={182.12}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<Icon type="arrow-down" />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
  </div>

                            <TableComponent
                                technology={technology}
                                fact={fact}
                                techTargetTimeStamp={date}
                                changeTechTargetTimeStamp={changeTechTargetTimeStamp}
                                onGetData={this.onGetData}
                            />

                        </Suspense>
                    )}
                </Drawer>
            </div>
        )
    }
}
