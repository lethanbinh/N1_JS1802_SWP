import React, { useEffect, useRef, useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CImage,
    CListGroup,
    CListGroupItem,
    CRow,
    CButton,
    CBadge
} from '@coreui/react';
import UserStorage from '../../services/UserStorage';
import fetchData from '../../services/ApiConnection';

const Chat = () => {
    const [user, setUser] = useState(UserStorage.getAuthenticatedUser());
    const [listUsers, setListUsers] = useState([]);
    const [currentSelectedUser, setCurrentSelectedUser] = useState();
    const containerRef = useRef(null);

    const loadAllUsers = () => {
        fetchData("http://localhost:8080/api/v1/users", 'GET', null, user.accessToken)
            .then(data => {
                setListUsers(data.payload.filter(item => item.id !== user.id && item.status));
            });
    };

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        loadAllUsers();
        scrollToBottom();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [listUsers, currentSelectedUser]);

    return (
        <CContainer>
            <CRow>
                <CCol md={12}>
                    <CCard style={{ borderRadius: '15px' }}>
                        <CCardBody>
                            <CRow>
                                {/* Member List */}
                                <CCol md={6} lg={5} xl={4} className="mb-4 mb-md-0">
                                    <div className="p-3">
                                        <div className="input-group rounded mb-3">
                                            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                            <span className="input-group-text border-0" id="search-addon">
                                                <i className="fas fa-search"></i>
                                            </span>
                                        </div>

                                        <div style={{ position: 'relative', height: '70vh', overflowY: 'auto' }}>
                                            <CListGroup flush className="list-unstyled mb-0">
                                                {listUsers.map((item) => (
                                                    <CListGroupItem className="p-2 border-bottom" key={item.id}>
                                                        <a style={{ textDecoration: "none" }} href="#!" className="d-flex justify-content-between">
                                                            <div className="d-flex flex-row">
                                                                <div>
                                                                    <CImage
                                                                        src={item.avatar || "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"}
                                                                        alt="avatar"
                                                                        className="d-flex align-self-center me-3"
                                                                        width="60"
                                                                    />
                                                                    <span className="badge bg-success badge-dot"></span>
                                                                </div>
                                                                <div className="pt-1">
                                                                    <p className="fw-bold mb-0">{item.fullName}</p>
                                                                    <p className="small text-muted">Hello, Are you there?</p>
                                                                </div>
                                                            </div>
                                                            <div className="pt-1">
                                                                <p className="small text-muted mb-1">Just now</p>
                                                                <CBadge color="danger" className="float-end">1</CBadge>
                                                            </div>
                                                        </a>
                                                    </CListGroupItem>
                                                ))}
                                            </CListGroup>
                                        </div>
                                    </div>
                                </CCol>

                                {/* Chat Area */}
                                <CCol md={6} lg={7} xl={8}>
                                    <div className="pt-3 pe-3" ref={containerRef} style={{ position: 'relative', height: '70vh', overflowY: 'auto' }}>
                                        <ul className="list-unstyled">
                                            <li className="d-flex justify-content-start mb-4">
                                                <CImage
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                                    alt="avatar"
                                                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                                    width="45"
                                                />
                                                <div>
                                                    <p className="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                    </p>
                                                    <p className="small ms-3 mb-3 rounded-3 text-muted float-end">12:00 PM | Aug 13</p>
                                                </div>
                                            </li>
                                            <li className="d-flex justify-content-end mb-4">
                                                <div>
                                                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                    </p>
                                                    <p className="small me-3 mb-3 rounded-3 text-muted">12:00 PM | Aug 13</p>
                                                </div>
                                                <CImage
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                                                    alt="avatar"
                                                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                                    width="45"
                                                />
                                            </li>
                                            <li className="d-flex justify-content-start mb-4">
                                                <CImage
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                                    alt="avatar"
                                                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                                    width="45"
                                                />
                                                <div>
                                                    <p className="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                    </p>
                                                    <p className="small ms-3 mb-3 rounded-3 text-muted float-end">12:00 PM | Aug 13</p>
                                                </div>
                                            </li>
                                            <li className="d-flex justify-content-end mb-4">
                                                <div>
                                                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                    </p>
                                                    <p className="small me-3 mb-3 rounded-3 text-muted">12:00 PM | Aug 13</p>
                                                </div>
                                                <CImage
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                                                    alt="avatar"
                                                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                                    width="45"
                                                />
                                            </li>
                                            <li className="d-flex justify-content-start mb-4">
                                                <CImage
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                                    alt="avatar"
                                                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                                    width="45"
                                                />
                                                <div>
                                                    <p className="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                    </p>
                                                    <p className="small ms-3 mb-3 rounded-3 text-muted float-end">12:00 PM | Aug 13</p>
                                                </div>
                                            </li>
                                            <li className="d-flex justify-content-end mb-4">
                                                <div>
                                                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                    </p>
                                                    <p className="small me-3 mb-3 rounded-3 text-muted">12:00 PM | Aug 13</p>
                                                </div>
                                                <CImage
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                                                    alt="avatar"
                                                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                                    width="45"
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                                        <CImage
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                            alt="avatar"
                                            style={{ width: '40px', height: '100%' }}
                                        />
                                        <input type="text" className="form-control form-control-lg" placeholder="Type message" />
                                        <a className="ms-1 text-muted" href="#!"><i className="fas fa-paperclip"></i></a>
                                        <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a>
                                        <a className="ms-3" href="#!"><i className="fas fa-paper-plane"></i></a>
                                    </div>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default Chat;
