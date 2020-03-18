import React, { PureComponent, Suspense, lazy } from 'react'
import { Drawer, Icon, Typography } from 'antd'

const TableComponent = lazy(() => import('./TableComponent'))
const StatisticComponent = lazy(() => import('./StatisticComponent'))
const { Title, Text } = Typography

export default class App extends PureComponent {
    state = {
        diff: null,
        differenceDiameter: null,
        differenceInconstancy: null,
        differenceDimension: null,
        differencePressure: null,
        differenceSpeed: null
    }
    onGetData = data => {
        const {
            diff,
            differenceDiameter,
            differenceInconstancy,
            differenceDimension,
            differencePressure,
            differenceSpeed
        } = data

        this.setState({
            diff,
            differenceDiameter,
            differenceInconstancy,
            differenceDimension,
            differencePressure,
            differenceSpeed
        })
    }
    render() {
        const {
            data,
            target,
            visible,
            handleClickCloseTechDrawer,
            changeTechTargetTimeStamp
        } = this.props

        const {
            diff,
            differenceDiameter,
            differenceInconstancy,
            differenceDimension,
            differencePressure,
            differenceSpeed
        } = this.state

        return (
            <div>
                <Drawer
                    width={'50vw'}
                    placement="right"
                    closable={false}
                    visible={visible}
                    onClose={handleClickCloseTechDrawer}
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
                            <Title level={4}>Дата: {target}</Title>

                            <StatisticComponent
                                differenceDiameter={differenceDiameter}
                                differenceInconstancy={differenceInconstancy}
                                differenceDimension={differenceDimension}
                                differencePressure={differencePressure}
                                differenceSpeed={differenceSpeed}
                            />
                            <TableComponent
                                data={data}
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
