import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => {
    const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
    const [managerDashboardOpen, setManagerDashboardOpen] = useState(false);
    const [staffDashboardOpen, setStaffDashboardOpen] = useState(false);

    const toggleAdminDashboardMenu = () => {
        setAdminDashboardOpen(!adminDashboardOpen);
    };

    const toggleManagerDashboardMenu = () => {
        setManagerDashboardOpen(!managerDashboardOpen);
    };

    const toggleStaffDashboardMenu = () => {
        setStaffDashboardOpen(!staffDashboardOpen);
    };
    return (
        <aside className="main-sidebar">
            <div className="user-panel">
                <div className="info">
                    <h2>DASHBOARD</h2>
                </div>
            </div>
            <nav className="sidebar-nav">
                <ul>
                <li className={`nav-item has-treeview ${adminDashboardOpen? 'open' : ''}`}>
                        <Link to="/admin-dashboard" className="nav-link" onClick={toggleAdminDashboardMenu}>
                            <i className="fas fa-tachometer-alt"></i>
                            <p>
                              Admin Dashboard
                                <i className={`fas fa-angle-left ${adminDashboardOpen? 'open' : ''}`}></i>
                            </p>
                        </Link>
                        {adminDashboardOpen && (
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/admin-dashboard/view-account" className="nav-link">
                                    
                                        <p>View Account</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin-dashboard/create-account" className="nav-link">
                                        
                                        <p>Create Account</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin-dashboard/update-account" className="nav-link">
                                        
                                        <p>Update Account</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin-dashboard/delete-account" className="nav-link">
                                        
                                        <p>Delete Account</p>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className={`nav-item has-treeview ${managerDashboardOpen? 'open' : ''}`}>
                        <Link to="/manager-dashboard" className="nav-link" onClick={toggleManagerDashboardMenu}>
                            <i className="fas fa-tachometer-alt"></i>
                            <p>
                              Manager Dashboard
                                <i className={`fas fa-angle-left ${managerDashboardOpen ? 'open' : ''}`}></i>
                            </p>
                        </Link>
                        {managerDashboardOpen && (
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/manager-dashboard/view-account" className="nav-link">
                                        
                                        <p>View Staff</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/manager-dashboard/create-account" className="nav-link">
                                        
                                        <p>Create Staff</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/manager-dashboard/update-account" className="nav-link">
                                        
                                        <p>Update Staff</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/manager-dashboard/delete-account" className="nav-link">
                                        
                                        <p>Delete Staff</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/manager-dashboard/view-account" className="nav-link">
                                        
                                        <p>View Promotion</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/manager-dashboard/view-account" className="nav-link">
                                        
                                        <p>Create Promotion</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/manager-dashboard/view-account" className="nav-link">
                                        
                                        <p>Update Promotion</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/manager-dashboard/view-account" className="nav-link">
                                        
                                        <p>Delete Promotion</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/manager-dashboard/view-account" className="nav-link">
                                        
                                        <p>View Customer Purchase History</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/manager-dashboard/view-account" className="nav-link">
                                        
                                        <p>View Return and Exchange Policy</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/manager-dashboard/view-account" className="nav-link">
                                        
                                        <p>Edit Return and Exchange Policy</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/manager-dashboard/view-account" className="nav-link">
                                        
                                        <p>Add Stall</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/manager-dashboard/view-account" className="nav-link">
                                        
                                        <p>Update Stall</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/manager-dashboard/view-account" className="nav-link">
                                        
                                        <p>View Product in Stall</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/manager-dashboard/view-account" className="nav-link">
                                        
                                        <p>View Revenue of all Stalls</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/manager-dashboard/view-account" className="nav-link">
                                        
                                        <p>View Stafs Statistics</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/manager-dashboard/view-account" className="nav-link">
                                        
                                        <p>View Orders Statistics</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/manager-dashboard/view-account" className="nav-link">
                                        
                                        <p>View Products Report</p>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className={`nav-item has-treeview ${staffDashboardOpen? 'open' : ''}`}>
                        <Link to="/staff-dashboard" className="nav-link" onClick={toggleStaffDashboardMenu}>
                            <i className="fas fa-tachometer-alt"></i>
                            <p>
                              Staff Dashboard
                                <i className={`fas fa-angle-left ${staffDashboardOpen ? 'open' : ''}`}></i>
                            </p>
                        </Link>
                        {staffDashboardOpen && (
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/staff-dashboard/delete-account" className="nav-link">
                                        
                                        <p>Create Bill</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/staff-dashboard/create-account" className="nav-link">
                                        
                                        <p>Import Product by Barcode</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/staff-dashboard/update-account" className="nav-link">
                                        
                                        <p>Import Product by Product Code</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/staff-dashboard/delete-account" className="nav-link">
                                        
                                        <p>Remove Product out of Bill</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/staff-dashboard/delete-account" className="nav-link">
                                        
                                        <p>Input Customer Info</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/staff-dashboard/delete-account" className="nav-link">
                                        
                                        <p>Add Product to Stall</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/staff-dashboard/delete-account" className="nav-link">
                                        
                                        <p>Examine Customer Old Product</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/staff-dashboard/delete-account" className="nav-link">
                                        
                                        <p>View Each Revenue of Stall</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/staff-dashboard/delete-account" className="nav-link">
                                        
                                        <p>Update Bill</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/staff-dashboard/delete-account" className="nav-link">
                                        
                                        <p>Export Bill</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/staff-dashboard/delete-account" className="nav-link">
                                        
                                        <p>View Each Orders Statistics of Stall</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/staff-dashboard/view-account" className="nav-link">
                                        
                                        <p>View Each Product Report of Stall</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/staff-dashboard/update-product-in-stall" className="nav-link">
                                        
                                        <p>Update Product in Stall</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/staff-dashboard/view-customer-purchase-history" className="nav-link">
                                        
                                        <p>View Customer Purchase History</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/staff-dashboard/view-return-and-exchange-policy" className="nav-link">
                                        
                                        <p>View Return and Exchange Policy</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/staff-dashboard/view-product-in-stall" className="nav-link">
                                        
                                        <p>View Product in Stall</p>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default SideBar;

