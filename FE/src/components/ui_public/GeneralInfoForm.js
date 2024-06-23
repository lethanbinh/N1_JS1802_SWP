import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormSelect,
    CRow,
    CInputGroup,
    CInputGroupText,
} from "@coreui/react";
import UserStorage from "../../util/UserStorage";
import convertDateToJavaFormat from "../../util/DateConvert";
import fetchData from "../../util/ApiConnection";
import '../../customStyles.css'

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
                console.log("Profile data fetched successfully:", response);
                if (response.payload) {
                    const profileData = response.payload;
                    setData(profileData);
                    setFormData(profileData);
                    setBirthday(profileData.birthday); // assuming birthday is part of profile data
                    setAvatar(profileData.avatar);
                }
            })
            .catch((error) => {
                console.error("Error fetching profile data:", error);
            });

        loadListUser();
    }, [userInfo]);

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

        // Prepare updated data from form state
        const updatedData = {
            username: formData.username || "", // Ensure these fields are correctly mapped to your form state
            address: formData.address || "",
            fullName: formData.fullName || "",
            birthday: formData.birthday || "",
            email: formData.email || "",
            phone: formData.phone || "",
            avatar: formData.avatar || null, // Handle avatar separately if updated
        };

        // Assuming you have a function to convert the data to the correct format
        const savedData = {
            username: updatedData.username,
            phone: updatedData.phone || "0374422448", // Using default phone if not provided
            email: updatedData.email || "string",
            address: updatedData.address || "string",
            avatar: updatedData.avatar || " ",
            fullName: updatedData.fullName,
            birthday: convertDateToJavaFormat(updatedData.birthday) || "2024-06-16T08:48:44.695Z", // Default date
        };

        // Check for duplicate phone and email
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
            setErrorEmail(""); // Clear email error if no email conflict
            setError("Update failed");
            setMessage("");
            return;
        } else if (duplicateEmail) {
            setErrorEmail("Email already exists. Please use a unique email.");
            setErrorPhone(""); // Clear phone error if no phone conflict
            setError("Update failed");
            setMessage("");
            return;
        } else {
            setErrorPhone("");
            setErrorEmail("");
            setError("");
        }

        // Assuming you have a function to upload the avatar file
        if (updatedData.avatar instanceof File) {
            const formDataToUpload = new FormData();
            formDataToUpload.append("image", updatedData.avatar); // Ensure the field name matches the API requirement
            console.log(formDataToUpload.get("image"));
            fetchData(`http://localhost:8080/api/v1/images`, "POST", formDataToUpload, null, "multipart/form-data")
                .then((response) => {
                    console.log(response);
                    savedData.avatar = response.payload.name; // Update avatar field with the file name from the response
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
        <CCard className="mb-4">
            <CCardHeader>
                <strong>Profile</strong>
            </CCardHeader>
            <CCardBody>
                <form onSubmit={handleSave}>
                    <CRow className="align-items-center">
                        <CCol md={6} className="mb-3">
                            <div className="form-group">
                                {avatar && <img src={avatar} alt="Avatar" style={{ width: '100px', height: '100px' }} />}
                                <CFormInput type="file" id="avatar" name="avatar" onChange={handleAvatarChange} />
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
                                />
                            </div>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol md={6} className="mb-3">
                            <div className="form-group">
                                <label htmlFor="firstName">
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
                                />
                            </div>
                        </CCol>
                        <CCol md={6} className="mb-3">
                            <div className="form-group">
                                <label htmlFor="birthday">
                                    <strong>Birthday</strong>
                                </label>
                                <Datetime
                                    timeFormat={false}
                                    onChange={(date) => setBirthday(date)}
                                    renderInput={(props, openCalendar) => (
                                        <CInputGroup>
                                            <CInputGroupText>
                                                <FontAwesomeIcon icon={faCalendarAlt} />
                                            </CInputGroupText>
                                            <CFormInput
                                                required
                                                type="text"
                                                value={birthday ? moment(birthday).format("MM/DD/YYYY") : ""}
                                                placeholder="mm/dd/yyyy"
                                                onFocus={openCalendar}
                                                onChange={() => { }}
                                            />
                                        </CInputGroup>
                                    )}
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
                                />
                            </div>
                            <div style={{ color: 'red' }} className='error-phone'>{errorPhone}</div>
                        </CCol>
                    </CRow>
                    <div className="mt-3">
                        <CButton className=" custom-btn custom-btn-primary" color="primary" type="submit" >
                            Save All
                        </CButton>

                        <div style={{ color: 'green' }} className='message'>{message}</div>
                        <div style={{ color: 'red' }} className='error'>{error}</div>
                    </div>
                </form>
            </CCardBody>
        </CCard>
    );
};

export default GeneralInfoForm;
