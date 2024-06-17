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

const GeneralInfoForm = () => {
    const [birthday, setBirthday] = useState("");
    const [avatar, setAvatar] = useState("");
    const [username, setUsername] = useState("");
    const [data, setData] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [formData, setFormData] = useState({});
    const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
    const [visible, setVisible] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchData(`http://localhost:8080/api/v1/profile/id/${userInfo.id}`, "GET", null, userInfo.accessToken)
            .then((response) => {
                console.log("Profile data fetched successfully:", response);
                if (response.payload) {
                    const profileData = response.payload;
                    setData(profileData);
                    setFormData(profileData);
                    setBirthday(profileData.birthday); // assuming birthday is part of profile data
                    if (profileData.avatar) {
                        setAvatar(profileData.avatar);
                    }
                }
            })
            .catch((error) => {
                console.error("Error fetching profile data:", error);
            });
    }, [userInfo]);

    const handleEdit = (id) => {
        setEditingRow(id);
        setFormData(data.find((row) => row.id === id));
    };

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

    const handleSave = (event) => {
        event.preventDefault();
    
        // Prepare updated data from form state
        const updatedData = {
            username: formData.username || "", // Ensure these fields are correctly mapped to your form state
            address: formData.address || "",
            fullName: formData.fullName || "",
            birthday: formData.birthday || "",
            gender: formData.gender || "0", // Assuming "0" is the default value for gender
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
            avatar: updatedData.avatar || " ", // Default value
            birthday: convertDateToJavaFormat(updatedData.birthday) || "2024-06-16T08:48:44.695Z", // Default date
        };
    
        // Assuming you have a function to upload the avatar file
        if (updatedData.avatar instanceof File) {
            const formDataToUpload = new FormData();
            formDataToUpload.append("file", updatedData.avatar);
    
            fetchData(`http://localhost:8080/api/v1/images/upload`, "POST", formDataToUpload, userInfo.accessToken)
                .then((response) => {
                    savedData.avatar = response.fileName; // Update avatar field with the file name from the response
                    return fetchData(`http://localhost:8080/api/v1/profile/id/${userInfo.id}`, "PUT", savedData, userInfo.accessToken);
                })
                .then((data) => {
                    console.log("Profile updated successfully:", data);
                    // Optionally, you may want to refresh the data after update
                    // refreshData();
                })
                .catch((error) => {
                    console.error("Error updating profile:", error);
                });
        } else {
            fetchData(`http://localhost:8080/api/v1/profile/id/${userInfo.id}`, "PUT", savedData, userInfo.accessToken)
                .then((data) => {
                    console.log("Profile updated successfully:", data);
                    // Optionally, you may want to refresh the data after update
                    // refreshData();
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
                                <CFormInput required type="file" id="avatar" name="avatar" onChange={handleAvatarChange} />
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
                                    required
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
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Enter your first name"
                                    value={formData.fullName || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </CCol>
                    </CRow>
                    <CRow className="align-items-center">
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
                        <CCol md={6} className="mb-3">
                            <div className="form-group">
                                <label htmlFor="gender">
                                    <strong>Gender</strong>
                                </label>
                                <CFormSelect
                                    id="gender"
                                    name="gender"
                                    value={formData.gender || "0"}
                                    onChange={handleInputChange}
                                >
                                    <option value="0">Gender</option>
                                    <option value="1">Female</option>
                                    <option value="2">Male</option>
                                </CFormSelect>
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
                        </CCol>
                    </CRow>
                    <div className="mt-3">
                        <CButton color="primary" type="submit" >
                            Save All
                        </CButton>
                    </div>
                </form>
            </CCardBody>
        </CCard>
    );
};

export default GeneralInfoForm;
