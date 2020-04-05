import React, { Component } from 'react'
import Routing from './components/Navigation/Routing.component'
import { connect } from 'react-redux'
import { initializeFirebase } from './store/actions/firebaseActions'
import { setAuthUser } from './store/actions/sessionActions'

class App extends Component {
	componentDidMount() {
		this.props.initializeFirebase()
	}

	componentDidUpdate() {
		if (this.props.firebase) {
			this.authListener = this.props.firebase.auth.onAuthStateChanged(
				authUser => {
					localStorage.setItem('authUser', JSON.stringify(authUser))
					this.props.setAuthUser({ authUser })
				},
				() => {
					localStorage.removeItem('authUser')
					this.props.setAuthUser(null)
				}
			)
		}
	}

	componentWillUnmount() {
		if (this.authListener) this.authListener()
	}

	render() {
		return (
			<Routing />
		)
	}
}

const mapStateToProps = state => {
	return {
		firebase: state.firebase.firebase
	}
}

const mapDispatchToProps = dispatch => {
	return {
		initializeFirebase: () => dispatch(initializeFirebase()),
		setAuthUser: (authUser) => dispatch(setAuthUser(authUser))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)