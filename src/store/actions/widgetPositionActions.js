export const SET_WIDGET_POSITION = 'SET_WIDGET_POSITION'

function setWidgetPosition(payload) {
    return {
        type: SET_WIDGET_POSITION,
        payload
    }
}

export { setWidgetPosition }