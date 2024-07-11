import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
} from '@coreui/react';
import '../../../customStyles.css';

const WarrantyCardModal = ({ isOpenWarranty, setIsOpenWarranty }) => {
    const closeModal = () => {
        setIsOpenWarranty(false);
    };

    const SaveAsPDFHandler = () => {
        const dom = document.getElementById('print');
        html2canvas(dom)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('l', 'pt', 'a4'); // 'l' for landscape orientation
                const imgWidth = 842; // A4 width in landscape mode
                const imgHeight = canvas.height * imgWidth / canvas.width;
                const pageHeight = 595; // A4 height in landscape mode

                // Ensure the image height does not exceed the page height
                const finalImgHeight = Math.min(imgHeight, pageHeight);

                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, finalImgHeight);
                pdf.save('warrantyCard.pdf');
            })
            .catch((error) => {
                console.error('oops, something went wrong!', error);
            });
    };

    return (
        <CModal alignment="center" visible={isOpenWarranty} onClose={closeModal} size="lg">
            <CModalHeader>
                <CModalTitle className="text-base">WARRANTY CARD</CModalTitle>
            </CModalHeader>
            <CModalBody id="print" className="p-5">
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold mb-1">GoldenB Jewelry</h1>
                    <p>-------------------</p>
                    <h2 className="text-xl font-bold mb-2">WARRANTY CARD</h2>
                </div>
                <div className="flex flex-col items-start">
                    <div className='my-2'>
                        <span className="font-bold">Customer Name:</span>
                    </div>
                    <div className='my-2'>
                        <span className="font-bold">_____________________________________________________________________________________________________</span>
                    </div>
                    <div className='my-2'>
                        <span className="font-bold">Start Date:</span>
                    </div>
                    <div className='my-2'>
                        <span className="font-bold">_____________________________________________________________________________________________________</span>
                    </div>
                    <div className='my-2'>
                        <span className="font-bold">End Date:</span>
                    </div>
                    <div className='my-2'>
                        <span className="font-bold">_____________________________________________________________________________________________________</span>
                    </div>
                    <div className='my-2'>
                        <span className="font-bold">Signature:</span>
                    </div>
                    <div className='my-2'>
                        <span className="font-bold">_____________________________________________________________________________________________________</span>
                    </div>
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

export default WarrantyCardModal;
