import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeAccess } from '../../../store/utils/actions/accessAction'
import { Modal, Input, Button, Typography } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import './styles/index.css'

const { Title } = Typography

class App extends React.Component {
    state = { visible: true, disabled: true }

    componentDidMount() {
        this.props.changeAccess(null)
    }

    onChange = (e) => {
        const { changeAccess } = this.props
        const pathname = window.location.pathname.slice(1)

        changeAccess(null)
        this.setState({
            disabled: true
        })

        if (pathname === 'repair') {
            if (e.target.value === '12345') {
                changeAccess({ repaire: 'user' })
                this.setState({
                    disabled: false
                })
            }
            if (e.target.value === 'repair123') {
                changeAccess({ repaire: 'admin' })
                this.setState({
                    disabled: false
                })
            }
        }

        if (pathname === 'laboratory') {
            if (e.target.value === '12345') {
                changeAccess({ laboratory: 'user' })
                this.setState({
                    disabled: false
                })
            }
            if (e.target.value === 'lab123') {
                changeAccess({ laboratory: 'admin' })
                this.setState({
                    disabled: false
                })
            }
        }

        if (pathname === 'tech') {
            if (e.target.value === '12345') {
                changeAccess({ tech: 'user' })
                this.setState({
                    disabled: false
                })
            }
            if (e.target.value === 'tech123') {
                changeAccess({ tech: 'admin' })
                this.setState({
                    disabled: false
                })
            }
        }
    }

    onOk = () => {
        this.setState({
            visible: false
        })
    }

    handleUploadLaboratory = async (e) => {
        const formElement = document.getElementById('formElemLaboratory')

        let response = await fetch('/laboratory/fact', {
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

    handleUploadTech = async (e) => {
        const formElement = document.getElementById('formElemTech')

        let response = await fetch('/tech/fact', {
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
        const { access } = this.props
        const { visible, disabled } = this.state

        const uploadLaboratoryFact = (
            <form
                id="formElemLaboratory"
                encType="multipart/form-data"
                onChange={this.handleUploadLaboratory}
            >
                <label htmlFor="file-upload" className="upload">
                    <UploadOutlined /> Загрузить новый файл!
                </label>
                <input
                    id="file-upload"
                    type="file"
                    name="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
            </form>
        )

        const uploadTechFact = (
            <form id="formElemTech" encType="multipart/form-data" onChange={this.handleUploadTech}>
                <label htmlFor="file-upload" className="upload">
                    <UploadOutlined /> Загрузить новый файл!
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
            <div>
                <Modal title=<Title lavel={4}>Введите пароль</Title> visible={visible}>
                    <Input.Password placeholder="пароль" size="large" onChange={this.onChange} />
                    {access && access['laboratory'] === 'admin' && uploadLaboratoryFact}
                    {access && access['tech'] === 'admin' && uploadTechFact}
                    <div className="modal_btn">
                        <Link to="/">
                            <Button size="large">Cancel</Button>
                        </Link>
                        <Button
                            disabled={disabled}
                            type="primary"
                            size="large"
                            style={{ marginLeft: '8px' }}
                            onClick={this.onOk}
                        >
                            Ok
                        </Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        ...store.accessReducer
    }
}

const mapDispatchToProps = {
    changeAccess
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
