import React from 'react'
// Antd
import { Breadcrumb, Icon } from 'antd'

export const BreadcrumbComponent = () => {
    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
                <Icon type="caret-right" theme="filled" />
            </Breadcrumb.Item>
            <Breadcrumb.Item>ПЛАН</Breadcrumb.Item>
            <Breadcrumb.Item>ДИАГНОСТИКА</Breadcrumb.Item>
            <Breadcrumb.Item>СХЕМА</Breadcrumb.Item>
            <Breadcrumb.Item>
                <span></span>
            </Breadcrumb.Item>
        </Breadcrumb>
    )
}
