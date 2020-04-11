import React from 'react'
import { Modal, Form, Input, Button, Popconfirm, InputNumber, DatePicker, message } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'

import { updatePayment, deletePayment } from '../../../store/actions/paymentActions'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

const EditPaymentModal = (props) => {
    const [form] = Form.useForm()

    const initialFormValues = {
        amount: props.payment.amount,
        dayPaymentMade: moment(props.payment.dayPaymentMade),
        notes: props.payment.notes
    }

    const modalFooter = [
        <div key="footer-btns" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Popconfirm
                title="Are you sure you want to delete this payment?"
                onConfirm={() => handleDelete()}
                okText="Yes"
                cancelText="No">
                <Button key="delete" danger>
                    Delete
            </Button>
            </Popconfirm>
            <span>
                <Button onClick={() => props.handleCancel()}>
                    Cancel
            </Button>
                <Button type="primary" onClick={() => handleUpdate()}>
                    Submit
            </Button>
            </span>
        </div>
    ]

    const handleUpdate = () => {
        let dataToUpdate = {
            ...form.getFieldsValue(),
            dayPaymentMade: form.getFieldValue('dayPaymentMade').toDate()
        }

        if (dataToUpdate.notes === undefined) {
            dataToUpdate.notes = null
        }

        form.validateFields()
            .then(() => {
                try {
                    props.updatePayment(props.expense.uid, props.expense.title, props.payment.uid, dataToUpdate)

                    props.handleCancel()
                    message.success("Payment updated successfully")
                } catch (error) {
                    message.error(error.message)
                }
            })
            .catch(error => {
                message.error("Please check the data you provided")
            })
    }

    const handleDelete = () => {
        try {
            props.deletePayment({paymentID: props.payment.uid, expenseID: props.expense.uid, expenseTitle: props.expense.title})

            props.handleCancel()
            message.success("Payment deleted successfully")
        } catch (error) {
            console.log(error)
            message.error(error.message)
        }
    }

    return (
        <Modal
            destroyOnClose
            title="Edit payment"
            onOk={() => handleUpdate()}
            onCancel={() => props.handleCancel()}
            visible={props.visible}
            footer={modalFooter}
            width="600px">
            <Form
                {...layout}
                form={form}
                name="Edit payment"
                onFinish={handleUpdate}
                initialValues={initialFormValues}>
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
            </Form>
        </Modal>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updatePayment: (expenseID, expenseTitle, paymentID, payload) => dispatch(updatePayment(expenseID, expenseTitle, paymentID, payload)),
        deletePayment: (payload) => dispatch(deletePayment(payload))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(EditPaymentModal)