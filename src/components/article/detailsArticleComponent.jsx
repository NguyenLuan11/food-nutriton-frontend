/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import HeaderPage from "../home/header_page";
import FooterPage from "../home/footer_page";
import { useNavigate, useParams } from "react-router-dom";
import FormatDate from "../../utils/FormatDate";
import { getArticleById } from "../../services/articleService";
import { getCategoryById } from "../../services/categoryArticleService";

const DetailsArticleComponent = () => {
    const [article, setArticle] = useState('');
    const [category, setCategory] = useState('');

    const navigator = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const {articleId} = useParams();

    useEffect(() => {
        if (articleId) {
            if (accessToken != null) {
                getArticle(articleId);
            }
            else {
                navigator("/");
            }
        }
    }, [articleId])

    async function getCategory(categoryID) {
        await getCategoryById(categoryID).then((response) => {
            if (response.status == 200) {
                setCategory(response.data);
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

    async function getArticle(articleId) {
        await getArticleById(articleId).then((response) => {
            if (response.status == 200) {
                setArticle(response.data);
                // console.log(response.data);

                getCategory(response.data.categoryID);
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
        navigator("/articles");
    }

    function updateArticle(articleId) {
        navigator(`/article/${articleId}`);
    }
    
    return (
        <>
        <HeaderPage />
            <div className="container">
                {/* <h2 className='fw-bold text-center text-success m-2 text-uppercase'>Thông tin bài báo</h2> */}

                <div key={article.articleID} className="w-100 shadow-lg bg-body rounded-4 m-3 p-3">
                    <div className="d-flex justify-content-between text-primary">
                    {category.categoryName ? <h5>{category.categoryName}</h5> : <h5></h5> }
                        <h5>{FormatDate.formatDateFromJson(article.created_date)}</h5>
                    </div>
                    <h2 className='fw-bold text-center text-success m-2 text-uppercase'>{article.title}</h2>
                    <div className="d-flex flex-column align-items-center m-3 p-3 lh-lg text-justify">
                        <img src={`data:image/jpeg;base64,${article.thumbnail}`} alt={article.title} style={{ width: '500px', height: '270px' }} />
                        <br />
                        <div className="tableOfContent border p-4 rounded-4 bg-success-subtle">
                            <ol>
                                <li>
                                    <a href={`#${article.shortDescription}`} className="link-dark link-dark-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                        <i>Mô tả ngắn</i>
                                    </a>
                                </li>
                                <li>
                                    <a href={`#${article.content}`} className="link-dark link-dark-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                        <i>Nội dung</i>
                                    </a>
                                </li>
                            </ol>
                        </div>
                        <div className="content" style={{ textIndent: '40px' }}>
                            <h5 id={article.shortDescription}>1. Mô tả ngắn</h5>
                            <p>{article.shortDescription}</p>

                            <h5 id={article.content}>2. Nội dung</h5>
                            <p>{article.content}</p>

                            <p className="d-flex justify-content-end" style={{textIndent: '40px'}}><i>{article.author}</i></p>
                        </div>
                    </div>
                    <p className="d-flex justify-content-end"><i>
                        ----- Ngày chỉnh sửa: {article.modified_date != null ? FormatDate.formatDateFromJson(article.modified_date) : FormatDate.formatDateFromJson(article.created_date)} -----
                    </i></p>
                    <div>
                        <button className='btn btn-info'
                            onClick={() => { backToList() }}>
                            Return
                        </button>

                        <button className='btn btn-success' style={{ marginLeft: '5px' }}
                            onClick={() => { updateArticle(articleId) }}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        <FooterPage />
        </>
    )
}

export default DetailsArticleComponent