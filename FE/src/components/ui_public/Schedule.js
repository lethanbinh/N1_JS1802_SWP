import { CContainer, CModalHeader, CModalTitle } from "@coreui/react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form, Badge, Tab, Tabs, Table } from 'react-bootstrap';
import './CalendarStyles.css'; // Import newly created CSS file

import 'bootstrap/dist/css/bootstrap.min.css';
import UserStorage from "../../services/UserStorage";
import fetchData from "../../services/ApiConnection";

const shifts = [
    { id: 1, name: 'Morning Shift', start: '09:00:00', end: '13:00:00' },
    { id: 2, name: 'Afternoon Shift', start: '13:00:00', end: '17:00:00' },
    { id: 3, name: 'Evening Shift', start: '17:00:00', end: '21:00:00' },
];

const leaveTypes = [
    { id: 1, name: 'Sick Leave' },
    { id: 2, name: 'Casual Leave' },
    { id: 3, name: 'Annual Leave' },
];

const Schedule = () => {
    const [user, setUser] = useState(UserStorage.getAuthenticatedUser());
    const [staff, setStaff] = useState([]);
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [modalType, setModalType] = useState('');
    const [eventData, setEventData] = useState({ title: '', shift: '', employees: [], date: '' });
    const [currentView, setCurrentView] = useState('timeGridWeek');
    const [displayedWeek, setDisplayedWeek] = useState({ start: '', end: '' });
    const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [registerShiftData, setRegisterShiftData] = useState({ shift: '', date: '' });
    const [registerLeaveData, setRegisterLeaveData] = useState({ startDate: '', endDate: '', reason: '', leaveType: '' });
    const [registeredShifts, setRegisteredShifts] = useState([]);
    const [registeredLeaves, setRegisteredLeaves] = useState([]);
    const [editingShiftId, setEditingShiftId] = useState(null);
    const [editingLeaveId, setEditingLeaveId] = useState(null);

    useEffect(() => {
        handleViewChange(currentView);
        loadStaff();
    }, []);

    const loadStaff = () => {
        fetchData("http://localhost:8080/api/v1/users", 'GET', null, user.accessToken)
            .then(data => {
                setStaff(data.payload.filter(item => item.roleName.toUpperCase() === "STAFF"));
            });
    };

    const handleAddButtonClick = () => {
        setEventData({ title: '', shift: '', employees: [], date: '' });
        setModalType('add');
        setShowModal(true);
    };

    const handleEventClick = (clickInfo) => {
        const eventStartTime = clickInfo.event.startStr.split('T')[1].split('+')[0].split('-')[0];
        const eventShift = shifts.find(shift => shift.start === eventStartTime);
        setCurrentEvent(clickInfo.event);
        setEventData({
            title: clickInfo.event.title,
            shift: eventShift ? eventShift.id : '',
            employees: clickInfo.event.extendedProps.employees || [],
            date: clickInfo.event.startStr.split('T')[0],
        });
        setModalType('edit');
        setShowModal(true);
    };

    const handleEventAdd = () => {
        if (eventData.title.length < 2) {
            setValidationError("Title must be at least 2 characters long.");
            return;
        }

        const selectedShift = shifts.find(shift => shift.id === parseInt(eventData.shift));
        if (!selectedShift) {
            setValidationError("Please select a valid shift.");
            return;
        }

        const duplicate = events.some(event =>
            event.start.split('T')[0] === eventData.date &&
            shifts.some(shift => shift.id === parseInt(eventData.shift) && shift.start === event.start.split('T')[1])
        );
        if (duplicate) {
            setValidationError("A shift already exists for the selected date and time.");
            return;
        }

        if (!eventData.title || !eventData.shift || eventData.employees.length === 0 || !eventData.date) {
            setValidationError("All fields are required.");
            return;
        }

        if (eventData.employees.length > 5) {
            setValidationError("A shift cannot have more than 5 employees.");
            return;
        }

        const startDateTime = `${eventData.date}T${selectedShift.start}`;
        const endDateTime = `${eventData.date}T${selectedShift.end}`;
        setEvents([...events, { ...eventData, start: startDateTime, end: endDateTime, id: Math.random().toString(36).substr(2, 9) }]);
        setShowModal(false);
    };

    const handleEventEdit = () => {
        if (eventData.title.length < 2) {
            setValidationError("Title must be at least 2 characters long.");
            return;
        }

        const selectedShift = shifts.find(shift => shift.id === parseInt(eventData.shift));
        if (!selectedShift) {
            setValidationError("Please select a valid shift.");
            return;
        }

        if (!eventData.title || !eventData.shift || eventData.employees.length === 0 || !eventData.date) {
            setValidationError("All fields are required.");
            return;
        }

        if (eventData.employees.length > 5) {
            setValidationError("A shift cannot have more than 5 employees.");
            return;
        }

        const startDateTime = `${eventData.date}T${selectedShift.start}`;
        const endDateTime = `${eventData.date}T${selectedShift.end}`;
        setEvents(events.map(event => event.id === currentEvent.id ? { ...eventData, start: startDateTime, end: endDateTime, id: currentEvent.id } : event));
        setShowModal(false);
    };

    const handleEventDelete = () => {
        setEvents(events.filter(event => event.id !== currentEvent.id));
        setShowModal(false);
        setModalConfirmVisible(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleStaffChange = (e) => {
        const { value } = e.target;
        if (!eventData.employees.includes(value)) {
            setEventData({ ...eventData, employees: [...eventData.employees, value] });
        }
    };

    const removeEmployee = (employeeId) => {
        setEventData({ ...eventData, employees: eventData.employees.filter(id => id !== employeeId) });
    };

    const handleViewChange = (view) => {
        setCurrentView(view);
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            if (view === 'timeGridWeek' || view === 'dayGridMonth') {
                const currentDateString = new Date().toISOString().split('T')[0]; // Set to current date
                let startDate = new Date(calendarApi.view.currentStart);
                startDate.setDate(startDate.getDate() + 1); // Add one day
                const startDateString = startDate.toISOString().split('T')[0];
                const end = calendarApi.view.currentEnd.toISOString().split('T')[0];

                // Compare the dates
                if (startDateString < currentDateString) {
                    setDisplayedWeek({ start: currentDateString, end });
                } else {
                    setDisplayedWeek({ start: startDateString, end });
                }
            }
        }
    };

    const handleRegisterShiftSubmit = (e) => {
        e.preventDefault();
        if (!registerShiftData.shift || !registerShiftData.date) {
            setValidationError("All fields are required for registering a shift.");
            return;
        }

        const duplicate = registeredShifts.some(shift =>
            shift.date === registerShiftData.date && shift.shift === registerShiftData.shift
        );
        if (duplicate) {
            setValidationError("A shift already exists for the selected date and time.");
            return;
        }

        const newShift = {
            ...registerShiftData,
            id: Math.random().toString(36).substr(2, 9),
            userId: user.id
        };
        setRegisteredShifts([...registeredShifts, newShift]);
        setRegisterShiftData({ shift: '', date: '' });
    };

    const handleRegisterShiftEdit = (id) => {
        const shiftToEdit = registeredShifts.find(shift => shift.id === id);
        setRegisterShiftData({ shift: shiftToEdit.shift, date: shiftToEdit.date });
        setEditingShiftId(id);
    };

    const handleRegisterShiftUpdate = () => {
        setRegisteredShifts(registeredShifts.map(shift => shift.id === editingShiftId ? { ...shift, ...registerShiftData } : shift));
        setRegisterShiftData({ shift: '', date: '' });
        setEditingShiftId(null);
    };

    const handleRegisterShiftDelete = (id) => {
        setRegisteredShifts(registeredShifts.filter(shift => shift.id !== id));
    };

    const handleRegisterLeaveSubmit = (e) => {
        e.preventDefault();
        if (!registerLeaveData.startDate || !registerLeaveData.endDate || !registerLeaveData.reason || !registerLeaveData.leaveType) {
            setValidationError("All fields are required for registering leave.");
            return;
        }

        const newLeave = {
            ...registerLeaveData,
            id: Math.random().toString(36).substr(2, 9),
            userId: user.id
        };
        setRegisteredLeaves([...registeredLeaves, newLeave]);
        setRegisterLeaveData({ startDate: '', endDate: '', reason: '', leaveType: '' });
    };

    const handleRegisterLeaveEdit = (id) => {
        const leaveToEdit = registeredLeaves.find(leave => leave.id === id);
        setRegisterLeaveData({
            startDate: leaveToEdit.startDate,
            endDate: leaveToEdit.endDate,
            reason: leaveToEdit.reason,
            leaveType: leaveToEdit.leaveType
        });
        setEditingLeaveId(id);
    };

    const handleRegisterLeaveUpdate = () => {
        setRegisteredLeaves(registeredLeaves.map(leave => leave.id === editingLeaveId ? { ...leave, ...registerLeaveData } : leave));
        setRegisterLeaveData({ startDate: '', endDate: '', reason: '', leaveType: '' });
        setEditingLeaveId(null);
    };

    const handleRegisterLeaveDelete = (id) => {
        setRegisteredLeaves(registeredLeaves.filter(leave => leave.id !== id));
    };

    const calendarRef = useRef(null);

    return (
        <CContainer>
            <Tabs defaultActiveKey="schedule" id="controlled-tab-example">
                <Tab eventKey="schedule" title="Schedule">
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="timeGridWeek"
                        headerToolbar={{
                            start: 'today prev,next', // Will display on the left side
                            center: 'title', // Will display in the center
                            end: 'addShiftButton dayGridMonth,timeGridWeek,timeGridDay', // Will display on the right side
                        }}
                        customButtons={{
                            addShiftButton: {
                                text: 'Add Shift',
                                click: handleAddButtonClick
                            }
                        }}
                        height="80vh"
                        slotMinTime="09:00:00" // Display start time (9 AM)
                        slotMaxTime="21:00:00" // Display end time (9 PM)
                        slotLabelInterval="04:00" // Time label interval of 4 hours
                        slotDuration="04:00"
                        slotLabelFormat={{
                            hour: 'numeric',
                            minute: '2-digit',
                            meridiem: false,
                        }} // Time label format
                        events={events}
                        selectable={true}
                        eventClick={handleEventClick}
                        datesSet={(info) => handleViewChange(info.view.type)}
                    />
                </Tab>
                <Tab eventKey="registerShift" title="Register Shift">
                    <Form onSubmit={editingShiftId ? handleRegisterShiftUpdate : handleRegisterShiftSubmit}>
                        <Form.Group controlId="formShift" style={{ marginTop: "20px" }}>
                            <Form.Label>Shift</Form.Label>
                            <Form.Control
                                as="select"
                                name="shift"
                                value={registerShiftData.shift}
                                onChange={(e) => setRegisterShiftData({ ...registerShiftData, shift: e.target.value })}
                                style={{ border: '1px solid #adb5bd' }}
                            >
                                <option value="">Choose Shift</option>
                                {shifts.map(shift => (
                                    <option key={shift.id} value={shift.id}>{shift.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={registerShiftData.date}
                                onChange={(e) => setRegisterShiftData({ ...registerShiftData, date: e.target.value })}
                                style={{ border: '1px solid #adb5bd' }}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{ marginTop: "15px" }}>
                            {editingShiftId ? "Update" : "Submit"}
                        </Button>
                    </Form>
                    <Table striped bordered hover style={{ marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th>Shift</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registeredShifts.map(shift => (
                                <tr key={shift.id}>
                                    <td>{shifts.find(s => s.id === parseInt(shift.shift))?.name}</td>
                                    <td>{shift.date}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleRegisterShiftEdit(shift.id)}>Edit</Button>{' '}
                                        <Button variant="danger" onClick={() => handleRegisterShiftDelete(shift.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="registerLeave" title="Register Leave">
                    <Form onSubmit={editingLeaveId ? handleRegisterLeaveUpdate : handleRegisterLeaveSubmit}>
                        <Form.Group controlId="formStartDate" style={{ marginTop: "20px" }}>
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="startDate"
                                value={registerLeaveData.startDate}
                                onChange={(e) => setRegisterLeaveData({ ...registerLeaveData, startDate: e.target.value })}
                                style={{ border: '1px solid #adb5bd' }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEndDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="endDate"
                                value={registerLeaveData.endDate}
                                onChange={(e) => setRegisterLeaveData({ ...registerLeaveData, endDate: e.target.value })}
                                style={{ border: '1px solid #adb5bd' }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLeaveType">
                            <Form.Label>Leave Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="leaveType"
                                value={registerLeaveData.leaveType}
                                onChange={(e) => setRegisterLeaveData({ ...registerLeaveData, leaveType: e.target.value })}
                                style={{ border: '1px solid #adb5bd' }}
                            >
                                <option value="">Choose Leave Type</option>
                                {leaveTypes.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formReason">
                            <Form.Label>Reason</Form.Label>
                            <Form.Control
                                type="text"
                                name="reason"
                                value={registerLeaveData.reason}
                                onChange={(e) => setRegisterLeaveData({ ...registerLeaveData, reason: e.target.value })}
                                style={{ border: '1px solid #adb5bd' }}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{ marginTop: "15px" }}>
                            {editingLeaveId ? "Update" : "Submit"}
                        </Button>
                    </Form>
                    <Table striped bordered hover style={{ marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Leave Type</th>
                                <th>Reason</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registeredLeaves.map(leave => (
                                <tr key={leave.id}>
                                    <td>{leave.startDate}</td>
                                    <td>{leave.endDate}</td>
                                    <td>{leaveTypes.find(type => type.id === parseInt(leave.leaveType))?.name}</td>
                                    <td>{leave.reason}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleRegisterLeaveEdit(leave.id)}>Edit</Button>{' '}
                                        <Button variant="danger" onClick={() => handleRegisterLeaveDelete(leave.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>

            {/* Modal for Add/Edit/Delete Event */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalType === 'add' ? 'Add Shift' : 'Edit Shift'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={eventData.title}
                                onChange={handleInputChange}
                                style={{ border: '1px solid #adb5bd' }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formShift">
                            <Form.Label>Shift</Form.Label>
                            <Form.Control
                                as="select"
                                name="shift"
                                value={eventData.shift}
                                onChange={handleInputChange}
                                style={{ border: '1px solid #adb5bd' }}
                            >
                                <option value="">Choose Shift</option>
                                {shifts.map(shift => (
                                    <option key={shift.id} value={shift.id}>{shift.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        {(currentView === 'timeGridWeek' || currentView === 'dayGridMonth') && (
                            <Form.Group controlId="formDate">
                                <Form.Label>Day</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={eventData.date}
                                    min={displayedWeek.start}
                                    max={displayedWeek.end}
                                    onChange={handleInputChange}
                                    style={{ border: '1px solid #adb5bd' }}
                                />
                            </Form.Group>
                        )}
                        <Form.Group controlId="formEmployee">
                            <Form.Label>Staff</Form.Label>
                            <Form.Control
                                as="select"
                                name="employee"
                                value=""
                                onChange={handleStaffChange}
                                style={{ border: '1px solid #adb5bd' }}
                            >
                                <option value="">Choose Staff</option>
                                {staff.map(staff => (
                                    <option key={staff.id} value={staff.id}>{staff.fullName}</option>
                                ))}
                            </Form.Control>
                            <div>
                                {eventData.employees.map(empId => {
                                    const employee = staff.find(st => st.id === parseInt(empId));
                                    return (
                                        <Badge key={empId} pill bg="secondary" className="m-1">
                                            {employee?.fullName}
                                            <span
                                                style={{ marginLeft: '10px', cursor: 'pointer' }}
                                                onClick={() => removeEmployee(empId)}
                                            >
                                                x
                                            </span>
                                        </Badge>
                                    );
                                })}
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {modalType === 'edit' && (
                        <Button variant="danger" onClick={() => {
                            setModalConfirmVisible(true);
                        }}>
                            Delete
                        </Button>
                    )}
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={modalType === 'add' ? handleEventAdd : handleEventEdit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Validation Error Modal */}
            <Modal show={validationError !== ''} onHide={() => setValidationError('')}>
                <CModalHeader className="bg-warning text-white">
                    <CModalTitle id="ErrorModalLabel">Error</CModalTitle>
                </CModalHeader>
                <Modal.Body>{validationError}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setValidationError('')}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Confirm Delete Modal */}
            <Modal show={modalType === 'edit' && modalConfirmVisible} onHide={() => setModalConfirmVisible(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want to delete this shift?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setModalConfirmVisible(false);
                        setCurrentEvent(null);
                    }}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleEventDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </CContainer>
    );
};

export default Schedule;
