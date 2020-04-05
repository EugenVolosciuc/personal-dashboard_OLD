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

const PasswordChangeForm = ({ firebase, history, authUser }) => {
    const [form] = Form.useForm()
    const handleFinish = async values => {
        try {
            const credential = await firebase.emailAuthProvider(authUser.email, form.getFieldValue('current-password'))
            await authUser.reauthenticateWithCredential(credential)
            await firebase.doPasswordUpdate(form.getFieldValue('new-password'))
            message.success("Password changed succesfully")
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
            name="sign-in"
            onFinish={handleFinish}>
            <Form.Item
                name="current-password"
                label="Current password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your current password!',
                    },
                ]}>
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="new-password"
                label="New Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your new password!',
                    },
                ]}
                validateTrigger="onSubmit"
                hasFeedback>
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm-password"
                label="Confirm Password"
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your new password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('new-password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    })
                ]}
                validateTrigger="onSubmit"
                hasFeedback>
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Change Password
                </Button>
            </Form.Item>
        </Form>
    )
}

const mapStateToProps = state => {
    return {
        firebase: state.firebase.firebase,
        authUser: state.authUser.authUser
    }
}

export default connect(
    mapStateToProps
)(withRouter(PasswordChangeForm))