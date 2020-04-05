import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                isAuth: false
            }
        }
        componentDidMount() {
            const { authUser, history } = this.props
            if (!authUser) {
                history.push(ROUTES.SIGN_IN)
            } else {
                this.setState({ isAuth: true })
            }
        }
        render() {
            const { isAuth } = this.state
            return (
                <Fragment>
                    {isAuth ? <Component /> : null}
                </Fragment>
            )
        }
    }

    const mapStateToProps = state => {
        return {
            authUser: state.authUser.authUser
        }
    }

    return connect(
        mapStateToProps
    )(withRouter(WithAuthentication))
}

export default withAuthentication