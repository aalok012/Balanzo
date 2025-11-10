import React from "react";
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { Outlet } from "react-router-dom"; // everything around them same but changes the outlet part 

function Layout (){
    return(

        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
                                                            
        </>
    )
}