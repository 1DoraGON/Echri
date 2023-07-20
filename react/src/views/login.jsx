import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../api/axios'
import { useStateContext } from '../contexts/ContextProvider'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const {setUser,setToken} = useStateContext()

  const [errors,setErrors] = useState(null)
  const onSubmit = (e) => {
    e.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    axiosClient.post('/login',payload)
    .then((response) => {
      setUser(response.data.user)
      setToken(response.data.token)
    })
    .catch((error) => {
      const response = error.response
      if (response.status === 422){
        setErrors(response.data.errors)
      }
    })
  }

  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
            Login into your account
          </h1>
          {errors && 
            <div className='alert'>
              {Object.keys(errors).map(key=>(
                <p key={key}>{errors[key][0]}</p>
              ))}
              <p key={errors}></p>
            </div>}
          <input ref={emailRef} type="email" placeholder='Email'/>
          <input ref={passwordRef} type="password" placeholder='Pasword'/>
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not Regestered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
