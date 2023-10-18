import axios from 'axios';
import React, { useContext, useState } from 'react'
import { TEInput, TERipple } from "tw-elements-react";
import { useNavigate } from 'react-router-dom'
import Joi from 'joi';
import { ApiContext } from '../components/context/userContext';

export default function LoginPage() {
  const [errores, setErrores] = useState([])
  const [emailExist, setEmailExist] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const navigate = useNavigate()
  const { isLogOut, setIsLogOut } = useContext(ApiContext)

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function getUser(e) {
    setErrores("")
    setEmailExist("")
    let newUser = { ...user };
    let userValue = e.target.value;
    newUser[e.target.id] = userValue;
    setUser(newUser);
  }

  const signIn = () => {
    setIsSignUp(true)
    axios.post("https://blogs-api-delta.vercel.app/auth/signin", user).then(response => {
      // console.log(response.data);
      setIsSignUp(false)
      if (response.data.apiVal != null) {
        setEmailExist(response.data.apiVal)
      }
      else {
        localStorage.setItem("tkn", response.data.token)
        navigate("/")
      }
    }).catch((error => { console.log(error)
    }))
    setIsLogOut(false)
  }


  const onSubmit = async (e) => {
    e.preventDefault();
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$%^&*/]{3,30}$')),
    })

    let validate = schema.validate(user, { abortEarly: false });
    if (validate.error === undefined) {
      //call api
      signIn()
    }
    else {
      setErrores(validate.error.details)
      // console.log(validate.error.details);
    }
  }
  function sendKey(key) {
    if (errores.length != 0) {
      for (let i = 0; i < errores.length; i++) {
        if (errores[i].context.key == key) {
          return errores[i].message
        }
      }
    }
  }


  return (
    <div className=' px-5 '>
      <section className="h-full">
        <div className="container h-full  p-10 ">
          <div className="g-6 flex h-full flex-wrap items-center justify-center">
            <div className="w-full ">
              <div className="block rounded-lg">
                <div className="g-0 lg:flex lg:flex-wrap justify-center items-center">
                  {/* <!-- Left column container--> */}
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      {/* <!--Logo--> */}
                      <div className="text-center">
                        <img
                          className="mx-auto w-50"
                          src="public/download.png"
                          alt="logo"
                        />
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          We are The Lotus Team
                        </h4>
                      </div>

                      <form onSubmit={onSubmit}>
                        <p className="mb-4">Please login to your account</p>
                        {/* <!--Username input--> */}
                        {sendKey("email") && <span className='text-danger flex  items-center'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeWidth="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                          </svg>
                          email is not-valid
                        </span>}
                        <TEInput
                          id='email'
                          onChange={getUser}
                          type="email"
                          label="email"
                          className="mb-4"
                        ></TEInput>

                        {/* <!--Password input--> */}
                        {sendKey("password") && <span className='text-danger flex  items-center'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeWidth="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                          </svg>
                          password is not-valid
                        </span>}
                        <TEInput
                          id='password'
                          onChange={getUser}
                          type="password"
                          label="Password"
                          className="mb-4"
                        ></TEInput>

                        {/* <!--Submit button--> */}
                        {emailExist && <span className='flex justify-center items-center text-danger'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeWidth="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                          </svg>
                          {emailExist}
                        </span>}
                        <div className="mb-12 pb-1 pt-1 text-center">
                          <TERipple rippleColor="light" className="w-full">
                            <button
                              className="mb-3 inline-block w-full bg-gray-700 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                              type="submit">
                              Log in
                            </button>
                            {isSignUp && <div
                              className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                              role="status">
                              <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                              >Loading...</span>
                            </div>}
                          </TERipple>


                        </div>

                        {/* <!--Register button--> */}

                      </form>
                    </div>
                  </div>

                  {/* <!-- Right column container with background and description--> */}
                  {/* <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
