import React, { useEffect, useState } from "react"
import Contact from "../components/contact"
import { useRouter } from 'next/router';
import { connect } from "react-redux"
import { checkAuth } from "../redux/slice/userSlice"
import { getAllUser, addFriend, getChats } from '../redux/slice/contactSlice'
import Image from "next/image"

const Chat = ({ checkAuth, getAllUser, chatsView, addFriend, getChats, data }) => {
    const router = useRouter();
    const [regex, setRegex] = useState('')
    useEffect(() => {
        checkAuth().then(data => {
            if (data.meta.requestStatus === 'fulfilled') {
                getChats()
            } else {
                router.push('/')
            }
        })
    }, [])
    useEffect(() => {
        if (regex.length > 5) {
            getAllUser(regex)
        }
    }, [regex])
    const handleChange = ({ target }) => {
        setRegex(target.value)
    }
    const handleClick = () => {
        addFriend({ addNumber: regex, userNumber: data.phoneNumber })
    }

    return (
        <div className="Chat-page">
            <div className="Frame">
                <div className="Contact-frame">
                    <div className="box-filter">
                        <input onChange={handleChange} />
                        <div onClick={handleClick}>
                            <Image src={"/images/add-user.svg"} width={30} height={25} alt="button add friend" />
                        </div>
                    </div>
                    <div className="box-contact">
                        {
                            chatsView?.map((user, index) => <Contact key={index} name={user.interlocutors.phoneNumber} picture={user.picture ? user.picture.large : "/images/png-user.png"} lastMessage={user.lastMessage.body} />)
                        }
                    </div>
                    <div className="box-setting">

                    </div>
                </div>
                <div className="chat">

                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    checkAuth: () => dispatch(checkAuth()),
    getAllUser: (data) => dispatch(getAllUser(data)),
    addFriend: (data) => dispatch(addFriend(data)),
    getChats: () => dispatch(getChats())
})
const mapStateToProps = (state) => {
    return {
        ...state.contactStore,
        ...state.userStore
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)



//