/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import HeaderPage from "../home/header_page";
import FooterPage from "../home/footer_page";
import { useNavigate, useParams } from "react-router-dom";
import { getFoodById } from "../../services/foodsService";
import FormatDate from "../../utils/FormatDate";

const DetailsFoodComponent = () => {
    const [food, setFood] = useState('');

    const navigator = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const {foodId} = useParams();

    useEffect(() => {
        if (accessToken != null) {
            getFood(foodId);
        }
        else {
            navigator("/");
        }
    }, [accessToken, foodId, navigator])

    async function getFood(foodId) {
        await getFoodById(foodId).then((response) => {
            if (response.status == 200) {
                setFood(response.data);
            }
        }).catch (error => {
            if (error.response) {
                var message = error.response.data.message;
                alert(message);
            } else {
                console.error(error);
            }
        })
    }

    function backToList() {
        navigator("/foods");
    }

    function updateFood(foodId) {
        navigator(`/food/${foodId}`);
    }

    return (
        <>
        <HeaderPage />
            <div className="container">
                <h2 className='fw-bold text-center text-success m-2 text-uppercase'>Thông tin thực phẩm</h2>

                <div key={food.foodID} className="w-100 shadow-lg bg-body rounded-4 m-3 p-3">
                    <h5 className="d-flex justify-content-end">{FormatDate.formatDateFromJson(food.created_date)}</h5>
                    <h2 className="fw-bold text-center">{food.foodName}</h2>
                    <div className="d-flex flex-column align-items-center m-3 p-3 lh-lg text-justify">
                        <img src={`data:image/jpeg;base64,${food.image}`} alt={food.foodName} style={{ width: '370px', height: '270px' }} />
                        <br />
                        <div className="tableOfContent border p-4 rounded-4 bg-success-subtle">
                            <ol>
                                <li>
                                    <a href={`#${food.nutritionValue}`} className="link-dark link-dark-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                        <i>Thành phần dinh dưỡng</i>
                                    </a>
                                </li>
                                <li>
                                    <a href={`#${food.preservation}`} className="link-dark link-dark-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                        <i>Bảo quản</i>
                                    </a>
                                </li>
                                <li>
                                    <a href={`#${food.note}`} className="link-dark link-dark-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                        <i>Thông tin thêm ( ghi chú )</i>
                                    </a>
                                </li>
                            </ol>
                        </div>
                        <div className="content" style={{textIndent: '40px'}}>
                            <h5 id={food.nutritionValue}>1. Thành phần dinh dưỡng</h5>
                            <p>{food.nutritionValue}</p>

                            <h5 id={food.preservation}>2. Bảo quản</h5>
                            <p>{food.preservation}</p>

                            <h5 id={food.note}>3. Thông tin thêm</h5>
                            <p>{food.note}</p>
                        </div>
                    </div>
                        <p className="d-flex justify-content-end"><i>
                            ----- Ngày chỉnh sửa: {food.modified_date != null ? FormatDate.formatDateFromJson(food.modified_date) : FormatDate.formatDateFromJson(food.created_date)} -----
                        </i></p>
                    <div>
                        <button className='btn btn-info'
                            onClick={() => { backToList() }}>
                            Return
                        </button>

                        <button className='btn btn-success' style={{ marginLeft: '5px' }}
                            onClick={() => { updateFood(food.foodID) }}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        <FooterPage />
        </>
    )
}

export default DetailsFoodComponent