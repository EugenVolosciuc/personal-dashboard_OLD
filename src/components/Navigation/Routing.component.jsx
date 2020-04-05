import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Landing, Dashboard, SignIn, SignUp, Account, PasswordChange, PasswordForget } from '../../pages'

const Routing = () => {

    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/sign-up' component={SignUp} />
                <Route path='/sign-in' component={SignIn} />
                <Route path='/account' component={Account} />
                <Route path='/pw-change' component={PasswordChange} />
                <Route path='/pw-forget' component={PasswordForget} />
            </Switch>
        </Router>
    )
}

export default Routing