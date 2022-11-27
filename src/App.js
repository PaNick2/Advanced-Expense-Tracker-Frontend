import React, {useState,useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import SiteHeader from './components/SiteHeader';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'


const client = new ApolloClient({
  uri:'http://localhost:1337/graphql',
  cache: new InMemoryCache()
})

function App() {
  const [loginStatus, setLoginStatus] = useState(false)
  const [userData, setUserData ] = useState({
    username: "",
    email: "",
    jwt: null,
    id: null
  })

  let cookiedLoginStatus = sessionStorage.getItem("key");

  //! Functions
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = 'expires='+ d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  function setCookieObject(userDataTemp) {
    // convert the user object to JSON string using JSON.stringify() function
    var userJsonString = JSON.stringify(userDataTemp); 
    // save the the json string in session 
    setCookie('user_data', userJsonString, 7); 
  }

  function getCookieObject(cname){
    var savedUserJsonString = getCookie(cname); 
    // console.log("savedUserJsonString: ", savedUserJsonString)
    if (savedUserJsonString.length === 0) { 
      console.log("no user in cookie") 
      return false; 
    } else{
      // convert the saved user info to JSON object using JSON.parse() function
      var savedUser = JSON.parse(savedUserJsonString); 
      setUserData({
        ...userData,
        jwt: savedUser.jwt,
        username:savedUser.username,
        email: savedUser.email,
        id: savedUser.id
    })
      return savedUser;
    }
  }

  //! Functions


  useEffect(()=>{
    if (getCookie("loggedInStatus").includes("true")){
      setLoginStatus(true)
    }
    if (userData.username === ""){
      getCookieObject("user_data")
    }
  })
  useEffect(()=>{
    // console.log("Login status: ",loginStatus)
  },[loginStatus])

  useEffect(() => {
    console.log("Current user is: ", userData)
    if (userData.username !== ""){
      setCookieObject(userData)
    }
  },[userData])

  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          {loginStatus && <SiteHeader loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>}
        {loginStatus 
        ? <Routes>
            <Route path="/" element={<Homepage loginStatus={loginStatus} setLoginStatus={setLoginStatus} userData={userData}/>}/>

          </Routes>
        : <LoginPage loginStatus={loginStatus} setLoginStatus={setLoginStatus} userData={userData} setUserData={setUserData} setCookie={setCookie} setCookieObject={setCookieObject}/>      
        }
        

        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
