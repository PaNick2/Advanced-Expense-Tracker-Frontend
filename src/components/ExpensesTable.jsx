import React,{ useState, useEffect } from 'react'
import NewRow from './NewRow'


function ExpensesTable({ categoryTitle,userExpenses,loading,error  }) {
  const [monthlyTotals, setMonthlyTotals] = useState({
    January:null,
    February:null,
    March:null,
    April:null,
    May:null,
    June:null,
    July:null,
    August:null,
    September:null,
    October:null,
    November:null,
    December:null
  })
  const [categoryTotal, setCategoryTotal] = useState(null)

  useEffect(() => {
    // console.log("Monthly totals are: ", monthlyTotals)
  },[monthlyTotals])

  useEffect(()=> {
    // console.log("The category total is: ",categoryTotal)
  },[categoryTotal])

  useEffect(() => {
    if (userExpenses){
      const monthlyTotalsTemp = {}
      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
      months.map( month => {
        var curMonthTotal = 0;
        userExpenses.usersPermissionsUser.data.attributes.expenses.data.map(expense => {
          curMonthTotal += expense.attributes[month] 
        })
        monthlyTotalsTemp[month] = curMonthTotal;
      })

      
      setMonthlyTotals({
        ...monthlyTotals,
        ...monthlyTotalsTemp
      })
      const categoryTotalTemp = Object.values(monthlyTotalsTemp).reduce((a,b) => { return a + b} )
      setCategoryTotal(categoryTotalTemp)
    }
  },[userExpenses])


  if (loading) return <span>Loading...</span>
  if (error) return <span>Error</span>


  return (
    
    // <div>{myData}</div>
    <div className="expense-table-container section">
    <table style={{width: '100%'}}>
      <tbody id="expenses-table-body">
          <tr className='header-row'>
            <th className='first-column title-column'>{categoryTitle}</th>
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
            <th className='total-column'>Total</th>
          </tr>
          <NewRow userExpenses={userExpenses} loading={loading} error={error} monthlyTotals={monthlyTotals} setMonthlyTotals={setMonthlyTotals}/>
          <tr className='footer-row'>
            <th className='first-column total-column'>Total</th>
            <th>{monthlyTotals.January}</th>
            <th>{monthlyTotals.February}</th>
            <th>{monthlyTotals.March}</th>
            <th>{monthlyTotals.April}</th>
            <th>{monthlyTotals.May}</th>
            <th>{monthlyTotals.June}</th>
            <th>{monthlyTotals.July}</th>
            <th>{monthlyTotals.August}</th>
            <th>{monthlyTotals.September}</th>
            <th>{monthlyTotals.October}</th>
            <th>{monthlyTotals.November}</th>
            <th>{monthlyTotals.December}</th>
            <th className='total-cell'>{categoryTotal}</th>
          </tr>
      </tbody>
      </table>
    </div>
  )
}

export default ExpensesTable