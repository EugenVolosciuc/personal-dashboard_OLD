import React, { useState } from 'react'
import { Modal, Form, Input, Checkbox, InputNumber, Button, Popconfirm } from 'antd'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

const EditExpenseModal = ({ expense, visible, handleCancel, handleUpdate, handleDelete }) => {
    const [form] = Form.useForm()
    const [isVariable, setIsVariable] = useState(expense.amount === 'variable')

    const initialFormValues = {
        title: expense.title,
        payDay: expense.payDay,
        amount: expense.amount === 'variable' ? null : expense.amount,
        amountVariable: isVariable
    }

    const handleVariableChange = () => {
        setIsVariable(!isVariable)
    }

    const modalFooter = [
        <div key="footer-btns" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Popconfirm
                title="Are you sure you want to delete this expense?"
                onConfirm={() => handleDelete(expense.uid)}
                okText="Yes"
                cancelText="No">
                <Button key="delete" danger>
                    Delete
                </Button>
            </Popconfirm>
            <span>
                <Button onClick={() => handleCancel()}>
                    Cancel
            </Button>
                <Button type="primary" onClick={() => handleUpdate(expense.uid, form, initialFormValues.title)}>
                    Submit
            </Button>
            </span>
        </div>
    ]

    return (
        <Modal
            destroyOnClose
            title={"Edit " + expense.title}
            onOk={() => handleUpdate(expense.uid, form, initialFormValues.title)}
            onCancel={() => handleCancel()}
            visible={visible}
            footer={modalFooter}>
            <Form
                {...layout}
                form={form}
                name={expense.title + " edit form"}
                initialValues={initialFormValues}
                onFinish={() => handleUpdate(expense.uid, form, initialFormValues.title)}>
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
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditExpenseModal