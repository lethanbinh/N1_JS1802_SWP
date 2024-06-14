// import {
//     CButton,
//     CCard,
//     CCardBody,
//     CCardHeader,
//     CCol,
//     CFormInput,
//     CFormTextarea,
//     CRow,
//     CTable,
//     CTableBody,
//     CTableDataCell,
//     CTableHead,
//     CTableHeaderCell,
//     CTableRow,
// } from '@coreui/react'
// import React, { useState } from 'react'
// import { uid } from 'uid';

// const AddProduct = () => {
//     const [items, setItems] = useState([
//         {
//           id: uid(6),
//           name: '',
//           qty: 1,
//           price: '1.00',
//         },
//       ]);


//       const addItemHandler = () => {
//         const id = uid(6);
//         setItems((prevItem) => [
//           ...prevItem,
//           {
//             id: id,
//             name: '',
//             qty: 1,
//             price: '1.00',
//           },
//         ]);
//       };

//       const deleteItemHandler = (id) => {
//         setItems((prevItem) => prevItem.filter((item) => item.id !== id));
//       };

//       const edtiItemHandler = (event) => {
//         const editedItem = {
//           id: event.target.id,
//           name: event.target.name,
//           value: event.target.value,
//         };

//         const newItems = items.map((items) => {
//           for (const key in items) {
//             if (key === editedItem.name && items.id === editedItem.id) {
//               items[key] = editedItem.value;
//             }
//           }
//           return items;
//         });

//         setItems(newItems);
//       };
//     return (
//         <CRow>
//             <CCol xs={12}>
//                 <CCard className="mb-4">
//                     <CCardHeader>
//                         <strong>Add Product</strong>
//                     </CCardHeader>
//                     <CCardBody>
//                     <CTable className="w-full p-4 text-left">
//             <CTableHead>
//               <CTableRow className="border-b border-gray-900/10 text-sm md:text-base">
//                 <CTableHeaderCell>ITEM</CTableHeaderCell>
//                 <CTableHeaderCell>QTY</CTableHeaderCell>
//                 <CTableHeaderCell>PRICE</CTableHeaderCell>
//                 <CTableHeaderCell>ACTION</CTableHeaderCell>
//               </CTableRow>
//             </CTableHead>
//             <CTableBody>
//               {items.map((item) => (
//                 <InvoiceItem
//                   key={item.id}
//                   id={item.id}
//                   name={item.name}
//                   qty={item.qty}
//                   price={item.price}
//                   onDeleteItem={deleteItemHandler}
//                   onEdtiItem={edtiItemHandler}
//                 />
//               ))}
//             </CTableBody>
//           </CTable>
//           <CButton
//             color="primary" // Tương đương với bg-blue-500
//             className="rounded px-4 py-2 text-sm text-white shadow"
//             onClick={addItemHandler}
//           >
//             Add Item
//           </CButton>
//                     </CCardBody>
//                 </CCard>
//             </CCol>
//         </CRow>
//     )

// }
// export default AddProduct
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormTextarea,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import React, { useState } from 'react'
import InvoiceItem from './Billing/InvoiceItem'
import { uid } from 'uid';

const AddProduct = () => {
    const [items, setItems] = useState([
        {
            id: uid(6),
            name: '',
            qty: 1,
            price: '1.00',
        },
    ]);

    const addItemHandler = () => {
        const id = uid(6);
        setItems((prevItems) => [
            ...prevItems,
            {
                id: id,
                name: '',
                qty: 1,
                price: '1.00',
            },
        ]);
    };

    const deleteItemHandler = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const edtiItemHandler = (event) => {
        const { id, name, value } = event.target;
        const newItems = items.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    [name]: value,
                };
            }
            return item;
        });

        setItems(newItems);
    };

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Add Product</strong>
                    </CCardHeader>
                    <CCardBody>
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
                            color="primary"
                            className="rounded px-4 py-2 text-sm text-white shadow"
                            onClick={addItemHandler}
                        >
                            Add Item
                        </CButton>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
export default AddProduct
