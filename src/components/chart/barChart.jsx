/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChartComponent = ({ labels, dataPoints, backgroundColor }) => {
    // Dữ liệu cho biểu đồ
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Components in Food Nutrition",
                data: dataPoints,
                backgroundColor: backgroundColor, // Màu nền cho các cột
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "#28a745", // Đổi màu chữ của legend
                    font: {
                        size: 14, // Tùy chỉnh kích thước chữ (tùy chọn)
                        weight: "bold", // Chữ đậm (tùy chọn)
                    },
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Ẩn lưới trục x
                },
                title: {
                    display: true,
                    text: "Categories",
                },
            },
            y: {
                grid: {
                    display: false, // Ẩn lưới trục y
                },
                title: {
                    display: true,
                    text: "Counts",
                },
                beginAtZero: true, // Bắt đầu từ 0
            },
        },
    };

    return (
        <Bar data={data} options={options} />
    );
};

export default BarChartComponent;
