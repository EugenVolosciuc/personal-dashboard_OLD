import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
import _ from 'lodash'

import { setCacheFetchTime } from '../../store/actions/cacheFetchTimeActions'

/**
 * HOC that sets the time Redux cache needs to be updated
 * @param {function} fetchDataFunc Redux action performed to fetch data.
 * @param {number} minutesCacheIsStored Time after which the data fetch function can be fired again.
 * @param {string} dataName Root name of the data fetched.
 * @param {Array} reduxPayloadStructure Optional. Mandatory if isNested. An array that sets the payload structure. The first item represents the prop which is used as a payload, the second item is an object where the key is the key sent as payload and the value is the prop's accessed key.
 * @param {boolean} isNested Optional. Whether the data to be cached is nested inside the dataName.
 */
const withCache = (fetchDataFunc, minutesCacheIsStored, dataName, reduxPayloadStructure, isNested) => Component => {
    const lastFetchedDataName = 'lastFetched' + _.upperFirst(dataName)

    class WithCache extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                isLoading: false
            }
        }

        componentDidMount() {
            let lastFetchedTime
            if (isNested) {
                lastFetchedTime = _.get(this.props, `cacheFetchTime[${lastFetchedDataName}][${this.props[reduxPayloadStructure[0]].title}]` , null) // .title is kind of hardcoded, should think of a more dynamic way of writing it
            } else {
                lastFetchedTime = this.props.cacheFetchTime[lastFetchedDataName]
            }

            let payload
            // If there is any payload to be passed to the fetch data function
            if (_.isArray(reduxPayloadStructure)) {
                payload = {}
                for (let [key, value] of Object.entries(reduxPayloadStructure[1])) {
                    payload[key] = this.props[reduxPayloadStructure[0]][value]
                }
            }

            if (lastFetchedTime !== null && !(new Date(lastFetchedTime).getTime() + (minutesCacheIsStored * 60000) < new Date().getTime())) { // don't fetch data
                return
            } else { // fetch data
                this.setState({ isLoading: true })
                this.props.fetchDataFunc(_.isArray(reduxPayloadStructure) ? payload : null)
                    .then(() => {
                        this.setState({ isLoading: false })

                        let cacheFetchTimeData = {
                            updatedCache: lastFetchedDataName,
                            lastFetched: new Date(),
                        }

                        if (isNested) {
                            cacheFetchTimeData.nestedData = this.props[reduxPayloadStructure[0]].title // .title is kind of hardcoded, should think of a more dynamic way of writing it
                        }
                        this.props.setCacheFetchTime(cacheFetchTimeData)
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