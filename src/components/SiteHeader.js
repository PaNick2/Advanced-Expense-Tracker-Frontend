import React from 'react'
import { Link } from 'react-router-dom'


export default function SiteHeader({loginStatus, setLoginStatus}) {

  const handleClick = () => {
    if (loginStatus){
      document.cookie = "loggedInStatus=false; path=/";
      setLoginStatus(false)
    } else {
      setLoginStatus(true)
    }
  }
  return (
    <div className="site-header">
        <Link to="/"><h1>Expense Track App</h1></Link>
        <h3 onClick={handleClick}>{loginStatus ? "Logout" : "Login"}</h3>
    </div>
  )
}
