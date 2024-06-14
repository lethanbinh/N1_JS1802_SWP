import React from 'react';
import { CFormInput } from '@coreui/react';

const InvoiceField = ({ onEditItem, cellData }) => {
  return (
    <CFormInput
      className={cellData.className}
      type={cellData.type}
      placeholder={cellData.placeholder}
      min={cellData.min}
      max={cellData.max}
      step={cellData.step}
      name={cellData.name}
      id={cellData.id}
      value={cellData.value}
      onChange={onEditItem}
      required
    />
  );
};

export default InvoiceField;
