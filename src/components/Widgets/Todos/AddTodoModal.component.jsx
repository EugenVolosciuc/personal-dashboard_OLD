import React from 'react'
import { Modal, Form, Input, Button } from 'antd'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

const AddTodoModal = ({ visible, handleCancel, handleAdd }) => {
    const [form] = Form.useForm()

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
            title="Add new todo"
            onOk={() => handleAdd(form)}
            onCancel={() => handleCancel()}
            visible={visible}
            footer={modalFooter}
            width="600px">
            <Form
                {...layout}
                form={form}
                name="add-new-note">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Title must not be empty' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddTodoModal