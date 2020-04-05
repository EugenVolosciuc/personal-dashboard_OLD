import React from 'react'
import { Row, Col } from 'antd'

import MainLayout from '../components/Layouts/MainLayout.component'
import PasswordChangeForm from '../components/Auth/PasswordChangeForm.component'
import withAuthentication from '../components/Auth/withAuthentication.component'

const PasswordChange = () => {
    return (
        <MainLayout>
            <Row justify="center" gutter={[8, 8]}>
                <Col className="gutter-row" span={8}>
                    <PasswordChangeForm />
                </Col>
            </Row>
        </MainLayout>
    )
}

export default withAuthentication(PasswordChange)