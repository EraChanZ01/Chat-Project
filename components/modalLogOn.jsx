import React, { useState } from "react"
import { connect } from "react-redux"
import { registerUser } from "../redux/slice/userSlice"


const ModalLogOn = ({ registerUser }) => {
    const [user, setUser] = useState({
        phoneNumber: '',
        password: ''
    })

    const handleChange = ({ target }) => {
        setUser({
            ...user,
            [target.name]: target.value
        })
    }
    const handleClick = () => {
        registerUser(user)
    }

    return (
        <div className="Modal-LogOn">
            <label>
                <p>Phone Number</p>
                <input name="phoneNumber" onChange={handleChange} />
            </label>
            <label>
                <p>Password</p>
                <input name="password" onChange={handleChange} />
            </label>
            <button className="Button-logOn" onClick={handleClick}>Log On</button>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => ({
    registerUser: (data) => dispatch(registerUser(data))
})


export default connect(null, mapDispatchToProps)(ModalLogOn)