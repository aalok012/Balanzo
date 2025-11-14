import React from 'react'
import './NavBar.css'
import NavAvatar from './NavAvatar.jsx'
import NavMessage from './NavMessage.jsx'
import NavNotice from './NavNotice.jsx'
import NavDownload from './NavDownload.jsx'
function Navbar() {
  return (
   <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
        <NavNotice/>
        <NavMessage/>
        <NavDownload/>
        <NavAvatar/>
        </ul>   
   </nav>
  )
}

export default Navbar
