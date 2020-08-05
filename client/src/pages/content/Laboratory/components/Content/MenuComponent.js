import React, { PureComponent } from 'react'
import { Menu } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

export default class MenuComponent extends PureComponent {
    state = {
        collapsed: false
    }

    handleClick = (e) => {
        this.props.handleClickMenu(e.key)
    }

    handleSubmit = async (e) => {
        const formElement = document.querySelector('form')

        let response = await fetch('/files', {
            method: 'POST',
            body: new FormData(formElement)
        })

        /*
        let formData = new FormData()
        const data = await e.target.files[0]

        formData.append('data', data)

        let res = await fetch('/files', {
            method: 'POST',
            body: formData
        })
        */
    }

    render() {
        const form = (
            <form id="formElem" encType="multipart/form-data" onChange={this.handleSubmit}>
                <label htmlFor="file-upload" className="upload">
                    <UploadOutlined /> Обновить
                </label>
                <input
                    id="file-upload"
                    type="file"
                    name="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
            </form>
        )

        return (
            <div style={{ height: '20vh' }}>
                <Menu
                    mode="inline"
                    theme="light"
                    inlineCollapsed={this.state.collapsed}
                    onClick={this.handleClick}
                >
                    <Menu.Item key="sog">
                        <span>СОЖ</span>
                    </Menu.Item>
                    <Menu.Item key="shp">
                        <span>ШП</span>
                    </Menu.Item>

                    <Menu.Item key="shsp">
                        <span>ШСП</span>
                    </Menu.Item>
                </Menu>

                {form}
            </div>
        )
    }
}
