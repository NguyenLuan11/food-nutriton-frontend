/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import HeaderPage from "./header_page";
import FooterPage from "./footer_page";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigator = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (accessToken == null) {
            navigator("/");
        }
    }, [accessToken, navigator])

    return (
        <>
        <HeaderPage />
            <div className="container">
                
            </div>
        <FooterPage />
        </>
    )
}

export default HomePage