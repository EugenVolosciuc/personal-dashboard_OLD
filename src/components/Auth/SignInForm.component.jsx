import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { withRouter, Link } from 'react-router-dom'
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

const SignInForm = ({firebase, history}) => {
    const [form] = Form.useForm()

    const handleFinish = async values => {
        try {
            await firebase.doSignInWithEmailAndPassword(values.email, values.password)
            message.success("Signed in")
            history.push(ROUTES.DASHBOARD)
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

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Sign In
                </Button>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <p><Link to={ROUTES.PASSWORD_FORGET}>Forgot password?</Link></p>
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
)(SignInForm))