/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import HeaderPage from "../home/header_page";
import FooterPage from "../home/footer_page";
import { useNavigate, useParams } from "react-router-dom";
import { addCategory, getCategoryById, updateCategoryById } from "../../services/categoryArticleService";

const CategoryComponent = () => {
    const navigator = useNavigate();
    const {categoryId} = useParams();
    const accessToken = localStorage.getItem("accessToken");

    const [categoryName, setCategoryName] = useState('');

    // Initialize state variables that will hold validation errors
    const [errors, setErrors] = useState({
        categoryName: ''
    })

    useEffect(() => {
        if (categoryId) {
            if (accessToken != null) {
                getCategory(categoryId);
            }
            else {
                navigator("/");
            }
        }
    }, [accessToken, categoryId, navigator])

    async function getCategory(categoryId) {
        await getCategoryById(categoryId).then((response) => {
            if (response.status == 200) {
                setCategoryName(response.data.categoryName);
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

    async function addOrUpdateCategory(categoryId, accessToken) {
        if (accessToken != null) {
            if (validateForm()) {
                const category = {categoryName};
                console.log(category);

                if (categoryId) {
                    await updateCategoryById(categoryId, category, accessToken).then((response) => {
                        if (response.status == 200) {
                            alert(`Updated category have id is ${categoryId} successfully!`);
                            navigator(`/categories`);
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
                    await addCategory(category, accessToken).then((response) => {
                        if (response.status == 200) {
                            alert(`Added category successfully!`);
                            navigator(`/categories`);
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

    function backToList() {
        navigator("/categories");
    }

    // Validation function that checks the form data and returns validation errors
    function validateForm() {
        let valid = true;

        const errorCopy = {... errors};

        if (categoryName.trim()) {
            errorCopy.categoryName = '';
        } else {
            errorCopy.categoryName = "Category's name is requied!";
            valid = false;
        }

        setErrors(errorCopy);

        return valid;
    }

    function pageTitle() {
        if (categoryId) {
          return <h2 className='fw-bold text-center text-success m-2 text-uppercase'>Cập nhật thông tin thể loại bài báo</h2>;
        }
        else {
          return <h2 className='fw-bold text-center text-success m-2 text-uppercase'>Thêm mới thể loại bài báo</h2>;
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
                            categoryId ? 
                            <div className="form-group">
                                <label htmlFor="categoryId"><b><i>ID</i></b></label>
                                <input type="int" className="form-control" name="categoryId" id="categoryId" value={categoryId} disabled />
                            </div> : ``
                        }
                        <br />
                        <div className="form-group">
                            <label htmlFor="categoryName"><b><i>Tên thể loại bài báo</i></b></label>
                            <input type="text" 
                            onChange={(e) => setCategoryName(e.target.value)}
                            className={`form-control ${ errors.categoryName ? 'is-invalid' : '' }`} 
                            name="categoryName" id="categoryName" 
                            value={categoryName} />
                            {/* Display validation errors */}
                            { errors.categoryName && <div className='invalid-feedback'>{ errors.categoryName }</div> }
                        </div>
                    </form>
                    <div>
                        <button className='btn btn-info'
                            onClick={() => { backToList() }}>
                            Return
                        </button>

                        <button className='btn btn-success' style={{ marginLeft: '5px' }}
                            onClick={() => { addOrUpdateCategory(categoryId, accessToken) }}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        <FooterPage />
        </>
    )
}

export default CategoryComponent