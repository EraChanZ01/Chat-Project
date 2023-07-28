import React, { useState } from "react"


const ModalLogOn = () => {  

    const [user,setUser] = useState({
        phoneNumber:'',
        password:''
    })

    const handleChange = ({target}) => {
        setUser({
            ...user,
            [target.name]:target.value
        })
    }

    return (
        <div className="Modal-LogOn">
            <label>
                <p>Phone Number</p>
                <input name="phoneNumber" onChange={handleChange}/>
            </label>
            <label>
                <p>Password</p>
                <input name="password" onChange={handleChange}/>
            </label>
            <button className="Button-logOn">Log On</button>
        </div>
    )
}

export default ModalLogOn