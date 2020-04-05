import React from 'react'
import { Row, Col } from 'antd'

import MainLayout from '../components/Layouts/MainLayout.component'
import SignInForm from '../components/Auth/SignInForm.component'

const SignIn = () => {
    return (
        <MainLayout>
            <Row justify="center" gutter={[8, 8]}>
                <Col className="gutter-row" span={8}>
                    <SignInForm />
                </Col>
            </Row>
        </MainLayout>
    )
}

export default SignIn