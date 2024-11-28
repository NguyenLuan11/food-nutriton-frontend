/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler } from 'chart.js';

// Đăng ký các thành phần bắt buộc
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip, Legend);

const LineChartComponent = ({ labels, dataPoints }) => {
  const data = {
    labels: labels, // Các tiêu đề cho trục X
    datasets: [
      {
        label: 'BMI Chart',
        data: dataPoints, // Giá trị cho mỗi điểm trên biểu đồ
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        fill: true, // Bật vùng nền dưới đường biểu đồ
        borderWidth: 2,
        tension: 0.3, // Làm mịn đường cong
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Ngày kiểm tra BMI',
        },
        grid: {
          display: false, // Ẩn lưới trục x
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Chỉ số BMI',
        },
        grid: {
          display: false, // Ẩn lưới trục x
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChartComponent;
