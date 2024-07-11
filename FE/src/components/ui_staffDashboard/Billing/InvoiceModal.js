import {
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
} from '@coreui/react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import React from 'react';
import '../../../customStyles.css';

const InvoiceModal = ({ isOpen, setIsOpen, invoiceInfo, items }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const SaveAsPDFHandler = () => {
    const dom = document.getElementById('print');
    toPng(dom)
      .then((dataUrl) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = dataUrl;
        img.onload = () => {
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'in',
            format: [8.5, 11],
          });

          const imgProps = pdf.getImageProperties(img);
          const imageType = imgProps.fileType;
          const pdfWidth = pdf.internal.pageSize.getWidth();

          const pxFullHeight = imgProps.height;
          const pxPageHeight = Math.floor((imgProps.width * 11) / 8.5);
          const nPages = Math.ceil(pxFullHeight / pxPageHeight);

          let pageHeight = pdf.internal.pageSize.getHeight();

          const pageCanvas = document.createElement('canvas');
          const pageCtx = pageCanvas.getContext('2d');
          pageCanvas.width = imgProps.width;
          pageCanvas.height = pxPageHeight;

          for (let page = 0; page < nPages; page++) {
            if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
              pageCanvas.height = pxFullHeight % pxPageHeight;
              pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
            }
            const w = pageCanvas.width;
            const h = pageCanvas.height;
            pageCtx.fillStyle = 'white';
            pageCtx.fillRect(0, 0, w, h);
            pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

            if (page) pdf.addPage();

            const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
            pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
          }

          pdf.save(`invoice.pdf`);
        };
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  };

  return (
    <CModal alignment="center" visible={isOpen} onClose={closeModal} size="lg">
      <CModalHeader>
        <CModalTitle className="text-base">INVOICE</CModalTitle>
      </CModalHeader>
      <CModalBody id="print" className="p-5">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-2">GoldenB Jewelry</h1>
          <p>Phone: +84 912 345 678</p>
          <p>123 ABC Street, DEF City</p>
        </div>
        <div className="mb-4" style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: 1 }}>
            <p className="font-bold">INVOICE TO:</p>
            <p>{invoiceInfo.customerName}</p>
            <p>{invoiceInfo.customerPhone}</p>
            <p>{invoiceInfo.address}</p>
          </div>
          <div style={{ flex: 1 }}>
            <p className="font-bold">PAYMENT TO:</p>
            <p>Bank of Le Thanh Binh</p>
            <p>Account Name: GoldenB Account</p>
            <p>Account Number: 0962.999.772</p>
          </div>
        </div>
        <div className="text-sm mb-4">
          <p className="font-bold">Date: {new Date().toLocaleDateString()}</p>
          <p className="font-bold">Order Type: {invoiceInfo.transactionType}</p>
          <p className="font-bold">Staff: {invoiceInfo.staffName}</p>
        </div>
        <CTable className="w-full mb-4 text-sm" style={{ borderCollapse: "collapse" }}>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell style={{ border: "1px solid #000" }}>ITEM</CTableHeaderCell>
              <CTableHeaderCell style={{ border: "1px solid #000" }}>QTY</CTableHeaderCell>
              <CTableHeaderCell style={{ border: "1px solid #000", textAlign: 'right' }} className="text-right ">UNIT PRICE</CTableHeaderCell>
              <CTableHeaderCell style={{ border: "1px solid #000", textAlign: 'right' }} className="text-right ">AMOUNT</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {items.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell style={{ border: "1px solid #000" }}>{item.name}</CTableDataCell>
                <CTableDataCell style={{ border: "1px solid #000" }}>{item.qty}</CTableDataCell>
                <CTableDataCell style={{ border: "1px solid #000", textAlign: 'right' }} className="text-right ">{Number(item.price).toFixed(2)}VND</CTableDataCell>
                <CTableDataCell style={{ border: "1px solid #000", textAlign: 'right' }} className="text-right ">{(Number(item.price) * item.qty).toFixed(2)}VND</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <div className="flex flex-col items-end text-sm">
          {invoiceInfo.transactionType === 'SELL' ? <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ display: "inline-block" }} className="font-bold">Subtotal:</span>
              <span style={{ display: "inline-block" }}>{invoiceInfo.subtotal.toFixed(2)}VND</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ display: "inline-block" }} className="font-bold">Discount:</span>
              <span style={{ display: "inline-block" }}>- {invoiceInfo.discountRate}VND</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ display: "inline-block" }} className="font-bold">Tax:</span>
              <span style={{ display: "inline-block" }}>+ {invoiceInfo.taxRate}VND</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ display: "inline-block" }} className="font-bold">Exchange bonus Point:</span>
              <span style={{ display: "inline-block" }}>- {invoiceInfo.bonusPointExchange}VND</span>
            </div>
          </> : ""}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ display: "inline-block" }} className="font-bold">Total:</span>
            <span style={{ display: "inline-block" }} className="font-bold">{invoiceInfo.total.toFixed(2)}VND</span>
          </div>

          {invoiceInfo.transactionType === 'SELL' || invoiceInfo.transactionType === 'EXCHANGE AND RETURN' ? <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ display: "inline-block" }} className="font-bold">Customer Give Money:</span>
              <span style={{ display: "inline-block" }} className="font-bold">{invoiceInfo.customerGiveMoney}VND</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ display: "inline-block" }} className="font-bold">Refund Money:</span>
              <span style={{ display: "inline-block" }} className="font-bold">{invoiceInfo.refundMoney}VND</span>
            </div>
          </> : ""}

        </div>
        <div className="text-center mt-4">
          <p className="text-sm">Thank you!</p>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" className="px-3 py-1 text-sm" onClick={SaveAsPDFHandler}>
          Download
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default InvoiceModal;
