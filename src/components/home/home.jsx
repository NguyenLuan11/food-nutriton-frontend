/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import HeaderPage from "./header_page";
import FooterPage from "./footer_page";
import { useNavigate } from "react-router-dom";
import { countAllItems } from "../../services/adminService";
import DoughnutChartComponent from "../chart/doughnutChart";
import BarChartComponent from "../chart/barChart";

const HomePage = () => {
    const [countItems, setCountItems] = useState({});
    const navigator = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (accessToken != null) {
            getCountAllItems();
        } else {
            navigator("/");
        }
    }, [accessToken]);

    async function getCountAllItems() {
        await countAllItems()
            .then((response) => {
                if (response.status === 200) {
                    setCountItems(response.data);
                }
            })
            .catch((error) => {
                if (error.response) {
                    const message = error.response.data.message;
                    alert(message);
                } else {
                    console.error(error);
                }
            });
    }

    // Tạo labels, dataPoints và colors
    const labels = Object.keys(countItems);
    const dataPoints = Object.values(countItems);
    const colors = ["#6c757d", "#17a2b8", "#28a745", "#ffc107", "#dc3545", "#578E7E"];

    return (
        <>
            <HeaderPage />
            <div className="container">
                <div className="row row-cols-6">
                    {labels.map((label, index) => (
                        <div key={index} className="col">
                            <div
                                className={`w-100 shadow rounded-4 m-4 p-3`}
                                style={{ backgroundColor: colors[index] }}
                            >
                                <div className="d-flex flex-row justify-content-between">
                                    <h3>
                                        <input
                                            disabled
                                            className={`form-control-plaintext fw-bold fs-5 text-light`}
                                            type="text"
                                            value={label.charAt(0).toUpperCase() + label.slice(1)}
                                        />
                                    </h3>
                                    <h4 className="text-light mt-2">
                                        {dataPoints[index]}
                                    </h4>
                                </div>
                                <a className="link-light" href={`/${label}`}>
                                    More info
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row row-cols-3">
                    <div className="col p-2">
                        <DoughnutChartComponent
                            labels={labels}
                            dataPoints={dataPoints}
                            backgroundColor={colors} />
                    </div>
                    <div className="col p-2">
                        <img style={{height: '72%'}} 
                        src="/src/assets/balanced-nutrition-removebg-preview.png" alt="Balanced Nutrition" />
                    </div>
                    <div className="col p-2">
                        <div style={{height: '100px'}}></div>
                        <BarChartComponent 
                            labels={labels}
                            dataPoints={dataPoints}
                            backgroundColor={colors} />
                    </div>
                </div>
            </div>
            <FooterPage />
        </>
    );
};

export default HomePage;
