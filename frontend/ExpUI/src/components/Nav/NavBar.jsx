import React from 'react'
import './Navbar.css'
import NavAvatar from './NavAvatar.jsx'
import NavMessage from './NavMessage.jsx'
import NavNotice from './NavNotice.jsx'
function Navbar() {
  return (
   <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
        <NavNotice/>
        <NavMessage/>
        <NavAvatar/>
        </ul>   
   </nav>
  )
}

export default Navbar
