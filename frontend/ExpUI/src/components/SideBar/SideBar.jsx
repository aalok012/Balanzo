import React from "react";
import "./SideBar.css";

function SideBar() {
return (
    <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-item">
                <a className="nav-link" href="/">
                    <i className="bi bi-grid"></i>
                    <span>DashBoard</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    className="nav-link collapsed"
                    data-bs-target="#addexpense-nav"
                    data-bs-toggle="collapse"
                    href="#"
                >
                    <i className="bi bi-plus-circle"></i>
                    <span>Add Expense</span>
                    <i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul
                    id="addexpense-nav"
                    className="nav-content collapse"
                    data-bs-parent="#sidebar-nav"
                >
                    <li>
                        <a href="/add-expense">
                            <i className="bi bi-circle"></i>
                            <span>Enter New</span>
                        </a>
                    </li>
                </ul>
            </li>

            <li className="nav-item">
                <a
                    className="nav-link collapsed"
                    data-bs-target="#getdetails-nav"
                    data-bs-toggle="collapse"
                    href="#"
                >
                    <i className="bi bi-list-check"></i>
                    <span>Get Details</span>
                    <i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul
                    id="getdetails-nav"
                    className="nav-content collapse"
                    data-bs-parent="#sidebar-nav"
                >
                    <li>
                        <a href="/details/date">
                            <i className="bi bi-circle"></i>
                            <span>Date-Specific</span>
                        </a>
                    </li>
                    <li>
                        <a href="/details/amount">
                            <i className="bi bi-circle"></i>
                            <span>Amount-Specific</span>
                        </a>
                    </li>
                    <li>
                        <a href="/details/category">
                            <i className="bi bi-circle"></i>
                            <span>Category-Specific</span>
                        </a>
                    </li>
                </ul>
            </li>

            <li className="nav-item">
                <a
                    className="nav-link collapsed"
                    data-bs-target="#searchexpense-nav"
                    data-bs-toggle="collapse"
                    href="#"
                >
                    <i className="bi bi-search"></i>
                    <span>Search Expense</span>
                    <i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul
                    id="searchexpense-nav"
                    className="nav-content collapse"
                    data-bs-parent="#sidebar-nav"
                >
                    <li>
                        <a href="/search/date">
                            <i className="bi bi-circle"></i>
                            <span>Date-Specific</span>
                        </a>
                    </li>
                    <li>
                        <a href="/search/amount">
                            <i className="bi bi-circle"></i>
                            <span>Amount-Specific</span>
                        </a>
                    </li>
                    <li>
                        <a href="/search/category">
                            <i className="bi bi-circle"></i>
                            <span>Category-Specific</span>
                        </a>
                    </li>
                </ul>
            </li>

            <li className="nav-item">
                <a className="nav-link" href="/activities">
                    <i className="bi bi-activity"></i>
                    <span>Activities</span>
                </a>
            </li>
        </ul>
    </aside>
);
}

export default SideBar;
