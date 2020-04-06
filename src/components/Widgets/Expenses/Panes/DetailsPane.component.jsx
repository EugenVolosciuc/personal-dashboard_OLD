import React, { useState } from 'react'
import { Form, Input, Checkbox, InputNumber, Button, Popconfirm } from 'antd'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

const DetailsPane = ({ expense, handleUpdate, handleDelete }) => {
    const [form] = Form.useForm()
    const [isVariable, setIsVariable] = useState(expense.amount === 'variable')

    const initialValues = {
        title: expense.title,
        payDay: expense.payDay,
        amount: expense.amount === 'variable' ? null : expense.amount,
        amountVariable: isVariable
    }

    const handleVariableChange = () => {
        setIsVariable(!isVariable)
    }

    return (
        <Form
            {...layout}
            form={form}
            name={expense.title + " edit form"}
            initialValues={initialValues}>
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Title must not be empty' }]}>
                <Input value={expense.title} />
            </Form.Item>
            <Form.Item
                label="Pay day"
                name="payDay"
                rules={[
                    { required: true, message: 'Pay day must not be empty' },
                    { type: 'number', min: 1, max: 31, message: 'Pay day must be between 1 and 31' }
                ]}>
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Amount">
                <Form.Item
                    name="amount"
                    dependencies={['amountVariable']}
                    rules={isVariable
                        ? [{ type: 'number', min: 0.1, message: 'Amount cannot be less than 0.1' }]
                        : [
                            { type: 'number', min: 0.1, message: 'Amount cannot be less than 0.1' },
                            { required: true, message: 'Amount is required if it\'s not variable' }
                        ]}
                    style={{ display: 'inline-block', marginRight: '20px' }}>
                    <InputNumber disabled={isVariable} />
                </Form.Item>
                <Form.Item
                    style={{ display: 'inline-block' }}
                    name='amountVariable'
                    valuePropName='checked'>
                    <Checkbox onChange={handleVariableChange}>Variable amount</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button 
                        type="primary"
                        htmlType="submit"
                        onClick={() => handleUpdate(expense.uid, form, initialValues.title)}
                        style={{marginRight: '15px'}}>
                        Update
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this expense?"
                        onConfirm={() => handleDelete(expense.uid)}
                        okText="Yes"
                        cancelText="No">
                        <Button type="danger" danger>Delete</Button>
                    </Popconfirm>
                </Form.Item>
            </Form.Item>
        </Form>
    )
}

export default DetailsPane