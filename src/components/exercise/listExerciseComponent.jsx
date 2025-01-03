/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import HeaderPage from "../home/header_page";
import FooterPage from '../home/footer_page';
import FormatDate from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";
import { deleteExerciseById, listExercises } from "../../services/exerciseService";

const ListExerciseComponent = () => {
    const [exercises, setExercises] = useState([]);

    const [strSearch, setStrSearch] = useState('');
    const [foundExercises, setFoundExercises] = useState([]);

    const navigator = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (accessToken != null) {
            getAllExercises();
        }
        else {
            navigator("/");
        }
    }, [accessToken, navigator])

    // Get list exercises
    async function getAllExercises() {
        await listExercises().then((response) => {
            if (response.status == 200) {
                setExercises(response.data);
                setFoundExercises(response.data);
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
            setFoundExercises(exercises);
        }
        else {
            const filteredExercises = exercises.filter((exercise) => 
                exercise.nameExercise.toLowerCase().includes(strSearch.toLowerCase())
            );
            setFoundExercises(filteredExercises);
        }
    }, [strSearch, exercises]);

    // Handle delete button
    function handleDeleteButtonClick(exerciseId, accessToken) {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa bài tập này không?");
        
        if (confirmed) {
          deleteExercise(exerciseId, accessToken);
        }
    }

    // Delete exercise
    async function deleteExercise(exerciseId, accessToken) {
        if (accessToken != null) {
            await deleteExerciseById(exerciseId, accessToken).then((response) => {
                if (response.status == 200) {
                    alert(`Remove exercise have id is ${exerciseId} successfully!`);
                    navigator("/exercises");
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

    // Redirect to update page
    function updateExercise(exerciseId) {
        navigator(`/exercise/${exerciseId}`);
    }

    // Redirect to add page
    function addExercise() {
        navigator(`/exercise`);
    }

    return (
        <>
        <HeaderPage />
        <div className="container">
            <h2 className='fw-bold text-center text-success text-uppercase m-2'>Danh sách bài tập</h2>

            <button className='btn btn-outline-dark ml-2' onClick={() => { addExercise() }}>Add New Exercise</button>

                <form className="d-flex justify-content-end" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                        style={{ width: '300px' }}
                        onChange={(e) => setStrSearch(e.target.value)}
                        name="inputSearch" id="inputSearch"
                        value={strSearch} />
                </form>

            <div className="row row-cols-2">
            {
                foundExercises.map(exercise =>
                    <div key={exercise.id} className="col">
                        <div className="w-100 shadow bg-body rounded-4 m-3 p-3">
                            <div className="d-flex flex-row justify-content-between">
                                <h3 className="d-flex flex-row justify-content-start">
                                    <input disabled className="form-control-plaintext fw-bold" type="int" style={{width: '50px'}} 
                                    name="id" id="id" value={exercise.id} />
                                
                                    <input disabled className="form-control-plaintext fw-bold fs-3" type="text" style={{width: '300px'}} 
                                    name="nameExercise" id="nameExercise" value={exercise.nameExercise} />
                                </h3>
                                <h5 className="text-info mt-3">{FormatDate.formatDateFromJson(exercise.created_date)}</h5>
                            </div>
                            <div>
                                <h5 className="text-info mt-3">{exercise.kind}</h5>
                                <p className="d-flex justify-content-end"><i>
                                    ----- Ngày chỉnh sửa: {exercise.modified_date != null ? FormatDate.formatDateFromJson(exercise.modified_date) : FormatDate.formatDateFromJson(exercise.created_date)} -----
                                </i></p>
                            </div>
                            <div>
                                <button className='btn btn-success' style={{ marginLeft: '5px' }}
                                    onClick={() => { updateExercise(exercise.id) }}>
                                    Update
                                </button>

                                <button className='btn btn-danger' style={{ marginLeft: '5px' }}
                                    onClick={() => { handleDeleteButtonClick(exercise.id, accessToken) }}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            </div>
        </div>
        <FooterPage />
        </>
    )
}

export default ListExerciseComponent