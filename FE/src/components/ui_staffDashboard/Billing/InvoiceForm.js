import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CFormSelect,
  CTableRow,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormTextarea,
} from '@coreui/react';
import React, { useState, useEffect } from 'react';
import { uid } from 'uid';
import InvoiceModal from './InvoiceModal';
import fetchData from '../../../util/ApiConnection';
import UserStorage from '../../../util/UserStorage';

const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tax, setTax] = useState('');
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [transactionType, setTransactionType] = useState('SELL');
  const [orderStatus, setOrderStatus] = useState('PENDING');
  const [barcode, setBarcode] = useState('');
  const [promotion, setPromotion] = useState([]);
  const [promotionValue, setPromotionValue] = useState('');
  const [promotionId, setPromotionId] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [staff, setStaff] = useState([]);
  const [staffId, setStaffId] = useState('');
  const [customerGiveMoney, setCustomerGiveMoney] = useState(0)
  const [description, setDescription] = useState('')

  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const [items, setItems] = useState([]);

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0) {
      return prev + Number(curr.price) * Math.floor(curr.qty);
    } else {
      return prev;
    }
  }, 0);

  const taxRate = (tax * subtotal) / 100;
  const discountRate = (promotionValue ? promotionValue * 100 * subtotal : 0) / 100;
  const total = subtotal - discountRate + taxRate

  const handleBarcodeChange = (event) => {
    setBarcode(event.target.value);
  };

  const loadPromotion = () => {
    fetchData('http://localhost:8080/api/v1/promotions', 'GET', null, userInfo.accessToken)
      .then(data => {
        setPromotion(data.payload);
      });
  };

  const loadStaff = () => {
    fetchData('http://localhost:8080/api/v1/users', 'GET', null, userInfo.accessToken)
      .then(data => {
        setStaff(data.payload.filter(item => item.roleName.toUpperCase() === 'STAFF'));
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true); // Set form submission state to true
  };

  useEffect(() => {
    loadPromotion();
    loadStaff();
  }, []);

  const validate = () => {
    if (customerPhone.length < 1) {
      setErrorMessage('Please fill customer phone');
      setErrorModalVisible(true);
      return false;
    }

    if (items.length < 1) {
      setErrorMessage('Please Add item');
      setErrorModalVisible(true);
      return false;
    }

    if (tax > 100 || tax < 0) {
      setErrorMessage('Tax must be 0 - 100%');
      setErrorModalVisible(true);
      return false;
    }

    if (customerName.length < 1) {
      setErrorMessage('Please fill customer name');
      setErrorModalVisible(true);
      return false;
    }

    if (!customerPhone.match("^(\\+84|0)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1-5]|9[0-4|6-9])[0-9]{7}$")) {
      setErrorMessage('Invalid Vietnamese phone numbers');
      setErrorModalVisible(true);
      return false;
    }

    if (customerGiveMoney < total) {
      setErrorMessage('Customer give money must be greater than total price');
      setErrorModalVisible(true);
      return false;
    }

    return true;
  };

  const handleReviewInvoice = () => {
    if (!validate()) {
      return;
    }

    setIsOpen(true);
  };

  const addItemHandler = (e) => {
    e.preventDefault();
    fetchData(`http://localhost:8080/api/v1/products/barcode/${barcode}`, 'GET', null, userInfo.accessToken)
      .then(data => {
        if (data.status === 'SUCCESS') {
          if (items.find(item => item.name === data.payload.name)) {
            const newItems = items.map((item) => {
              if (item.name === data.payload.name) {
                return { ...item, qty: item.qty + 1 };
              }
              return item;
            });

            setItems(newItems);
          } else {
            const id = uid(6);
            setItems((prevItems) => [
              ...prevItems,
              {
                productId: data.payload.id,
                id: id,
                name: data.payload.name,
                qty: 1,
                price: data.payload.sellPrice,
              },
            ]);
          }

          setBarcode('');
          document.getElementById('barcode-input').focus();
        } else {
          setErrorMessage('Product is not exists');
          setErrorModalVisible(true);
          setBarcode('');
          document.getElementById('barcode-input').focus();
          return;
        }
      });
  };

  const deleteItemHandler = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSaveOrder = () => {
    if (!validate()) {
      return;
    }

    const orderList = [];
    items.map(item => orderList.push({ productQuantity: item.qty, productId: item.productId }));

    let data = {
      "description": "string",
      "status": orderStatus,
      "type": transactionType,
      "address": address,
      "tax": tax / 100,
      "promotionId": promotionId,
      "staffId": staffId,
      "customerGiveMoney": customerGiveMoney,
      "description": description,
      "customerRequest": {
        "fullName": customerName,
        "phone": customerPhone,
        "email": `string${customerPhone}@gmail.com`,
        "address": address,
        "birthday": "2024-06-23T10:35:22.814Z",
        "status": true,
        "bonusPoint": 0
      },
      "orderDetailRequestList": orderList
    };

    console.log(data);

    fetchData('http://localhost:8080/api/v1/orders', 'POST', data, userInfo.accessToken)
      .then(data => {
        if (data.status === 'SUCCESS') {
          setErrorMessage('Save order successfully');
          setErrorModalVisible(true);
        }
      });
  };

  const editItemHandler = (event, id) => {
    const { name, value } = event.target;

    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, [name]: value };
      }
      return item;
    });

    setItems(newItems);
  };





  return (
    <CRow className="relative flex flex-col px-2 md:flex-row" onSubmit={handleSubmit}>
      <CCard className="my-6 flex-1 rounded-lg p-4 shadow-sm md:p-6">
        <CCardBody>
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold">GoldenB Jewelry</h1>
            <p>Phone: +84 912 345 678</p>
            <p>123 ABC Street, DEF City</p>
          </div>
          <CRow className="mb-4">
            <CCol>
              <h5 className="font-bold">INVOICE</h5>
              <p>Date: {today}</p>
            </CCol>
          </CRow>

          <CRow className="mb-4">
            <CCol>
              <strong className="text-sm font-bold">Cashier:</strong>
              <CFormSelect
                name="staff"
                value={staffId}
                onChange={(event) => setStaffId(event.target.value)}
              >
                <option value="">Select Cashier</option>
                {staff.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.fullName}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol>
              <strong className="text-sm font-bold">Customer Phone:</strong>
              <CFormInput
                required
                className="flex-1"
                placeholder="Customer Phone"
                type="tel"
                value={customerPhone}
                onChange={(event) => setCustomerPhone(event.target.value)}
                pattern="[0-9]{10}"
                title="Please enter a valid phone number (10 digits)"
              />
            </CCol>
          </CRow>

          <CRow className="mb-4">
            <CCol>
              <strong className="text-sm font-bold">Address:</strong>
              <CFormInput
                required
                className="flex-1"
                placeholder="Customer Address"
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </CCol>
            <CCol>
              <strong className="text-sm font-bold">Order Status:</strong>
              <CFormSelect
                required
                value={orderStatus}
                onChange={(event) => setOrderStatus(event.target.value)}
              >
                <option value="PENDING">PENDING</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="CANCELLED">CANCELLED</option>
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow className="mb-4">

            <CCol>
              <strong className="text-sm font-bold">Order Type:</strong>
              <CFormSelect
                required
                value={transactionType}
                onChange={(event) => setTransactionType(event.target.value)}
              >
                <option value="SELL">SELL</option>
                <option value="PURCHASE">PURCHASE</option>
              </CFormSelect>
            </CCol>
            <CCol>
              <strong className="text-sm font-bold">Tax Rate (%):</strong>
              <CFormInput
                type="number"
                min={0}
                max={100}
                step={1}
                placeholder="0.0"
                value={tax}
                onChange={(event) => setTax(event.target.value)}
              />
            </CCol>


          </CRow>

          <CRow className='mb-4'>
            <CCol>
              <strong className="text-sm font-bold">Discount:</strong>
              <CFormSelect
                name="promotionValue"
                value={promotionValue}
                onChange={(event) => {
                  setPromotionId(event.target.selectedOptions[0].getAttribute('data-id'));
                  setPromotionValue(event.target.value);
                }}
              >
                <option value="">None</option>
                {promotion.map(promotion => (
                  <option key={promotion.id} value={promotion.discount} data-id={promotion.id}>
                    {promotion.name} {promotion.discount * 100}%
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            <CCol>
              <strong className="text-sm font-bold">Customer Name:</strong>
              <CFormInput
                required
                className="flex-1"
                placeholder="Customer Name"
                type="text"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
              />
            </CCol>
          </CRow>

          <CRow>
            <CCol>
              <strong className="text-sm font-bold">Customer give money:</strong>
              <CFormInput
                required
                className="flex-1"
                placeholder="Customer give money"
                type="text"
                value={customerGiveMoney}
                onChange={(event) => setCustomerGiveMoney(event.target.value)}
              />
            </CCol>
            <CCol>
              <strong className="text-sm font-bold">Description:</strong>
              <CFormTextarea
                required
                className="flex-1"
                placeholder="Description for order"
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </CCol>
          </CRow>

          <CRow className='mb-4'>
            <form>
              <CCol>
                <strong className="text-sm font-bold">Barcode:</strong>
                <CFormInput
                  id='barcode-input'
                  className="flex-1"
                  placeholder="Scan or enter barcode"
                  type="text"
                  value={barcode}
                  onChange={handleBarcodeChange}
                />
              </CCol>

              <CButton
                type='submit'
                color="primary"
                className="rounded px-4 py-2 text-white shadow mt-4"
                onClick={e => addItemHandler(e)}
              >
                Add Item
              </CButton>
            </form>
          </CRow>


        </CCardBody>
      </CCard>

      <CCard className="my-6 flex-1 rounded-lg p-4 shadow-sm md:p-6">
        <CCardBody>
          {items.length > 0 && <CTable className="w-full text-left table-auto border " style={{ borderCollapse: "collapse" }}>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell style={{ border: "1px solid #000" }}>ITEM</CTableHeaderCell>
                <CTableHeaderCell style={{ border: "1px solid #000" }}>QTY</CTableHeaderCell>
                <CTableHeaderCell className="text-right" style={{ border: "1px solid #000" }}>UNIT PRICE</CTableHeaderCell>
                <CTableHeaderCell className="text-right" style={{ border: "1px solid #000" }}>AMOUNT</CTableHeaderCell>
                <CTableHeaderCell style={{ border: "1px solid #000" }}>ACTION</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {items.map((item) => (
                <CTableRow key={item.id}>
                  <CTableDataCell style={{ border: "1px solid #000" }}>
                    <CFormInput
                      type="text"
                      name="name"
                      placeholder="Item name..."
                      value={item.name}
                      onChange={(event) => editItemHandler(event, item.id)}
                    />
                  </CTableDataCell>
                  <CTableDataCell style={{ border: "1px solid #000" }}>
                    <CFormInput
                      type="number"
                      name="qty"
                      value={item.qty}
                      onChange={(event) => editItemHandler(event, item.id)}
                    />
                  </CTableDataCell>
                  <CTableDataCell className="text-right" style={{ border: "1px solid #000" }}>
                    <CFormInput
                      type="number"
                      name="price"
                      value={item.price}
                      onChange={(event) => editItemHandler(event, item.id)}
                    />
                  </CTableDataCell>
                  <CTableDataCell className="text-right" style={{ border: "1px solid #000" }}>
                    ${(Number(item.price) * item.qty).toFixed(2)}
                  </CTableDataCell>
                  <CTableDataCell style={{ border: "1px solid #000" }}>
                    <CButton
                      color="danger"
                      onClick={() => deleteItemHandler(item.id)}
                    >
                      Delete
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>}

          <CRow className="flex justify-end pt-6 mt-4">
            <CCol style={{ display: "flex", justifyContent: "space-between" }}>
              <strong style={{ display: "inline-block" }} className="font-bold">Subtotal:</strong>
              <span style={{ display: "inline-block" }}>${subtotal.toFixed(2)}</span>
            </CCol>
          </CRow>

          <CRow className="flex justify-end">
            <CCol style={{ display: "flex", justifyContent: "space-between" }}>
              <strong style={{ display: "inline-block" }} className="font-bold">Discount:</strong>
              <span style={{ display: "inline-block" }}>({promotionValue ? promotionValue * 100 : '0'}%) -${discountRate.toFixed(2)}</span>
            </CCol>
          </CRow>

          <CRow className="flex justify-end">
            <CCol style={{ display: "flex", justifyContent: "space-between" }}>
              <strong style={{ display: "inline-block" }} className="font-bold">Tax:</strong>
              <span style={{ display: "inline-block" }}>({tax || '0'}%) +${taxRate.toFixed(2)}</span>
            </CCol>
          </CRow>

          <CRow className="flex justify-end border-t mt-2">
            <CCol style={{ display: "flex", justifyContent: "space-between" }}>
              <strong style={{ display: "inline-block" }} className="font-bold">Total:</strong>
              <span style={{ display: "inline-block" }} className="font-bold">${total % 1 === 0 ? total : total.toFixed(2)}</span>
            </CCol>
          </CRow>

          <CRow className="flex justify-end border-t">
            <CCol style={{ display: "flex", justifyContent: "space-between" }}>
              <strong style={{ display: "inline-block" }} className="font-bold">Customer give money:</strong>
              <span style={{ display: "inline-block" }} className="font-bold">${customerGiveMoney}</span>
            </CCol>
          </CRow>

          <CRow className="flex justify-end border-t">
            <CCol style={{ display: "flex", justifyContent: "space-between" }}>
              <strong style={{ display: "inline-block" }} className="font-bold">Refund money:</strong>
              <span style={{ display: "inline-block" }} className="font-bold">${customerGiveMoney >= total ? customerGiveMoney - total : 0}</span>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard className="my-6 flex-1 rounded-lg p-4 shadow-sm md:p-6">
        <CCardBody className="space-y-4">
          <CButton
            style={{ marginRight: "10px" }}
            color="primary"
            className="rounded px-4 py-2 text-white shadow"
            onClick={handleReviewInvoice}
          >
            Review Invoice
          </CButton>

          <CButton
            color="success"
            className="rounded px-4 py-2 text-white shadow"
            onClick={handleSaveOrder}
          >
            Save Order
          </CButton>
          <InvoiceModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            invoiceInfo={{
              cashierName,
              customerPhone,
              address,
              subtotal,
              taxRate,
              discountRate,
              total,
              invoiceNumber
            }}
            items={items}
          />
        </CCardBody>
      </CCard>

      <CModal
        visible={errorModalVisible}
        onClose={() => setErrorModalVisible(false)}
        aria-labelledby="ErrorModalLabel"
      >
        <CModalHeader>
          <CModalTitle id="ErrorModalLabel">Input information notification</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>{errorMessage}</p>
        </CModalBody>
        <CModalFooter>
          <CButton className='custom-btn custom-btn-secondary' color="secondary" onClick={() => setErrorModalVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default InvoiceForm;
