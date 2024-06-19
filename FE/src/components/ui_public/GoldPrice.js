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

const MetalPrices = () => {
  const [data, setData] = useState([]);
  const [updatedTime, setUpdatedTime] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const rowRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.metals.dev/v1/latest?api_key=CFIKX9TJWIGOOUTJJFPQ413TJJFPQ&currency=USD&unit=toz`);
        const result = await response.json();
        if (result.status === "success") {
          const metals = result.metals;
          const updatedTime = result.timestamp;
          const metalData = Object.keys(metals)
            .map(metal => ({
              code: metal,
              description: getMetalDescription(metal),
              unit: getMetalUnit(metal),
              symbol: getMetalSymbol(metal),
              price: metals[metal]
            }));
          setData(metalData);
          setUpdatedTime(new Date(updatedTime).toLocaleString());
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const getMetalDescription = (code) => {
    const descriptions = {
      gold: "Spot Gold",
      silver: "Spot Silver",
      platinum: "Spot Platinum",
      palladium: "Spot Palladium",
      lbma_gold_am: "LBMA Gold AM",
      lbma_gold_pm: "LBMA Gold PM",
      lbma_silver: "LBMA Silver",
      lbma_platinum_am: "LBMA Platinum AM",
      lbma_platinum_pm: "LBMA Platinum PM",
      lbma_palladium_am: "LBMA Palladium AM",
      lbma_palladium_pm: "LBMA Palladium PM",
      mcx_gold: "MCX Gold Futures",
      mcx_gold_am: "MCX Spot Gold AM",
      mcx_gold_pm: "MCX Spot Gold PM",
      mcx_silver: "MCX Silver Futures",
      mcx_silver_am: "MCX Spot Silver AM",
      mcx_silver_pm: "MCX Spot Silver PM",
      ibja_gold: "IBJA Gold",
      aluminum: "Spot Aluminum",
      copper: "Spot Copper",
      lead: "Spot Lead",
      nickel: "Spot Nickel",
      zinc: "Spot Zinc",
      lme_aluminum: "LME Aluminum 3M",
      lme_copper: "LME Copper 3M",
      lme_lead: "LME Lead 3M",
      lme_nickel: "LME Nickel 3M",
      lme_zinc: "LME Zinc 3M"
    };
    return descriptions[code] || code;
  };

  const getMetalUnit = (code) => {
    const units = {
      gold: "Troy Ounce (toz)",
      silver: "Troy Ounce (toz)",
      platinum: "Troy Ounce (toz)",
      palladium: "Troy Ounce (toz)",
      lbma_gold_am: "Troy Ounce (toz)",
      lbma_gold_pm: "Troy Ounce (toz)",
      lbma_silver: "Troy Ounce (toz)",
      lbma_platinum_am: "Troy Ounce (toz)",
      lbma_platinum_pm: "Troy Ounce (toz)",
      lbma_palladium_am: "Troy Ounce (toz)",
      lbma_palladium_pm: "Troy Ounce (toz)",
      mcx_gold: "Troy Ounce (toz)",
      mcx_gold_am: "Troy Ounce (toz)",
      mcx_gold_pm: "Troy Ounce (toz)",
      mcx_silver: "Troy Ounce (toz)",
      mcx_silver_am: "Troy Ounce (toz)",
      mcx_silver_pm: "Troy Ounce (toz)",
      ibja_gold: "Troy Ounce (toz)",
      aluminum: "Metric Tonne (mt)",
      copper: "Metric Tonne (mt)",
      lead: "Metric Tonne (mt)",
      nickel: "Metric Tonne (mt)",
      zinc: "Metric Tonne (mt)",
      lme_aluminum: "Metric Tonne (mt)",
      lme_copper: "Metric Tonne (mt)",
      lme_lead: "Metric Tonne (mt)",
      lme_nickel: "Metric Tonne (mt)",
      lme_zinc: "Metric Tonne (mt)"
    };
    return units[code] || "Unknown unit";
  };

  const getMetalSymbol = (code) => {
    const symbols = {
      gold: "Au",
      silver: "Ag",
      platinum: "Pt",
      palladium: "Pd",
      lbma_gold_am: "Au",
      lbma_gold_pm: "Au",
      lbma_silver: "Ag",
      lbma_platinum_am: "Pt",
      lbma_platinum_pm: "Pt",
      lbma_palladium_am: "Pd",
      lbma_palladium_pm: "Pd",
      mcx_gold: "Au",
      mcx_gold_am: "Au",
      mcx_gold_pm: "Au",
      mcx_silver: "Ag",
      mcx_silver_am: "Ag",
      mcx_silver_pm: "Ag",
      ibja_gold: "Au",
      aluminum: "Al",
      copper: "Cu",
      lead: "Pb",
      nickel: "Ni",
      zinc: "Zn",
      lme_aluminum: "Al",
      lme_copper: "Cu",
      lme_lead: "Pb",
      lme_nickel: "Ni",
      lme_zinc: "Zn"
    };
    return symbols[code] || "Unknown symbol";
  };

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
            <strong>Metal Prices</strong>
            <CButton color="primary" style={{ float: 'right' }} onClick={toggleFullScreen}>
              {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
            </CButton>
          </CCardHeader>
          <CCardBody style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <div style={{ flex: '1 1 auto', overflow: 'auto' }}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Unit</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Symbol</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Price (USD)</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{item.code}</CTableDataCell>
                      <CTableDataCell>{item.description}</CTableDataCell>
                      <CTableDataCell>{item.unit}</CTableDataCell>
                      <CTableDataCell>{item.symbol}</CTableDataCell>
                      <CTableDataCell>{item.price}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default MetalPrices;
