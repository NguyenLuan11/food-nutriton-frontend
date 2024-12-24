/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import HeaderPage from "../home/header_page";
import FooterPage from "../home/footer_page";
import { useNavigate, useParams } from "react-router-dom";
import { listNatureNutrient } from "../../services/natureNutrientService";
import { addNutrient, getNutrientById, updateNutrientById } from "../../services/nutrientService";

const NutrientComponent = () => {
    const navigator = useNavigate();
    const {nutrientId} = useParams();
    const accessToken = localStorage.getItem("accessToken");

    const [natures, setNatures] = useState([]);

    const [nutrientName, setNutrientName] = useState('');
    const [needed, setNeeded] = useState(0);
    const [natureID, setNatureID] = useState(0);
    const [nuFunction, setFunction] = useState('');
    const [description, setDescription] = useState('');
    const [excessSigns, setExcessSigns] = useState('');
    const [deficiencySigns, setDeficiencySigns] = useState('');
    const [shortagePrevention, setShortagePrevention] = useState('');
    const [subjectInterest, setSubjectInterest] = useState('');

    // Initialize state variables that will hold validation errors
    const [errors, setErrors] = useState({
        nutrientName: '',
        needed: '',
        nuFunction: ''
    })

    useEffect(() => {
        if (nutrientId) {
            if (accessToken != null) {
                getNutrient(nutrientId);
            }
            else {
                navigator("/");
            }
        }

        getAllNatureNutrient();
    }, [accessToken, navigator, nutrientId])

    async function getAllNatureNutrient() {
        await listNatureNutrient().then((response) => {
            if (response.status == 200) {
                setNatures(response.data);
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

    async function getNutrient(nutrientId) {
        await getNutrientById(nutrientId).then((response) => {
            if (response.status == 200) {
                setNutrientName(response.data.nutrientName);
                setNatureID(response.data.natureID);
                setNeeded(response.data.needed);
                setFunction(response.data.function);
                setDescription(response.data.description);
                setExcessSigns(response.data.excessSigns);
                setDeficiencySigns(response.data.deficiencySigns);
                setShortagePrevention(response.data.shortagePrevention);
                setSubjectInterest(response.data.subjectInterest);
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

    async function addOrUpdateNutrient(nutrientId, accessToken) {
        // e.preventDefault();

        if (accessToken != null) {
            if (validateForm()) {
                const nutrient = {nutrientName, natureID, needed, function: nuFunction, description, excessSigns, deficiencySigns, shortagePrevention, subjectInterest}
                console.log(nutrient);

                if (nutrientId) {
                    await updateNutrientById(nutrientId, nutrient, accessToken).then((response) => {
                        if (response.status == 200) {
                            alert(`Updated nutrient have id is ${nutrientId} successfully!`);
                            navigator(`/nutrients/${nutrientId}`);
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
                    await addNutrient(nutrient, accessToken).then((response) => {
                        if (response.status == 200) {
                            alert(`Added nutrient successfully!`);
                            navigator(`/nutrients`);
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
        navigator("/nutrients");
    }

    // Validation function that checks the form data and returns validation errors
    function validateForm() {
        let valid = true;

        const errorCopy = {... errors};

        if (nutrientName.trim()) {
            errorCopy.nutrientName = '';
        } else {
            errorCopy.nutrientName = "Nutrient's name is requied!";
            valid = false;
        }

        if (needed) {
            errorCopy.needed = '';
        } else {
            errorCopy.needed = 'Needed is requied!';
            valid = false;
        }

        if (nuFunction.trim()) {
            errorCopy.nuFunction = '';
        } else {
            errorCopy.nuFunction = 'Function is requied!';
            valid = false;
        }

        setErrors(errorCopy);

        return valid;
    }

    function pageTitle() {
        if (nutrientId) {
          return <h2 className='fw-bold text-center text-success m-2 text-uppercase'>Cập nhật thông tin chất dinh dưỡng</h2>;
        }
        else {
          return <h2 className='fw-bold text-center text-success m-2 text-uppercase'>Thêm mới chất dinh dưỡng</h2>;
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
                            nutrientId ? 
                            <div className="form-group">
                                <label htmlFor="nutrientId"><b><i>ID</i></b></label>
                                <input type="int" className="form-control" name="nutrientId" id="nutrientId" value={nutrientId} disabled />
                            </div> : ``
                        }
                        <br />
                        <div className="form-group">
                            <label htmlFor="nutrientName"><b><i>Tên chất dinh dưỡng</i></b></label>
                            <input type="text" 
                            onChange={(e) => setNutrientName(e.target.value)}
                            className={`form-control ${ errors.nutrientName ? 'is-invalid' : '' }`} 
                            name="nutrientName" id="nutrientName" 
                            value={nutrientName} />
                            {/* Display validation errors */}
                            { errors.nutrientName && <div className='invalid-feedback'>{ errors.nutrientName }</div> }
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="description"><b><i>Mô tả</i></b></label>
                            <textarea type="text" className="form-control" 
                            onChange={(e) => setDescription(e.target.value)} 
                            name="description" id="description" 
                            value={description} />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="needed"><b><i>Mức tiêu thụ cần thiết</i></b></label>
                            <input type="text"
                            onChange={(e) => setNeeded(e.target.value)}
                            className={`form-control ${ errors.needed ? 'is-invalid' : '' }`} 
                            name="needed" id="needed" 
                            value={needed} />
                            {/* Display validation errors */}
                            { errors.needed && <div className='invalid-feedback'>{ errors.needed }</div> }
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="function"><b><i>Chức năng</i></b></label>
                            <textarea type="text" 
                            onChange={(e) => setFunction(e.target.value)}
                            className={`form-control ${ errors.nuFunction ? 'is-invalid' : '' }`} 
                            name="function" id="function" 
                            value={nuFunction} />
                            {/* Display validation errors */}
                            { errors.nuFunction && <div className='invalid-feedback'>{ errors.nuFunction }</div> }
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="excessSigns"><b><i>Dấu hiệu dư thừa</i></b></label>
                            <textarea type="text" className="form-control" 
                            onChange={(e) => setExcessSigns(e.target.value)} 
                            name="excessSigns" id="excessSigns" 
                            value={excessSigns} />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="deficiencySigns"><b><i>Dấu hiệu thiếu hụt</i></b></label>
                            <textarea type="text" className="form-control" 
                            onChange={(e) => setDeficiencySigns(e.target.value)} 
                            name="deficiencySigns" id="deficiencySigns" 
                            value={deficiencySigns} />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="shortagePrevention"><b><i>Ngăn ngừa thiếu hụt</i></b></label>
                            <textarea type="text" className="form-control" 
                            onChange={(e) => setShortagePrevention(e.target.value)} 
                            name="shortagePrevention" id="shortagePrevention" 
                            value={shortagePrevention} />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="subjectInterest"><b><i>Các đối tượng cần chú tâm</i></b></label>
                            <textarea type="text" className="form-control" 
                            onChange={(e) => setSubjectInterest(e.target.value)} 
                            name="subjectInterest" id="subjectInterest" 
                            value={subjectInterest} />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="natureID"><b><i>Chất dinh dưỡng tự nhiên</i></b></label>
                            <select className="form-select" value={natureID}
                                onChange={(e) => setNatureID(Number.parseInt(e.target.value))} name="natureID" id="natureID">
                                {
                                    natures.map(nature => 
                                        <option key={nature.natureID} value={nature.natureID}>
                                            {nature.natureName}
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
                            onClick={() => { addOrUpdateNutrient(nutrientId, accessToken) }}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        <FooterPage />
        </>
    )
}

export default NutrientComponent