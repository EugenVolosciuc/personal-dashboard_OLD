import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import { compose } from 'recompose'
import { connect } from 'react-redux'

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

const SignUpForm = ({firebase, history}) => {
    const [form] = Form.useForm()

    const handleFinish = async values => {
        try {
            await firebase.doCreateUserWithEmailAndPassword(values.email, values.password, values.username)
            message.success("Account created")
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
            form={form}
            name="register"
            onFinish={handleFinish}>
            <Form.Item
                name="username"
                label="Username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    }
                ]}>
                <Input />
            </Form.Item>

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

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                validateTrigger="onSubmit"
                hasFeedback>
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}>
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Sign Up
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
)(compose(
    withRouter
)(SignUpForm))