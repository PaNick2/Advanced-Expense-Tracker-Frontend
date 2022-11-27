import React, { useState, useEffect } from 'react'
import "../styles/loginPage.scss"
import { useMutation,useQuery, gql } from '@apollo/client'

const SIGN_IN = gql`
    mutation LogIn($identifier: String!, $password: String!){
        login(input: {identifier: $identifier, password: $password}){
            jwt
            user{
                id
                username
                email
            }
        }
    }
`

function SignIn({loginStatus,setLoginStatus,userData,setUserData,name,setName,password,setPassword,email,setEmail,signInError,setSignInError,revealForm, setCookie, setCookieObject}) {
    //! QUERIES
    const [ signIn , { data, loading, error }] = useMutation(SIGN_IN)
    //! QUERIES

    //* V V V HANDLERS V V V 
    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    //* ^ ^ ^ HANDLERS ^ ^ ^

    const onSignInFormSubmit = (event) => {
        event.preventDefault();
        console.log("Name: ",name,"- Password: ", password,"- Email: ", email)
        if ( !name || !password){
            setSignInError(true)
        } else{
            setSignInError(false)
            signIn({variables: {
                "identifier": name.toLowerCase(),
                "password": password
              }},{ errorPolicy: "partial" })
              .then(getReturnedData)          
              .catch((err) => {
                console.log("There was a problem with the data you inserted", '\n',err)
                giveShake()
            })
        }
      }

    //* V V V FUNCTIONS V V V
    const getReturnedData = (data) => {
        console.log("Data: ",data)
        const { jwt, user} = data.data.login
        const { username, email, id } = user
        setUserData({
            ...userData,
            jwt: jwt,
            username:username.toLowerCase(),
            email: email.toLowerCase(),
            id: id
        })
        document.cookie = "loggedInStatus=true; path=/";
        setCookieObject(userData)
        setLoginStatus(true)
    }

    const removeShake = (elem) => {
        elem.classList.remove("shake")
    }
    const giveShake = () =>{
        const formElement = document.querySelector("form[data-form-status='active']")
        if (formElement.classList.contains("no-animation")){
            formElement.classList.replace("no-animation","shake")
        } else {
            formElement.classList.add("shake")
        }
        setTimeout(() => {formElement.classList.replace("shake","no-animation")},1000)
    }

    //* ^ ^ ^ FUNCTIONS ^ ^ ^


  return (
    <form onSubmit={onSignInFormSubmit} data-form-status="active">
    <div className="form-contents">
    <h1>Sign In</h1>
    <div className="inputs">
        <svg className="login" xmlns="http://www.w3.org/2000/svg" width="44" height="40" viewBox="0 0 44 40"><g stroke="#fff" fill="none" strokeWidth="3.538" transform="translate(0 -1012.362)"><ellipse ry="8.09" rx="8.244" cy="1022.221" cx="21.555" strokeLinecap="round"/><path d="M1.858 1046.4c-.79 4.74 3.805 4.11 3.805 4.11H37.88s4.846.936 4.312-3.854c-.533-4.79-6.076-10.937-20.04-11.043-13.964-.106-19.504 6.047-20.294 10.786z"/></g></svg>
        <input className="input" placeholder='Username' type="text" onChange={handleNameChange} value={name}/>
        <svg className="lock"  xmlns="http://www.w3.org/2000/svg" width="44" height="46" viewBox="0 0 44 46"><g transform="translate(-28.15 -974.678)" stroke="#fff" fill="none" strokeWidth="3.509"><rect ry="3.136" y="995.18" x="29.903" height="23.743" width="40.491" strokeLinecap="round"/><path d="M49.386 1004.406v4.788" strokeLinecap="round"/><path d="M37.073 994.83s-1.39-18.398 12.97-18.398c14.36 0 12.207 18.397 12.207 18.397"/></g></svg>
        
        <input
            className="input" placeholder='Password' type="password" onChange={handlePasswordChange} value={password}/>
        <span className='form-toggle-container'>Don't have an account? <a className="form-toggle" onClick={revealForm}>Sign Up</a></span>
        {signInError && <h5 classlist="error-message">Something went wrong</h5>}
    </div>
    <input type="submit" value="Sign In"/>

    </div>
    </form>
  )
}

export default SignIn