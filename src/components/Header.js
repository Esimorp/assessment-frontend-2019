import React from 'react'
import {Link} from 'react-router-dom'

export function Header() {
    return (

        <ul className="breadcrumb border">
            <li><Link to="/">Home</Link></li>
            <li><Link to='/create'>Create</Link></li>
        </ul>
    )
}
