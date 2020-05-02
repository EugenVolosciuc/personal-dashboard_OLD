/**
 * Calculates the distance between two horizontal grid dots and two vertical grid dots
 * @param {HTMLElement} gridDot Dot on which the user clicks
 * @returns {Object} Horizontal length and vertical length
 */
export const getGridLengthUnits = (gridDot) => {
    
    // Get index of the clicked dot in row
    let indexOfClickedDot = 0
    let gridDotClone = gridDot.cloneNode() // Cloning node so that gridDot isn't mutated

    for (let i = 0; (gridDotClone = gridDotClone.previousSibling); i++) {
        indexOfClickedDot++
    }

    const gridLength = {}

    const gridDotRect = gridDot.getBoundingClientRect()
    const nextSiblingRect = gridDot.nextSibling.getBoundingClientRect()
    const nextRowSiblingRect = gridDot.parentElement.nextSibling.children[indexOfClickedDot].getBoundingClientRect()

    // Get horizontal length between two dots
    gridLength.horizontalLength = nextSiblingRect.left - gridDotRect.right

    // Get vertical length between two dots
    gridLength.verticalLength = nextRowSiblingRect.top - gridDotRect.bottom

    return gridLength
}
/**
 * @param {HTMLElement} gridDot Dot on which the user clicks
 * @param {Number} minWidth Minimum length (distances between horizontal dots) of the widget
 * @param {Number} minHeight Minimum height (distances between vertical dots) of the widget
 * @returns {Object} Widget width, height and position (DOMRect)
 */
export const getWidthHeightPositionOfWidget = (gridDot, minWidth = 2, minHeight = 2) => {
    const { horizontalLength, verticalLength } = getGridLengthUnits(gridDot)
    const gridDotRect = gridDot.getBoundingClientRect()

    return {
        widgetWidth: Math.round((horizontalLength * minWidth) + (gridDotRect.width * (minWidth - 1))),
        widgetHeight: Math.round((verticalLength * minHeight) + (gridDotRect.height * (minHeight - 1))),
        widgetPosition: {
            bottom: gridDotRect.bottom - gridDotRect.height,
            top: gridDotRect.top + gridDotRect.height,
            left: gridDotRect.left + gridDotRect.width,
            right: gridDotRect.right - gridDotRect.width,
            x: gridDotRect.x + gridDotRect.width,
            y: gridDotRect.y + gridDotRect.height
        }
    }
}