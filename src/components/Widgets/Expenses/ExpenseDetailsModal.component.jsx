import React from 'react'
import { Modal, Tabs } from 'antd'

import DetailsPane from './Panes/DetailsPane.component'
import AddPaymentPane from './Panes/AddPaymentPane.component'

const ExpenseDetailsModal = ({ expense, visible, handleCancel, handleUpdate, handleDelete }) => {
    const { TabPane } = Tabs

    return (
        <Modal
            destroyOnClose
            title={expense.title}
            visible={visible}
            onCancel={() => handleCancel()}
            footer={null}
            width="60%"
            bodyStyle={{paddingTop: '0'}}>
            <Tabs defaultActiveKey="1" size="large">
                <TabPane tab="Add payment" key="1">
                    <AddPaymentPane />
                </TabPane>
                <TabPane tab="Calendar" key="2">
                    <p>Calendar content</p>
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