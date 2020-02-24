import React, { PureComponent, Suspense, lazy } from 'react'
import { Drawer, Icon, Typography } from 'antd'

const TableComponent = lazy(() => import('./TableComponent'))
const StatisticComponent = lazy(() => import('./StatisticComponent'))
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
                            <Title level={4}>Дата: {date}</Title>

                            <StatisticComponent percentDiameter={percentDiameter} />
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
