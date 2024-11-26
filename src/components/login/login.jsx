/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/adminService";
import AdminModel from '../../models/adminModel';
import encryptPass from "../../utils/CryptoPass";
import { APP_NAME } from "../../services/constantService";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginAdmin = () => {
    const navigator = useNavigate();

    const [adminName, setAdminName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Thêm state cho việc hiển thị mật khẩu

    // Initialize state variables that will hold validation errors
    const [errors, setErrors] = useState({
        adminName: '',
        password: ''
    });

    function login(e) {
        e.preventDefault();

        // validate form on Submission
        if (validateForm()) {
            const admin = { adminName, password: encryptPass(password, APP_NAME) };
            // console.log(admin);

            // Login admin
            loginAdmin(admin).then((response) => {
                if (response.status == 200) {
                    const admin = AdminModel.fromApiResponse(response.data);
                    // console.log(admin);
                    alert("Login into admin system successfully!");

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
            });
        } else {
            alert("Please fill all information!");
        }
    }

    // Validation function that checks the form data and returns validation errors
    function validateForm() {
        let valid = true;

        const errorCopy = { ...errors };

        if (adminName.trim()) {
            errorCopy.adminName = '';
        } else {
            errorCopy.adminName = 'Admin Name is required!';
            valid = false;
        }

        if (password.trim()) {
            errorCopy.password = '';
        } else {
            errorCopy.password = 'Password is required!';
            valid = false;
        }

        setErrors(errorCopy);

        return valid;
    }

    // Toggle function to show/hide password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container">
            <section className="vh-75">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100 m-5">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 m-5">
                            <form>
                                <div className="form-outline mb-4">
                                    <label className="form-label fw-b" htmlFor="adminName">Admin Name</label>
                                    <input type="text" name="adminName" id="adminName"
                                        className={`form-control form-control-lg ${errors.adminName ? 'is-invalid' : ''}`}
                                        placeholder="Enter a valid Admin Name"
                                        value={adminName}
                                        onChange={(e) => setAdminName(e.target.value)} />
                                    {errors.adminName && <div className='invalid-feedback'>{errors.adminName}</div>}
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"} // Hiển thị mật khẩu nếu showPassword là true
                                            name="password"
                                            id="password"
                                            className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={togglePasswordVisibility}>
                                            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Mắt để ẩn/hiện mật khẩu */}
                                        </button>
                                    </div>
                                    {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', width: '310px' }}
                                        onClick={login}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LoginAdmin;
