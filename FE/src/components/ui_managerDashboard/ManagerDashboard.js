import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CAlert } from '@coreui/react';
import { CChartBar, CChartDoughnut, CChartPie } from '@coreui/react-chartjs';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import fetchData from '../../util/ApiConnection';
import UserStorage from '../../util/UserStorage';
import { format } from 'date-fns';
import '../../customStyles.css'

const ManagerDashboard = () => {
};

export default ManagerDashboard;
