import React, { createContext, useState } from 'react'

export const ApiContext = createContext();

export default function UserProvider({children}) {
    const [isLogOut, setIsLogOut] = useState(false)
    // console.log(children);
  return<ApiContext.Provider value={{isLogOut, setIsLogOut}}>
  {children}
  </ApiContext.Provider>
  
}
