/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { deleteCategoryById, listCategory } from "../../services/categoryArticleService";
import HeaderPage from "../home/header_page";
import FooterPage from '../home/footer_page';
import FormatDate from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";

const ListCategoriesComponent = () => {
    const [categories, setCategories] = useState([]);

    const [strSearch, setStrSearch] = useState('');
    const [foundCategories, setFoundCategories] = useState([]);

    const navigator = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (accessToken != null) {
            getAllCategories();
        }
        else {
            navigator("/");
        }
    }, [accessToken, navigator])

    // Get list categories
    async function getAllCategories() {
        await listCategory().then((response) => {
            if (response.status == 200) {
                setCategories(response.data);
                setFoundCategories(response.data);
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
            setFoundCategories(categories);
        }
        else {
            const filteredCategories = categories.filter((category) => 
                category.categoryName.toLowerCase().includes(strSearch.toLowerCase())
            );
            setFoundCategories(filteredCategories);
        }
    }, [strSearch, categories]);

    // Handle delete button
    function handleDeleteButtonClick(categoryId, accessToken) {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa thể loại bài báo này không?");
        
        if (confirmed) {
          deleteCategory(categoryId, accessToken);
        }
    }

    // Delete category
    async function deleteCategory(categoryId, accessToken) {
        if (accessToken != null) {
            await deleteCategoryById(categoryId, accessToken).then((response) => {
                if (response.status == 200) {
                    alert(`Remove category have id is ${categoryId} successfully!`);
                    navigator("/categories");
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

    // Redirect to update page
    function updateCategory(categoryId) {
        navigator(`/category/${categoryId}`);
    }

    // Redirect to add page
    function addCategory() {
        navigator(`/category`);
    }

    return (
        <>
        <HeaderPage />
        <div className="container">
            <h2 className='fw-bold text-center text-success text-uppercase m-2'>Danh sách thể loại bài báo</h2>

            <button className='btn btn-outline-dark ml-2' onClick={() => { addCategory() }}>Add New Category</button>

                <form className="d-flex justify-content-end" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                        style={{ width: '300px' }}
                        onChange={(e) => setStrSearch(e.target.value)}
                        name="inputSearch" id="inputSearch"
                        value={strSearch} />
                </form>

            <div className="row row-cols-2">
            {
                foundCategories.map(category =>
                    <div key={category.categoryID} className="col">
                        <div className="w-100 shadow bg-body rounded-4 m-3 p-3">
                            <div className="d-flex flex-row justify-content-between">
                                <h3 className="d-flex flex-row justify-content-start">
                                    <input disabled className="form-control-plaintext fw-bold" type="int" style={{width: '30px'}} 
                                    name="categoryId" id="categoryId" value={category.categoryID} />
                                
                                    <input disabled className="form-control-plaintext fw-bold fs-3" type="text" style={{width: '200px'}} 
                                    name="categoryName" id="categoryName" value={category.categoryName} />
                                </h3>
                                <h5 className="text-info mt-3">{FormatDate.formatDateFromJson(category.created_date)}</h5>
                            </div>
                            <div>
                                <p className="d-flex justify-content-end"><i>
                                    ----- Ngày chỉnh sửa: {category.modified_date != null ? FormatDate.formatDateFromJson(category.modified_date) : FormatDate.formatDateFromJson(category.created_date)} -----
                                </i></p>
                            </div>
                            <div>
                                <button className='btn btn-success' style={{ marginLeft: '5px' }}
                                    onClick={() => { updateCategory(category.categoryID) }}>
                                    Update
                                </button>

                                <button className='btn btn-danger' style={{ marginLeft: '5px' }}
                                    onClick={() => { handleDeleteButtonClick(category.categoryID, accessToken) }}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            </div>
        </div>
        <FooterPage />
        </>
    )
}

export default ListCategoriesComponent