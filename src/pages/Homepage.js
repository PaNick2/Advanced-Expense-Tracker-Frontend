import React,{ useState, useEffect} from 'react'
import '../styles/homepage.scss'
import { useMutation, gql, useQuery } from '@apollo/client'
import ExpensesTable from '../components/ExpensesTable'
import ExpenseGenerator from '../components/ExpenseGenerator'

const GET_EXPENSES = gql`
query getUserExpenses($curId: ID!){
  usersPermissionsUser(id: $curId){
    data{
      id
      attributes{
        expenses{
          data{
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
            }
          }
        }
      }
    }
  }
}
`

const GET_EXPENSES_EXPENSES = gql`
query getUserExpensesExpenses($curId: ID!){
  usersPermissionsUser(id: $curId){
    data{
      id
      attributes{
        expenses(filters:{ExpenseType: {eq: "Expense"}}){
          data{
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
            }
          }
        }
      }
    }
  }
}
`
const GET_EXPENSES_INCOME = gql`
query getUserExpensesIncome($curId: ID!){
  usersPermissionsUser(id: $curId){
    data{
      id
      attributes{
        expenses(filters:{ExpenseType: {eq: "Income"}}){
          data{
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
            }
          }
        }
      }
    }
  }
}
`
function Homepage({loginStatus, setLoginStatus, userData}) {
  const [userExpenses, setUserExpenses ] = useState({})

  // const { data, loading, error } = useQuery(GET_EXPENSES,{variables: {curId: userData.id}});
  const userExpensesExpenses = useQuery(GET_EXPENSES_EXPENSES,{variables: {curId: userData.id,offset: 15, limit:15}});
  const userExpensesIncome = useQuery(GET_EXPENSES_INCOME,{variables: {curId: userData.id}});


  const mountEventListener = () => {
    document.addEventListener("click", detectClickOutside)
  }
  const toggleGenerator = () => {
    const generatorFormContainer = document.querySelector(".generator-form-container")

    if (generatorFormContainer.dataset.generatorStatus === "hidden"){
        generatorFormContainer.dataset.generatorStatus = "active"
        setTimeout(mountEventListener, 800)
    } else if (generatorFormContainer.dataset.generatorStatus === "active") {
        generatorFormContainer.dataset.generatorStatus = "inactive"
        document.removeEventListener("click", detectClickOutside)
    } else {
      generatorFormContainer.dataset.generatorStatus = "active"
      setTimeout(mountEventListener, 800)
    }
  }

  const myForm = document.querySelector(".generator-form-container")
  const detectClickOutside = (event) => {
    if (myForm !== event.target && !myForm.contains(event.target)) {
      toggleGenerator()
    }
  }

  if (userExpensesExpenses.loading || userExpensesIncome.loading) return <span>Loading...</span>
  if (userExpensesExpenses.error || userExpensesIncome.error) return <span>Error</span>
  // const currentExpenses = userExpenses.usersPermissionsUser.data.attributes.expenses.data
  // console.log("Current expenses :" ,currentExpenses)
  return (
    <div className='homepage-container'>
      <div className="sidebar">
        
      </div>
      <div className='generator'>
        <div className='generator-container'>
          <ExpenseGenerator userData={userData} toggleGenerator={toggleGenerator} detectClickOutside={detectClickOutside}/>
        </div>
        <button onClick={toggleGenerator}>Add Expense</button>
      </div>
      <div className="dashboard">
        <ExpensesTable categoryTitle="Expenses" userExpenses={userExpensesExpenses.data} loading={userExpensesExpenses.loading} error={userExpensesExpenses.error}/>
        <ExpensesTable categoryTitle="Income" userExpenses={userExpensesIncome.data} loading={userExpensesIncome.loading} error={userExpensesIncome.error}/>

      </div>
    </div>
  )
}

export default Homepage