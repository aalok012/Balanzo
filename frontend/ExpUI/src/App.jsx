//import bootstrap and icon CSS
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

//import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import "./App.css";
import Header from "./components/Header/Header.jsx";
import SideBar from './components/SideBar/SideBar.jsx';

function App() {
        return (
        <>
        <Header/>
        <SideBar/>
        </>
        );
    }

    export default App;