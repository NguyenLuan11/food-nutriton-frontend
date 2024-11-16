/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import HeaderPage from "../home/header_page";
import FooterPage from "../home/footer_page";
import { useNavigate, useParams } from "react-router-dom";
import { addFood, getFoodById, getImgFood, updateFoodById, uploadImgFoodById } from "../../services/foodsService";

const FoodComponent = () => {
    const [foodName, setFoodName] = useState('');
    const [image, setImage] = useState('');
    const [kcalOn100g, setKcalOn100g] = useState('');
    const [newImage, setNewImage] = useState('');
    const [nutritionValue, setNutritionValue] = useState('');
    const [preservation, setPreservation] = useState('');
    const [note, setNote] = useState('');

    // Initialize state variables that will hold validation errors
    const [errors, setErrors] = useState({
        foodName: '',
        kcalOn100g: '',
        nutritionValue: '',
        preservation: '',
        note: ''
    })

    const navigator = useNavigate();
    const {foodId} = useParams();
    const accessToken = localStorage.getItem("accessToken");

    const fileInputRef = useRef(null); // Create ref for input file

    useEffect(() => {
        if (foodId) {
            if (accessToken != null) {
                getFood(foodId);
            }
            else {
                navigator("/");
            }
        }
        // console.log("Image base64:", image);
    }, [accessToken, foodId, navigator])

    async function getFood(foodId) {
        await getFoodById(foodId).then((response) => {
            if (response.status == 200) {
                setFoodName(response.data.foodName);
                setImage(response.data.image);
                setKcalOn100g(response.data.kcalOn100g);
                setNutritionValue(response.data.nutritionValue);
                setPreservation(response.data.preservation);
                setNote(response.data.note);
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

    async function uploadImgFood(foodId, file, accessToken) {
        await uploadImgFoodById(foodId, file, accessToken).then(response => {
            if (response.status == 200) {
                console.log(`Uploaded image food have id is ${foodId} successfully!`);
            } else {
                console.log(`Uploaded image food have id is ${foodId} failed!`);
            }
        }).catch(error => {
            if (error.response) {
                var message = error.response.data.message;
                alert(message);
            } else {
                console.error(error);
            }
        });
    }

    async function addOrUpdateFood(foodId, accessToken) {
        // e.preventDefault();

        if (accessToken != null) {
            if (validateForm()) {
                const food = {foodName, kcalOn100g, nutritionValue, preservation, note};
                console.log(food);
                // console.log("Access Token:", accessToken);
                const file = fileInputRef.current.files[0];
                console.log(file);

                if (foodId) {
                    if (file) {
                        uploadImgFood(foodId, file, accessToken);
                    }

                    await updateFoodById(foodId, food, accessToken).then((response) => {
                        if (response.status == 200) {
                            alert(`Updated food have id is ${foodId} successfully!`);
                            navigator(`/foods/${foodId}`);
                        }
                    }).catch(error => {
                        if (error.response) {
                            var message = error.response.data.message;
                            // console.log(message);
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
                }
                else {
                    await addFood(food, accessToken).then((response) => {
                        if (response.status == 200) {
                            if (file) {
                                const foodId = response.data.foodID;
                                uploadImgFood(foodId, file, accessToken);
                            }

                            alert(`Added food successfully!`);
                            navigator(`/foods`);
                        }
                    }).catch(error => {
                        if (error.response) {
                            var message = error.response.data.message;
                            // console.log(message);
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
                }
            }
        } else {
            alert("Login Expired!");
            navigator("/");
        }
    }

    // Validation function that checks the form data and returns validation errors
    function validateForm() {
        let valid = true;

        const errorCopy = {... errors};

        if (foodName.trim()) {
            errorCopy.foodName = '';
        } else {
            errorCopy.foodName = "Food's Name is requied!";
            valid = false;
        }

        if (kcalOn100g) {
            errorCopy.kcalOn100g = '';
        } else {
            errorCopy.kcalOn100g = "Calories on 100g is requied!";
            valid = false;
        }

        if (nutritionValue.trim()) {
            errorCopy.nutritionValue = '';
        } else {
            errorCopy.nutritionValue = 'NutritionValue is requied!';
            valid = false;
        }

        if (preservation.trim()) {
            errorCopy.preservation = '';
        } else {
            errorCopy.preservation = 'Preservation is requied!';
            valid = false;
        }

        if (note.trim()) {
            errorCopy.note = '';
        } else {
            errorCopy.note = 'Note is requied!';
            valid = false;
        }

        setErrors(errorCopy);

        return valid;
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                // console.log("base64String: ", base64String);
                setNewImage(base64String);
            };
            reader.readAsDataURL(file);
        }
    }

    function pageTitle() {
        if (foodId) {
          return <h2 className='fw-bold text-center text-success m-2 text-uppercase'>Cập nhật thông tin thực phẩm</h2>;
        }
        else {
          return <h2 className='fw-bold text-center text-success m-2 text-uppercase'>Thêm mới thực phẩm</h2>;
        }
    }

    return (
        <>
        <HeaderPage />
            <div className="container">
                
                {/* Title page */}
                {
                    pageTitle()
                }

                <div className="w-100 shadow bg-body rounded-4 m-3 p-3">
                    <form className="mb-3 lh-lg">
                        {
                            foodId ? 
                            <div className="form-group">
                                <label htmlFor="foodID"><b><i>ID</i></b></label>
                                <input type="int" className="form-control" name="foodID" id="foodID" value={foodId} disabled />
                            </div> : ``
                        }
                        <br />
                        <div className="form-group">
                            <label htmlFor="foodName"><b><i>Tên thực phẩm</i></b></label>
                            <input type="text" 
                            onChange={(e) => setFoodName(e.target.value)}
                            className={`form-control ${ errors.foodName ? 'is-invalid' : '' }`} 
                            name="foodName" id="foodName" 
                            value={foodName} />
                            {/* Display validation errors */}
                            { errors.foodName && <div className='invalid-feedback'>{ errors.foodName }</div> }
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="image"><b><i>Hình ảnh</i></b></label>
                            <br />
                            {
                                newImage ? 
                                <img src={`data:image/jpeg;base64,${newImage}`} alt={foodName} loading="lazy" style={{ width: '200px', height: '200px' }} />
                                : image ?
                                    <img src={`${getImgFood}${image}`} alt={foodName} loading="lazy" style={{ width: '200px', height: '200px' }} />
                                    : ``
                            }
                            <input type="file" className="form-control" name="picFood" id="picFood" 
                                ref={fileInputRef} 
                                onChange={(e) => handleImageChange(e)} />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="kcalOn100g"><b><i>Kcal/100g</i></b></label>
                            <input type="number"
                            onChange={(e) => setKcalOn100g(e.target.value)}
                            className={`form-control ${ errors.kcalOn100g ? 'is-invalid' : '' }`} 
                            name="kcalOn100g" id="kcalOn100g" 
                            value={kcalOn100g} />
                            {/* Display validation errors */}
                            { errors.kcalOn100g && <div className='invalid-feedback'>{ errors.kcalOn100g }</div> }
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="nutritionValue"><b><i>Giá trị dinh dưỡng</i></b></label>
                            <textarea type="text"
                            onChange={(e) => setNutritionValue(e.target.value)}
                            className={`form-control ${ errors.nutritionValue ? 'is-invalid' : '' }`} 
                            name="nutritionValue" id="nutritionValue" 
                            value={nutritionValue} />
                            {/* Display validation errors */}
                            { errors.nutritionValue && <div className='invalid-feedback'>{ errors.nutritionValue }</div> }
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="preservation"><b><i>Bảo quản</i></b></label>
                            <textarea type="text" 
                            onChange={(e) => setPreservation(e.target.value)}
                            className={`form-control ${ errors.preservation ? 'is-invalid' : '' }`} 
                            name="preservation" id="preservation" 
                            value={preservation} />
                            {/* Display validation errors */}
                            { errors.preservation && <div className='invalid-feedback'>{ errors.preservation }</div> }
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="note"><b><i>Thông tin thêm ( ghi chú )</i></b></label>
                            <textarea type="text" 
                            onChange={(e) => setNote(e.target.value)}
                            className={`form-control ${ errors.note ? 'is-invalid' : '' }`} 
                            name="note" id="note" 
                            value={note} />
                            {/* Display validation errors */}
                            { errors.note && <div className='invalid-feedback'>{ errors.note }</div> }
                        </div>
                    </form>
                    <div>
                        <button className='btn btn-info'
                            onClick={() => { backToList() }}>
                            Return
                        </button>

                        <button className='btn btn-success' style={{ marginLeft: '5px' }}
                            onClick={() => { addOrUpdateFood(foodId, accessToken) }}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        <FooterPage />
        </>
    )
}

export default FoodComponent