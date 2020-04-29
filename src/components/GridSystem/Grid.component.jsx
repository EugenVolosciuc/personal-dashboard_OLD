import React from 'react'

import GridDot from './GridDot.component'

const gridLayout = {
    length: 6,
    height: 10
}

const getGridRows = () => {
    const gridRows = []

    // Loop through rows
    for (let r = 0; r < gridLayout.length; r++) {
        const rowItems = []

        // Loop through items in row
        for (let i = 0; i < gridLayout.height; i++) {
            rowItems.push(<GridDot key={`grid-dot-${r}-${i}`} />)
        }

        gridRows.push(<div key={`grid-row-${r}`} className="grid-row">{rowItems}</div>)
    }

    return gridRows
}

class Grid extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="grid">
                {getGridRows()}
            </div>
        )
    }
}

export default Grid