/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/adminService";
import AdminModel from '../../models/adminModel';
// import { ToastContainer, toast } from "react-toastify";

const LoginAdmin = () => {
    const navigator = useNavigate();

    const [adminName, setAdminName] = useState('');
    const [password, setPassword] = useState('');

    // Initialize state variables that will hold validation errors
    const [errors, setErrors] = useState({
        adminName: '',
        password: ''
    })

    // const notify = (message) => toast(message);

    function login(e) {
        e.preventDefault();

        // validate form on Submission
        if (validateForm()) {
            const admin = {adminName, password};
            // console.log(admin);

            // Login admin
            loginAdmin(admin).then((response) => {
                if (response.status == 200) {
                    const admin = AdminModel.fromApiResponse(response.data);
                    // console.log(admin);
                    alert("Login success!");
                    
                    localStorage.setItem("accessToken", admin.accessToken);
                    localStorage.setItem("adminID", admin.adminID);
                    localStorage.setItem("adminName", admin.adminName);
                    localStorage.setItem("avatar", admin.image);
                    navigator("/home");
                }
            }).catch(error => {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    console.error(error);
                }
            })
        } else {
            alert("Please fill all information!");
        }
    }

    // Validation function that checks the form data and returns validation errors
  function validateForm() {
    let valid = true;

    const errorCopy = {... errors};

    if (adminName.trim()) {
      errorCopy.firstName = '';
    } else {
      errorCopy.firstName = 'Admin Name is requied!';
      valid = false;
    }

    if (password.trim()) {
      errorCopy.email = '';
    } else {
      errorCopy.email = 'Password is requied!';
      valid = false;
    }

    setErrors(errorCopy);

    return valid;
  }

    return (
        <div className="container">
            {/* <ToastContainer /> */}
            <section className="vh-75">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100 m-5">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid" alt="" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 m-5">
                            <form>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <label className="form-label fw-b" htmlFor="adminName">Admin Name</label>
                                    <input type="text" name="adminName" id="adminName" 
                                    className={`form-control form-control-lg ${ errors.adminName ? 'is-invalid' : '' }`}
                                    placeholder="Enter a valid Admin Name" 
                                    value={adminName}
                                    onChange={(e) => setAdminName(e.target.value)} />
                                    {/* Display validation errors */}
                                    { errors.adminName && <div className='invalid-feedback'>{ errors.adminName }</div> }
                                </div>

                                <div data-mdb-input-init className="form-outline mb-3">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" 
                                    className={`form-control form-control-lg ${ errors.password ? 'is-invalid' : '' }`}
                                    placeholder="Enter password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                                    {/* Display validation errors */}
                                    { errors.password && <div className='invalid-feedback'>{ errors.password }</div> }
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary btn-lg"
                                    style={{paddingLeft: '2.5rem', paddingRight: '2.5rem', width: '310px'}}
                                    onClick={login}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LoginAdmin