import React from 'react'

export default function Checkbox(props) {
    let { continent, key, refId, valor, fx } = props
    return (
        <label >
            <input type="checkbox" value={valor} name={continent} id={key} ref={refId} onClick={fx} /> {continent} 
        </label>
    )
}
