import React from 'react'


function IncomeTable() {
    var mockData = require('../assets/mock-data.json');
    const myData = mockData.map((item,index) => {
      const { name, price } = item;
      return (
        <tr key={index}>
          <th>{name}</th>
          <td>{price}</td>
          <td>{price}</td>
          <td>{price}</td>
          <td>{price}</td>
          <td>{price}</td>
          <td>{price}</td>
          <td>{price}</td>
          <td>{price}</td>
          <td>{price}</td>
          <td>{price}</td>
          <td>{price}</td>
          <td>{price}</td>
        </tr>
      )
    })
    
    
  return (
    // <div>{myData}</div>
    <div className="expense-table-container section">
    <table style={{width: '100%'}}>
      <tbody>
          <tr className='header-row'>
            <th>Title</th>
            <th>Jan</th>
            <th>Feb</th>
            <th>Mar</th>
            <th>Apr</th>
            <th>May</th>
            <th>Jun</th>
            <th>Jul</th>
            <th>Aug</th>
            <th>Sep</th>
            <th>Oct</th>
            <th>Nov</th>
            <th>Dec</th>
          </tr>
          {myData}
      </tbody>
      </table>
    </div>
  )
}

export default IncomeTable;