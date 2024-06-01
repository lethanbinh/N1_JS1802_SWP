import React from 'react';
import './PromotionTable.css';
import NavBar from './NavBar';
import SideBar from './SideBar';

const promotes = [
  { id: 1, discount: 10, name: "AdminLTE v3", description: "abc", star_date: "2021-01-01", end_date: "2021-12-31", minimum_price: 100, maximum_price: 1000},
  { id: 2, discount: 10, name: "AdminLTE v3", description: "abc", star_date: "2021-01-01", end_date: "2021-12-31", minimum_price: 100, maximum_price: 1000},
  { id: 3, discount: 10, name: "AdminLTE v3", description: "abc", star_date: "2021-01-01", end_date: "2021-12-31", minimum_price: 100, maximum_price: 1000},

];

const PromotionTable = () => {
  return (
    <div className="container">
      <NavBar />
      <SideBar />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Discount</th>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Minimum Price</th>
            <th>Maximum Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody >
          {promotes.map((promote) => (
            <tr key={promote.id} >
              <td>{promote.id}</td>
              <td>{promote.discount}</td>
              <td>{promote.name}</td>
              <td>{promote.description}</td>
              <td>{promote.star_date}</td>
              <td>{promote.end_date}</td>
              <td>{promote.minimum_price}</td>
              <td>{promote.maximum_price}</td>
              <td>
                <button className="btn btn-warning">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PromotionTable;
