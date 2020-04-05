import React from 'react'
import { Row, Col } from 'antd'

import MainLayout from '../components/Layouts/MainLayout.component'
import PasswordForgetForm from '../components/Auth/PasswordForgetForm.component'

const PasswordForget = () => {
    return (
        <MainLayout>
            <Row justify="center" gutter={[8, 8]}>
                <Col className="gutter-row" span={8}>
                    <PasswordForgetForm />
                </Col>
            </Row>
        </MainLayout>
    )
}

export default PasswordForget