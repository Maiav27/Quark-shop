import { createContext, useState } from "react";


export const AuthContext  = createContext({})

export const AuthProvider = (props) =>{

    const [quarkShop, setQuarkShop] = useState({

        carrinho : [],
        favoritos : []
    })
    


    return(
        <AuthContext.Provider value={{quarkShop, setQuarkShop}}>
            {props.children}
        </AuthContext.Provider>
    )
}



