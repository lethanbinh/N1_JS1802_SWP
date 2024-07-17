import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CRow,
} from "@coreui/react";
import UserStorage from "../../util/UserStorage";
import convertDateToJavaFormat, { convertToJavaDateUtil } from "../../util/DateConvert";
import fetchData from "../../util/ApiConnection";
import '../../customStyles.css';

const GeneralInfoForm = () => {
    const [birthday, setBirthday] = useState("");
    const [avatar, setAvatar] = useState("");
    const [data, setData] = useState({});
    const [formData, setFormData] = useState({});
    const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [errorPhone, setErrorPhone] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        fetchData(`http://localhost:8080/api/v1/profile/id/${userInfo.id}`, "GET", null, userInfo.accessToken)
            .then((response) => {
                if (response.payload) {
                    const profileData = response.payload;
                    setData(profileData);
                    setFormData(profileData);
                    setBirthday(profileData.birthday);
                    setAvatar(profileData.avatar);
                }
            })
            .catch((error) => {
                console.error("Error fetching profile data:", error);
            });

        loadListUser();
    }, []);

    function getImageIdFromUrl(url) {
        const parts = url.split('/images/');
        if (parts.length > 1) {
            return parts[1];
        } else {
            return null;
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
            setFormData({ ...formData, avatar: file });
        }
    };

    const loadListUser = async () => {
        try {
            const listUserData = await fetchData(`http://localhost:8080/api/v1/users`, "GET", null, userInfo.accessToken);
            if (listUserData && listUserData.payload) {
                setListUser(listUserData.payload);
            } else {
                setListUser([]);
            }
        } catch (error) {
            console.error("Error fetching list user:", error);
        }
    };

    const handleSave = (event) => {
        event.preventDefault();

        const updatedData = {
            username: formData.username || "",
            address: formData.address || "",
            fullName: formData.fullName || "",
            birthday: birthday || "",
            email: formData.email || "",
            phone: formData.phone || "",
            avatar: formData.avatar || "",
        };

        const savedData = {
            username: updatedData.username,
            phone: updatedData.phone || "0374422448",
            email: updatedData.email || "string",
            address: updatedData.address || "string",
            avatar: updatedData.avatar || "",
            fullName: updatedData.fullName,
            birthday: convertToJavaDateUtil(updatedData.birthday) || "2024-06-16T08:48:44.695Z",
        };

        const today = new Date();
        if (new Date(updatedData.birthday) > today) {
            setError("Birthday cannot be in the future");
            setMessage("");
            return;
        }

        const duplicatePhone = listUser.some(row => row.phone === formData.phone && row.id !== data.id);
        const duplicateEmail = listUser.some(row => row.email === formData.email && row.id !== data.id);

        if (duplicatePhone && duplicateEmail) {
            setErrorPhone("Phone number already exists. Please use a unique phone number.");
            setErrorEmail("Email already exists. Please use a unique email.");
            setError("Update failed");
            setMessage("");
            return;
        } else if (duplicatePhone && !duplicateEmail) {
            setErrorPhone("Phone number already exists. Please use a unique phone number.");
            setErrorEmail("");
            setError("Update failed");
            setMessage("");
            return;
        } else if (duplicateEmail) {
            setErrorEmail("Email already exists. Please use a unique email.");
            setErrorPhone("");
            setError("Update failed");
            setMessage("");
            return;
        } else {
            setErrorPhone("");
            setErrorEmail("");
            setError("");
        }

        if (updatedData.avatar instanceof File) {
            const formDataToUpload = new FormData();
            formDataToUpload.append("image", updatedData.avatar);
            fetchData(`http://localhost:8080/api/v1/images`, "POST", formDataToUpload, null, "multipart/form-data")
                .then((response) => {
                    savedData.avatar = response.payload.name;
                    return fetchData(`http://localhost:8080/api/v1/profile/id/${userInfo.id}`, "PUT", savedData, userInfo.accessToken);
                })
                .then((data) => {
                    if (data.status === "SUCCESS") {
                        setMessage("Update successfully");
                        setError("");
                    } else {
                        setMessage("");
                        setError("Update failed");
                    }
                })
                .catch(error => console.log(error));
        } else {
            if (savedData.avatar) {
                if (savedData.avatar.includes("http://localhost:8080/api/v1/images/")) {
                    savedData.avatar = getImageIdFromUrl(savedData.avatar)
                }
            }
            
            fetchData(`http://localhost:8080/api/v1/profile/id/${userInfo.id}`, "PUT", savedData, userInfo.accessToken)
                .then((data) => {
                    if (data.status === "SUCCESS") {
                        setMessage("Update successfully");
                        setError("");
                    } else {
                        setMessage("");
                        setError("Update failed");
                    }
                })
                .catch((error) => {
                    console.error("Error updating profile:", error);
                });
        }
    };

    return (
        <CRow className="m-0">
            <CCol xs={12}>
                <CCard className="mb-4 border-0 shadow-sm">
                    <CCardHeader className="bg-light text-dark">
                        <strong>Profile</strong>
                    </CCardHeader>
                    <CCardBody>
                        <form onSubmit={handleSave}>
                            <CRow className="align-items-center">
                                <CCol md={6} className="mb-3">
                                    <div className="form-group">
                                        {avatar && <img src={avatar} alt="Avatar" style={{ width: '100px', height: '100px' }} />}
                                        <CFormInput type="file" id="avatar" name="avatar" onChange={handleAvatarChange} style={{ border: '1px solid #adb5bd' }} />
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol md={6} className="mb-3">
                                    <div className="form-group">
                                        <label htmlFor="username">
                                            <strong>Username</strong>
                                        </label>
                                        <CFormInput
                                            disabled
                                            type="text"
                                            id="username"
                                            name="username"
                                            placeholder="Enter your username"
                                            value={formData.username || ""}
                                            onChange={handleInputChange}
                                            style={{ border: '1px solid #adb5bd' }}
                                        />
                                    </div>
                                </CCol>
                                <CCol md={6} className="mb-3">
                                    <div className="form-group">
                                        <label htmlFor="address">
                                            <strong>Address</strong>
                                        </label>
                                        <CFormInput
                                            required
                                            type="text"
                                            id="address"
                                            name="address"
                                            placeholder="Enter your address"
                                            value={formData.address || ""}
                                            onChange={handleInputChange}
                                            style={{ border: '1px solid #adb5bd' }}
                                        />
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol md={6} className="mb-3">
                                    <div className="form-group">
                                        <label htmlFor="fullName">
                                            <strong>Full Name</strong>
                                        </label>
                                        <CFormInput
                                            required
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            placeholder="Enter your full name"
                                            value={formData.fullName || ""}
                                            onChange={handleInputChange}
                                            style={{ border: '1px solid #adb5bd' }}
                                        />
                                    </div>
                                </CCol>
                                <CCol md={6} className="mb-3">
                                    <div className="form-group">
                                        <label htmlFor="birthday" style={{ display: "block" }}>
                                            <strong>Birthday</strong>
                                        </label>
                                        <DatePicker
                                            selected={birthday}
                                            onChange={date => {
                                                setBirthday(date);
                                                setFormData({ ...formData, birthday: date });
                                            }}
                                            dateFormat="dd-MM-yyyy"
                                            className="form-control"
                                            wrapperClassName="w-100"
                                            style={{
                                                width: '100%',
                                                border: '1px solid #adb5bd',
                                                padding: '0.375rem 0.75rem',
                                                borderRadius: '0.25rem'
                                            }}
                                        />
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol md={6} className="mb-3">
                                    <div className="form-group">
                                        <label htmlFor="email">
                                            <strong>Email</strong>
                                        </label>
                                        <CFormInput
                                            required
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="name@company.com"
                                            value={formData.email || ""}
                                            onChange={handleInputChange}
                                            style={{ border: '1px solid #adb5bd' }}
                                        />
                                    </div>
                                    <div style={{ color: 'red' }} className='error-email'>{errorEmail}</div>
                                </CCol>
                                <CCol md={6} className="mb-3">
                                    <div className="form-group">
                                        <label htmlFor="phone">
                                            <strong>Phone</strong>
                                        </label>
                                        <CFormInput
                                            required
                                            type="number"
                                            id="phone"
                                            name="phone"
                                            placeholder="+12-345 678 910"
                                            value={formData.phone || ""}
                                            onChange={handleInputChange}
                                            style={{ border: '1px solid #adb5bd' }}
                                        />
                                    </div>
                                    <div style={{ color: 'red' }} className='error-phone'>{errorPhone}</div>
                                </CCol>
                            </CRow>
                            <div className="mt-3">
                                <CButton className="custom-btn custom-btn-primary" color="primary" type="submit">
                                    Save All
                                </CButton>

                                <div style={{ color: 'green' }} className='message'>{message}</div>
                                <div style={{ color: 'red' }} className='error'>{error}</div>
                            </div>
                        </form>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default GeneralInfoForm;
