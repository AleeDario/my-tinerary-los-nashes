import React from 'react'

export default function Checkbox(props) {
    let { continent, refValue, valor, fx } = props
    return (
        <label >
            <input type="checkbox" value={valor} name={continent} ref={refValue} onClick={fx} /> {continent} 
        </label>
    )
}
