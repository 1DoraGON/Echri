import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../api/axios'
import { useStateContext } from '../contexts/ContextProvider'

export default function Signup() {

  
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const [errors,setErrors] = useState(null)
  const {setUser,setToken} = useStateContext()
  const onSubmit = (e) => {
    e.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: confirmPasswordRef.current.value,
    }
    axiosClient.post('/signup',payload)
    .then(({data})=>{
      setUser(data.user) 
      setToken(data.token)
    })
    .catch(err => {
      const response = err.response
      //console.log(err);
      if (response && response.status === 422){
        setErrors(response.data.errors) 
      }
    })
    console.log(payload);
  }
  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
            Sign up new account
          </h1>
          {errors && 
            <div className='alert'>
              {Object.keys(errors).map(key=>(
                <p key={key}>{errors[key][0]}</p>
              ))}
              <p key={errors}></p>
            </div>}
          <input ref={nameRef} type="text" placeholder='Full name'/>
          <input ref={emailRef} type="email" placeholder='Email'/>
          <input ref={passwordRef} type="password" placeholder='Pasword'/>
          <input ref={confirmPasswordRef} type="password" placeholder='Confirm password'/>
          <button className="btn btn-block">Login</button>
          <p className="message">
            Login? <Link to="/login">Click here</Link>
          </p>
        </form>
      </div>
    </div>  
    )
}
