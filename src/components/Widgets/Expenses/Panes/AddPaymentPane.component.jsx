import React from 'react'
import { Form, Input, Button, DatePicker, InputNumber, message } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { addPayment } from '../../../../store/actions/paymentActions'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

const tailLayout = {
    wrapperCol: { offset: 6, span: 18 }
}

const AddPaymentPane = ({ addPayment, expense }) => {
    const [form] = Form.useForm()

    const handleAddPayment = () => {
        let dataToSend = {
            newPayment: {
                ...form.getFieldsValue(),
                uid: uuidv4(),
            },
            expenseID: expense.uid
        }

        if (dataToSend.newPayment.notes === undefined) {
            dataToSend.newPayment.notes = null
        }

        form.validateFields()
            .then(() => {
                try {
                    addPayment(dataToSend)
                    message.success("Payment added successfully")
                    form.resetFields()
                } catch (error) {
                    console.error(error)
                    message.error(error.message)
                }
            })
            .catch(() => {
                message.error("Please check the data you provided")
            })
    }

    return (
        <Form
            {...layout}
            form={form}
            name="Add payment"
            onFinish={handleAddPayment}
            initialValues={{
                dayPaymentMade: moment()
            }}>
            <Form.Item
                label="Amount"
                name="amount"
                rules={[
                    { required: true, message: 'Amount must not be empty' },
                    { type: 'number', min: 0.1, message: 'Amount cannot be less than 0.1' }
                ]}>
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Day payment made"
                name="dayPaymentMade"
                rules={[{ required: true, message: 'You must choose a day' }]}>
                <DatePicker />
            </Form.Item>
            <Form.Item
                label="Notes"
                name="notes">
                <Input.TextArea autoSize={{ minRows: 4, maxRows: 10 }} />
            </Form.Item>
            <Form.Item
                {...tailLayout}>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginTop: '22px' }}>
                    Add Payment
                </Button>
            </Form.Item>
        </Form>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addPayment: payload => dispatch(addPayment(payload))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(AddPaymentPane)