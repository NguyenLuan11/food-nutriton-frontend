/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { deleteFoodById, listFoods } from "../../services/foodsService";
import HeaderPage from "../home/header_page";
import FooterPage from '../home/footer_page';
import FormatDate from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";

const ListFoodsComponent = () => {
    const [foods, setFoods] = useState([]);

    const [strSearch, setStrSearch] = useState('');
    const [foundFoods, setFoundFoods] = useState([]);

    const navigator = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (accessToken != null) {
            getAllFoods();
        }
        else {
            navigator("/");
        }
    }, [accessToken, navigator])

    // Get list foods
    async function getAllFoods() {
        await listFoods().then((response) => {
            if (response.status == 200) {
                setFoods(response.data);
                setFoundFoods(response.data);
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

    // Filter users based on input
    useEffect(() => {
        if (!strSearch.trim()) {
            setFoundFoods(foods);
        }
        else {
            const filteredFoods = foods.filter((food) => 
                food.foodName.toLowerCase().includes(strSearch.toLowerCase())
            );
            setFoundFoods(filteredFoods);
        }
    }, [strSearch, foods]);

    // Redirect to detail page
    function detailsFood(foodId) {
        navigator(`/foods/${foodId}`);
    }

    // Redirect to update page
    function updateFood(foodId) {
        navigator(`/food/${foodId}`);
    }

    // Redirect to add page
    function addFood() {
        navigator(`/food`);
    }

    // Handle delete button
    function handleDeleteButtonClick(foodId, accessToken) {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa thực phẩm này không?");
        
        if (confirmed) {
          deleteFood(foodId, accessToken);
        }
    }

    // Delete food
    async function deleteFood(foodId, accessToken) {
        if (accessToken != null) {
            await deleteFoodById(foodId, accessToken).then((response) => {
                if (response.status == 200) {
                    alert(`Remove food have id is ${foodId} successfully!`);
                    navigator("/foods");
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
            <h2 className='fw-bold text-center text-success m-2 text-uppercase'>Danh sách thực phẩm</h2>

            <button className='btn btn-outline-dark ml-2' onClick={() => { addFood() }}>Add New Food</button>

                <form className="d-flex justify-content-end" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                        style={{ width: '300px' }}
                        onChange={(e) => setStrSearch(e.target.value)}
                        name="inputSearch" id="inputSearch"
                        value={strSearch} />
                </form>

           {
                foundFoods.map(food => 
                    <div key={food.foodID} className="w-100 shadow bg-body rounded-4 m-3 p-3">
                        <div className="d-flex flex-row justify-content-between">
                            <h3>{food.foodID}. {food.foodName}</h3>
                            <h5 className="text-info">{FormatDate.formatDateFromJson(food.created_date)}</h5>
                        </div>
                        <div className="d-flex flex-row justify-content-around m-3">
                            <img src={`data:image/jpeg;base64,${food.image}`} alt={food.foodName} style={{width: '190px', height: '190px', marginRight: '30px'}} />
                            <p style={{textIndent: '40px'}}>{food.nutritionValue}</p>
                        </div>
                        <div>
                            <p className="d-flex justify-content-end"><i>
                                ----- Ngày chỉnh sửa: {food.modified_date != null ? FormatDate.formatDateFromJson(food.modified_date) : FormatDate.formatDateFromJson(food.created_date)} -----
                            </i></p>
                        </div>
                        <div>
                            <button className='btn btn-info' 
                            onClick={() => {detailsFood(food.foodID)}}>
                                Details
                            </button>

                            <button className='btn btn-success' style={{marginLeft: '5px'}} 
                            onClick={() => {updateFood(food.foodID)}}>
                                Update
                            </button>

                            <button className='btn btn-danger' style={{marginLeft: '5px'}} 
                            onClick={() => {handleDeleteButtonClick(food.foodID, accessToken)}}>
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

export default ListFoodsComponent