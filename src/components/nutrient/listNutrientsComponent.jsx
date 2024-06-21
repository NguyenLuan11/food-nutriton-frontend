/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import HeaderPage from "../home/header_page";
import FooterPage from "../home/footer_page";
import { deleteNutrientById, listNutrients } from "../../services/nutrientService";
import { useNavigate } from "react-router-dom";
import FormatDate from "../../utils/FormatDate";

const ListNutrientsComponent = () => {
    const [nutrients, setNutrients] = useState([]);

    const navigator = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (accessToken != null) {
            getAllNutrients();
        }
        else {
            navigator("/");
        }
    }, [accessToken, navigator])

    async function getAllNutrients() {
        await listNutrients().then((response) => {
            if (response.status == 200) {
                setNutrients(response.data);
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

    function addNutrient() {
        navigator("/nutrient");
    }

    function updateNutrient(nutrientId) {
        navigator(`/nutrient/${nutrientId}`);
    }

    function detailsNutrient(nutrientId) {
        navigator(`/nutrients/${nutrientId}`);
    }

    function handleDeleteButtonClick(nutrientId, accessToken) {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa chất dinh dưỡng này không?");
        
        if (confirmed) {
          deleteNutrient(nutrientId, accessToken);
        }
    }

    async function deleteNutrient(nutrientId, accessToken) {
        if (accessToken != null) {
            await deleteNutrientById(nutrientId, accessToken).then((response) => {
                if (response.status == 200) {
                    alert(`Remove nutrient have id is ${nutrientId} successfully!`);
                    navigator("/nutrients");
                }
            }).catch (error => {
                if (error.response) {
                    var message = error.response.data.message;
                    if (!message) {
                        alert("Login Expired!");
                        navigator("/");
                    } else {
                        alert(message);
                    }
                    
                } else {
                    console.error(error);
                }
            })
        } else {
            alert("Login Expired!");
            navigator("/");
        }
    }

    return (
        <>
        <HeaderPage />
        <div className="container">
            <h2 className='fw-bold text-center text-success m-2 text-uppercase'>Danh sách các chất dinh dưỡng</h2>

            <button className='btn btn-outline-dark ml-2' onClick={() => { addNutrient() }}>Add New Nutrient</button>

            {
                nutrients.map(nutrient => 
                    <div key={nutrient.nutrientID} className="w-100 shadow bg-body rounded-4 m-3 p-3">
                        <div className="d-flex flex-row justify-content-between">
                            <h3>{nutrient.nutrientID}. {nutrient.nutrientName}</h3>
                            <h5 className="text-info">{FormatDate.formatDateFromJson(nutrient.created_date)}</h5>
                        </div>
                        <div>
                            <p style={{textIndent: '40px'}}>{nutrient.description}</p>
                            <p style={{textIndent: '40px'}}>{nutrient.function}</p>
                        </div>
                        <div>
                            <p className="d-flex justify-content-end"><i>
                                ----- Ngày chỉnh sửa: {nutrient.modified_date != null ? FormatDate.formatDateFromJson(nutrient.modified_date) : FormatDate.formatDateFromJson(nutrient.created_date)} -----
                            </i></p>
                        </div>
                        <div>
                            <button className='btn btn-info' 
                            onClick={() => {detailsNutrient(nutrient.nutrientID)}}>
                                Details
                            </button>

                            <button className='btn btn-success' style={{marginLeft: '5px'}} 
                            onClick={() => {updateNutrient(nutrient.nutrientID)}}>
                                Update
                            </button>

                            <button className='btn btn-danger' style={{marginLeft: '5px'}} 
                            onClick={() => {handleDeleteButtonClick(nutrient.nutrientId, accessToken)}}>
                                Remove
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
        <FooterPage />
        </>
    )
}

export default ListNutrientsComponent