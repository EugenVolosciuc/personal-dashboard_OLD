import React from 'react'
import { Row, Col } from 'antd'
import MainLayout from '../components/Layouts/MainLayout.component'
import SignUpForm from '../components/Auth/SignUpForm.component'

const SignUp = () => {
    return (
        <MainLayout>
            <Row justify="center" gutter={[8, 8]}>
                <Col className="gutter-row" span={8}>
                    <SignUpForm />
                </Col>
            </Row>
        </MainLayout>
    )
}

export default SignUp