import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router';
import { connect } from "react-redux"
import { checkAuth, registerUser, loginUser } from "../redux/slice/userSlice"
import ModalAuth from '../components/modalAuth'

const Home = ({ checkAuth, registerUser, loginUser, data }) => {
    const router = useRouter();
    useEffect(() => {
        checkAuth()
            .then(data => {
                if (data.meta.requestStatus === 'fulfilled') {
                    router.push('/chat')
                }
            })
    }, [])
    const [modal, setModal] = useState(false)
    const [user, setUser] = useState({})
    const switchModal = () => {
        setModal(!modal)
    }
    const handleClick = () => {
        if (modal) {
            if (user.repeatPassword === user.password) {
                registerUser(user)
            } else {

            }
        } else {
            loginUser(user).then((data) => {
                if (data.meta.requestStatus === 'fulfilled') {
                    router.push('/chat')
                }
            })
        }
    }
    const handleChange = ({ target }) => {
        setUser({
            ...user,
            [target.name]: target.value
        })
    }
    return (
        <div className="Home-page">
            {modal ?
                <ModalAuth clickFun={handleClick} auxiliaryButton={switchModal} auxiliaryButtonName={'ALREADY HAVE AN ACCOUNT?'}
                    handleChange={handleChange} input={[
                        { title: 'Phone number', name: 'phoneNumber' },
                        { title: 'Password', name: 'password' },
                        { title: 'Repeat password', name: 'repeatPassword' }
                    ]} /> :
                <ModalAuth clickFun={handleClick} auxiliaryButton={switchModal} auxiliaryButtonName={'CREATE AN ACCOUNT'}
                    handleChange={handleChange} input={[
                        { title: 'Phone number', name: 'phoneNumber' },
                        { title: 'Password', name: 'password' },
                    ]} />
            }
        </div>
    )
}
const mapDispatchToProps = (dispatch) => ({
    checkAuth: () => dispatch(checkAuth()),
    registerUser: (data) => dispatch(registerUser(data)),
    loginUser: (data) => dispatch(loginUser(data))
})
const mapStateToProps = (state) => {
    return {
        ...state.userStore
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)