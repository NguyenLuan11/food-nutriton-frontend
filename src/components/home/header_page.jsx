/* eslint-disable no-unused-vars */
import React from "react";

const HeaderPage = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
            <div className="container-fluid">
                <span className="navbar-brand fw-bold">FOOD NUTRITION</span>
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/users">Users</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/foods">Foods</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/nutrients">Nutrients</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/categories">Categories</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/articles">Articles</a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search" style={{ marginLeft: '15%' }}>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ width: '300px' }} />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>

                    <div className="container-fluid">
                        <ul className="navbar-nav">

                            <li className="nav-item dropdown">
                                <a data-bs-dropdown-init className="nav-link dropdown-toggle d-flex align-items-center" id="navbarDropdownMenuLink"
                                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={localStorage.getItem("avatar") != null ? `data:image/jpeg;base64,${localStorage.getItem("avatar")}` : "https://ps.w.org/simple-user-avatar/assets/icon-256x256.png?rev=2413146"} 
                                        className="rounded-circle"
                                        height="42" alt={localStorage.getItem("adminName")} loading="lazy" />
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li>
                                        <a className="dropdown-item" href="#">My profile</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Settings</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Logout</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default HeaderPage