import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './store/store'

import "antd/dist/antd.css"
import './style/general.scss'
import './style/widgets.scss'
import './style/grid.scss'

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)