/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import HeaderPage from "../home/header_page";
import FooterPage from "../home/footer_page";
import FormatDate from "../../utils/FormatDate";
import { useNavigate, useParams } from "react-router-dom";
import { getNutrientById } from "../../services/nutrientService";
import { getNatureNutrientById } from "../../services/natureNutrientService";

const DetailsNutrientComponent = () => {
    const [nutrient, setNutrient] = useState('');
    const [natureNutrient, setNatureNutrient] = useState('');

    const navigator = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const {nutrientId} = useParams();

    useEffect(() => {
        if (nutrientId) {
            if (accessToken != null) {
                getNutrient(nutrientId);
            }
            else {
                navigator("/");
            }
        }
    }, [nutrientId])

    async function getNutrient(nutrientId) {
        await getNutrientById(nutrientId).then((response) => {
            if (response.status == 200) {
                setNutrient(response.data);

                getNatureNutrient(response.data.natureID);
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

    async function getNatureNutrient(natureId) {
        await getNatureNutrientById(natureId).then((response) => {
            if (response.status == 200) {
                setNatureNutrient(response.data);
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

    function backToList() {
        navigator("/nutrients");
    }

    function updateNutrient(nutrientId) {
        navigator(`/nutrient/${nutrientId}`);
    }

    return (
        <>
        <HeaderPage />
            <div className="container">
                <h2 className='fw-bold text-center text-success m-2 text-uppercase'>Thông tin chất dinh dưỡng</h2>

                <div key={nutrient.nutrientID} className="w-100 shadow-lg bg-body rounded-4 m-3 p-3">
                    <div className="d-flex justify-content-between text-primary">
                    {natureNutrient.natureName ? <h5>{natureNutrient.natureName}</h5> : <h5></h5> }
                        <h5>{FormatDate.formatDateFromJson(nutrient.created_date)}</h5>
                    </div>
                    <h2 className='fw-bold text-center text-uppercase'>{nutrient.nutrientName}</h2>
                    <div className="d-flex flex-column align-items-center m-3 p-3 lh-lg text-justify">
                        <div className="tableOfContent border p-4 rounded-4 bg-success-subtle">
                            <ol>
                                <li>
                                    <a href={`#${nutrient.description}`} className="link-dark link-dark-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                        <i>Mô tả</i>
                                    </a>
                                </li>
                                <li>
                                    <a href={`#${nutrient.function}`} className="link-dark link-dark-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                        <i>Chức năng</i>
                                    </a>
                                </li>
                                <li>
                                    <a href={`#${nutrient.needed}`} className="link-dark link-dark-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                        <i>Mức tiêu thụ cần thiết</i>
                                    </a>
                                </li>
                                <li>
                                    <a href={`#${nutrient.excessSigns}`} className="link-dark link-dark-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                        <i>Dấu hiệu dư thừa {nutrient.nutrientName}</i>
                                    </a>
                                </li>
                                <li>
                                    <a href={`#${nutrient.deficiencySigns}`} className="link-dark link-dark-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                        <i>Dấu hiệu thiếu hụt {nutrient.nutrientName}</i>
                                    </a>
                                </li>
                                <li>
                                    <a href={`#${nutrient.shortagePrevention}`} className="link-dark link-dark-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                        <i>Ngăn ngừa thiếu hụt {nutrient.nutrientName}</i>
                                    </a>
                                </li>
                                <li>
                                    <a href={`#${nutrient.subjectInterest}`} className="link-dark link-dark-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                        <i>Các đối tượng cần chú tâm đến lượng {nutrient.nutrientName}</i>
                                    </a>
                                </li>
                            </ol>
                        </div>
                        <div className="content" style={{ textIndent: '40px' }}>
                            <h5 id={nutrient.description}>1. Mô tả</h5>
                            <p>{nutrient.description}</p>

                            <h5 id={nutrient.function}>2. Chức năng</h5>
                            <p>{nutrient.function}</p>

                            <h5 id={nutrient.needed}>3. Mức tiêu thụ cần thiết</h5>
                            <p>{nutrient.needed} gram/ngày</p>

                            <h5 id={nutrient.excessSigns}>4. Dấu hiệu dư thừa {nutrient.nutrientName}</h5>
                            <p>{nutrient.excessSigns}</p>

                            <h5 id={nutrient.deficiencySigns}>5. Dấu hiệu thiếu hụt {nutrient.nutrientName}</h5>
                            <p>{nutrient.deficiencySigns}</p>

                            <h5 id={nutrient.shortagePrevention}>6. Ngăn ngừa thiếu hụt {nutrient.nutrientName}</h5>
                            <p>{nutrient.shortagePrevention}</p>

                            <h5 id={nutrient.subjectInterest}>7. Các đối tượng cần chú tâm đến lượng {nutrient.nutrientName}</h5>
                            <p>{nutrient.subjectInterest}</p>
                        </div>
                    </div>
                    <p className="d-flex justify-content-end"><i>
                        ----- Ngày chỉnh sửa: {nutrient.modified_date != null ? FormatDate.formatDateFromJson(nutrient.modified_date) : FormatDate.formatDateFromJson(nutrient.created_date)} -----
                    </i></p>
                    <div>
                        <button className='btn btn-info'
                            onClick={() => { backToList() }}>
                            Return
                        </button>

                        <button className='btn btn-success' style={{ marginLeft: '5px' }}
                            onClick={() => { updateNutrient(nutrientId) }}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        <FooterPage />
        </>
    )
}

export default DetailsNutrientComponent