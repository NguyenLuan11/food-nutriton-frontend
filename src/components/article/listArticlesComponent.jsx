/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import HeaderPage from "../home/header_page";
import FooterPage from "../home/footer_page";
import { deleteArticleById, getThumbnailArticle, listArticle } from "../../services/articleService";
import FormatDate from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";

const ListArticlesComponent = () => {
    const [articles, setArticles] = useState([]);

    const [strSearch, setStrSearch] = useState('');
    const [foundArticles, setFoundArticles] = useState([]);

    const navigator = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (accessToken != null) {
            getAllArticles();
        }
        else {
            navigator("/");
        }
    }, [accessToken, navigator])

    // Get list articles
    async function getAllArticles() {
        await listArticle().then((response) => {
            if (response.status == 200) {
                setArticles(response.data);
                setFoundArticles(response.data);
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
            setFoundArticles(articles);
        }
        else {
            const filteredArticles = articles.filter((article) => 
                article.title.toLowerCase().includes(strSearch.toLowerCase())
            );
            setFoundArticles(filteredArticles);
        }
    }, [strSearch, articles]);

    // Redirect to detail page
    function detailsArticle(articleId) {
        navigator(`/articles/${articleId}`);
    }

    // Redirect to update page
    function updateArticle(articleId) {
        navigator(`/article/${articleId}`);
    }

    // Redirect to add page
    function addArticle() {
        navigator(`/article`);
    }

    // Handle delete button
    function handleDeleteButtonClick(articleId, accessToken) {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa bài báo này không?");
        
        if (confirmed) {
          deleteArticle(articleId, accessToken);
        }
    }

    // Delete article
    async function deleteArticle(articleId, accessToken) {
        if (accessToken != null) {
            await deleteArticleById(articleId, accessToken).then((response) => {
                if (response.status == 200) {
                    alert(`Remove article have id is ${articleId} successfully!`);
                    navigator("/articles");
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
            <h2 className='fw-bold text-center text-success m-2 text-uppercase'>Danh sách bài báo</h2>

            <button className='btn btn-outline-dark ml-2' onClick={() => { addArticle() }}>Add New Article</button>

                <form className="d-flex justify-content-end" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                        style={{ width: '300px' }}
                        onChange={(e) => setStrSearch(e.target.value)}
                        name="inputSearch" id="inputSearch"
                        value={strSearch} />
                </form>

            {
                foundArticles.map(article =>
                    <div key={article.articleID} className="w-100 shadow bg-body rounded-4 m-3 p-3">
                        <div className="d-flex flex-row justify-content-between">
                            <h3>{article.articleID}. {article.title}</h3>
                            <h5 className="text-info">{FormatDate.formatDateFromJson(article.created_date)}</h5>
                        </div>
                        <div className="d-flex flex-row justify-content-around m-3">
                            <img src={`${getThumbnailArticle}${article.thumbnail}`} alt={article.title} style={{width: '300px', height: '200px', marginRight: '30px'}} />
                            <div>
                                <p style={{textIndent: '40px'}}>{article.shortDescription}</p>
                                <p className="d-flex justify-content-end" style={{textIndent: '40px'}}><i>{article.author}</i></p>
                            </div>
                        </div>
                        <div>
                            <p className="d-flex justify-content-end"><i>
                                ----- Ngày chỉnh sửa: {article.modified_date != null ? FormatDate.formatDateFromJson(article.modified_date) : FormatDate.formatDateFromJson(article.created_date)} -----
                            </i></p>
                        </div>
                        <div>
                            <button className='btn btn-info' 
                            onClick={() => {detailsArticle(article.articleID)}}>
                                Details
                            </button>

                            <button className='btn btn-success' style={{marginLeft: '5px'}} 
                            onClick={() => {updateArticle(article.articleID)}}>
                                Update
                            </button>

                            <button className='btn btn-danger' style={{marginLeft: '5px'}} 
                            onClick={() => {handleDeleteButtonClick(article.articleID, accessToken)}}>
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

export default ListArticlesComponent