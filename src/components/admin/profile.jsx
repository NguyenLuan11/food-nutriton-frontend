/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderPage from "../home/header_page";
import FooterPage from "../home/footer_page";
import { getAdminById } from "../../services/adminService";
import FormatDate from "../../utils/FormatDate";

const ProfileAdmin = () => {
    const [admin, setAdmin] = useState([]);

    const navigator = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const adminID = localStorage.getItem("adminID");

    useEffect(() => {
        if (accessToken != null) {
            getAdmin();
        }
        else {
            navigator("/");
        }
    }, [accessToken, getAdmin, navigator])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function getAdmin() {
        await getAdminById(adminID).then((respone) => {
            if (respone.status == 200) {
                setAdmin(respone.data);
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

    // Redirect to update page
    function updateProfile() {
        navigator(`/profile/update`);
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
                                    <img src={admin.image != null ? `data:image/jpeg;base64,${admin.image}` : "https://ps.w.org/simple-user-avatar/assets/icon-256x256.png?rev=2413146"}
                                        alt={`avatar ${admin.adminName}`} loading="lazy" className="rounded-circle img-fluid" style={{ width: "150px" }} />
                                    <h5 className="my-3">{admin.adminName}</h5>
                                    <p className="text-muted mb-1">Admin of Food Nutrition Page</p>
                                    <p className="text-muted mb-4">{admin.address}</p>
                                    <div className="d-flex justify-content-center mb-2">
                                        {/* <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary">Follow</button> */}
                                        <button onClick={updateProfile} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-primary ms-1">Update Infomation</button>
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
                                            <p className="mb-0">Full Name</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{admin.fullName}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{admin.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Phone</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{admin.phone}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Address</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{admin.address}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Created Date</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{FormatDate.formatDateFromJson(admin.created_date)}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Modified Date</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">
                                                {admin.modified_date != null ? FormatDate.formatDateFromJson(admin.modified_date) : FormatDate.formatDateFromJson(admin.created_date)}
                                            </p>
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