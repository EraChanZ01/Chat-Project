import React from "react"
import store from "../redux/store"
import { Provider } from "react-redux"
import "../styles/Home.scss"
import "../styles/Chat.scss"



const App = ({ Component, pageProps }) => {
    
    return (
        <>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    )
}


export default App