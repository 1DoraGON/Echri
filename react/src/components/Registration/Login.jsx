import { useEffect, useRef, useState } from "react";
import axiosClient from "../../api/axios";
import logo from '../../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux'
import { removeToken, setToken, setUser } from "../../app/UserSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialAuth from "./SocialAuth";

const Login = () => {

  const emailRef = useRef()
  const passwordRef = useRef()

  const [errors, setErrors] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || "/";

  const dispatch = useDispatch()

  useEffect(() => {
    console.log(localStorage);
    //dispatch(removeToken())

  }, [])
  const onHandleSubmit = async (e) => {
    e.preventDefault()
    //const csrf = await axiosClient.get('/sanctum/csrf-cookie')
    try {
      await axiosClient.get('/sanctum/csrf-cookie').then(response => {
        //console.log(response);
        const payload = {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        };
        //console.log(payload);
        axiosClient.post('/api/login', payload)
          .then(({ data }) => {
            dispatch(setUser(data.user))
            dispatch(setToken(data.token))
            console.log('this is from :',from);
            navigate(from, { replace: true })
            
          })
          .catch(err => {
            const response = err.response

            if (response && response.status === 422) {
              setErrors(response.data.errors)
              console.log(errors);
            }
          })
      });

    }


    catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="container bg-gray-100 ">
        <div className="py-10 min-h-screen mx-auto max-w-[80vw] lg:max-w-[95vw] flex md:flex-col items-center justify-around sm:gap-y-5">
          <div className="flex flex-col items-center justify-around h-[39vh] w-[30vw] lg:h-[38vh] lg:w-[25vw] md:h-[30vh] md:w-[50vw] lg:max-w-[25vw]">
            <div className="brightness-0 ">
              <img src={logo} alt="" className="w-auto h-auto max-w-full max-h-full" />
            </div>
            <div className="w-auto h-auto max-w-full max-h-full">
              <h1 className="uppercase text-3xl lg:text-2xl md:text-xl   font-bold">just do it</h1>
            </div>
          </div>
          <form onSubmit={(e) => { onHandleSubmit(e) }} className="container  max-w-md flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Log in</h1>
              {errors &&
                <ul className='alert'>
                  {Object.keys(errors).map(key => (
                    <li key={key}>{errors[key][0]}</li>
                  ))}
                  <p key={errors}></p>
                </ul>}

              <input
                required
                type="text"
                ref={emailRef}
                className="block border border-slate-400 w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email" />

              <input
                required
                type="password"
                ref={passwordRef}
                className="block border border-slate-400 w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password" />
                <div className="flex flex-col max-w-sm gap-2">
              <button
                type="submit"
                className="button-theme py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700  text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg"
              >Login</button>
              <span className="mx-auto text-center w-[80%] no-underline border-b border-slate-400 text-black my-2">Or</span>
              <SocialAuth setErrors = {setErrors}/>
              </div>

            </div>

            <div className="text-gray-800 mt-6">
              You don't have an account?&nbsp;
              <Link className="no-underline border-b border-blue-600 text-blue-600" to='/signup'>
                Sign up
              </Link>.
            </div>
          </form>

        </div>
      </div>
    </>
  );
};

export default Login;