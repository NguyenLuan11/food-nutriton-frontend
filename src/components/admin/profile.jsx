/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeaderPage from "../home/header_page";
import FooterPage from "../home/footer_page";
import { checkAdminPassById, getAdminById, getAvtAdmin, updateAdminById, updateAdminPassById, updateAvtAdminById } from "../../services/adminService";
import FormatDate from "../../utils/FormatDate";
import encryptPass from "../../utils/CryptoPass";
import { APP_NAME } from "../../services/constantService";

const ProfileAdmin = () => {    
    const [adminName, setAdminName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [modifiedDate, setModifiedDate] = useState('');
    const [imageAvt, setImageAvt] = useState('');
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

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
    const [isVisibleBtnChangePass, setIsVisibleBtnChangePass] = useState(false);
    const [isVisibleCurrentPassForm, setIsVisibleCurrentPassForm] = useState(true);
    const [isVisibleNewPassForm, setIsVisibleNewPassForm] = useState(false);

    const toggleVisibility = () => {
        setIsVisibleBtnChangePass(!isVisibleBtnChangePass);
      };

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

    function btnUpdateProfileAdminHandle() {
        const confirmed = window.confirm("Are you sure update your information?");
        
        if (confirmed) {
            updateProfileAdmin();
        }
    }

    async function updateProfileAdmin() {
        // console.log(`adminID: ${adminID}`);
        const adminData = {adminName, fullName, email, phone, address}
        console.log(`adminData: ${adminData}`);

        if (fileInputRef.current.files[0]) {
            await updateAvtAdminById(adminID, fileInputRef.current.files[0], accessToken).then(response => {
                if (response.status === 200) {
                    alert("Avatar updated successfully!");
                    localStorage.setItem("avatar", response.data.image);
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

        if (validateForm()) {
            await updateAdminById(adminID, adminData).then(response => {
                if (response.status == 200) {
                    alert("Updated admin's profile successfully!");
                    localStorage.setItem("adminName", response.data.adminName);
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
    }

    async function checkPassAdmin() {
        if (currentPass && currentPass != "") {
            const passData = {password: encryptPass(currentPass, APP_NAME)};

            await checkAdminPassById(adminID, passData).then(response => {
                if (response.status == 200) {
                    setIsVisibleCurrentPassForm(!isVisibleCurrentPassForm);
                    setIsVisibleNewPassForm(!isVisibleNewPassForm);
                } else {
                    alert("Wrong password!");
                }
            }).catch(error => {
                if (error.response) {
                    var message = error.response.data.message;
                    alert(message);
                } else {
                    console.error(error);
                }
            });
        } else {
            alert("Current password is requied!");
        }
    }

    function btnUpdatePassAdminHandle() {
        const confirmed = window.confirm("Are you sure change your password?");
        
        if (confirmed) {
            updatePassAdmin();
        }
    }

    async function updatePassAdmin() {
        if (newPass == confirmPass) {
            const passData = {password: encryptPass(newPass, APP_NAME)};

            await updateAdminPassById(adminID, passData).then(response => {
                if (response.status == 200) {
                    setIsVisibleBtnChangePass(!isVisibleBtnChangePass);
                    setIsVisibleCurrentPassForm(!isVisibleCurrentPassForm);
                    setIsVisibleNewPassForm(!isVisibleNewPassForm);

                    alert("Change password successfully!");

                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("adminID");
                    localStorage.removeItem("adminName");
                    localStorage.removeItem("avatar");

                    navigator("/");
                }
            }).catch(error => {
                if (error.response) {
                    var message = error.response.data.message;
                    alert(message);
                } else {
                    console.error(error);
                }
            });
        } else {
            alert("New password and confirm password must matching!");
        }
    }

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
                                        src={imageAvt ? `data:image/jpeg;base64,${imageAvt}` 
                                        : (avatar !== "null" 
                                            ? `${getAvtAdmin}${avatar}` 
                                            : "https://ps.w.org/simple-user-avatar/assets/icon-256x256.png?rev=2413146")}
                                        alt={`${adminName}'s avatar`} 
                                        loading="lazy" 
                                        className="rounded-circle img-fluid" 
                                        style={{ width: "150px", cursor: "pointer" }} 
                                        onClick={handleImageClick} // Click on image to open input file
                                    />
                                    <input 
                                        type="file" name="picAvt" 
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
                                        <button type="button" onClick={btnUpdateProfileAdminHandle} data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-success ms-1">Update Infomation</button>
                                        <button type="button" onClick={toggleVisibility} data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-warning ms-1">Change Password</button>
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

                            <div className="row" style={{ display: isVisibleBtnChangePass ? "block" : "none" }}>
                                <div className="col-md-6">
                                    <div className="card mb-4 mb-md-0">
                                        <div className="card-body">
                                            <p className="mb-4 fw-bold">CHANGE PASSWORD</p>

                                            <div className="mb-3" style={{display: isVisibleCurrentPassForm ? "block" : "none"}}>
                                                <div className="mb-2" id="currentpass">
                                                    <label htmlFor="currentpass" className="form-label">Enter your current password</label>
                                                    <input type="password" className="form-control" onChange={(e) => setCurrentPass(e.target.value)} 
                                                    id="currentpass" placeholder="Your password!" />
                                                </div>
                                                <button type="button" onClick={checkPassAdmin} className="btn btn-outline-primary w-100">Submit</button>
                                            </div>
                                            
                                            <div className="mb-3" style={{display: isVisibleNewPassForm ? "block" : "none"}}>
                                                <div className="mb-2">
                                                    <label htmlFor="newpass" className="form-label">Enter new password</label>
                                                    <input type="password" className="form-control" onChange={(e) => setNewPass(e.target.value)} 
                                                    id="newpass" placeholder="New password!" />
                                                </div>
                                                <div className="mb-2">
                                                    <label htmlFor="confirmpass" className="form-label">Confirm password</label>
                                                    <input type="password" className="form-control" onChange={(e) => setConfirmPass(e.target.value)} 
                                                    id="confirmpass" placeholder="Confirm password!" />
                                                </div>
                                                <button type="button" onClick={btnUpdatePassAdminHandle} className="btn btn-outline-danger w-100">Update Password</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        <FooterPage />
        </>
    )
}

export default ProfileAdmin