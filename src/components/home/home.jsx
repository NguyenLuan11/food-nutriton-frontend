/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import HeaderPage from "./header_page";
import FooterPage from "./footer_page";
import { useNavigate } from "react-router-dom";
import { countAllItems } from "../../services/adminService";

const HomePage = () => {
    const [countItems, setCountItems] = useState([]);

    const navigator = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (accessToken != null) {
            getCountAllItems();
        }
        else {
            navigator("/");
        }
    }, [accessToken])

    async function getCountAllItems() {
        await countAllItems().then((response) => {
            if (response.status == 200) {
                setCountItems(response.data);
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

                <div className="row row-cols-5">
                    <div className="col">
                        <div className="w-100 shadow bg-success rounded-4 m-4 p-3">
                            <div className="d-flex flex-row justify-content-between">
                                <h3>
                                    <input disabled className="form-control-plaintext fw-bold fs-5 text-light" type="text" 
                                        // style={{width: '50px'}} 
                                        name="" id="" value="Users"/>
                                </h3>
                                <h4 className="text-light mt-2">{countItems["users"]}
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                                    </svg> */}
                                </h4>
                            </div>
                            <a className="link-light" href="/users">More info</a>
                        </div>
                    </div>

                    <div className="col">
                        <div className="w-100 shadow bg-warning rounded-4 m-4 p-3">
                            <div className="d-flex flex-row justify-content-between">
                                <h3>
                                    <input disabled className="form-control-plaintext fw-bold fs-5" type="text" 
                                            name="" id="" value="Foods"/>
                                </h3>
                                <h4 className="mt-2">{countItems["foods"]}</h4>
                            </div>
                            <a className="link-dark" href="/foods">More info</a>
                        </div>
                    </div>

                    <div className="col">
                        <div className="w-100 shadow bg-danger rounded-4 m-4 p-3">
                            <div className="d-flex flex-row justify-content-between">
                                <h3>
                                    <input disabled className="form-control-plaintext fw-bold fs-5 text-light" type="text" 
                                            name="" id="" value="Nutrients"/>
                                </h3>
                                <h4 className="text-light mt-2">{countItems["nutrients"]}</h4>
                            </div>
                            <a className="link-light" href="/nutrients">More info</a>
                        </div>
                    </div>

                    <div className="col">
                        <div className="w-100 shadow bg-info rounded-4 m-4 p-3">
                            <div className="d-flex flex-row justify-content-between">
                                <h3>
                                    <input disabled className="form-control-plaintext fw-bold fs-5" type="text" 
                                            name="" id="" value="Categories"/>
                                </h3>
                                <h4 className="mt-2">{countItems["categories"]}</h4>
                            </div>
                            <a className="link-dark" href="/categories">More info</a>
                        </div>
                    </div>

                    <div className="col">
                        <div className="w-100 shadow bg-secondary rounded-4 m-4 p-3">
                            <div className="d-flex flex-row justify-content-between">
                                <h3>
                                    <input disabled className="form-control-plaintext fw-bold fs-5 text-light" type="text" 
                                            name="" id="" value="Articles"/>
                                </h3>
                                <h4 className="text-light mt-2">{countItems["articles"]}</h4>
                            </div>
                            <a className="link-light" href="/articles">More info</a>
                        </div>
                    </div>
                </div>

            </div>
        <FooterPage />
        </>
    )
}

export default HomePage