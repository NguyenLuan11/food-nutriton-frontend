/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartComponent = ({ labels, dataPoints, backgroundColor }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Quantity existing in Food Nutrition",
                data: dataPoints,
                backgroundColor: backgroundColor, // Màu nền được truyền từ props
            },
        ],
    };

    return (
        <div style={{height: '350px'}}>
            <Doughnut data={data} />
        </div>
    );
};

export default DoughnutChartComponent;
