import React from 'react'
import { Modal, Tabs } from 'antd'

import GeneralExpenseCalendarPane from './Panes/GeneralExpenseCalendarPane.component'

const GeneralExpenseModal = ({ visible, handleCancel }) => {
    const { TabPane } = Tabs

    return (
        <Modal
            destroyOnClose
            title="Monthly expenses"
            visible={visible}
            onCancel={() => handleCancel()}
            footer={null}
            width="60%"
            bodyStyle={{paddingTop: '0'}}>
            <Tabs defaultActiveKey="1" size="large">
                <TabPane tab="Calendar" key="1">
                    <GeneralExpenseCalendarPane />
                </TabPane>
                <TabPane tab="Statistics" key="2">
                    <p>Statistics content</p>
                </TabPane>
            </Tabs>
        </Modal>
    )
}

export default GeneralExpenseModal