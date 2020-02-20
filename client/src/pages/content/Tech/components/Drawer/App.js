import React, { Suspense, lazy } from 'react'
import { Drawer, Icon } from 'antd'

const TableComponent = lazy(() => import('./TableComponent'))

export const App = props => {
    const {
        visible,
        handleClickCloseTechDrawer,
        technology,
        fact,
        techTargetTimeStamp: date
    } = props

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
                        <h2>
                            Временная отметка: <span className="color">{date}</span>
                        </h2>
                        <TableComponent
                            technology={technology}
                            fact={fact}
                            techTargetTimeStamp={date}
                            changeTechTargetTimeStamp={props.changeTechTargetTimeStamp}
                        />
                    </Suspense>
                )}
            </Drawer>
        </div>
    )
}
