/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {listUsers, updateStateUserById, deleteUserById} from "../../services/userService";
import HeaderPage from "../home/header_page";
import FooterPage from '../home/footer_page';
import FormatDate from "../../utils/FormatDate";
import LineChartComponent from "../chart/lineChart";

const ListUsersComponent = () => {
    const [users, setUsers] = useState([]);
    const [userState, setUserState] = useState([]);

    const [strSearch, setStrSearch] = useState('');
    const [foundUsers, setFoundUsers] = useState([]);

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

    // Get list users
    async function getAllUsers(accessToken) {
        if (accessToken != null) {
            await listUsers(accessToken).then((response) => {
                if (response.status == 200) {
                    setUsers(response.data);

                    // console.log(response.data);
                    setFoundUsers(response.data);
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

    // Filter users based on input
    useEffect(() => {
        if (!strSearch.trim()) {
            setFoundUsers(users);
        } else {
            const filteredUsers = users.filter((user) =>
                user.userName.toLowerCase().includes(strSearch.toLowerCase())
            );
            setFoundUsers(filteredUsers);
        }
    }, [strSearch, users]);

    // Update state of user
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

    // Handle delete button
    function handleDeleteButtonClick(userId, accessToken) {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?");
        
        if (confirmed) {
          deleteUser(userId, accessToken);
        }
    }

    // Delete user
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

                <form className="d-flex justify-content-end" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
                    style={{ width: '300px' }} 
                    onChange={(e) => setStrSearch(e.target.value)} 
                    name="inputSearch" id="inputSearch" 
                    value={strSearch} />
                </form>

            {
                foundUsers.map(user => {

                    // Trích xuất dữ liệu labels và dataPoints từ list_user_bmi của user
                    const labels = user.list_user_bmi.map(bmi => {
                        const date = new Date(bmi.check_date);
                        // Định dạng ngày thành dd/mm
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần +1
                        return `${day}/${month}`;
                    });
                    const dataPoints = user.list_user_bmi.map(bmi => parseFloat(bmi.result.toFixed(2)));

                    return (
                        <div key={user.userID} className="w-100 shadow bg-body rounded-4 m-3 p-3">
                            <div className="d-flex flex-row justify-content-between">
                                <h3>{user.userID}. {user.userName}</h3>
                                <h5 className="text-danger">{FormatDate.formatDateFromJson(user.dateJoining)}</h5>
                            </div>
                            <div className="d-flex flex-row justify-content-around m-3 pl-2">
                                <img src={user.image != null ? `data:image/jpeg;base64,${user.image}` : "https://ps.w.org/simple-user-avatar/assets/icon-256x256.png?rev=2413146"} alt={user.userName} style={{width: '150px', height: '190px'}} />
                                <div>
                                    <LineChartComponent labels={labels} dataPoints={dataPoints} />
                                </div>
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
                })
            }
        </div>
        <FooterPage />
        </>
    )
}

export default ListUsersComponent