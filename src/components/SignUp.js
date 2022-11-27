import React, { useState, useEffect } from 'react'
import "../styles/loginPage.scss"
import { useMutation,useQuery, gql } from '@apollo/client'

const SIGN_UP = gql`
    mutation createUserWithVariables($username: String!,$email: String!, $password: String!) {
        register(input: {username: $username, email: $email, password: $password}){
        jwt
        user {
            username
            email
            id
        }
        }
        }
`

function SignUp({loginStatus,setLoginStatus,userData,setUserData,name,setName,password,setPassword,email,setEmail,signUpError,setSignUpError,revealForm, setCookie, setCookieObject}) {
    //! QUERIES
    const [ signUp , { data, loading, error }] = useMutation(SIGN_UP)
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

    const onSignUpFormSubmit = (event) => {
        event.preventDefault();
        if ( !name || !password || !email){
            setSignUpError(true)
            giveShake()
        } else{
            setSignUpError(false)
            console.log("Name: ",name,"- Password: ", password,"- Email: ", email)
            signUp({variables: {
                "username": name,
                "email": email,
                "password": password
              }})
              .then(getReturnedData)          
              .catch((err) => {
                console.log("There was a problem with the data you inserted",err)
                giveShake()
              })
        }
      }

    const reavealSignIn = () => {
        console.log('reavel sign in')
    }

    //* V V V FUNCTIONS V V V
    const getReturnedData = (data) => {
        const { jwt, user} = data.data.register
        const { username, email, id } = user
        setUserData({
            ...userData,
            jwt: jwt,
            username:username.toLowerCase(),
            email: email.toLowerCase(),
            id: id
        })
        document.cookie = "loggedInStatus=true; path=/";
        setLoginStatus(true)
    }

    const reavealSignUp = () => {
        console.log('reavel sign up')
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
    <form onSubmit={onSignUpFormSubmit} data-form-status="inactive">
        <div className="form-contents">
        <h1>Sign Up</h1>
        <div className="inputs">
            <svg className="login" xmlns="http://www.w3.org/2000/svg" width="44" height="40" viewBox="0 0 44 40"><g stroke="#fff" fill="none" strokeWidth="3.538" transform="translate(0 -1012.362)"><ellipse ry="8.09" rx="8.244" cy="1022.221" cx="21.555" strokeLinecap="round"/><path d="M1.858 1046.4c-.79 4.74 3.805 4.11 3.805 4.11H37.88s4.846.936 4.312-3.854c-.533-4.79-6.076-10.937-20.04-11.043-13.964-.106-19.504 6.047-20.294 10.786z"/></g></svg>
            <input className="input" placeholder='Username' type="text" onChange={handleNameChange} value={name}/>
            <input className="input" placeholder='Email' type="email" onChange={handleEmailChange}  value={email}/>
            <svg className="lock"  xmlns="http://www.w3.org/2000/svg" width="44" height="46" viewBox="0 0 44 46"><g transform="translate(-28.15 -974.678)" stroke="#fff" fill="none" strokeWidth="3.509"><rect ry="3.136" y="995.18" x="29.903" height="23.743" width="40.491" strokeLinecap="round"/><path d="M49.386 1004.406v4.788" strokeLinecap="round"/><path d="M37.073 994.83s-1.39-18.398 12.97-18.398c14.36 0 12.207 18.397 12.207 18.397"/></g></svg>
            <input
                className="input" placeholder='Password' type="password" onChange={handlePasswordChange} value={password}/>
            <span className='form-toggle-container'>Already have an account? <span className="form-toggle" onClick={revealForm}>Sign In</span></span>
            {signUpError && <h5 classlist="error-message">Something went wrong</h5>}
        </div>
        <input type="submit" value="Sign Up"/>

        </div>
    </form> 
  )
}

export default SignUp