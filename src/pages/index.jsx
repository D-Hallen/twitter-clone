import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

import { Home } from "./Home";
import { NotFound } from "./NotFound";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
import PropTypes from "prop-types";



export const Pages = () => {
  const [logData, setLogData] = useState([])
  const [xweetPosts, setXweetPosts] = useState([])

  function addXweetPost (xweet, email, data) {
    if (!email) {
      return
    }
    setXweetPosts([...xweetPosts, {xweet, email, data}])
  }
  function logInData (email, password) {
    if (!email || !password) {
      return
    }
    console.log(email, password)
    setLogData({email, password})
  }

  logData.PropTypes = {
    email: PropTypes.string,
    password: PropTypes.string
  }
  
  

  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home xweetPosts={xweetPosts} addXweetPost={addXweetPost}/>} />
      <Route path="*" element={<NotFound />} />
      <Route path="/sign-up" element={<SignUp logInData={logInData}/>}/>
      <Route path="/sign-in" element={<SignIn logInData={logInData}/>}/>
    </Routes>
  </Router>

)};


