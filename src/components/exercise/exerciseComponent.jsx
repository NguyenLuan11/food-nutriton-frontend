/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import HeaderPage from "../home/header_page";
import FooterPage from "../home/footer_page";
import { useNavigate, useParams } from "react-router-dom";
import { addExercise, getExerciseById, updateExerciseById } from "../../services/exerciseService";

const ExerciseComponent = () => {
    const navigator = useNavigate();
    const {exerciseId} = useParams();
    const accessToken = localStorage.getItem("accessToken");

    const [nameExercise, setNameExercise] = useState('');
    const [kind, setKind] = useState('');

    // Initialize state variables that will hold validation errors
    const [errors, setErrors] = useState({
        nameExercise: '',
        kind: '',
    })

    useEffect(() => {
        if (exerciseId) {
            if (accessToken != null) {
                getExercise(exerciseId);
            }
            else {
                navigator("/");
            }
        }
    }, [accessToken, exerciseId, navigator])

    async function getExercise(exerciseId) {
        await getExerciseById(exerciseId).then((response) => {
            if (response.status == 200) {
                setNameExercise(response.data.nameExercise);
                setKind(response.data.kind)
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

    async function addOrUpdateExercise(exerciseId, accessToken) {
        if (accessToken != null) {
            if (validateForm()) {
                const exercise = {nameExercise, kind};
                console.log(exercise);

                if (exerciseId) {
                    await updateExerciseById(exerciseId, exercise, accessToken).then((response) => {
                        if (response.status == 200) {
                            alert(`Updated exercise have id is ${exerciseId} successfully!`);
                            navigator(`/exercises`);
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
                    await addExercise(exercise, accessToken).then((response) => {
                        if (response.status == 200) {
                            alert(`Added exercise successfully!`);
                            navigator(`/exercises`);
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
        navigator("/exercises");
    }

    // Validation function that checks the form data and returns validation errors
    function validateForm() {
        let valid = true;

        const errorCopy = {... errors};

        if (nameExercise.trim()) {
            errorCopy.nameExercise = '';
        } else {
            errorCopy.categoryName = "Exercise's name is requied!";
            valid = false;
        }

        if (kind.trim()) {
            errorCopy.kind = '';
        } else {
            errorCopy.kind = "Exercise's kind is requied!";
            valid = false;
        }

        setErrors(errorCopy);

        return valid;
    }

    function pageTitle() {
        if (exerciseId) {
          return <h2 className='fw-bold text-center text-success m-2 text-uppercase'>Cập nhật thông tin bài tập</h2>;
        }
        else {
          return <h2 className='fw-bold text-center text-success m-2 text-uppercase'>Thêm mới bài tập</h2>;
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
                            exerciseId ? 
                            <div className="form-group">
                                <label htmlFor="categoryId"><b><i>ID</i></b></label>
                                <input type="int" className="form-control" name="categoryId" id="categoryId" value={exerciseId} disabled />
                            </div> : ``
                        }
                        <br />
                        <div className="form-group">
                            <label htmlFor="nameExercise"><b><i>Tên bài tập</i></b></label>
                            <input type="text" 
                            onChange={(e) => setNameExercise(e.target.value)}
                            className={`form-control ${ errors.nameExercise ? 'is-invalid' : '' }`} 
                            name="nameExercise" id="nameExercise" 
                            value={nameExercise} />
                            {/* Display validation errors */}
                            { errors.nameExercise && <div className='invalid-feedback'>{ errors.nameExercise }</div> }
                        </div>
                        <br />
                        <div>
                            <label htmlFor="kind"><b><i>Thể loại bài tập</i></b></label>
                            <select className="form-select" value={kind}
                                onChange={(e) => setKind(e.target.value)} name="kind" id="kind">
                                <option value="cardio">Cardio</option>
                                <option value="strength">Strength</option>
                                <option value="flexibility">Flexibility</option>
                            </select>
                        </div>
                    </form>
                    <div>
                        <button className='btn btn-info'
                            onClick={() => { backToList() }}>
                            Return
                        </button>

                        <button className='btn btn-success' style={{ marginLeft: '5px' }}
                            onClick={() => { addOrUpdateExercise(exerciseId, accessToken) }}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        <FooterPage />
        </>
    )
}

export default ExerciseComponent