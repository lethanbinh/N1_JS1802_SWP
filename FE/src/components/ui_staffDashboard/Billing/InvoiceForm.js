import React, { useState } from 'react';
import { uid } from 'uid';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import incrementString from './incrementString';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormLabel,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

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
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([
    {
      id: uid(6),
      name: '',
      qty: 1,
      price: '1.00',
    },
  ]);

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
    setIsOpen(true); // Hàm xử lý khi click vào button Review Invoice
  };
  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
    });

    setItems(newItems);
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);
  const taxRate = (tax * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  return (
    <CRow
      className="relative flex flex-col px-2 md:flex-row"
      onSubmit={reviewInvoiceHandler}
    >
      <CCard className='my-6 flex-1 space-y-2 rounded-lg bg-white p-4 shadow-sm sm:space-y-4 md:p-6'>
        <CCardBody>
          <CRow className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
            <CCol className="flex space-x-2">
              <strong className="font-bold">Current Date: </strong>
              <span>{today}</span>
            </CCol>
            <CCol className="flex items-center space-x-2">
              <strong className="font-bold" htmlFor="invoiceNumber">
                Invoice Number:
              </strong>
              <CFormInput
                required
                className="max-w-[130px]"
                type="number"
                name="invoiceNumber"
                id="invoiceNumber"
                min="1"
                step="1"
                value={invoiceNumber}
                onChange={(event) => setInvoiceNumber(event.target.value)}
              />
            </CCol>
          </CRow>
          {/* </div> */}
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
                htmlFor="customerName"
                className="col-start-2 row-start-1 text-sm font-bold md:text-base"
              >
                Customer:
              </strong>
              <CFormInput
                required
                className="flex-1"
                placeholder="Customer name"
                type="text"
                name="customerName"
                id="customerName"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
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
                  onEdtiItem={edtiItemHandler}
                />
              ))}
            </CTableBody>
          </CTable>
          <CButton
            color="primary" // Tương đương với bg-blue-500
            className="rounded px-4 py-2 text-sm text-white shadow"
            onClick={addItemHandler}
          >
            Add Item
          </CButton>
          <CRow className="flex flex-col items-end space-y-2 pt-6 mt-10">
            <CCol className="flex w-full justify-between md:w-1/2 pt-2">
              <strong className="font-bold me-3">Subtotal:</strong>
              <span>${subtotal.toFixed(2)}</span>
            </CCol>
            <div className="flex w-full justify-between md:w-1/2">
              <strong className="font-bold me-3">Discount:</strong>
              <span>
                ({discount || '0'}%)${discountRate.toFixed(2)}
              </span>
            </div>
            <div className="flex w-full justify-between md:w-1/2">
              <strong className="font-bold me-3">Tax:</strong>
              <span>
                ({tax || '0'}%)${taxRate.toFixed(2)}
              </span>
            </div>
            <CRow className="border-t border-gray-900-10 pt-2">
              <CCol className="flex w-full justify-between md-w-1-2">
                <strong className="font-bold me-3">Total:</strong>
                <span className="font-bold">
                  ${total % 1 === 0 ? total : total.toFixed(2)}
                </span>
              </CCol>
            </CRow>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard className='my-6 flex-1 space-y-2 rounded-lg bg-white p-4 shadow-sm sm:space-y-4 md:p-6'>
        <CCardBody className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
          <CButton
            color="primary" // Tương đương với bg-blue-500
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
              customerName,
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
                  className="w-full rounded-r-none bg-white shadow-sm"
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
              <CFormLabel
                className="text-sm font-bold md:text-base"
                htmlFor="discount"
              >
                Discount rate:
              </CFormLabel>
              <div className="flex items-center">
                <CFormInput
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="number"
                  name="discount"
                  id="discount"
                  min="0"
                  step="0.01"
                  placeholder="0.0"
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  %
                </span>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CRow>
  );
};

export default InvoiceForm;
