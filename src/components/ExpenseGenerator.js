import React,{useState,useEffect} from 'react'
import '../styles/expenseForm.scss'
import { useMutation,useQuery, gql } from '@apollo/client'



const ADD_EXPENSE = gql`
mutation AddExpense($expenseTitle: String,$expenseType:ENUM_EXPENSE_EXPENSETYPE, $jan: Int!, $feb: Int!,$mar: Int!,$apr: Int!,$may: Int!,$jun: Int!,$jul: Int!,$aug: Int!,$sep: Int!,$oct: Int!,$nov: Int!,$dec: Int!,$user: ID! ){
	createExpense(data: {ExpenseTitle: $expenseTitle,January: $jan, February: $feb, March: $mar, April: $apr, May: $may, June: $jun, July: $jul, August: $aug, September: $sep, October: $oct, November: $nov, December:$dec, user: $user,ExpenseType: $expenseType}){
    data{
      id
      attributes{
        ExpenseTitle
        ExpenseType
        January
        February
        March
        April
        May
        June
        July
        August
        September
        October
        November
        December
        user{
          data{
            id
            attributes{
              username
            }
          }
        }
      }
    }
  }
}
`
function ExpenseGenerator({userData, toggleGenerator}) {
    const [ addExpense , { data, loading, error }] = useMutation(ADD_EXPENSE)
    

    const [inputValues, setInputValues] = useState({
        Title: "",
        Type:"Expense",
        January:"",
        February:"",
        March:"",
        April:"",
        May:"",
        June:"",
        July:"",
        August:"",
        September:"",
        October:"",
        November:"",
        December:""
      })


//! Input Handlers
    const handleTitleChange = (event) => {
        setInputValues({
            ...inputValues,
            Title: event.target.value
        })
    }
    const handleTypeChange = (event) => {
        setInputValues({
            ...inputValues,
            Type: event.target.value
        })
    }
    const handleJanuaryChange = (event) => {
        setInputValues({
            ...inputValues,
            January: event.target.value
        })
    }
    const handleFebruaryChange = (event) => {
        setInputValues({
            ...inputValues,
            February: event.target.value
        })
    }
    const handleMarchChange = (event) => {
        setInputValues({
            ...inputValues,
            March: event.target.value
        })
    }
    const handleAprilChange = (event) => {
        setInputValues({
            ...inputValues,
            April: event.target.value
        })
    }
    const handleMayChange = (event) => {
        setInputValues({
            ...inputValues,
            May: event.target.value
        })
    }
    const handleJuneChange = (event) => {
        setInputValues({
            ...inputValues,
            June: event.target.value
        })
    }
    const handleJulyChange = (event) => {
        setInputValues({
            ...inputValues,
            July: event.target.value
        })
    }
    const handleAugustChange = (event) => {
        setInputValues({
            ...inputValues,
            August: event.target.value
        })
    }
    const handleSeptemberChange = (event) => {
        setInputValues({
            ...inputValues,
            September: event.target.value
        })
    }
    const handleOctoberChange = (event) => {
        setInputValues({
            ...inputValues,
            October: event.target.value
        })
    }
    const handleNovemberChange = (event) => {
        setInputValues({
            ...inputValues,
            November: event.target.value
        })
    }
    const handleDecemberChange = (event) => {
        setInputValues({
            ...inputValues,
            December: event.target.value
        })
    }


//! Input Handlers

//? Submit Handler
 const submitHandler = (event) => {
    event.preventDefault();
    console.log("Inputs values are:" ,JSON.stringify(inputValues, null /*replacer function */, 4 /* space */))
    console.log(parseInt(userData.id))
    addExpense({variables:{
        "expenseTitle": inputValues.Title,
        "expenseType": inputValues.Type,
        "jan": inputValues.January === "" ? 0 : parseInt(inputValues.January),
        "feb": inputValues.February === "" ? 0 : parseInt(inputValues.February),
        "mar": inputValues.March === "" ? 0 : parseInt(inputValues.March),
        "apr": inputValues.April === "" ? 0 : parseInt(inputValues.April),
        "may": inputValues.May === "" ? 0 : parseInt(inputValues.May),
        "jun": inputValues.June === "" ? 0 : parseInt(inputValues.June),
        "jul": inputValues.July === "" ? 0 : parseInt(inputValues.July),
        "aug": inputValues.August === "" ? 0 : parseInt(inputValues.August),
        "sep": inputValues.September === "" ? 0 : parseInt(inputValues.September),
        "oct": inputValues.October === "" ? 0 : parseInt(inputValues.October),
        "nov": inputValues.November === "" ? 0 : parseInt(inputValues.November),
        "dec": inputValues.December === "" ? 0 : parseInt(inputValues.December),
        "user": parseInt(userData.id)
      }})
      .then(e => console.log("THe add new expense query response: ", e))
      .catch(err => {
        console.log("The add new expense function gave an error: ", err)
      })
 }
//? Submit Handler

  return (
    <div className='generator-form-container' data-generator-status="hidden">
        <span onClick={toggleGenerator} className='form-toggle'> X </span>
        <form  onSubmit={submitHandler}>
            <div className="form-contents">
                <h1>Add Expense</h1>
                <div className="labels">
                    <label htmlFor="expense-title">Expense Title</label>
                    <label htmlFor="expense-type">Expense Type</label>
                    <label htmlFor="input-january">January</label>
                    <label htmlFor="input-february">February</label>
                    <label htmlFor="input-march">March</label>
                    <label htmlFor="input-april">April</label>
                    <label htmlFor="input-may">May</label>
                    <label htmlFor="input-june">June</label>
                    <label htmlFor="input-july">July</label>
                    <label htmlFor="input-august">August</label>
                    <label htmlFor="input-september">September</label>
                    <label htmlFor="input-october">October</label>
                    <label htmlFor="input-november">November</label>
                    <label htmlFor="input-december">December</label>
                </div>
                <div className='inputs'>
                    <input id="expense-title" required className="input" placeholder='Title' type="text" value={inputValues.Title} onChange={handleTitleChange}/>
                    <select id="expense-type" placeholder='Expense/Income' type="op" onChange={handleTypeChange} value={inputValues.Type}>
                        <option value="Expense">Expense</option>
                        <option value="Income">Income</option>
                    </select>
                    <input id="input-january" className="input" placeholder='January' type="number" min="0" value={inputValues.January} onChange={handleJanuaryChange}/>
                    <input id="input-february" className="input" placeholder='February' type="number" min="0" value={inputValues.February} onChange={handleFebruaryChange}/>
                    <input id="input-march" className="input" placeholder='March' type="number" min="0" value={inputValues.March} onChange={handleMarchChange}/>
                    <input id="input-april" className="input" placeholder='April' type="number" min="0" value={inputValues.April} onChange={handleAprilChange}/>
                    <input id="input-may" className="input" placeholder='May' type="number" min="0" value={inputValues.May} onChange={handleMayChange}/>
                    <input id="input-june" className="input" placeholder='June' type="number" min="0" value={inputValues.June} onChange={handleJuneChange}/>
                    <input id="input-july" className="input" placeholder='July' type="number" min="0" value={inputValues.July} onChange={handleJulyChange}/>
                    <input id="input-august" className="input" placeholder='August' type="number" min="0" value={inputValues.August} onChange={handleAugustChange}/>
                    <input id="input-september" className="input" placeholder='September' type="number" min="0" value={inputValues.September} onChange={handleSeptemberChange}/>
                    <input id="input-october" className="input" placeholder='October' type="number" min="0" value={inputValues.October} onChange={handleOctoberChange}/>
                    <input id="input-november" className="input" placeholder='November' type="number" min="0" value={inputValues.November} onChange={handleNovemberChange}/>
                    <input id="input-december" className="input" placeholder='December' type="number" min="0" value={inputValues.December} onChange={handleDecemberChange}/>
                    {/* {signInError && <h5 classlist="error-message">Something went wrong</h5>} */}
                </div>
                <input type="submit" value="ADD"/>

            </div>
        </form>
    </div>
  )
}

export default ExpenseGenerator