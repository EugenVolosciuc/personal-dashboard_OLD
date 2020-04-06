import React from 'react'
import { Modal, Form, Input, Button, Popconfirm } from 'antd'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

const NoteDetailsModal = ({ note, visible, handleCancel, handleUpdate, handleDelete }) => {
    const [form] = Form.useForm()

    const initialFormValues = {
        title: note.title,
        textContent: note.textContent
    }
    const modalFooter = [
        <div key="footer-btns" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Popconfirm
                title="Are you sure you want to delete this note?"
                onConfirm={() => handleDelete(note.uid)}
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
                <Button type="primary" onClick={() => handleUpdate(note.uid, form, initialFormValues.title)}>
                    Submit
                </Button>
            </span>
        </div>
    ]

    return (
        <Modal
            destroyOnClose
            title={note.title}
            onOk={() => handleUpdate(note.uid, form, initialFormValues.title)}
            onCancel={() => handleCancel()}
            visible={visible}
            footer={modalFooter}>
            <Form
                {...layout}
                form={form}
                name={note.title + " edit form"}
                initialValues={initialFormValues}
                onFinish={() => handleUpdate(note.uid, form, initialFormValues.title)}>
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Title must not be empty' }]}>
                    <Input value={note.title} />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="textContent">
                    <Input.TextArea autoSize={{ minRows: 4, maxRows: 10 }} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default NoteDetailsModal