import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { uid } from 'uid';
import InvoiceModal from './InvoiceModal';
import WarrantyCardModal from './WarrantyCardModal';
import fetchData from '../../../util/ApiConnection';
import { convertJavaDateToJSDate } from '../../../util/DateConvert';
import UserStorage from '../../../util/UserStorage';

const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenWarranty, setIsOpenWarranty] = useState(false);
  const [tax, setTax] = useState(0);
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
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
  const [staffId, setStaffId] = useState(0);
  const [staffName, setStaffName] = useState('')
  const [customerGiveMoney, setCustomerGiveMoney] = useState(0)
  const [description, setDescription] = useState('none')
  const [sendMoneyMethod, setSendMoneyMethod] = useState('CASH')
  const [bonusPointExchange, setBonusPointExchange] = useState(0)
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [confirmModalVisible, setconfirmModalVisible] = useState(false);

  const [items, setItems] = useState([]);

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0) {
      return prev + Number(curr.price) * Math.floor(curr.qty);
    } else {
      return prev;
    }
  }, 0);

  const taxRate = transactionType === 'SELL' ? (tax * subtotal) / 100 : 0;
  const discountRate = transactionType === 'SELL' ? (promotionValue ? promotionValue * 100 * subtotal : 0) / 100 : 0;
  const total = transactionType === 'SELL' ? subtotal - discountRate + taxRate - bonusPointExchange : subtotal;
  const ExchangeTotal = transactionType === 'EXCHANGE AND RETURN' ? subtotal : 0;
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

  const handleResetBarcode = () => {
    setBarcode('');
    document.getElementById('barcode-input').focus();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true); // Set form submission state to true
  };

  useEffect(() => {
    loadPromotion();
    loadStaff();
  }, []);

  const validate = () => {
    if (staffId <= 0) {
      setErrorMessage('Please choose cashier');
      setErrorModalVisible(true);
      return false;
    }

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

    if (transactionType === 'SELL' && transactionType === 'EXCHANGE AND RETURN') {
      if (customerGiveMoney < total) {
        setErrorMessage('Customer give money must be greater than total price');
        setErrorModalVisible(true);
        return false;
      }
    }
    return true;
  };

  const handleReviewInvoice = () => {
    if (!validate()) {
      return;
    }

    fetchData(`http://localhost:8080/api/v1/customers/check-point/${customerPhone}/${bonusPointExchange}`, 'GET', null, userInfo.accessToken)
      .then(data => {
        console.log(data, bonusPointExchange)
        if (data.status === 'ERROR' && bonusPointExchange > 0 && transactionType === 'SELL') {
          setErrorMessage('Customer does not have enough point');
          setErrorModalVisible(true);
          return;
        }

        setIsOpen(true);
      })

  };

  const addItemHandler = (e) => {
    e.preventDefault();
    fetchData(`http://localhost:8080/api/v1/products/barcode/${barcode}`, 'GET', null, userInfo.accessToken)
      .then(data => {
        if (data.status === 'SUCCESS') {
          if (items.find(item => item.name === data.payload.name)) {
            const newItems = items.map((item) => {
              if (item.name === data.payload.name) {
                if (data.payload.quantity < item.qty + 1 && transactionType === 'SELL') {
                  setErrorMessage('Product quantity in stall is not enough');
                  setErrorModalVisible(true);
                  handleResetBarcode()
                  return item;
                }

                return { ...item, qty: item.qty + 1 };
              }
              return item;
            });

            setItems(newItems);
          } else {
            const id = uid(6);
            const price = transactionType === 'SELL' ? data.payload.sellPrice : data.payload.purchasePrice;

            if (data.payload.quantity < 1 && transactionType === 'SELL') {
              setErrorMessage('Product quantity in stall is not enough');
              setErrorModalVisible(true);
              handleResetBarcode()
              return;
            }

            setItems((prevItems) => [
              ...prevItems,
              {
                productId: data.payload.id,
                id: id,
                name: data.payload.name,
                qty: 1,
                price: price,
                image: data.payload.image,
                description: data.payload.description
              },
            ]);
          }

          handleResetBarcode()
        } else {
          setErrorMessage('Product does not exist');
          setErrorModalVisible(true);
          handleResetBarcode()
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

    fetchData(`http://localhost:8080/api/v1/customers/check-point/${customerPhone}/${bonusPointExchange}`, 'GET', null, userInfo.accessToken)
      .then(data => {
        console.log(data, bonusPointExchange)
        if (data.status === 'ERROR' && bonusPointExchange > 0 && transactionType === 'SELL') {
          setErrorMessage('Customer does not have enough point');
          setErrorModalVisible(true);
          return;
        }

        const orderList = [];
        items.map(item => orderList.push({ productQuantity: item.qty, productId: item.productId }));

        let saveData = {
          "description": description,
          "status": orderStatus,
          "type": transactionType,
          "address": address,
          "totalPrice": total,
          "tax": tax / 100,
          "totalBonusPoint": `${total / 100}`,
          "customerGiveMoney": customerGiveMoney,
          "refundMoney": `${customerGiveMoney >= total ? customerGiveMoney - total : 0}`,
          "sendMoneyMethod": sendMoneyMethod,
          "promotionId": promotionId,
          "staffId": staffId,
          "customerRequest": {
            "fullName": customerName,
            "phone": customerPhone,
            "email": `string${customerPhone}@gmail.com`,
            "address": address,
            "birthday": "2024-06-23T10:35:22.814Z",
            "status": true,
            "bonusPoint": `${total / 100}`
          },
          "orderDetailRequestList": orderList
        };
        console.log(saveData);

        fetchData('http://localhost:8080/api/v1/orders', 'POST', saveData, userInfo.accessToken)
          .then(data => {
            if (data.status === 'SUCCESS') {
              setErrorMessage('Save order successfully');
              setErrorModalVisible(true);
            }
          });

        if (transactionType === 'SELL') {
          // reduce product quantity and reduce bonus point if transaction type is sell and order status is confirmed
          items.forEach(item => {
            fetchData(`http://localhost:8080/api/v1/products/reduce-quantity/${item.productId}/${item.qty}`, 'PATCH', null, userInfo.accessToken)
          })

          fetchData(`http://localhost:8080/api/v1/customers/bonus/${customerPhone}/${bonusPointExchange}`, 'PATCH', null, userInfo.accessToken)
        } else if (transactionType === 'PURCHASE' || transactionType === "EXCHANGE_AND_RETURN") {
          items.forEach(item => {
            fetchData(`http://localhost:8080/api/v1/products/add-quantity/${item.productId}/${item.qty}`, 'PATCH', null, userInfo.accessToken)
          })
        }
      })
  };

  const editItemHandler = (event, productId) => {
    const { name, value } = event.target;

    const newItems = items.map((item) => {
      if (item.productId === productId) {
        let newValue = value;
        if (name === "qty") {
          if (newValue < 0) {
            newValue = 0;
          }
          return { ...item, [name]: newValue };
        }
        return { ...item, [name]: newValue };
      }
      return item;
    });

    setItems(newItems);

    // Validate quantity against stock quantity
    if (name === "qty" && value > 0) {
      fetchData(`http://localhost:8080/api/v1/products/id/${productId}`, 'GET', null, userInfo.accessToken)
        .then(product => {
          if (product.payload.quantity < Number(value) && transactionType === 'SELL') {
            setErrorMessage('Product quantity in stall is not enough');
            setErrorModalVisible(true);

            // Reset to available quantity immediately
            const updatedItems = items.map((item) => {
              if (item.productId === productId) {
                return { ...item, qty: product.payload.quantity }; // Reset to available quantity
              }
              return item;
            });
            setItems(updatedItems);
          }
        });
    }
  };

  const handleBlur = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.productId !== productId || item.qty > 0));
  };

  const formatPrice = (price) => {
    return `${price} VND`;
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
                onChange={(event) => {
                  const selectedOption = event.target.options[event.target.selectedIndex];
                  setStaffName(selectedOption.getAttribute("data-name"));
                  setStaffId(event.target.value);
                }}
              >
                <option value="">Select Cashier</option>
                {staff.map(user => (
                  <option key={user.id} value={user.id} data-name={user.fullName}>
                    {user.fullName}
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            <CCol>
              <strong className="text-sm font-bold">Customer Phone</strong>
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
                <option value="EXCHANGE_AND_RETURN">EXCHANGE_AND_RETURN</option>
              </CFormSelect>
            </CCol>
            <CCol>
              <strong className="text-sm font-bold">Order Description:</strong>
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

          {transactionType === 'SELL' ? <CRow className='mb-4'>
            <CCol>
              <strong className="text-sm font-bold">Customer give money:</strong>
              <CInputGroup>
                <CFormInput
                  required
                  className="flex-1"
                  placeholder="Customer give money"
                  type="text"
                  value={customerGiveMoney}
                  onChange={(event) => setCustomerGiveMoney(event.target.value)}
                />
                <CInputGroupText>VND</CInputGroupText>
              </CInputGroup>
            </CCol>

            <CCol >
              <strong className="text-sm font-bold">Tax Rate (%): </strong>
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
          </CRow> : ""}

          <CRow className='mb-4'>
            <CCol>
              <form>
                <strong className="text-sm font-bold">Barcode {transactionType === 'SELL' ? "" : ""}:</strong>
                <CFormInput
                  id='barcode-input'
                  className="flex-1"
                  placeholder="Scan or enter barcode"
                  type="text"
                  value={barcode}
                  onChange={handleBarcodeChange}
                />
                <CButton
                  type='submit'
                  color="primary"
                  className="rounded px-4 py-2 text-white shadow mt-4"
                  onClick={e => addItemHandler(e)}
                >
                  Add Item
                </CButton>
              </form>
            </CCol>
            {transactionType === 'SELL' ? <CCol>
              <strong className="text-sm font-bold">Bonus point exchange</strong>
              <CFormInput
                required
                className="flex-1"
                placeholder="0"
                min={0}
                type="number"
                value={bonusPointExchange}
                onChange={(event) => setBonusPointExchange(event.target.value)}
              />
            </CCol> : ""}
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
                <CTableHeaderCell style={{ border: "1px solid #000" }}>IMAGE</CTableHeaderCell>
                <CTableHeaderCell style={{ border: "1px solid #000" }}>DESCRIPTION</CTableHeaderCell>
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
                      readOnly
                      type="text"
                      name="name"
                      placeholder="Item name..."
                      value={item.name}
                      onChange={(event) => editItemHandler(event, item.productId)}
                    />
                  </CTableDataCell>
                  <CTableDataCell style={{ border: "1px solid #000" }}>
                    <CFormInput
                      type="number"
                      name="qty"
                      value={item.qty}
                      onChange={(event) => editItemHandler(event, item.productId)}
                      onBlur={() => handleBlur(item.productId)}
                    />
                  </CTableDataCell>
                  <CTableDataCell style={{ border: "1px solid #000" }}>
                    <img src={item.image} alt='jewelry' style={{ width: "100px", height: "100px" }} />
                  </CTableDataCell>
                  <CTableDataCell style={{ border: "1px solid #000" }}>
                    <CFormInput
                      readOnly
                      type="text"
                      name="description"
                      placeholder="Item description..."
                      value={item.description}
                      onChange={(event) => editItemHandler(event, item.productId)}
                    />
                  </CTableDataCell>
                  <CTableDataCell className="text-right" style={{ border: "1px solid #000" }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <CFormInput
                        readOnly
                        type="number"
                        name="price"
                        value={item.price}
                        onChange={(event) => editItemHandler(event, item.productId)}
                        style={{ textAlign: 'left', border: '1px solid #D8D4D3', width: '100%' }}
                      />
                      <span style={{ marginLeft: '5px' }}>VND</span>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-right" style={{ border: "1px solid #000", textAlign: 'right', padding: '13px 12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <span>{(Number(item.price) * item.qty).toFixed(2)}</span>
                      <span>VND</span>
                    </div>
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

          <h3 className='text-center'>Bill Calculate</h3>
          <div style={{ display: "flex" }} className='mt-4'>
            <div style={{ flex: 2, paddingRight: "40px" }}>
              {transactionType === 'SELL' ? <>
                <CRow className="flex justify-end pt-6">
                  <CCol style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ display: "inline-block" }} className="font-bold">Subtotal:</strong>
                    <span style={{ display: "inline-block" }}>{subtotal.toFixed(2)}VND</span>
                  </CCol>
                </CRow>
                <CRow className="flex justify-end">
                  <CCol style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ display: "inline-block" }} className="font-bold">Discount:</strong>
                    <span style={{ display: "inline-block" }}>({promotionValue ? promotionValue * 100 : '0'}%) - {discountRate.toFixed(2)}VND</span>
                  </CCol>
                </CRow>
                <CRow className="flex justify-end">
                  <CCol style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ display: "inline-block" }} className="font-bold">Tax:</strong>
                    <span style={{ display: "inline-block" }}>({tax || '0'}%) + {taxRate.toFixed(2)}VND</span>
                  </CCol>
                </CRow>
                <CRow className="flex justify-end">
                  <CCol style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ display: "inline-block" }} className="font-bold">Exchange bonus Point:</strong>
                    <span style={{ display: "inline-block" }}>- {bonusPointExchange}VND</span>
                  </CCol>
                </CRow>
              </> : ""}

              <CRow className="flex justify-end border-t mt-2">
                <CCol style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong style={{ display: "inline-block" }} className="font-bold">Total:</strong>
                  <span style={{ display: "inline-block" }} className="font-bold">{total % 1 === 0 ? total : total.toFixed(2)}VND</span>
                </CCol>
              </CRow>

              {transactionType === 'SELL' ? <>
                <CRow className="flex justify-end border-t">
                  <CCol style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ display: "inline-block" }} className="font-bold">Customer give money:</strong>
                    <span style={{ display: "inline-block" }} className="font-bold">{customerGiveMoney}VND</span>
                  </CCol>
                </CRow>

                <CRow className="flex justify-end border-t">
                  <CCol style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ display: "inline-block" }} className="font-bold">Refund money:</strong>
                    <span style={{ display: "inline-block" }} className="font-bold">{customerGiveMoney >= total ? customerGiveMoney - total : 0}VND</span>
                  </CCol>
                </CRow>
              </> : ""}
            </div>
            <div style={{ flex: 1 }}>
              <CRow className='mb-4'>
                {transactionType === 'SELL' ?
                  <>
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
                      {promotion
                        .filter(promotion => {
                          const currentDate = new Date();
                          return currentDate >= convertJavaDateToJSDate(promotion.startDate)
                            && currentDate <= convertJavaDateToJSDate(promotion.endDate)
                            && subtotal >= promotion.minimumPrize
                            && subtotal <= promotion.maximumPrize
                            ;
                        })
                        .map(promotion => (
                          <option key={promotion.id} value={promotion.discount} data-id={promotion.id}>
                            {promotion.name} {promotion.discount * 100}%
                          </option>
                        ))
                      }
                    </CFormSelect>
                  </> : ""}

                <strong className="text-sm font-bold">{transactionType === 'SELL' ? "Payment method" : "Recieve money method"}</strong>
                <CFormSelect
                  required
                  value={sendMoneyMethod}
                  onChange={(event) => setSendMoneyMethod(event.target.value)}
                >
                  <option value="CASH">{transactionType === 'SELL' ? "Payment " : "Recieve "}by cash</option>
                  <option value="BANK_TRANSFER">{transactionType === 'SELL' ? "Payment " : "Recieve "}by bank transfer</option>
                  <option value="DOMESTIC_ATM">{transactionType === 'SELL' ? "Payment " : "Recieve "}by domestic ATM card</option>
                  <option value="CREDIT_OR_DEBIT_CARD">{transactionType === 'SELL' ? "Payment " : "Recieve "}by credit card or debit card</option>
                  {transactionType === 'SELL' ? <><option value="INSTALLMENT_CREDIT_CARD">Installment payment by credit card</option>
                    <option value="PAYMENT_GATEWAY">Payment by online payment gateway</option></> : ""}
                </CFormSelect>
                <strong className="text-sm font-bold">Order Status:</strong>
                <CFormSelect
                  required
                  value={orderStatus}
                  onChange={(event) => setOrderStatus(event.target.value)}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                </CFormSelect>
              </CRow>
            </div>
          </div>


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
            style={{ marginRight: "10px" }}
            color="primary"
            className="rounded px-4 py-2 text-white shadow"
            onClick={() => setIsOpenWarranty(true)}
          >
            Warranty Card
          </CButton>

          <CButton
            color="success"
            className="rounded px-4 py-2 text-white shadow"
            onClick={() => setconfirmModalVisible(true)}
          >
            Save Order
          </CButton>

          <WarrantyCardModal
            isOpenWarranty={isOpenWarranty}
            setIsOpenWarranty={setIsOpenWarranty}
          />
          <InvoiceModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            invoiceInfo={{
              customerName,
              staffName,
              transactionType,
              customerPhone,
              address,
              subtotal,
              taxRate,
              discountRate,
              total,
              customerGiveMoney,
              bonusPointExchange,
              refundMoney: `${customerGiveMoney >= total ? customerGiveMoney - total : 0}`
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

      <CModal
        visible={confirmModalVisible}
        onClose={() => setconfirmModalVisible(false)}
        aria-labelledby="ErrorModalLabel"
      >
        <CModalHeader>
          <CModalTitle id="ErrorModalLabel">Confirm Order</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Do you want to save this order? </p>
        </CModalBody>
        <CModalFooter>
          <CButton className='custom-btn custom-btn-secondary'
            color="secondary" onClick={() => setconfirmModalVisible(false)}>
            Close
          </CButton>
          <CButton className='custom-btn custom-btn-success'
            color="success" onClick={() => {
              handleSaveOrder()
              setconfirmModalVisible(false)
            }}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default InvoiceForm;
