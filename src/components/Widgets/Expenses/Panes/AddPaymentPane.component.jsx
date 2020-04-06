import React from 'react'
import { Form, Input, Button, DatePicker, InputNumber } from 'antd'
import moment from 'moment'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

const AddPaymentPane = () => {
    const [form] = Form.useForm()

    return (
        <Form
            {...layout}
            form={form}
            name="Add payment">
            <Form.Item
                label="Amount"
                name="amount"
                rules={[
                    { required: true, message: 'Amount must not be empty' },
                    { type: 'number', min: 0.1, message: 'Amount cannot be less than 0.1'}
                ]}>
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Day payment made"
                name="day-payment-made"
                rules={[{ required: true, message: 'You must choose a day' }]}>
                <DatePicker
                    defaultValue={moment()} />
            </Form.Item>
            <Form.Item
                label="Notes"
                name="notes">
                <Input.TextArea autoSize={{ minRows: 4, maxRows: 10 }} />
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{marginTop: '22px'}}>
                    Add Payment
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddPaymentPane