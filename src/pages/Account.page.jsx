import React from 'react'
import MainLayout from '../components/Layouts/MainLayout.component'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import withAuthentication from '../components/Auth/withAuthentication.component'

const Account = ({authUser}) => {
    return (
        <MainLayout>
            <div>This is the account page</div>
            <Link to={ROUTES.PASSWORD_CHANGE}>Change password</Link>
        </MainLayout>
    )
}

const mapStateToProps = state => {
    return {
        authUser: state.authUser.authUser
    }
}

export default connect(
    mapStateToProps
)(withAuthentication(Account))