import { useRef, useState } from "react";
import axiosClient from "../../api/axios";
import logo from '../../assets/logo.png'
const SignUp = () => {
  const fullnameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confPasswordRef = useRef()

  const [errors, setErrors] = useState(null)




  const onHandleSubmit = async (e) => {
    e.preventDefault()
    //const csrf = await axiosClient.get('/sanctum/csrf-cookie')
    await axiosClient.get('/sanctum/csrf-cookie').then(response => {
      console.log(response);
      //console.log(csrf);
      const payload = {
        //fullname:  fullnameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        //confPassword: confPasswordRef.current.value,
        //_token : "{{ csrf_token() }}"
      };
      console.log(payload);
      axiosClient.post('/api/login', payload)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);

        })
    });

  }

  return (
    <>
    <div className="container bg-gray-100 ">
    <div className=" min-h-screen mx-auto max-w-[80vw] lg:max-w-[95vw] flex md:flex-col items-center justify-around sm:gap-y-5">
      <div className="flex flex-col items-center justify-around h-[39vh] w-[30vw] lg:h-[38vh] lg:w-[25vw] md:h-[30vh] md:w-[50vw] lg:max-w-[25vw]">
        <div className= "brightness-0 ">
          <img src={logo} alt="" className="w-auto h-auto max-w-full max-h-full" />
        </div>
        <div className="w-auto h-auto max-w-full max-h-full">
          <h1 className="uppercase text-3xl lg:text-2xl md:text-xl   font-bold">just do it</h1>
        </div>
      </div>
      <form onSubmit={(e) => { onHandleSubmit(e) }} className="container  max-w-md flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            required
            type="text"
            ref={fullnameRef}
            className="block border border-slate-400 w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Full Name" />

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
          <input
            required
            type="password"
            ref={confPasswordRef}
            className="block border border-slate-400 w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password" />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 button-theme focus:outline-none my-1"
          >Create Account</button>

          <div className="text-center text-sm text-gray-800 mt-4">
            By signing up, you agree to the&nbsp;
            <a className="no-underline border-b border-blue-600 text-blue-600" href="#">
              Terms of Service
            </a> and&nbsp;
            <a className="no-underline border-b border-blue-600 text-blue-600" href="#">
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-gray-800 mt-6">
          Already have an account?&nbsp;
          <a className="no-underline border-b border-blue-600 text-blue-600" href="../login/">
            Log in
          </a>.
        </div>
      </form>

    </div>
    </div>
    </>
  );
};

export default SignUp;