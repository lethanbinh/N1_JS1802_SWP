import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CFormSelect,
  CTableRow
} from '@coreui/react';
import React, { useState, useEffect } from 'react';
import { uid } from 'uid';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import incrementString from './incrementString';
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
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [userInfo, setUserInfo] = useState(UserStorage.getAuthenticatedUser());
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [transactionType, setTransactionType] = useState('SELL');
  const [orderStatus, setOrderStatus] = useState('PENDING');
  const [barcode, setBarcode] = useState('');
  const [promotion, setPromotion] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [items, setItems] = useState([
    {
      id: uid(6),
      name: '',
      qty: 1,
      price: '1.00',
    },
  ]);

  useEffect(() => {
    if (barcode.length > 0) {
      fetchData(`http://localhost:8080/api/v1/products/barcode/${barcode}`, "GET", null, userInfo.accessToken)
        .then((response) => {
          console.log("Product data fetched successfully:", response);
          if (response.name) {
            const id = uid(6);
            const newItem = {
              id: id,
              name: response.name,
              qty: 1,
              price: response.price,
            };
            setItems(prevItems => [...prevItems, newItem]);
            setBarcode('');
          }
        })
        .catch((error) => {
          console.error("Error fetching product data:", error.message);
        });
    }
  }, [barcode, userInfo.accessToken]);


  const handleBarcodeChange = (event) => {
    setBarcode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true); // Set form submission state to true
  };

  useEffect(() => {
    if (formSubmitted) {
      const createOrder = async () => {
        try {
          const response = await fetchData('http://localhost:8080/api/v1/orders', 'POST',
            null
            , userInfo.accessToken);
          console.log('Order created successfully:', response);
          // Handle success scenario, e.g., show confirmation, clear form, etc.
        } catch (error) {
          console.error('Error creating order:', error);
          // Handle error scenario, e.g., show error message to user
        } finally {
          setFormSubmitted(false); // Reset form submission state
        }
      };

      createOrder();
    }
  }, [formSubmitted, userInfo.accessToken]);

  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };



  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setItems([
      {
        id: uid(6),
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
  };

  const handleReviewInvoice = () => {
    setIsOpen(true);
  };

  // const addItemHandler = () => {
  //   const id = uid(6);
  //   setItems((prevItems) => [
  //     ...prevItems,
  //     {
  //       id: id,
  //       name: '',
  //       qty: 1,
  //       price: '1.00',
  //     },
  //   ]);
  // };

  const deleteItemHandler = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const editItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((item) => {
      if (item.id === editedItem.id) {
        return { ...item, [editedItem.name]: editedItem.value };
      }
      return item;
    });

    setItems(newItems);
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0) {
      return prev + Number(curr.price) * Math.floor(curr.qty);
    } else {
      return prev;
    }
  }, 0);

  const taxRate = (tax * subtotal) / 100;
  const discountRate = (promotion * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  return (
    <CRow
      className="relative flex flex-col px-2 md:flex-row"
      onSubmit={handleSubmit}
    >
      <CCard className='my-6 flex-1 space-y-2 rounded-lg p-4 shadow-sm sm:space-y-4 md:p-6'>
        <CCardBody>
          <CRow className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
            <CCol className="flex space-x-2">
              <strong className="font-bold">Current Date: </strong>
              <span>{today}</span>
            </CCol>
            <CCol className="flex items-center space-x-2">
              <strong className="font-bold" htmlFor="transactionType">
                Order Type:
              </strong>
              <CFormSelect
                required
                className="max-w-[130px]"
                name="transactionType"
                id="transactionType"
                value={transactionType}
                onChange={(event) => setTransactionType(event.target.value)}
              >
                <option value="SELL">SELL</option>
                <option value="PURCHASE">PURCHASE</option>
              </CFormSelect>
            </CCol>
          </CRow>

          <h2 className="text-center text-lg font-bold">INVOICE</h2>
          <CRow className="grid grid-cols-2 gap-2 pt-4 pb-8">
            <CCol>
              <strong
                htmlFor="cashierName"
                className="text-sm font-bold sm:text-base"
              >
                Cashier:
              </strong>
              <CFormInput
                required
                className="flex-1"
                placeholder="Cashier name"
                type="text"
                name="cashierName"
                id="cashierName"
                value={cashierName}
                onChange={(event) => setCashierName(event.target.value)}
              />
            </CCol>
            <CCol>
              <strong
                htmlFor="customerPhone"
                className="col-start-2 row-start-1 text-sm font-bold md:text-base"
              >
                Phone Customer:
              </strong>
              <CFormInput
                required
                className="flex-1"
                placeholder="Phone Customer"
                type="tel"
                name="customerPhone"
                id="customerPhone"
                value={customerPhone}
                onChange={(event) => setCustomerPhone(event.target.value)}
                pattern="[0-9]{10}" // Hoặc thay đổi mẫu để phù hợp với định dạng số điện thoại của bạn
                title="Please enter a valid phone number (10 digits)"
              />
            </CCol>
            <CCol>
              <strong
                htmlFor="orderStatus"
                className="text-sm font-bold sm:text-base"
              >
                Order Status:
              </strong>
              <CFormSelect
                required
                className="flex-1"
                name="orderStatus"
                id="orderStatus"
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
              <strong htmlFor="barcode" className="text-sm font-bold sm:text-base">
                Barcode:
              </strong>
              <CFormInput
                className="flex-1"
                placeholder="Scan or enter barcode"
                type="text"
                name="barcode"
                id="barcode"
                value={barcode}
                onChange={handleBarcodeChange}
              />
            </CCol>
          </CRow>

          <CTable className="w-full p-4 text-left">
            <CTableHead>
              <CTableRow className="border-b border-gray-900/10 text-sm md:text-base">
                <CTableHeaderCell>ITEM</CTableHeaderCell>
                <CTableHeaderCell>QTY</CTableHeaderCell>
                <CTableHeaderCell>PRICE</CTableHeaderCell>
                <CTableHeaderCell>ACTION</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {items.map((item) => (
                <InvoiceItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  qty={item.qty}
                  price={item.price}
                  onDeleteItem={deleteItemHandler}
                  onEditItem={editItemHandler} // Đã sửa thành onEditItem để phù hợp với InvoiceItem
                />
              ))}
            </CTableBody>
          </CTable>
          {/* <CButton
            color="primary"
            className="rounded px-4 py-2 text-sm text-white shadow"
            onClick={addItemHandler}
          >
            Add Item
          </CButton> */}
          <CRow className="flex flex-col items-end space-y-2 pt-6 mt-10">
            <CCol className="flex w-full justify-between md:w-1/2 pt-2">
              <strong className="font-bold me-3">Subtotal:</strong>
              <span>${subtotal.toFixed(2)}</span>
            </CCol>
            <CCol className="flex w-full justify-between md:w-1/2">
              <strong className="font-bold me-3">Discount:</strong>
              <span>
                ({promotion || '0'}%) ${discountRate.toFixed(2)}
              </span>
            </CCol>

            <CCol className="flex w-full justify-between md:w-1/2">
              <strong className="font-bold me-3">Tax:</strong>
              <span>
                ({tax || '0'}%) ${taxRate.toFixed(2)}
              </span>
            </CCol>
            <CRow className="border-t border-gray-900/10 pt-2">
              <CCol className="flex w-full justify-between md:w-1/2">
                <strong className="font-bold me-3">Total:</strong>
                <span className="font-bold">
                  ${total % 1 === 0 ? total : total.toFixed(2)}
                </span>
              </CCol>
            </CRow>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard className='my-6 flex-1 space-y-2 rounded-lg p-4 shadow-sm sm:space-y-4 md:p-6'>
        <CCardBody className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
          <CButton
            color="primary"
            className="rounded px-4 py-2 text-sm text-white shadow"
            onClick={handleReviewInvoice}
          >
            Review Invoice
          </CButton>
          <InvoiceModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            invoiceInfo={{
              invoiceNumber,
              cashierName,
              customerPhone,
              subtotal,
              taxRate,
              discountRate,
              total,
            }}
            items={items}
            onAddNextInvoice={addNextInvoiceHandler}
          />
          <CRow className="space-y-4 py-2">
            <CCol className="space-y-2">
              <label className="text-sm font-bold md:text-base" htmlFor="tax">
                Tax rate:
              </label>
              <CCol className="flex items-center">
                <CFormInput
                  className="w-full rounded-r-none shadow-sm"
                  type="number"
                  name="tax"
                  id="tax"
                  min="0.01"
                  step="0.01"
                  placeholder="0.0"
                  value={tax}
                  onChange={(event) => setTax(event.target.value)}
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  %
                </span>
              </CCol>
            </CCol>
            <CCol className="space-y-2">
              <CCol className="flex w-full justify-between md:w-1/2">
                <strong className="font-bold me-3">Discount:</strong>
                <CFormSelect
                  className="w-full"
                  name="promotion"
                  id="promotion"
                  value={promotion}
                  onChange={(event) => setPromotion(event.target.value)}
                >
                  <option value="">None</option>
                  <option value="10">10% Summer Delight</option>
                  <option value="20">20% Winter Wonderland</option>
                  <option value="30">30% Spring Special</option>
                  <option value="40">40% Autumn Fest</option>
                  <option value="33">33% New Year Celebration</option>
                  <option value="12">12% Black Friday Extravaganza</option>
                  <option value="30">30% Cyber Monday Deals</option>
                  <option value="40">40% Valentine's Day Sale</option>
                  <option value="20">20% Easter Sale</option>
                  <option value="20">20% Halloween Sale</option>
                </CFormSelect>
              </CCol>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CRow>
  );
};

export default InvoiceForm;
