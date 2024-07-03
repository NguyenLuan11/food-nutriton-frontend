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

                <div className="row row-cols-5">
                    <div className="col">
                        <div className="w-100 shadow bg-success rounded-4 m-3 p-3">
                            <div className="d-flex flex-row justify-content-between">
                                <h3>
                                    <input disabled className="form-control-plaintext fw-bold fs-5 text-light" type="text" 
                                        name="" id="" value="Users"/>
                                </h3>
                                <h5 className="text-light mt-3">5</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="w-100 shadow bg-warning rounded-4 m-3 p-3">
                            <div className="d-flex flex-row justify-content-between">
                                <h3>
                                    <input disabled className="form-control-plaintext fw-bold fs-5" type="text" 
                                            name="" id="" value="Foods"/>
                                </h3>
                                <h5 className="mt-3">2</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="w-100 shadow bg-danger rounded-4 m-3 p-3">
                            <div className="d-flex flex-row justify-content-between">
                                <h3>
                                    <input disabled className="form-control-plaintext fw-bold fs-5 text-light" type="text" 
                                            name="" id="" value="Nutrients"/>
                                </h3>
                                <h5 className="text-light mt-3">1</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="w-100 shadow bg-info rounded-4 m-3 p-3">
                            <div className="d-flex flex-row justify-content-between">
                                <h3>
                                    <input disabled className="form-control-plaintext fw-bold fs-5" type="text" 
                                            name="" id="" value="Categories"/>
                                </h3>
                                <h5 className="mt-3">2</h5>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="w-100 shadow bg-secondary rounded-4 m-3 p-3">
                            <div className="d-flex flex-row justify-content-between">
                                <h3>
                                    <input disabled className="form-control-plaintext fw-bold fs-5 text-light" type="text" 
                                            name="" id="" value="Articles"/>
                                </h3>
                                <h5 className="text-light mt-3">1</h5>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        <FooterPage />
        </>
    )
}

export default HomePage