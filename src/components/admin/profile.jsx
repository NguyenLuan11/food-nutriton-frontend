/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderPage from "../home/header_page";
import FooterPage from "../home/footer_page";
import { getAdminById } from "../../services/adminService";

const ProfileAdmin = () => {
    const [admin, setAdmin] = useState([]);

    const navigator = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const adminID = localStorage.getItem("adminID");

    useEffect(() => {
        if (accessToken != null) {
            getAdmin();
        }
        else {
            navigator("/");
        }
    }, [accessToken, getAdmin, navigator])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function getAdmin() {
        await getAdminById(adminID).then((respone) => {
            if (respone.status == 200) {
                setAdmin(respone.data);
            }
        }).catch(error => {
            if (error.response) {
                var message = error.response.data.message;
                alert(message);
            } else {
                console.error(error);
            }
        })
    }

    return (
        <>
        <HeaderPage />
            <div className="container">

            </div>
        <FooterPage />
        </>
    )
}

export default ProfileAdmin