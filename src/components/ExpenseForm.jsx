import {React, useState } from 'react'

function ExpenseForm({ toggleModalFunction }) {

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
  return (
    <div className='modal-form-container flex flex-column center__c-c' data-modal-state="inactive">
      <div className="form-container form-container__expenses section">
        <h5 className='form-container__title'>Add Expense</h5>
        <form onSubmit={submitHandlerExpenses} className="form__expenses center__c-c flex flex__column">
          <div className="input-container">
            <label htmlFor="name-input__expense" className='center center__c-c'>Label</label>
            <input id="name-input__expense" type="text" name="name" placeholder="Expense Label" onChange={handleExpenseNameChange}/>
          </div>
          <div className="input-container">
            <label htmlFor="amount-input__expense" className='center center__c-c'>Amount</label>
            <input id="amount-input__expense" type="text" name="price" placeholder="Amount" onChange={handleExpensePriceChange}/>
          </div>
          <input type="submit" className='btn btn-primary' value="Submit" />
        </form>
      </div>
      <div className="form-container form-container__income section">
        <h5 className='form-container__title'>Add Income</h5>
        <form onSubmit={submitHandlerIncome} className="form__expenses center__c-c flex flex__column">
          <div className="input-container">
            <label htmlFor="name-input__income" className='center center__c-c'>Label</label>
            <input id="name-input__income" type="text" name="name" placeholder="Expense Label" onChange={handleIncomeNameChange}/>
          </div>
          <div className="input-container">
            <label htmlFor="amount-input__income" className='center center__c-c'>Amount</label>
            <input id="amount-input__income" type="text" name="price" placeholder="Amount" onChange={handleIncomePriceChange}/>
          </div>
          <input type="submit" className='btn btn-primary' value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default ExpenseForm;