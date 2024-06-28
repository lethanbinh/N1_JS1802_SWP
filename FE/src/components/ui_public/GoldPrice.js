import React, { useEffect, useState, useRef } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton
} from '@coreui/react';

const JewelryGoldPrices = () => {
  const [data, setData] = useState([]);
  const [updatedTime, setUpdatedTime] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const rowRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.goldapi.io/api/XAU/USD`, {
          method: 'GET',
          headers: {
            'x-access-token': 'goldapi-2rg15slxwz16l0-io',
            'Content-Type': 'application/json',
          },
          redirect: 'follow'
        });
        const result = await response.json();
        if (result.success) {
          const goldPrice = result.price;
          const updatedTime = result.timestamp;
          setData([{ type: 'Jewelry Gold', price: goldPrice }]);
          setUpdatedTime(new Date(updatedTime * 1000).toLocaleString());
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (rowRef.current.requestFullscreen) {
        rowRef.current.requestFullscreen();
      } else if (rowRef.current.mozRequestFullScreen) { // Firefox
        rowRef.current.mozRequestFullScreen();
      } else if (rowRef.current.webkitRequestFullscreen) { // Chrome, Safari, Opera
        rowRef.current.webkitRequestFullscreen();
      } else if (rowRef.current.msRequestFullscreen) { // IE/Edge
        rowRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <CRow
      ref={rowRef}
      style={isFullScreen ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        background: 'white',
        display: 'flex',
        flexDirection: 'column'
      } : {}}
    >
      <CCol xs={12} style={{ flex: '1 1 auto', overflow: isFullScreen ? 'auto' : 'visible' }}>
        <CCard className="mb-4" style={{ height: '100%' }}>
          <CCardHeader>
            <strong>Jewelry Gold Prices</strong>
            <CButton color="primary" style={{ float: 'right' }} onClick={toggleFullScreen}>
              {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
            </CButton>
          </CCardHeader>
          <CCardBody style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <div style={{ flex: '1 1 auto', overflow: 'auto' }}>
              <iframe frameborder="0" width="100%" height="750px" src="https://webtygia.com/api/vang?bgheader=b53e3e&colorheader=ffffff&padding=7&fontsize=16&hienthi=&"></iframe>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default JewelryGoldPrices;
