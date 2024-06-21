/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useId, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {listUsers, updateStateUserById, deleteUserById} from "../../services/userService";
import HeaderPage from "../home/header_page";
import FooterPage from '../home/footer_page';
import FormatDate from "../../utils/FormatDate";

const ListUsersComponent = () => {
    const [users, setUsers] = useState([]);
    const [userState, setUserState] = useState([]);

    const navigator = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (accessToken != null) {
            getAllUsers(accessToken);
        }
        else {
            navigator("/");
        }
    }, [accessToken, navigator])

    async function getAllUsers(accessToken) {
        if (accessToken != null) {
            await listUsers(accessToken).then((response) => {
                if (response.status == 200) {
                    setUsers(response.data);
                    // console.log(response.data);
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
        } else {
            alert("Login Expired!");
            navigator("/");
        }
    }

    async function updateStateUser(userId, accessToken) {
        if (accessToken != null) {
            await updateStateUserById(userId, userState, accessToken).then((response) => {
                if (response.status == 200) {
                    alert(`Update state for user have id is ${userId} successfully!`);
                    navigator("/users");
                }
            }).catch(error =>{
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
        } else {
            alert("Login Expired!");
            navigator("/");
        }
    }

    function handleDeleteButtonClick(userId, accessToken) {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?");
        
        if (confirmed) {
          deleteUser(userId, accessToken);
        }
    }

    async function deleteUser(userId, accessToken) {
        if (accessToken != null) {
            await deleteUserById(userId, accessToken).then((response) => {
                if (response.status == 200) {
                    alert(`Remove user have id is ${userId} successfully!`);
                    navigator("/users");
                }
            }).catch(error => {
                if (error.response) {
                    var message = error.response.data.message;
                    // console.log(message);
                    if (!message) {
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
            <h2 className='fw-bold text-center text-danger m-2 text-uppercase'>Danh sách người dùng</h2>

            {
                users.map(user =>
                    <div key={user.userID} className="w-100 shadow bg-body rounded-4 m-3 p-3">
                        <div className="d-flex flex-row justify-content-between">
                            <h3>{user.userID}. {user.userName}</h3>
                            <h5 className="text-danger">{FormatDate.formatDateFromJson(user.dateJoining)}</h5>
                        </div>
                        <div className="d-flex flex-row justify-content-around m-3 pl-2">
                            <img src={user.image != null ? `data:image/jpeg;base64,${user.image}` : "https://ps.w.org/simple-user-avatar/assets/icon-256x256.png?rev=2413146"} alt={user.userName} style={{width: '150px', height: '190px'}} />
                            <div className="ml-2">
                                <p><b>Full name: </b>{user.fullName}</p>
                                <p><b>Email: </b>{user.email}</p>
                                <p><b>Phone: </b>{user.phone}</p>
                                <p><b>Address: </b>{user.address}</p>
                                <p><b>Date Birth: </b>{FormatDate.formatDateFromJson(user.dateBirth)}</p>
                                
                            </div>
                            <div>
                                <p><b>State: </b>
                                    {user.state
                                    ?
                                    <select className="form-select" defaultValue={user.state}
                                        onChange={(e) => setUserState(e.target.value)}>
                                        <option value="true">On</option>
                                        <option value="false">Off</option>
                                    </select>
                                    :
                                    <select className="form-select" defaultValue={user.state}
                                        onChange={(e) => setUserState(e.target.value)}>
                                        <option value="true">On</option>
                                        <option value="false">Off</option>
                                    </select>}
                                </p>
                                <p><b>Modified Date: </b>{FormatDate.formatDateFromJson(user.modified_date)}</p>
                                <p>
                                    <button className='btn btn-success'
                                        onClick={() => { updateStateUser(user.userID, accessToken); } }>
                                        Save
                                    </button>

                                    <button className='btn btn-danger' style={{ marginLeft: '5px' }}
                                        onClick={() => { handleDeleteButtonClick(user.userID, accessToken); } }>
                                        Delete
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
        <FooterPage />
        </>
    )
}

export default ListUsersComponent