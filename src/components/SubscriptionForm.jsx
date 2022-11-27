import React, { useState } from 'react'
import '../App.scss';
import ExpensesTable from './ExpensesTable';



function SubscriptionForm({toggleModalFunction}) {
  const [expenseList,setExpenseList] = useState({
    name:"Netflix",
    price:"",
    renewal:""
  });
  const [incomeList,setIncomeList] = useState({
    name:"Job",
    price:"",
    renewal:""
  });

  const handleExpenseNameChange = (event) => {
    const updatedName = {"name":event.target.value};
    setExpenseList(expenseList => ({
      ...expenseList,
      ...updatedName
    }));
  }
  const handleExpensePriceChange = (event) => {
    const updatedName = {"price":event.target.value};
    setExpenseList(expenseList => ({
      ...expenseList,
      ...updatedName
    }));
  }

  const handleIncomeNameChange = (event) => {
    const updatedName = {"name":event.target.value};
    setIncomeList(incomeList => ({
      ...incomeList,
      ...updatedName
    }));
  }
  const handleIncomePriceChange = (event) => {
    const updatedName = {"price":event.target.value};
    setIncomeList(incomeList => ({
      ...incomeList,
      ...updatedName
    }));
  }

  const submitHandlerExpenses = event => {
    event.preventDefault();
    console.log("Form Sumbitted")
    console.log("Expenses: ", expenseList)
  }

  const submitHandlerIncome = event => {
    event.preventDefault();
    console.log("Form Sumbitted")
    console.log("Income: ", incomeList)
  }


  console.log(toggleModalFunction)

  return (
    <div className="form-container">
      <h1 className="form-container__title center__text">Expense Tracker</h1>
      <button className="add-expense-btn" onClick={toggleModalFunction}>Add Expense</button>
      <div className='table-container'>
      <ExpensesTable />

      </div>
    </div>
  )
}

export default SubscriptionForm;