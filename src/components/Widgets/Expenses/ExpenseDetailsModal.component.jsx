import React from 'react'
import { Modal, Tabs } from 'antd'

import DetailsPane from './Panes/DetailsPane.component'
import AddPaymentPane from './Panes/AddPaymentPane.component'
import PaymentsCalendarPane from './Panes/PaymentsCalendarPane.component'

const ExpenseDetailsModal = ({ expense, visible, handleCancel, handleUpdate, handleDelete }) => {
    const { TabPane } = Tabs

    const amountIsVariable = expense.amount === 'variable'

    return (
        <Modal
            destroyOnClose
            title={expense.title}
            visible={visible}
            onCancel={() => handleCancel()}
            footer={null}
            width="60%"
            bodyStyle={{paddingTop: '0'}}>
            <Tabs defaultActiveKey={amountIsVariable ? '1' : '2'} size="large">
                <TabPane tab="Add payment" key="1">
                    {
                        amountIsVariable 
                            ? <AddPaymentPane expense={expense} />
                            : <p>You can only add a payment if the amount is variable. You can change the amount in the Details Tab.</p> 
                    }
                </TabPane>
                <TabPane tab="Calendar" key="2">
                    <PaymentsCalendarPane expense={expense} />
                </TabPane>
                <TabPane tab="Statistics" key="3">
                    <p>Statistics content</p>
                </TabPane>
                <TabPane tab="Details" key="4">
                    <DetailsPane 
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete} 
                        expense={expense} />
                </TabPane>
            </Tabs>
        </Modal>
    )
}

export default ExpenseDetailsModal