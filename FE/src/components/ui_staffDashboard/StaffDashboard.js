import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CFormSelect } from "@coreui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fetchData from "../../util/ApiConnection";
import UserStorage from "../../util/UserStorage";
import { format } from 'date-fns';
import '../../customStyles.css'

const StaffDashboard = () => {
    const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
    const [token, setToken] = useState(userInfo.accessToken);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [stallId, setStallId] = useState("");
    const [data, setData] = useState(null);
    const [stallOptions, setStallOptions] = useState([]);

    const handleFetchData = async () => {
        const formattedStartDate = format(startDate, 'dd-MM-yyyy');
        const formattedEndDate = format(endDate, 'dd-MM-yyyy');

        const url = `http://localhost:8080/api/v1/staffs-dashboard/staff-dashboard/${formattedStartDate}/${formattedEndDate}/${stallId}`;
        const result = await fetchData(url, "GET", null, token);
        setData(result);
    };

    const loadStallData = async () => {
        try {
            const stallData = await fetchData(`http://localhost:8080/api/v1/stalls`, 'GET', null, userInfo.accessToken);
            if (stallData && stallData.payload) {
                setStallOptions(stallData.payload);
            } else {
                setStallOptions([]);
            }
        } catch (error) {
            setStallOptions([]); // Ensure stallOptions is cleared on error
        }
    };

    const handleStartDateChange = (date) => {
        if (date > endDate) {
            setEndDate(date);
        }
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        if (date < startDate) {
            setStartDate(date);
        }
        setEndDate(date);
    };

    useEffect(() => {
        loadStallData();
    }, []);

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader><strong>Staff Dashboard</strong></CCardHeader>
                    <CCardBody>
                        <CRow className="mb-3">
                            <CCol>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => handleStartDateChange(date)}
                                    dateFormat="yyyy-MM-dd"
                                    className="form-control"
                                    placeholderText="Select start date"
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => handleEndDateChange(date)}
                                    dateFormat="yyyy-MM-dd"
                                    className="form-control"
                                    placeholderText="Select end date"
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol>
                                <CFormSelect
                                    id="stallId"
                                    value={stallId}
                                    onChange={(e) => setStallId(e.target.value)}
                                    placeholder="Select Stall"
                                >
                                    <option value="">Select Stall</option>
                                    {stallOptions.map(stall => (
                                        <option key={stall.id} value={stall.id}>
                                            {stall.name}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                        </CRow>
                        <CButton className="custom-btn custom-btn-primary" color="primary" onClick={handleFetchData}>Get Data</CButton>
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol>
                {data && (
                    <CCard>
                        <CCardHeader>Dashboard Data</CCardHeader>
                        <CCardBody>
                            <CRow className="mb-3">
                                <CCol>Total Revenue: {data.totalRevenue}</CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CCol>Total Number of Sales: {data.totalNumberOfSales}</CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CCol>Total Stall Quantity: {data.totalStallQuantity}</CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CCol>Total Customers Served: {data.totalCustomersServed}</CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CCol>Daily Transaction Amount: {data.dailyTransactionAmount}</CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CCol>Daily Sales Quantity: {data.dailySalesQuantity}</CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                )}
            </CCol>
        </CRow>
    );
};

export default StaffDashboard;
