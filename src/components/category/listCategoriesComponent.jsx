/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { listCategory } from "../../services/categoryArticleService";
import HeaderPage from "../home/header_page";
import FooterPage from '../home/footer_page';
import FormatDate from "../../utils/FormatDate";

const ListCategoriesComponent = () => {
    const [categories, setCategories] = useState([]);
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        getAllCategories();
    }, [])

    async function getAllCategories() {
        await listCategory().then((response) => {
            if (response.status == 200) {
                setCategories(response.data);
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

    function handleDeleteButtonClick(categoryId, accessToken) {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa thể loại này không?");
        
        if (confirmed) {
        //   deleteUser(userId, accessToken);
        }
    }

    return (
        <>
        <HeaderPage />
        <div className="container">
            <h2 className='fw-bold text-center text-success text-uppercase m-2'>Danh sách thể loại bài báo</h2>

            <button className='btn btn-outline-dark ml-2' onClick={() => {  }}>Add New Category</button>

            <div className="row row-cols-2">
            {
                categories.map(category =>
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
                                <button className='btn btn-info'
                                    onClick={() => { }}>
                                    Details
                                </button>

                                <button className='btn btn-success' style={{ marginLeft: '5px' }}
                                    onClick={() => { }}>
                                    Update
                                </button>

                                <button className='btn btn-danger' style={{ marginLeft: '5px' }}
                                    onClick={() => { }}>
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