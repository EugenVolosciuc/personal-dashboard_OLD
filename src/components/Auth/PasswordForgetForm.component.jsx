import React from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { connect } from 'react-redux'

import * as ROUTES from '../../constants/routes'

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const tailFormItemLayout = {
    wrapperCol: {
        span: 16,
        offset: 8
    }
}

const PasswordForgetForm = ({firebase, history}) => {
    const handleFinish = async values => {
        try {
            await firebase.doPasswordReset(values.email)
            message.success("Password reset email sent, please check your inbox")
            history.push(ROUTES.LANDING)
        } catch (error) {
            if (error.code.includes('auth')) {
                message.error(error.message)
            } else {
                message.error("An error occured")
                console.log(error)
            }
        }
    }

    return (
        <Form
            {...formItemLayout}
            name="sign-in"
            onFinish={handleFinish}>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
                validateTrigger="onSubmit">
                <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Reset my Password
                </Button>
            </Form.Item>
        </Form>
    )
}

const mapStateToProps = state => {
    return {
        firebase: state.firebase.firebase
    }
}

export default connect(
    mapStateToProps
)(withRouter(PasswordForgetForm))