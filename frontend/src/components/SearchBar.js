import React from 'react'

export default function SearchBar(props) {
    return (
        <input style={{ width: "22.4rem" }}
            type='search'
            className='search'
            placeholder={props.placeholder}
            onChange={props.handleChange}
        />
    )
}
