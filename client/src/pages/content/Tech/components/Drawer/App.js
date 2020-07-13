import React, { PureComponent, Suspense, lazy } from 'react'
import { Drawer, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import componentLoader from '../../../componentLoader'

const TableComponent = lazy(() => componentLoader(() => import('./TableComponent')))
const StatisticComponent = lazy(() => componentLoader(() => import('./StatisticComponent')))
const { Title } = Typography

export default class App extends PureComponent {
    state = {
        differenceDiameter: null,
        differenceInconstancy: null,
        differenceDimension: null,
        differencePressure: null,
        differenceSpeed: null
    }
    onGetData = data => {
        const {
            differenceDiameter,
            differenceInconstancy,
            differenceDimension,
            differencePressure,
            differenceSpeed
        } = data

        this.setState({
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
                                <LoadingOutlined
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
