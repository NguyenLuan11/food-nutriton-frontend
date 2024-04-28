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
                    <form className="d-flex" role="search" style={{marginLeft: '15%'}}>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{width: '300px'}}/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default HeaderPage