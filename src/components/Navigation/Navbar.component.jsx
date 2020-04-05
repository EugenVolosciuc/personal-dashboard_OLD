import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Button, message } from 'antd'
import * as ROUTES from '../../constants/routes'
import { connect } from 'react-redux'

const Navbar = ({ authUser, firebase, history }) => authUser ? <NavigationAuth history={history} firebase={firebase} /> : <NavigationNonAuth />

const NavigationAuth = ({history, firebase}) => {
    const handleSignOut = async () => {
        try {
            await firebase.doSignOut()
            message.success("Successfuly signed out")
            history.push(ROUTES.LANDING)
        } catch(error) {
            if (error.code.includes('auth')) {
                message.error(error.message)
            } else {
                message.error("An error occured")
                console.log(error)
            }
        }
    }

    return (
        <Menu mode="horizontal" style={{ float: 'right', lineHeight: '64px' }}>
            <Menu.Item>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </Menu.Item>
            <Menu.Item onClick={handleSignOut}>
                <Button style={{ padding: '0' }} size="small" type="link">Sign Out</Button>
            </Menu.Item>
        </Menu>
    )
}

const NavigationNonAuth = () => {
    return (
        <Menu mode="horizontal" style={{ float: 'right', lineHeight: '64px' }}>
            <Menu.Item>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </Menu.Item>
        </Menu>
    )
}

const mapStateToProps = state => {
    return {
        authUser: state.authUser.authUser,
        firebase: state.firebase.firebase
    }
}

export default connect(
    mapStateToProps
)(withRouter(Navbar))