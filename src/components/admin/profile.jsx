/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeaderPage from "../home/header_page";
import FooterPage from "../home/footer_page";
import { getAdminById } from "../../services/adminService";
import FormatDate from "../../utils/FormatDate";

const ProfileAdmin = () => {    
    const [adminName, setAdminName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [modifiedDate, setModifiedDate] = useState('');
    const [imageAvt, setImageAvt] = useState('');

    // Initialize state variables that will hold validation errors
    const [errors, setErrors] = useState({
        adminName: '',
        fullName: '',
        email: ''
    })

    const navigator = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const adminID = localStorage.getItem("adminID");
    const avatar = localStorage.getItem("avatar");

    const fileInputRef = useRef(null); // Create ref for input file

    useEffect(() => {
        if (adminID) {
            if (accessToken != null) {
                getAdmin();
            }
            else {
                navigator("/");
            }
        }
    }, [adminID])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function getAdmin() {
        await getAdminById(adminID).then((response) => {
            if (response.status == 200) {
                setAdminName(response.data.adminName);
                setFullName(response.data.fullName);
                setEmail(response.data.email);
                setPhone(response.data.phone || "");
                setAddress(response.data.address || "");
                setCreatedDate(FormatDate.formatDateFromJson(response.data.created_date));
                setModifiedDate(response.data.modified_date != null ? FormatDate.formatDateFromJson(response.data.modified_date) : FormatDate.formatDateFromJson(response.data.created_date));
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

    // Validation function that checks the form data and returns validation errors
    function validateForm() {
        let valid = true;

        const errorCopy = {... errors};

        if (adminName.trim()) {
            errorCopy.adminName = '';
        } else {
            errorCopy.adminName = "Admin's name is requied!";
            valid = false;
        }

        if (fullName.trim()) {
            errorCopy.fullName = '';
        } else {
            errorCopy.fullName = "Admin's full name is requied!";
            valid = false;
        }

        if (email.trim()) {
            errorCopy.email = '';
        } else {
            errorCopy.email = "Admin's email is requied!";
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
                setImageAvt(base64String);
            };
            reader.readAsDataURL(file);
        }
    }

    // Open input file
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    return (
        <>
        <HeaderPage />
            <div className="container" style={{ backgroundColor: "#eee" }}>

                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img 
                                        src={imageAvt ? `data:image/jpeg;base64,${imageAvt}` : (avatar !== "null" ? `data:image/jpeg;base64,${avatar}` : "https://ps.w.org/simple-user-avatar/assets/icon-256x256.png?rev=2413146")}
                                        alt={`${adminName}'s avatar`} 
                                        loading="lazy" 
                                        className="rounded-circle img-fluid" 
                                        style={{ width: "150px", cursor: "pointer" }} 
                                        onClick={handleImageClick} // Click on image to open input file
                                    />
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        style={{ display: "none" }} 
                                        onChange={handleImageChange} // Progress when choose new image
                                    />
                                    <h5 className="my-2">{adminName}</h5>
                                    <h5 className="my-3">{email}</h5>
                                    {/* <p className="text-muted mb-1">{email}</p> */}
                                    <p className="text-muted mb-1">Admin of Food Nutrition Page</p>
                                    <p className="text-muted mb-2">{address}</p>
                                    <p className="text-muted mb-2">Created Date: {createdDate}</p>
                                    <div className="d-flex justify-content-center mb-2">
                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-primary ms-1">Update Infomation</button>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="card mb-4 mb-lg-0">
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush rounded-3">
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fas fa-address-card"></i>
                                            <p className="mb-0">Users</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fas fa-burger"></i>
                                            <p className="mb-0">Foods</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fas fa-atom"></i>
                                            <p className="mb-0">Nutrients</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="far fa-file-lines"></i>
                                            <p className="mb-0">Categories</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="far fa-newspaper"></i>
                                            <p className="mb-0">Articles</p>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Admin Name</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <input type="text" 
                                            className={`form-control ${errors.adminName ? 'is-invalid' : ''}`} 
                                            name="adminName" id="adminName" 
                                            onChange={(e) => setAdminName(e.target.value)}
                                            value={adminName}/>
                                            {/* Display validation errors */}
                                            { errors.adminName && <div className='invalid-feedback'>{ errors.adminName }</div> }
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Full Name</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <input type="text" 
                                            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} 
                                            onChange={(e) => {setFullName(e.target.value)}} 
                                            name="fullName" id="fullName" 
                                            value={fullName}/>
                                            {/* Display validation errors */}
                                            { errors.fullName && <div className='invalid-feedback'>{ errors.fullName }</div> }
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <input type="text" 
                                            className={`form-control ${errors.email ? 'is-invalid': ''}`} 
                                            onChange={(e) => {setEmail(e.target.value)}} 
                                            name="email" id="email" 
                                            value={email}/>
                                            {/* Display validation errors */}
                                            { errors.email && <div className='invalid-feedback'>{ errors.email }</div> }
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Phone</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="phone" id="phone" 
                                            onChange={(e) => {setPhone(e.target.value)}} 
                                            value={phone}/>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Address</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" name="address" id="address" 
                                            onChange={(e) => {setAddress(e.target.value)}} 
                                            value={address}/>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Modified Date</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{modifiedDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-md-6">
                                    <div className="card mb-4 mb-md-0">
                                        <div className="card-body">
                                            <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                                            </p>
                                            <p className="mb-1" style={{ fontSize: ".77rem" }}>Web Design</p>
                                            <div className="progress rounded" style={{ height: "5px" }}>
                                                <div className="progress-bar" role="progressbar" style={{ width: "80%" }} aria-valuenow="80"
                                                    aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Website Markup</p>
                                            <div className="progress rounded" style={{ height: "5px" }}>
                                                <div className="progress-bar" role="progressbar" style={{ width: "72%" }} aria-valuenow="72"
                                                    aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>One Page</p>
                                            <div className="progress rounded" style={{ height: "5px" }}>
                                                <div className="progress-bar" role="progressbar" style={{ width: "89%" }} aria-valuenow="89"
                                                    aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Mobile Template</p>
                                            <div className="progress rounded" style={{ height: "5px" }}>
                                                <div className="progress-bar" role="progressbar" style={{ width: "55%" }} aria-valuenow="55"
                                                    aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Backend API</p>
                                            <div className="progress rounded mb-2" style={{ height: "5px" }}>
                                                <div className="progress-bar" role="progressbar" style={{ width: "66%" }} aria-valuenow="66"
                                                    aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div> */}
                        </div>
                    </div>
                </div>

            </div>
        <FooterPage />
        </>
    )
}

export default ProfileAdmin