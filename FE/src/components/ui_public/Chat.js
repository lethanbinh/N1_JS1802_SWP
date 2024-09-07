import React, { useEffect, useRef, useState } from 'react';
import {
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CImage,
    CListGroup,
    CListGroupItem,
    CRow,
    CButton
} from '@coreui/react';
import UserStorage from '../../services/UserStorage';
import fetchData from '../../services/ApiConnection';
import CIcon from '@coreui/icons-react';
import { cilSend } from '@coreui/icons';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

const Chat = () => {
    const [user, setUser] = useState(UserStorage.getAuthenticatedUser());
    const [currentUser, setCurrentUser] = useState()
    const [partnerUser, setPartnerUser] = useState()

    const [listUsers, setListUsers] = useState([]);
    const [publicChats, setPublicChats] = useState([]);
    const [privateChats, setPrivateChats] = useState({});
    const [tab, setTab] = useState("PUBLIC_CHAT");
    const [message, setMessage] = useState("");
    const [stompClient, setStompClient] = useState(null);
    const [sending, setSending] = useState(false);
    const [latestMessages, setLatestMessages] = useState({})
    const [search, setSearch] = useState("")
    const containerRef = useRef(null);
    const currentTabRef = useRef(tab);

    useEffect(() => {
        loadAllUsers();
        connectUser();
        loadUsersByTabOrCurrent();
        loadMessages(currentTabRef.current);
        loadPrivateMessage()
    }, []);

    useEffect(() => {
        currentTabRef.current = tab;
    }, [tab]);

    useEffect(() => {
        loadMessages(currentTabRef.current);
        loadUsersByTabOrCurrent();
    }, [tab]);

    useEffect(() => {
        scrollToBottom();
    }, [publicChats, privateChats, listUsers]);

    const loadUsersByTabOrCurrent = () => {
        if (getUserByTab(tab)) {
            setPartnerUser(getUserByTab(tab))
        }

        fetchData(`http://localhost:8080/api/v1/users/id/${user.id}`, 'GET', null, user.accessToken)
            .then(data => {
                setCurrentUser(data.payload)
            })
    }

    const getUserByTab = (tab) => {
        return listUsers.find(item => item.id === parseInt(tab))
    }

    const loadAllUsers = async () => {
        try {
            const data = await fetchData("http://localhost:8080/api/v1/users", 'GET', null, user.accessToken);
            setListUsers(data.payload.filter(item => item.id !== user.id && item.status));
        } catch (error) {
            console.error('Failed to load users', error);
        }
    };

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

    const connectUser = () => {
        const Sock = new SockJS("http://localhost:8080/ws");
        const client = over(Sock);
        client.connect({}, () => onConnected(client), onError);
        setStompClient(client);
    };

    const onConnected = async (client) => {
        client.subscribe("/chatroom/public", onPublicMessage);
        client.subscribe(`/user/${user.id}/private`, onPrivateReceived(currentTabRef.current));

        try {
            const data = await fetchData("http://localhost:8080/api/v1/users", 'GET', null, user.accessToken);
            const users = data.payload.filter(item => item.id !== user.id && item.status);

            users.forEach((item) => {
                const channelId = getChannelId(user.id, item.id);
                client.subscribe(`/user/${channelId}/private`, onPrivateReceived);
                console.log(`Subscribed to /user/${channelId}/private`);
            });

            userJoin(client);
        } catch (error) {
            console.error('Failed to fetch users or subscribe to channels', error);
        }
    };

    const getChannelId = (userId1, userId2) => {
        return userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
    };

    const userJoin = (client) => {
        const chatMessage = {
            senderId: user.id,
            messageStatus: "JOIN",
            date: new Date().toISOString()
        };
        client.send("/app/message", {}, JSON.stringify(chatMessage));
    };

    const onPublicMessage = () => {
        loadMessages(currentTabRef.current)
    };

    const onPrivateReceived = () => {
        console.log('Private message received');
        console.log('Current tab:', currentTabRef.current);
        loadMessages(currentTabRef.current)
    };

    const onError = (err) => {
        console.error('Error with WebSocket connection:', err);
    };

    const loadMessages = (currentTab) => {
        try {
            console.log('Loading messages for tab:', currentTab); // Directly use the state value
            if (currentTab === "PUBLIC_CHAT") {
                fetchData("http://localhost:8080/api/v1/messages/public-message", 'GET', null, user.accessToken)
                    .then(data => {
                        const messages = data.payload.filter(item => item.messageStatus === "MESSAGE")
                        setPublicChats(messages);
                        setLatestMessages(prevState => ({ ...prevState, PUBLIC_CHAT: messages[messages.length - 1] }));
                    })
            } else {
                fetchData(`http://localhost:8080/api/v1/messages/private-message/${user.id}/${currentTab}`, 'GET', null, user.accessToken)
                    .then(data => {
                        const messages = data.payload.filter(item => item.messageStatus === "MESSAGE")
                        setPrivateChats(prevChats => ({
                            ...prevChats,
                            [currentTab]: messages
                        }));
                        setLatestMessages(prevState => ({ ...prevState, [currentTab]: messages[messages.length - 1] }));
                    })
            }
        } catch (error) {
            console.error('Failed to load messages', error);
        }
    };

    const loadPrivateMessage = () => {
        console.log(listUsers)
        fetchData("http://localhost:8080/api/v1/users", 'GET', null, user.accessToken)
            .then(data => {
                data.payload.map((currentTab) => {
                    fetchData(`http://localhost:8080/api/v1/messages/private-message/${user.id}/${currentTab.id}`, 'GET', null, user.accessToken)
                        .then(data => {
                            const messages = data.payload.filter(item => item.messageStatus === "MESSAGE")
                            setPrivateChats(prevChats => ({
                                ...prevChats,
                                [currentTab.id]: messages
                            }));
                            setLatestMessages(prevState => ({ ...prevState, [currentTab.id]: messages[messages.length - 1] }));
                        })
                })
            })
    }

    const sendPublicMessage = () => {
        if (stompClient && message.trim() && !sending) {
            setSending(true);
            const chatMessage = {
                message: message,
                messageStatus: "MESSAGE",
                senderId: user.id,
                date: new Date().toISOString()
            };
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setMessage("");
            setSending(false);
        }
    };

    const sendPrivateMessage = () => {
        if (stompClient && message.trim() && !sending) {
            setSending(true);
            const chatMessage = {
                message: message,
                messageStatus: "MESSAGE",
                senderId: user.id,
                receiverId: tab,
                date: new Date().toISOString()
            };
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setPrivateChats(prevChats => {
                const updatedChats = { ...prevChats };
                if (!updatedChats[tab]) {
                    updatedChats[tab] = [];
                }
                updatedChats[tab].push(chatMessage);
                return updatedChats;
            });
            setMessage("");
            setSending(false);
        }
    };

    const handleTabChange = (newTab) => {
        setTab(newTab);
    };

    const searchUsers = (keyword) => {
        if (keyword) {
            setListUsers(listUsers.filter(item => item.fullName.toLowerCase().includes(keyword.toLowerCase())));
        } else {
            loadAllUsers();
        }
    };

    return (
        <CContainer style={{ padding: 0 }}>
            <CRow>
                <CCol md={12}>
                    <CCard style={{ borderRadius: '15px', border: '1px solid #adb5bd' }}>
                        <CCardBody>
                            <CRow>
                                {/* Member List */}
                                <CCol md={6} lg={5} xl={4} className="mb-4 mb-md-0">
                                    <div className="p-3">
                                        <div className="input-group rounded mb-3">
                                            <input
                                                style={{ border: '1px solid #adb5bd' }}
                                                type="search"
                                                onChange={e => {
                                                    setSearch(e.target.value)
                                                    searchUsers(e.target.value)
                                                }}
                                                className="form-control rounded"
                                                placeholder="Search Chat ..."
                                                aria-label="Search"
                                                aria-describedby="search-addon" />
                                        </div>
                                        {console.log(search)}
                                        <div style={{ position: 'relative', height: '72vh', overflowY: 'auto' }}>
                                            <CListGroup flush className="list-unstyled mb-0">
                                                {(!search || "GENERAL".includes(search.toUpperCase())) &&
                                                    <CListGroupItem className="p-2 border-bottom">
                                                        <CButton style={{ width: "100%" }} onClick={() => handleTabChange("PUBLIC_CHAT")} className="d-flex justify-content-between">
                                                            <div className="d-flex flex-row">
                                                                <div>
                                                                    <CImage
                                                                        src="https://cdn-icons-png.flaticon.com/512/2352/2352167.png"
                                                                        alt="avatar"
                                                                        className="d-flex align-self-center me-3"
                                                                        width="60"
                                                                        height="60"
                                                                        style={{ borderRadius: '999px', objectFit: 'cover' }}
                                                                    />
                                                                    <span className="badge bg-success badge-dot"></span>
                                                                </div>
                                                                <div className="pt-1">
                                                                    <p className="fw-bold mb-0" style={{ textAlign: "left" }}>General</p>
                                                                    {latestMessages.PUBLIC_CHAT ?
                                                                        (latestMessages.PUBLIC_CHAT.message.length > 15 ?
                                                                            <p style={{ textAlign: "left" }}>{latestMessages.PUBLIC_CHAT.message.substring(0, 15) + '...'}</p>
                                                                            :
                                                                            <p style={{ textAlign: "left" }}v>{latestMessages.PUBLIC_CHAT.message}</p>
                                                                        ) :
                                                                        ""}
                                                                </div>
                                                            </div>
                                                            <div className="pt-1">
                                                                <p className="small text-muted mb-1">{latestMessages.PUBLIC_CHAT ? new Date(latestMessages.PUBLIC_CHAT.date).toLocaleString() : ""}</p>
                                                            </div>
                                                        </CButton>
                                                    </CListGroupItem>
                                                }

                                                {listUsers.map((item) => (
                                                    <CListGroupItem className="p-2 border-bottom" key={item.id}>
                                                        <CButton onClick={() => handleTabChange(item.id.toString())} style={{ width: "100%" }} className="d-flex justify-content-between">
                                                            <div className="d-flex flex-row">
                                                                <div>
                                                                    <CImage
                                                                        src={item.avatar || "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"}
                                                                        alt="avatar"
                                                                        className="d-flex align-self-center me-3"
                                                                        width="60"
                                                                        height="60"
                                                                        style={{ borderRadius: '999px', objectFit: 'cover' }}
                                                                    />
                                                                    <span className="badge bg-success badge-dot"></span>
                                                                </div>
                                                                <div className="pt-1">
                                                                    <p className="fw-bold mb-0" style={{ textAlign: "left" }}>{item.fullName} ({item.roleName.toLowerCase()})</p>
                                                                    <p className="small text-muted" style={{ textAlign: "left" }}>
                                                                        {latestMessages[item.id] ?
                                                                            (latestMessages[item.id].message.length > 15 ?
                                                                                latestMessages[item.id].message.substring(0, 15) + '...' :
                                                                                latestMessages[item.id].message) :
                                                                            ""}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="pt-1">
                                                                <p className="small text-muted mb-1">{latestMessages[item.id] ? new Date(latestMessages[item.id].date).toLocaleString() : ""}</p>
                                                            </div>
                                                        </CButton>
                                                    </CListGroupItem>
                                                ))}
                                            </CListGroup>
                                        </div>
                                    </div>
                                </CCol>

                                {/* Chat Area */}
                                <CCol md={6} lg={7} xl={8}>
                                    <div ref={containerRef} style={{ position: 'relative', height: '75vh', overflowY: 'auto', border: '1px solid #adb5bd', borderRadius: '15px', padding: "20px" }}>
                                        <ul className="list-unstyled">
                                            {
                                                tab === "PUBLIC_CHAT" && publicChats.map((chat, index) => (
                                                    <li key={index} className={`d-flex mb-4 ${chat.senderId !== user.id ? "justify-content-start" : "justify-content-end"}`}>
                                                        {chat.senderId !== user.id && (
                                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                                <CImage
                                                                    src={listUsers.find(item => item.id === chat.senderId)
                                                                        && listUsers.find(item => item.id === chat.senderId).avatar}
                                                                    alt="avatar"
                                                                    className="rounded-circle d-flex align-self-start shadow-1-strong"
                                                                    width="45px"
                                                                    height="45px"
                                                                    style={{objectFit: "cover"}}
                                                                />
                                                                {listUsers.find(item => item.id === chat.senderId)
                                                                    && listUsers.find(item => item.id === chat.senderId).fullName}
                                                            </div>
                                                        )}
                                                        <div className={`d-flex flex-column ${chat.senderId === user.id ? "align-items-end" : "align-items-start"}`}>
                                                            <p className={`small p-2 mb-1 rounded-3 ${chat.senderId !== user.id ? "ms-3 bg-secondary text-white" : "text-white bg-primary me-3"}`}>
                                                                {chat.message}
                                                            </p>
                                                            <p className={`small mb-3 rounded-3 text-muted ${chat.senderId !== user.id ? "ms-3 float-end" : "me-3"}`}>
                                                                {new Date(chat.date).toLocaleString()}
                                                            </p>
                                                        </div>
                                                        {chat.senderId === user.id && (
                                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                                <CImage
                                                                    src={currentUser && currentUser.avatar}
                                                                    alt="avatar"
                                                                    className="rounded-circle d-flex align-self-start shadow-1-strong"
                                                                    width="45px"
                                                                    height="45px"
                                                                    style={{objectFit: "cover"}}
                                                                />
                                                                {chat.senderId === user.id &&
                                                                    <p>{currentUser && currentUser.fullName}</p>
                                                                }
                                                            </div>
                                                        )}
                                                    </li>
                                                ))
                                            }
                                            {tab !== "PUBLIC_CHAT" && privateChats[tab] && privateChats[tab].map((chat, index) => (
                                                <li key={index} className={`d-flex mb-4 ${chat.senderId !== user.id ? "justify-content-start" : "justify-content-end"}`}>
                                                    {chat.senderId !== user.id && (
                                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                            <CImage
                                                                src={partnerUser && partnerUser.avatar}
                                                                alt="avatar"
                                                                className="rounded-circle d-flex align-self-start shadow-1-strong"
                                                                width="45px"
                                                                height="45px"
                                                                style={{objectFit: "cover"}}
                                                            />
                                                            {chat.senderId !== user.id &&
                                                                <p>{partnerUser && partnerUser.fullName}</p>
                                                            }
                                                        </div>
                                                    )
                                                    }
                                                    <div className={`d-flex flex-column ${chat.senderId === user.id ? "align-items-end" : "align-items-start"}`}>
                                                        <p className={`small p-2 mb-1 rounded-3 ${chat.senderId !== user.id ? "ms-3 bg-secondary text-white" : "text-white bg-primary me-3"}`}>
                                                            {chat.message}
                                                        </p>
                                                        <p className={`small mb-3 rounded-3 text-muted ${chat.senderId !== user.id ? "ms-3 float-end" : "me-3"}`}>
                                                            {new Date(chat.date).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    {chat.senderId === user.id && (
                                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                            <CImage
                                                                src={currentUser && currentUser.avatar}
                                                                alt="avatar"
                                                                className="rounded-circle d-flex align-self-start shadow-1-strong"
                                                                width="45px"
                                                                height="45px"
                                                                style={{objectFit: "cover"}}
                                                            />
                                                            {chat.senderId === user.id &&
                                                                <p>{currentUser && currentUser.fullName}</p>
                                                            }
                                                        </div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="text-muted d-flex justify-content-start align-items-center mt-3">
                                        <CImage
                                            src={user.avatar || "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"}
                                            alt="avatar"
                                            style={{ width: '40px', height: '100%', marginRight: "10px" }}
                                        />
                                        <input
                                            style={{ border: '1px solid #adb5bd', marginRight: "10px" }}
                                            type="text" className="form-control" placeholder="Type message"
                                            onChange={e => setMessage(e.target.value)}
                                            value={message}
                                        />
                                        {tab === "PUBLIC_CHAT" ? (
                                            <CButton style={{ border: '1px solid #adb5bd' }} onClick={sendPublicMessage} disabled={sending}>
                                                <CIcon icon={cilSend}></CIcon>
                                            </CButton>
                                        ) : (
                                            <CButton style={{ border: '1px solid #adb5bd' }} onClick={sendPrivateMessage} disabled={sending}>
                                                <CIcon icon={cilSend}></CIcon>
                                            </CButton>
                                        )}
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
