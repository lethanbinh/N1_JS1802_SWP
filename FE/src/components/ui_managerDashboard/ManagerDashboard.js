import React, { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import fetchData from '../../util/ApiConnection';
import UserStorage from '../../util/UserStorage';
import '../../customStyles.css'
import { getCurrentDateFormatted } from '../../util/DateConvert';

const ManagerDashboard = () => {
    const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
    const [dataStaff, setDataStaff] = useState([]);
    const [dataStall, setDataStall] = useState([]);

    const [staff, setStaff] = useState([])
    const [stall, setStall] = useState([])

    const [staffId, setStaffId] = useState(0)
    const [stallId, setStallId] = useState(0)

    const [startDate, setStartDate] = useState(getCurrentDateFormatted())
    const [endDate, setEndDate] = useState(getCurrentDateFormatted())

    const loadData = () => {
        fetchData('http://localhost:8080/api/v1/users', 'GET', null, userInfo.accessToken)
            .then(data => {
                setStaff(data.payload.filter(item => item.roleName.toUpperCase() === 'STAFF'));
            });

        fetchData(`http://localhost:8080/api/v1/stalls`, 'GET', null, userInfo.accessToken)
            .then(data => {
                setStall(data.payload)
            })

        fetchData(`http://localhost:8080/api/v1/manager-dashboard/manager-dashboard/staff?staffId=${staffId}&startDate=${startDate}&endDate=${endDate}`, 'GET', null, userInfo)
            .then(data => {
                setDataStaff(data.payload)
            })

        fetchData(`http://localhost:8080/api/v1/manager-dashboard/manager-dashboard/stall?stallId=${stallId}&startDate=${startDate}&endDate=${endDate}`, 'GET', null, userInfo)
            .then(data => {
                setDataStall(data.payload)
            })
    };

    useEffect(() => {
        loadData()
    }, [])

    return <>

    </>
};

export default ManagerDashboard;
