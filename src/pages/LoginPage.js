import React, { useState, useEffect } from 'react'
import "../styles/loginPage.scss"
import { useMutation,useQuery, gql } from '@apollo/client'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import { removeArgumentsFromDocument } from '@apollo/client/utilities'



function LoginPage({loginStatus, setLoginStatus, userData, setUserData, setCookie, setCookieObject}) {
    //? V V V  STATE V V V 
    const [name, setName ] = useState("")
    const [password, setPassword ] = useState("")
    const [email, setEmail ] = useState("")
    const [signInError, setSignInError ] = useState(false)
    const [signUpError, setSignUpError ] = useState(false)
    //? ^ ^ ^   STATE ^ ^ ^


    const revealForm = () => {
        console.log('reavel sign up')
        const activeForm = document.querySelector('form[data-form-status="active"]')
        const inactiveForm = document.querySelector('form[data-form-status="inactive"]')
        activeForm.dataset.formStatus = "inactive"
        inactiveForm.dataset.formStatus = "active"

        if (activeForm.classList.contains("no-animation")){
          activeForm.classList.remove("no-animation")
        }
    }

  return (
    <div className="login-page__container">
    <SignIn 
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        userData={userData}
        setUserData={setUserData}
        name={name} 
        setName={setName} 
        password={password} 
        setPassword={setPassword} 
        email={email}
        setEmail={setEmail}
        signInError={signInError}
        setSignInError={setSignInError}
        revealForm={revealForm}
        setCookie={setCookie} 
        setCookieObject={setCookieObject}
    />
    <SignUp 
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        userData={userData}
        setUserData={setUserData}
        name={name} 
        setName={setName} 
        password={password} 
        setPassword={setPassword} 
        email={email}
        setEmail={setEmail}
        signUpError={signUpError}
        setSignUpError={setSignUpError}
        revealForm={revealForm}
        setCookie={setCookie} 
        setCookieObject={setCookieObject}
    />
    </div>
  )
}

export default LoginPage