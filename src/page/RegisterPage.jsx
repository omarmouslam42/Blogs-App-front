import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { TEInput, TERipple } from "tw-elements-react";
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const [errores, setErrores] = useState([])
  const [emailExist, setEmailExist] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)


  const navigate = useNavigate()

  const [user, setUser] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
  });

  function getUser(e) {
    setErrores("")
    setEmailExist("")
    let newUser = { ...user };
    let userValue = e.target.value;
    newUser[e.target.id] = userValue;
    setUser(newUser)
    // console.log(newUser);
  }

  const signUp = async () => {
    try {
      const { data } = await axios.post("https://blogs-api-delta.vercel.app/auth/signup", user)
      setIsSignUp(true)
      // console.log(data.apiVal);
      if (data.apiVal != null) {
        setEmailExist(data.apiVal)
        console.log(emailExist);
        setIsSignUp(false)
      }
      else {
        navigate("/login")
      }
    } catch (error) {
      console.log(error);
    }

  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const schema = Joi.object({
      userName: Joi.string().alphanum().min(3).max(20).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$%^&*/]{3,30}$')),
      phone: Joi.number().positive().required()
    })

    let validate = schema.validate(user, { abortEarly: false });
    if (validate.error == undefined) {
      //call api
      signUp()
    }
    else {
      // console.log(validate);
      setErrores(validate.error.details)
      // setIconClick(true)
      console.log(validate.error.details);

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
    <div className='mt-3 px-5 '>
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
                        <p className="mb-4">Please Sign Up</p>
                        {/* <!--Username input--> */}
                        {sendKey("userName") && <span className='text-danger flex  items-center'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeWidth="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                          </svg>
                          userName is not-valid
                        </span>}

                        <TEInput
                          id='userName'
                          onChange={getUser}
                          type="text"
                          label="UserName"
                          className="mb-4"
                        ></TEInput>
                        {/* <!--Password input--> */}
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
                        {sendKey("phone") && <span className='text-danger flex  items-center'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeWidth="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                          </svg>
                          phone is not-valid
                        </span>}
                        <TEInput
                          id='phone'
                          onChange={getUser}
                          type="number"
                          label="phone"
                          className="mb-4"
                        ></TEInput>
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
                              className="mb-3 inline-block w-full bg-neutral-600 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                              type="submit"
                            >
                              {isSignUp && <span>Loading...</span>}
                              Sign Up
                            </button>
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
