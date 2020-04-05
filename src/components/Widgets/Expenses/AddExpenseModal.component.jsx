import React, { useState } from 'react'
import { Modal, Form, Input, Checkbox, InputNumber, Button } from 'antd'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

const AddExpenseModal = ({ visible, handleCancel, handleAdd }) => {
    const [form] = Form.useForm()
    const [isVariable, setIsVariable] = useState(false)

    const handleVariableChange = () => {
        setIsVariable(!isVariable)
    }

    const modalFooter = [
        <Button key="back" onClick={() => handleCancel()}>
            Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => handleAdd(form)}>
            Submit
        </Button>
    ]

    return (
        <Modal
            destroyOnClose
            title="Add new expense"
            onOk={() => handleAdd(form)}
            onCancel={() => handleCancel()}
            visible={visible}
            footer={modalFooter}>
            <Form
                {...layout}
                form={form}
                name="add-new-expense">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Title must not be empty' }]}>
                    <Input />
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
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddExpenseModal