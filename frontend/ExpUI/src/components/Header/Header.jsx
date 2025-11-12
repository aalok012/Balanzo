import React from 'react'
import './Header.css'
import Logo from '../Logo/Logo'
import SearchBar from '../SearchBar/SearchBar'
import NavBar from '../Nav/NavBar'
function Header() {
return (
    <header id="header" className="header fixed-top d-flex align-items-center">
        <Logo />
        <SearchBar />
        <NavBar />
    </header>
);
}

export default Header;