import React from 'react'
import { Link } from 'react-router-dom'

export default function NavMenu() {
  return (
    <nav className="menu">
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/results">Results</Link></li>
    </ul>
    </nav>
  )
}
