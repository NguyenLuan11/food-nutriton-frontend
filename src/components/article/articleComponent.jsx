/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import HeaderPage from "../home/header_page";
import FooterPage from "../home/footer_page";
import { useNavigate, useParams } from "react-router-dom";
import { addArticle, getArticleById, updateArticleById, getThumbnailArticle, uploadThumbnailArticleById } from "../../services/articleService";
import { listCategory } from "../../services/categoryArticleService";

const ArticleComponent = () => {
    const navigator = useNavigate();
    const {articleId} = useParams();
    const accessToken = localStorage.getItem("accessToken");

    const [newImage, setNewImage] = useState('');
    const [categories, setCategories] = useState([]);

    const [thumbnail, setThumbnail] = useState('');
    const [categoryID, setCategoryID] = useState(0);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [title, setTitle] = useState('');

    // Initialize state variables that will hold validation errors
    const [errors, setErrors] = useState({
        title: '',
        content: ''
    })

    const fileInputRef = useRef(null); // Create ref for input file

    useEffect(() => {
        if (articleId) {
            if (accessToken != null) {
                getArticle(articleId);
            }
            else {
                navigator("/");
            }
        }

        getAllCategories();
    }, [accessToken, articleId, navigator])

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

    async function getArticle(articleId) {
        await getArticleById(articleId).then((response) => {
            if (response.status == 200) {
                setTitle(response.data.title);
                setThumbnail(response.data.thumbnail);
                setAuthor(response.data.author);
                setShortDescription(response.data.shortDescription);
                setContent(response.data.content);
                setCategoryID(response.data.categoryID);
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

    async function uploadThumbnailArticle(articleId, file, accessToken) {
        await uploadThumbnailArticleById(articleId, file, accessToken).then(response => {
            if (response.status == 200) {
                console.log(`Uploaded article's thumbnail have id is ${articleId} successfully!`);
            } else {
                console.log(`Uploaded article's thumbnail have id is ${articleId} failed!`);
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

    async function addOrUpdateArticle(articleId, accessToken) {
        // e.preventDefault();

        if (accessToken != null) {
            if (validateForm()) {
                const article = {title, author, shortDescription, content, categoryID}
                console.log(article);
                const file = fileInputRef.current.files[0];
                console.log(file);

                if (articleId) {
                    if (file) {
                        uploadThumbnailArticle(articleId, file, accessToken);
                    }

                    await updateArticleById(articleId, article, accessToken).then((response) => {
                        if (response.status == 200) {
                            alert(`Updated article have id is ${articleId} successfully!`);
                            navigator(`/articles/${articleId}`);
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
                    await addArticle(article,accessToken).then((response) => {
                        if (response.status == 200) {
                            if (file) {
                                const articleId = response.data.articleID;
                                uploadThumbnailArticle(articleId, file, accessToken);
                            }

                            alert(`Added article successfully!`);
                            navigator(`/articles`);
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
        navigator("/articles");
    }

    // Validation function that checks the form data and returns validation errors
    function validateForm() {
        let valid = true;

        const errorCopy = {... errors};

        if (title.trim()) {
            errorCopy.title = '';
        } else {
            errorCopy.title = "Article's title is requied!";
            valid = false;
        }

        if (content.trim()) {
            errorCopy.content = '';
        } else {
            errorCopy.content = 'Content is requied!';
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
        if (articleId) {
          return <h2 className='fw-bold text-center text-success m-2 text-uppercase'>Cập nhật thông tin bài báo</h2>;
        }
        else {
          return <h2 className='fw-bold text-center text-success m-2 text-uppercase'>Thêm mới bài báo</h2>;
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
                            articleId ? 
                            <div className="form-group">
                                <label htmlFor="articleID"><b><i>ID</i></b></label>
                                <input type="int" className="form-control" name="articleID" id="articleID" value={articleId} disabled />
                            </div> : ``
                        }
                        <br />
                        <div className="form-group">
                            <label htmlFor="title"><b><i>Tiêu đề</i></b></label>
                            <input type="text" 
                            onChange={(e) => setTitle(e.target.value)}
                            className={`form-control ${ errors.title ? 'is-invalid' : '' }`} 
                            name="title" id="title" 
                            value={title} />
                            {/* Display validation errors */}
                            { errors.title && <div className='invalid-feedback'>{ errors.title }</div> }
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="author"><b><i>Tác giả</i></b></label>
                            <input type="text" 
                            onChange={(e) => setAuthor(e.target.value)}
                            className={`form-control ${ errors.author ? 'is-invalid' : '' }`} 
                            name="author" id="author" 
                            value={author} />
                            {/* Display validation errors */}
                            { errors.author && <div className='invalid-feedback'>{ errors.author }</div> }
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="thumbnail"><b><i>Thumbnail</i></b></label>
                            <br />
                            {
                                newImage ? 
                                <img src={`data:image/jpeg;base64,${newImage}`} alt={title} loading="lazy" style={{ width: '200px', height: '200px' }} />
                                : thumbnail ?
                                <img src={`${getThumbnailArticle}${thumbnail}`} alt={title} loading="lazy" style={{ width: '200px', height: '200px' }} />
                                : ``
                            }
                            <input type="file" className="form-control" name="picArticle" id="picArticle" 
                            ref={fileInputRef} 
                            onChange={(e) => handleImageChange(e)} />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="shortDescription"><b><i>Mô tả ngắn</i></b></label>
                            <textarea type="text"
                            onChange={(e) => setShortDescription(e.target.value)}
                            className={`form-control ${ errors.shortDescription ? 'is-invalid' : '' }`} 
                            name="shortDescription" id="shortDescription" 
                            value={shortDescription} />
                            {/* Display validation errors */}
                            { errors.shortDescription && <div className='invalid-feedback'>{ errors.shortDescription }</div> }
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="content"><b><i>Nội dung</i></b></label>
                            <textarea type="text" 
                            onChange={(e) => setContent(e.target.value)}
                            className={`form-control ${ errors.content ? 'is-invalid' : '' }`} 
                            name="content" id="content" 
                            value={content} />
                            {/* Display validation errors */}
                            { errors.content && <div className='invalid-feedback'>{ errors.content }</div> }
                        </div>
                        <br />
                        <div>
                            <label htmlFor="categoryID"><b><i>Thể loại</i></b></label>
                            <select className="form-select" value={categoryID}
                                onChange={(e) => setCategoryID(Number.parseInt(e.target.value))} name="categoryID" id="categoryID">
                                {
                                    categories.map(category => 
                                        <option key={category.categoryID} value={category.categoryID}>
                                            {category.categoryName}
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                    </form>
                    <div>
                        <button className='btn btn-info'
                            onClick={() => { backToList() }}>
                            Return
                        </button>

                        <button className='btn btn-success' style={{ marginLeft: '5px' }}
                            onClick={() => { addOrUpdateArticle(articleId, accessToken) }}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        <FooterPage />
        </>
    )
}

export default ArticleComponent