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
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [orderStats, setOrderStats] = useState({
        totalNumberOfOrders: 0,
        averageOrderValue: 0,
        totalSales: 0,
        orderTrends: {},
        customerOrderFrequency: 0,
        orderAverageNumbers: 0,
        orderNumbersByCustomerAge: {}
    });

    const [productStats, setProductStats] = useState({
        totalNumberOfProducts: 100,
        topQuantitySellingProducts: {},
        topSalesPerProduct: {},
        returnRates: {},
        productsOutOfStock: [],
        averageSalesPerProduct: 0
    });

    const [staffStats, setStaffStats] = useState({
        totalNumberOfStaff: 0,
        revenuePerStaff: {},
        topPerformingStaff: [],
        averageSalesPerStaff: 0,
        ordersPerStaff: {},
        averageOrdersPerStaff: 0
    });

    const [revenueStats, setRevenueStats] = useState({
        totalRevenue: 0,
        revenuePerStall: {},
        topPerformingStalls: [],
        monthlyQuarterlyRevenueTrends: {},
        averageRevenuePerStall: 0
    });

    const [user, setUser] = useState(UserStorage.getAuthenticatedUser());
    const [error, setError] = useState(null);

    const loadData = async (startDate, endDate) => {
        const formattedStartDate = format(startDate, 'dd-MM-yyyy');
        const formattedEndDate = format(endDate, 'dd-MM-yyyy');

        try {
            const orderData = await fetchData(`http://localhost:8080/api/v1/dashboard/order-statistics/${formattedStartDate}/${formattedEndDate}`, 'GET', null, user.accessToken);
            setOrderStats(orderData.payload);

            const productData = await fetchData(`http://localhost:8080/api/v1/dashboard/product-statistics/${formattedStartDate}/${formattedEndDate}`, 'GET', null, user.accessToken);
            setProductStats(productData.payload);

            const staffData = await fetchData(`http://localhost:8080/api/v1/dashboard/staff-statistics/${formattedStartDate}/${formattedEndDate}`, 'GET', null, user.accessToken);
            setStaffStats(staffData.payload);

            const revenueData = await fetchData(`http://localhost:8080/api/v1/dashboard/revenue-statistics/${formattedStartDate}/${formattedEndDate}`, 'GET', null, user.accessToken);
            setRevenueStats(revenueData.payload);

            setError(null);  // Reset error state if everything is successful
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        loadData(startDate, endDate);
    }, [startDate, endDate]);

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

    return (
        <div className="container-fluid" style={{ padding: '20px' }}>
            <div className="d-flex justify-content-between mb-4" style={{ alignItems: 'center' }}>
                <div style={{width: "50%", display: 'flex', alignItems: 'center'}}>
                    <label style={{ marginRight: '10px' }}>Start Date: </label>
                    <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        dateFormat="dd-MM-yyyy"
                        className="form-control"
                    />
                </div>
                <div style={{width: "50%", display: 'flex', alignItems: 'center'}}>
                    <label style={{ marginRight: '10px' }}>End Date: </label>
                    <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        dateFormat="dd-MM-yyyy"
                        minDate={startDate}
                        className="form-control"
                    />
                </div>
            </div>

            {error && (
                <CAlert color="danger">
                    Error: {error}
                </CAlert>
            )}

            <CRow>
                <CCol xs="12" md="6" xl="6">
                    <CCard className="mb-4">
                        <CCardHeader>Total Orders and Sales</CCardHeader>
                        <CCardBody>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <h4>{orderStats.totalNumberOfOrders || 0}</h4>
                                    <p>Total Orders</p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h4>${orderStats.totalSales || 0}</h4>
                                    <p>Total Sales</p>
                                </div>
                            </div>
                            <CChartBar
                                data={{
                                    labels: orderStats.orderTrends ? Object.keys(orderStats.orderTrends) : [],
                                    datasets: [
                                        {
                                            label: 'Orders',
                                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                            borderColor: 'rgba(54, 162, 235, 1)',
                                            borderWidth: 1,
                                            data: orderStats.orderTrends ? Object.values(orderStats.orderTrends) : [0],
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: { legend: { display: true } },
                                    maintainAspectRatio: false,
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol xs="12" md="6" xl="6">
                    <CCard className="mb-4">
                        <CCardHeader>Average Order Value and Frequency</CCardHeader>
                        <CCardBody>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <h4>${orderStats.averageOrderValue || 0}</h4>
                                    <p>Avg. Order Value</p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h4>{orderStats.customerOrderFrequency ? orderStats.customerOrderFrequency.toFixed(1) : 0}</h4>
                                    <p>Order Frequency</p>
                                </div>
                            </div>
                            <CChartBar
                                data={{
                                    labels: orderStats.orderTrends ? Object.keys(orderStats.orderTrends) : [],
                                    datasets: [
                                        {
                                            label: 'Avg. Order Value',
                                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                            borderColor: 'rgba(75, 192, 192, 1)',
                                            borderWidth: 1,
                                            data: orderStats.orderTrends ? Object.values(orderStats.orderTrends).map(v => v * orderStats.averageOrderValue / (orderStats.totalNumberOfOrders || 1)) : [0],
                                        },
                                        {
                                            label: 'Order Frequency',
                                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                                            borderColor: 'rgba(255, 159, 64, 1)',
                                            borderWidth: 1,
                                            data: orderStats.orderTrends ? Object.values(orderStats.orderTrends).map(v => v * orderStats.customerOrderFrequency / (orderStats.totalNumberOfOrders || 1)) : [0],
                                        }
                                    ],
                                }}
                                options={{
                                    plugins: { legend: { display: true } },
                                    maintainAspectRatio: false,
                                    scales: {
                                        x: {
                                            stacked: true
                                        },
                                        y: {
                                            stacked: true
                                        }
                                    }
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol xs="12" md="6" xl="6">
                    <CCard className="mb-4">
                        <CCardHeader>Product Statistics</CCardHeader>
                        <CCardBody>
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <h4>{productStats.totalNumberOfProducts || 0}</h4>
                                <p>Total Products</p>
                                <h4>{productStats.averageSalesPerProduct || 0}</h4>
                                <p>Avg. Sales per Product</p>
                            </div>
                            <CChartBar
                                data={{
                                    labels: productStats.topQuantitySellingProducts ? Object.keys(productStats.topQuantitySellingProducts) : [],
                                    datasets: [
                                        {
                                            label: 'Top Selling Products',
                                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                                            borderColor: 'rgba(153, 102, 255, 1)',
                                            borderWidth: 1,
                                            data: productStats.topQuantitySellingProducts ? Object.values(productStats.topQuantitySellingProducts) : [0],
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: { legend: { display: true } },
                                    maintainAspectRatio: false,
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol xs="12" md="6" xl="6">
                    <CCard className="mb-4">
                        <CCardHeader>Staff Statistics</CCardHeader>
                        <CCardBody>
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <h4>{staffStats.totalNumberOfStaff || 0}</h4>
                                <p>Total Staff</p>
                                <h4>{staffStats.averageSalesPerStaff || 0}</h4>
                                <p>Avg. Sales per Staff</p>
                            </div>
                            <CChartDoughnut
                                data={{
                                    labels: staffStats.revenuePerStaff ? Object.keys(staffStats.revenuePerStaff) : [],
                                    datasets: [
                                        {
                                            label: 'Revenue per Staff',
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.2)',
                                                'rgba(54, 162, 235, 0.2)',
                                                'rgba(255, 206, 86, 0.2)',
                                                'rgba(75, 192, 192, 0.2)',
                                                'rgba(153, 102, 255, 0.2)',
                                            ],
                                            borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(153, 102, 255, 1)',
                                            ],
                                            borderWidth: 1,
                                            data: staffStats.revenuePerStaff ? Object.values(staffStats.revenuePerStaff) : [0],
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: { legend: { display: true } },
                                    maintainAspectRatio: false,
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol xs="12">
                    <CCard className="mb-4">
                        <CCardHeader>Revenue Trends</CCardHeader>
                        <CCardBody>
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <h4>${revenueStats.totalRevenue || 0}</h4>
                                <p>Total Revenue</p>
                                <h4>${revenueStats.averageRevenuePerStall || 0}</h4>
                                <p>Avg. Revenue per Stall</p>
                            </div>
                            <CChartPie
                                data={{
                                    labels: revenueStats.monthlyQuarterlyRevenueTrends ? Object.keys(revenueStats.monthlyQuarterlyRevenueTrends) : [],
                                    datasets: [
                                        {
                                            label: 'Revenue Trends',
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.2)',
                                                'rgba(54, 162, 235, 0.2)',
                                                'rgba(255, 206, 86, 0.2)',
                                                'rgba(75, 192, 192, 0.2)',
                                                'rgba(153, 102, 255, 0.2)',
                                            ],
                                            borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(153, 102, 255, 1)',
                                            ],
                                            borderWidth: 1,
                                            data: revenueStats.monthlyQuarterlyRevenueTrends ? Object.values(revenueStats.monthlyQuarterlyRevenueTrends).flat() : [0],
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: { legend: { display: true } },
                                    maintainAspectRatio: false,
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    );
};

export default ManagerDashboard;
