import React from 'react'
import logo from '../../images/Image_11.png' // adjust path if your images folder is elsewhere
import './Logo.css'

function Logo() {
    const handleToggleSidebar = () => {
        document.body.classList.toggle('toggle-sidebar');
    };  

    return (
      <div className="d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-flex align-items-center">
          <img src={logo} alt="" />
          <span className="d-none d-lg-block"> </span>
        </a>
        <i className="bi bi-view-list" onClick={handleToggleSidebar}></i>
      </div>
    );
}


export default Logo;