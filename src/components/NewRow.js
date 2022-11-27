import React from 'react'

function NewRow({userExpenses,loading,error, monthlyTotals,setMonthlyTotals}) {

  
  if (loading) return <span>Loading...</span>
  if (error) return <span>Error</span>

  return (
    userExpenses.usersPermissionsUser.data.attributes.expenses.data.map(expense => {
      const {ExpenseTitle,January,February,March,April,May,June,July,August,September,October,November,December} = expense.attributes;
      const expenseTotal = January + February + March + April + May + June + July + August + September + October + November + December
      // console.log(expense)
      return (
        <tr key={ExpenseTitle} className="table-row empty-table-row">
            <th className='first-column title-column'>{ExpenseTitle}</th>
            <td>{January == 0 ? "-" : January}</td>
            <td>{February == 0 ? "-" : February}</td>
            <td>{March == 0 ? "-" : March}</td>
            <td>{April == 0 ? "-" : April}</td>
            <td>{May == 0 ? "-" : May}</td>
            <td>{June == 0 ? "-" : June}</td>
            <td>{July == 0 ? "-" : July}</td>
            <td>{August == 0 ? "-" : August}</td>
            <td>{September == 0 ? "-" : September}</td>
            <td>{October == 0 ? "-" : October}</td>
            <td>{November == 0 ? "-" : November}</td>
            <td>{December == 0 ? "-" : December}</td>
            <th className="total-column" style={{fontStyle:'italic',fontWeight:'300'}}>{expenseTotal}</th>
        </tr>

      )
    })
  )
}

export default NewRow