import React, { useEffect, useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CWidgetStatsA,
    CWidgetStatsB,
    CWidgetStatsC,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CProgress,
    CBadge,
    CWidgetStatsE,
    CTooltip,
    CCardGroup
} from "@coreui/react";
import { CChartLine, CChartDoughnut, CChartBar, CChartRadar } from "@coreui/react-chartjs";
import fetchData from '../../util/ApiConnection';
import UserStorage from '../../util/UserStorage';
import '../../customStyles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const ManagerDashboard = () => {
    const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
    const [dataStaff, setDataStaff] = useState([]);
    const [dataStall, setDataStall] = useState([]);
    const [staff, setStaff] = useState([]);
    const [stall, setStall] = useState([]);
    const [staffId, setStaffId] = useState(2);
    const [stallId, setStallId] = useState(1);
    const [startDate, setStartDate] = useState(new Date("2024-07-09"));
    const [endDate, setEndDate] = useState(new Date("2024-07-11"));

    const loadData = () => {
        const formattedStartDate = format(startDate, 'dd-MM-yyyy');
        const formattedEndDate = format(endDate, 'dd-MM-yyyy');

        fetchData('http://localhost:8080/api/v1/users', 'GET', null, userInfo.accessToken)
            .then(data => {
                setStaff(data.payload.filter(item => item.roleName.toUpperCase() === 'STAFF'));
            });

        fetchData(`http://localhost:8080/api/v1/stalls`, 'GET', null, userInfo.accessToken)
            .then(data => {
                setStall(data.payload);
            });

        fetchData(`http://localhost:8080/api/v1/manager-dashboard/manager-dashboard/staff?staffId=${staffId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`, 'GET', null, userInfo.accessToken)
            .then(data => {
                console.log(data);
                setDataStaff(data);
            });

        fetchData(`http://localhost:8080/api/v1/manager-dashboard/manager-dashboard/stall?stallId=${stallId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`, 'GET', null, userInfo.accessToken)
            .then(data => {
                console.log(data);
                setDataStall(data);
            });
    };

    useEffect(() => {
        loadData();
    }, [staffId, stallId, startDate, endDate]);

    const aggregateData = (data) => {
        if (!data || data.length === 0) return {};

        return data.reduce((acc, curr) => {
            Object.keys(curr).forEach(key => {
                if (typeof curr[key] === 'number') {
                    acc[key] = (acc[key] || 0) + curr[key];
                } else {
                    acc[key] = curr[key];
                }
            });
            return acc;
        }, {});
    };

    const aggregatedStaffData = aggregateData(dataStaff);
    const aggregatedStallData = aggregateData(dataStall);

    return (
        <div className="dashboard-container">
            <CRow className="mb-4">
                <CCol sm="6">
                    <CInputGroup>
                        <CInputGroupText>Start Date</CInputGroupText>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd-MM-yyyy"
                            className="form-control"
                        />
                    </CInputGroup>
                </CCol>
                <CCol sm="6">
                    <CInputGroup>
                        <CInputGroupText>End Date</CInputGroupText>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="dd-MM-yyyy"
                            className="form-control"
                        />
                    </CInputGroup>
                </CCol>
            </CRow>
            <CRow>
                <CCol sm="6">
                    <CCard className="modern-card">
                        <CCardHeader>
                            <div className="card-header-content">
                                <span>Staff Dashboard</span>
                                <CFormSelect
                                    aria-label="Select Staff"
                                    onChange={(e) => setStaffId(e.target.value)}
                                    className="select-input"
                                >
                                    {staff.map(s => (
                                        <option key={s.id} value={s.id}>{s.fullName}</option>
                                    ))}
                                </CFormSelect>
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            {dataStaff.length > 0 ? (
                                <div>
                                    <CRow className="mb-4">
                                        <CCol sm="12" className="chart-container">
                                            <CChartBar
                                                data={{
                                                    labels: ["Purchase", "Sales", "Return"],
                                                    datasets: [
                                                        {
                                                            label: "Revenue",
                                                            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
                                                            data: [
                                                                aggregatedStaffData.purchaseInvoiceRevenue,
                                                                aggregatedStaffData.salesInvoiceRevenue,
                                                                aggregatedStaffData.returnInvoiceRevenue,
                                                            ],
                                                        },
                                                    ],
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                }}
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CCol sm="12" className="chart-container">
                                            <CChartRadar
                                                data={{
                                                    labels: [
                                                        "Purchase Quantity",
                                                        "Sales Quantity",
                                                        "Return Quantity",
                                                    ],
                                                    datasets: [
                                                        {
                                                            label: "Product Quantities",
                                                            backgroundColor: "rgba(75,192,192,0.2)",
                                                            borderColor: "rgba(75,192,192,1)",
                                                            pointBackgroundColor: "rgba(75,192,192,1)",
                                                            pointBorderColor: "#fff",
                                                            data: [
                                                                aggregatedStaffData.purchaseInvoiceProductQuantity,
                                                                aggregatedStaffData.salesInvoiceProductQuantity,
                                                                aggregatedStaffData.returnInvoiceProductQuantity,
                                                            ],
                                                        },
                                                    ],
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                }}
                                            />
                                        </CCol>
                                    </CRow>
                                    <CCardGroup className="mb-4">
                                        <CWidgetStatsA
                                            color="primary"
                                            value={aggregatedStaffData.totalCustomersTransacted?.toString() || '0'}
                                            title="Total Customers"
                                            action={
                                                <CTooltip content="Number of unique customers who made transactions">
                                                    <CBadge color="info" shape="pill">Info</CBadge>
                                                </CTooltip>
                                            }
                                        />
                                        <CWidgetStatsA
                                            color="success"
                                            value={aggregatedStaffData.totalInvoicesCreated?.toString() || '0'}
                                            title="Invoices Created"
                                            action={
                                                <CTooltip content="Total number of invoices created">
                                                    <CBadge color="info" shape="pill">Info</CBadge>
                                                </CTooltip>
                                            }
                                        />
                                    </CCardGroup>
                                    <CCardGroup className="mb-4">
                                        <CWidgetStatsB
                                            color="info"
                                            inverse
                                            value={aggregatedStaffData.totalBonusPointsAdded?.toString() || '0'}
                                            title="Bonus Points"
                                            action={
                                                <CTooltip content="Total bonus points added">
                                                    <CBadge color="info" shape="pill">Info</CBadge>
                                                </CTooltip>
                                            }
                                        />
                                        <CWidgetStatsB
                                            color="warning"
                                            inverse
                                            value={aggregatedStaffData.totalProductsInStockEndOfDay?.toString() || '0'}
                                            title="End of Day Stock"
                                            action={
                                                <CTooltip content="Total products in stock at the end of the day">
                                                    <CBadge color="info" shape="pill">Info</CBadge>
                                                </CTooltip>
                                            }
                                        />
                                    </CCardGroup>
                                    <CRow className="mb-4">
                                        <CCol sm="12">
                                            <CProgress
                                                className="mb-3"
                                                value={aggregatedStaffData.totalInvoicesCompleted / aggregatedStaffData.totalInvoicesCreated * 100 || 0}
                                                color="success"
                                                animated
                                                striped
                                            >
                                                {`Completed Invoices: ${aggregatedStaffData.totalInvoicesCompleted || 0} / ${aggregatedStaffData.totalInvoicesCreated || 0}`}
                                            </CProgress>
                                        </CCol>
                                    </CRow>
                                    <CTable hover>
                                        <CTableHead>
                                            <CTableRow>
                                                <CTableHeaderCell>Metric</CTableHeaderCell>
                                                <CTableHeaderCell>Value</CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            <CTableRow>
                                                <CTableDataCell>Total Returned Products</CTableDataCell>
                                                <CTableDataCell>{aggregatedStaffData.totalReturnedProducts}</CTableDataCell>
                                            </CTableRow>
                                            <CTableRow>
                                                <CTableDataCell>Best Selling Product</CTableDataCell>
                                                <CTableDataCell>{aggregatedStaffData.bestSellingProduct}</CTableDataCell>
                                            </CTableRow>
                                            <CTableRow>
                                                <CTableDataCell>Best Selling Product Quantity</CTableDataCell>
                                                <CTableDataCell>{aggregatedStaffData.bestSellingProductQuantity}</CTableDataCell>
                                            </CTableRow>
                                            <CTableRow>
                                                <CTableDataCell>Most Stocked Product</CTableDataCell>
                                                <CTableDataCell>{aggregatedStaffData.mostStockedProduct}</CTableDataCell>
                                            </CTableRow>
                                            <CTableRow>
                                                <CTableDataCell>Most Stocked Product Quantity</CTableDataCell>
                                                <CTableDataCell>{aggregatedStaffData.mostStockedProductQuantity}</CTableDataCell>
                                            </CTableRow>
                                            <CTableRow>
                                                <CTableDataCell>Total Discount Amount</CTableDataCell>
                                                <CTableDataCell>{aggregatedStaffData.totalDiscountAmount}</CTableDataCell>
                                            </CTableRow>
                                        </CTableBody>
                                    </CTable>
                                </div>
                            ) : (
                                <p>No data available for the selected staff and date range.</p>
                            )}
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol sm="6">
                    <CCard className="modern-card">
                        <CCardHeader>
                            <div className="card-header-content">
                                <span>Stall Dashboard</span>
                                <CFormSelect
                                    aria-label="Select Stall"
                                    onChange={(e) => setStallId(e.target.value)}
                                    className="select-input"
                                >
                                    {stall.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </CFormSelect>
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            {dataStall.length > 0 ? (
                                <div>
                                    <CRow className="mb-4">
                                        <CCol sm="12" className="chart-container">
                                            <CChartBar
                                                data={{
                                                    labels: ["Purchase", "Sales", "Return"],
                                                    datasets: [
                                                        {
                                                            label: "Revenue",
                                                            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
                                                            data: [
                                                                aggregatedStallData.purchaseInvoiceRevenue,
                                                                aggregatedStallData.salesInvoiceRevenue,
                                                                aggregatedStallData.returnInvoiceRevenue,
                                                            ],
                                                        },
                                                    ],
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                }}
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-4">
                                        <CCol sm="12" className="chart-container">
                                            <CChartRadar
                                                data={{
                                                    labels: [
                                                        "Purchase Quantity",
                                                        "Sales Quantity",
                                                        "Return Quantity",
                                                    ],
                                                    datasets: [
                                                        {
                                                            label: "Product Quantities",
                                                            backgroundColor: "rgba(75,192,192,0.2)",
                                                            borderColor: "rgba(75,192,192,1)",
                                                            pointBackgroundColor: "rgba(75,192,192,1)",
                                                            pointBorderColor: "#fff",
                                                            data: [
                                                                aggregatedStallData.purchaseInvoiceProductQuantity,
                                                                aggregatedStallData.salesInvoiceProductQuantity,
                                                                aggregatedStallData.returnInvoiceProductQuantity,
                                                            ],
                                                        },
                                                    ],
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                }}
                                            />
                                        </CCol>
                                    </CRow>
                                    <CCardGroup className="mb-4">
                                        <CWidgetStatsA
                                            color="primary"
                                            value={aggregatedStallData.totalCustomersTransacted?.toString() || '0'}
                                            title="Total Customers"
                                            action={
                                                <CTooltip content="Number of unique customers who made transactions">
                                                    <CBadge color="info" shape="pill">Info</CBadge>
                                                </CTooltip>
                                            }
                                        />
                                        <CWidgetStatsA
                                            color="success"
                                            value={aggregatedStallData.totalInvoicesCreated?.toString() || '0'}
                                            title="Invoices Created"
                                            action={
                                                <CTooltip content="Total number of invoices created">
                                                    <CBadge color="info" shape="pill">Info</CBadge>
                                                </CTooltip>
                                            }
                                        />
                                    </CCardGroup>
                                    <CCardGroup className="mb-4">
                                        <CWidgetStatsB
                                            color="info"
                                            inverse
                                            value={aggregatedStallData.totalBonusPointsAdded?.toString() || '0'}
                                            title="Bonus Points"
                                            action={
                                                <CTooltip content="Total bonus points added">
                                                    <CBadge color="info" shape="pill">Info</CBadge>
                                                </CTooltip>
                                            }
                                        />
                                        <CWidgetStatsB
                                            color="warning"
                                            inverse
                                            value={aggregatedStallData.totalProductsInStockEndOfDay?.toString() || '0'}
                                            title="End of Day Stock"
                                            action={
                                                <CTooltip content="Total products in stock at the end of the day">
                                                    <CBadge color="info" shape="pill">Info</CBadge>
                                                </CTooltip>
                                            }
                                        />
                                    </CCardGroup>
                                    <CRow className="mb-4">
                                        <CCol sm="12">
                                            <CProgress
                                                className="mb-3"
                                                value={aggregatedStallData.totalInvoicesCompleted / aggregatedStallData.totalInvoicesCreated * 100 || 0}
                                                color="success"
                                                animated
                                                striped
                                            >
                                                {`Completed Invoices: ${aggregatedStallData.totalInvoicesCompleted || 0} / ${aggregatedStallData.totalInvoicesCreated || 0}`}
                                            </CProgress>
                                        </CCol>
                                    </CRow>
                                    <CTable hover>
                                        <CTableHead>
                                            <CTableRow>
                                                <CTableHeaderCell>Metric</CTableHeaderCell>
                                                <CTableHeaderCell>Value</CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            <CTableRow>
                                                <CTableDataCell>Total Returned Products</CTableDataCell>
                                                <CTableDataCell>{aggregatedStallData.totalReturnedProducts}</CTableDataCell>
                                            </CTableRow>
                                            <CTableRow>
                                                <CTableDataCell>Best Selling Product</CTableDataCell>
                                                <CTableDataCell>{aggregatedStallData.bestSellingProduct}</CTableDataCell>
                                            </CTableRow>
                                            <CTableRow>
                                                <CTableDataCell>Best Selling Product Quantity</CTableDataCell>
                                                <CTableDataCell>{aggregatedStallData.bestSellingProductQuantity}</CTableDataCell>
                                            </CTableRow>
                                            <CTableRow>
                                                <CTableDataCell>Most Stocked Product</CTableDataCell>
                                                <CTableDataCell>{aggregatedStallData.mostStockedProduct}</CTableDataCell>
                                            </CTableRow>
                                            <CTableRow>
                                                <CTableDataCell>Most Stocked Product Quantity</CTableDataCell>
                                                <CTableDataCell>{aggregatedStallData.mostStockedProductQuantity}</CTableDataCell>
                                            </CTableRow>
                                            <CTableRow>
                                                <CTableDataCell>Total Discount Amount</CTableDataCell>
                                                <CTableDataCell>{aggregatedStallData.totalDiscountAmount}</CTableDataCell>
                                            </CTableRow>
                                        </CTableBody>
                                    </CTable>
                                </div>
                            ) : (
                                <p>No data available for the selected stall and date range.</p>
                            )}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    );
};

export default ManagerDashboard;

const styles = `
.dashboard-container {
  background-color: #f0f2f5;
  padding: 20px;
}
.modern-card {
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.card-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.select-input {
  margin-left: 10px;
  width: 200px;
}
.chart-container {
  width: 100%;
  height: 300px;
}
.chart-container canvas {
  width: 100%;
  height: 300px;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
