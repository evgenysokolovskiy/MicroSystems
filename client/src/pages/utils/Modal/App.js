import React from 'react'
import { Link } from 'react-router-dom'
import { Modal, Input, Button, Typography } from 'antd'
import './styles/index.css'

const { Title } = Typography
const pass = '12345'

export default class App extends React.Component {
    state = {
        visible: true,
        goodPass: false
    }

    onChange = (e) => {
        e.target.value === pass
            ? this.setState({ goodPass: true })
            : this.setState({ goodPass: false })
    }

    onOk = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        return (
            <div>
                <Modal title=<Title lavel={4}>Введите пароль</Title> visible={this.state.visible}>
                    <Input.Password placeholder="пароль" size="large" onChange={this.onChange} />
                    <div className="modal_btn">
                        <Link to="/">
                            <Button size="large">Cancel</Button>
                        </Link>
                        <Button
                            disabled={this.state.goodPass ? false : true}
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
