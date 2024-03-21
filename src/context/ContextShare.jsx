
import React, { createContext, useState } from 'react'


export const isHomeContext = createContext()

function ContextShare({children}) {
    const [isHomeToken,setIsHomeToken] = useState(true)

    return (
    
    <>
   <isHomeContext.Provider value={{isHomeToken,setIsHomeToken}}>
    {children}
   </isHomeContext.Provider>
    
    </>
       )
    }
    
    export default ContextShare