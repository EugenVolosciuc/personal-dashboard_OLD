import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
import _ from 'lodash'

import { setCacheFetchTime } from '../../store/actions/cacheFetchTimeActions'

const withCache = (fetchDataFunc, minutesCacheIsStored, dataName) => Component => {
    const lastFetchedDataName = 'lastFetched' + _.upperFirst(dataName)

    class WithCache extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                isLoading: false
            }
        }

        componentDidMount() {
            const lastFetchedTime = this.props.cacheFetchTime[lastFetchedDataName]

            if (lastFetchedTime !== null && !(new Date(lastFetchedTime).getTime() + (minutesCacheIsStored * 60000) < new Date().getTime())) { // don't fetch data
                return
            } else { // fetch data
                this.setState({ isLoading: true })
                this.props.fetchDataFunc()
                    .then(() => {
                        this.setState({ isLoading: false })
                        this.props.setCacheFetchTime({
                            updatedCache: lastFetchedDataName,
                            lastFetched: new Date()
                        })
                    })
                    .catch(() => {
                        message.error(`Could not fetch ${dataName}`)
                        this.setState({ isLoading: false })
                    })
            }
        }

        render() {
            const { isLoading } = this.state

            let propsToPassToComponent = {
                ...this.props,
                isLoading
            }
            propsToPassToComponent = _.omit(propsToPassToComponent, ['cacheFetchTime', 'fetchDataFunc', 'setCacheFetchTime'])

            return (
                <Component {...propsToPassToComponent} />
            )
        }
    }

    const mapStateToProps = state => {
        return {
            cacheFetchTime: state.cacheFetchTime
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            fetchDataFunc: (payload) => dispatch(fetchDataFunc(payload)),
            setCacheFetchTime: (payload) => dispatch(setCacheFetchTime(payload))
        }
    }

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(WithCache)
}

export default withCache