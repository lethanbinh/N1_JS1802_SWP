import React, { useState, useEffect } from "react";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CProgress,
    CWidgetStatsA
} from "@coreui/react";
import { CChartBar, CChartPie } from "@coreui/react-chartjs";
import fetchData from "../../util/ApiConnection";
import UserStorage from "../../util/UserStorage";
import { getCurrentDateFormatted } from "../../util/DateConvert";
import "../../customStyles.css";
import CIcon from "@coreui/icons-react";
import { cilWarning } from "@coreui/icons";
import { format } from 'date-fns';

const StaffDashboard = () => {
    const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
    const [data, setData] = useState({});
    const [modal, setModal] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [successModal, setSuccessModal] = useState(false);

    const isEmptyObject = (obj) => {
        return Object.keys(obj).length === 0;
    };

    const loadData = () => {
        fetchData(
            `http://localhost:8080/api/v1/users/id/${userInfo.id}`,
            "GET",
            null,
            userInfo.accessToken
        ).then((user) => {
            fetchData(
                `http://localhost:8080/api/v1/staff-dashboard/staff-dashboard-daily?stallId=${user.payload.stallId}&date=${getCurrentDateFormatted()}`,
                "GET",
                null,
                userInfo.accessToken
            ).then((dashboard) => {
                fetchData(`http://localhost:8080/api/v1/staff-dashboard/check-dashboard-daily?staffId=${userInfo.id}&date=${getCurrentDateFormatted()}`, 'GET', null, userInfo.accessToken)
                    .then(data => {
                        setConfirmed(data)
                        if (data) {
                            console.log(data)
                            fetchData(`http://localhost:8080/api/v1/staff-dashboard/staff-dashboard-checked?stallId=${user.payload.stallId}&date=${getCurrentDateFormatted()}`, 'GET', null, userInfo.accessToken)
                                .then(checkData => {
                                    console.log(checkData)
                                    if (!isEmptyObject(checkData)) {
                                        setData(checkData)
                                    }
                                })
                        } else {
                            if (dashboard.length > 0) {
                                setData(dashboard[0]);
                            }
                        }
                    })
            });
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleExit = () => {
        setModal(false);
    };

    const handleOpen = () => {
        setModal(true);
    }

    const confirmAction = () => {
        fetchData(`http://localhost:8080/api/v1/staff-dashboard/staff-dashboard-daily`, 'POST', data, userInfo.accessToken)
            .then(() => {
                loadData();
                setSuccessModal(true);
            });
        setModal(false);
    };

    const handleSuccessExit = () => {
        setSuccessModal(false);
    };

    return (
        <CRow>
            <CCol xs="12">
                {isEmptyObject(data) ? (
                    <CCard className="text-center">
                        <CCardBody className="d-flex flex-column align-items-center">
                            <CIcon icon={cilWarning} size="5xl" className="mb-3 text-warning" />
                            <h4>No data today</h4>
                            <p>Please check back later or contact support for more information.</p>
                        </CCardBody>
                    </CCard>
                ) : (
                    <CCard>
                        <CCardHeader>Staff Dashboard - {format(data.date, 'dd-MM-yyyy')}</CCardHeader>
                        <CCardBody>
                            <CRow className="mb-4">
                                <CCol sm="12" className="chart-container">
                                    <CChartBar
                                        data={{
                                            labels: ["Purchase", "Sales", "Return"],
                                            datasets: [
                                                {
                                                    label: "Revenue",
                                                    backgroundColor: ["#f87979", "#4bc0c0", "#36a2eb"],
                                                    data: [
                                                        data.purchaseInvoiceRevenue,
                                                        data.salesInvoiceRevenue,
                                                        data.returnInvoiceRevenue,
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
                                <CCol sm="12" className="chart-container">
                                    <CChartPie
                                        data={{
                                            labels: [
                                                "Purchase Quantity",
                                                "Sales Quantity",
                                                "Return Quantity",
                                            ],
                                            datasets: [
                                                {
                                                    data: [
                                                        data.purchaseInvoiceProductQuantity,
                                                        data.salesInvoiceProductQuantity,
                                                        data.returnInvoiceProductQuantity,
                                                    ],
                                                    backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
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
                                <CCol sm="6">
                                    <CWidgetStatsA
                                        className="mb-4"
                                        color="info"
                                        value={data.totalCustomersTransacted}
                                        title="Total Customers Transacted"
                                    />
                                </CCol>
                                <CCol sm="6">
                                    <CWidgetStatsA
                                        className="mb-4"
                                        color="success"
                                        value={data.totalInvoicesCreated}
                                        title="Total Invoices Created"
                                    />
                                </CCol>
                            </CRow>
                            <CRow className="mb-4">
                                <CCol sm="6">
                                    <CCard className="mb-4">
                                        <CCardBody>
                                            <CRow>
                                                <CCol sm="6">
                                                    <div>Total Invoices Completed</div>
                                                    <strong>{data.totalInvoicesCompleted}</strong>
                                                </CCol>
                                                <CCol sm="6">
                                                    <CProgress
                                                        value={(data.totalInvoicesCompleted / data.totalInvoicesCreated) * 100}
                                                        color="success"
                                                        className="mb-3"
                                                    />
                                                </CCol>
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                                <CCol sm="6">
                                    <CCard className="mb-4">
                                        <CCardBody>
                                            <CRow>
                                                <CCol sm="6">
                                                    <div>Total Bonus Points Added</div>
                                                    <strong>{data.totalBonusPointsAdded}</strong>
                                                </CCol>
                                                <CCol sm="6">
                                                    <CProgress
                                                        value={data.totalBonusPointsAdded / 100}
                                                        color="danger"
                                                        className="mb-3"
                                                    />
                                                </CCol>
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
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
                                        <CTableDataCell>Total Products In Stock End of Day</CTableDataCell>
                                        <CTableDataCell>{data.totalProductsInStockEndOfDay}</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableDataCell>Total Returned Products</CTableDataCell>
                                        <CTableDataCell>{data.totalReturnedProducts}</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableDataCell>Best Selling Product</CTableDataCell>
                                        <CTableDataCell>{data.bestSellingProduct}</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableDataCell>Best Selling Product Quantity</CTableDataCell>
                                        <CTableDataCell>{data.bestSellingProductQuantity}</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableDataCell>Most Stocked Product</CTableDataCell>
                                        <CTableDataCell>{data.mostStockedProduct}</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableDataCell>Most Stocked Product Quantity</CTableDataCell>
                                        <CTableDataCell>{data.mostStockedProductQuantity}</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableDataCell>Total Discount Amount</CTableDataCell>
                                        <CTableDataCell>{data.totalDiscountAmount}</CTableDataCell>
                                    </CTableRow>
                                </CTableBody>
                            </CTable>
                            {!confirmed && <CButton color="primary" onClick={handleOpen}>
                                Confirm
                            </CButton>}
                        </CCardBody>
                    </CCard>
                )}
            </CCol>

            <CModal visible={modal} onClose={handleExit}>
                <CModalHeader onClose={handleExit}>
                    <CModalTitle>Confirm Action</CModalTitle>
                </CModalHeader>
                <CModalBody>Are you sure you want to confirm this statistics?</CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={confirmAction}>
                        Yes
                    </CButton>
                    <CButton color="secondary" onClick={handleExit}>
                        No
                    </CButton>
                </CModalFooter>
            </CModal>

            <CModal visible={successModal} onClose={handleSuccessExit}>
                <CModalHeader onClose={handleSuccessExit}>
                    <CModalTitle>Confirmation Success</CModalTitle>
                </CModalHeader>
                <CModalBody>The statistics have been successfully confirmed.</CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={handleSuccessExit}>
                        OK
                    </CButton>
                </CModalFooter>
            </CModal>
        </CRow>
    );
};

export default StaffDashboard;

const styles = `
.chart-container {
  width: 50%;
  height: 300px;
}
.chart-container canvas {
  width: 50%;
  height: 300px;
}
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
