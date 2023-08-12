import React, { useEffect, useState, useLayoutEffect } from "react"
import Contact from "../components/ChatComponents/contact"
import BlockClientSettings from '../components/ChatComponents/blockClientSettings'
import BlockMessages from '../components/ChatComponents/blockMessages'
import { chatController } from './api/ws/socketInit';
import { useRouter } from 'next/router';
import { connect } from "react-redux"
import { checkAuth } from "../redux/slice/userSlice"
import { getAllUser, addFriend, getChats } from '../redux/slice/contactSlice'
import Image from "next/image"


const Chat = ({ checkAuth, getAllUser, chatsView, addFriend, getChats, data }) => {
    const router = useRouter();
    const [regex, setRegex] = useState('')

    useEffect(() => {
        checkAuth().then(({ payload, meta }) => {
            if (meta.requestStatus === 'fulfilled') {
                getChats()
            } else {
                router.push('/')
            }
        })
    }, [])

    useEffect(() => {
        //chatController.subscribeChat(data?._id)
        //return () => {
        // chatController.unsubscribeChat(data?._id)
        // }
    }, [data])

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
                            <Image src={"/images/add-user.svg"} width={30} height={22} alt="button add friend" />
                        </div>
                    </div>
                    <div className="box-contact">
                        {
                            chatsView?.map((chat, index) => {
                                return (
                                    <Contact key={index} name={chat.interlocutors.phoneNumber}
                                        picture={chat.picture ? chat.picture.large : "/images/png-user.png"}
                                        lastMessage={chat.lastMessage?.body} id={chat._id}
                                        interlocutorId={chat.interlocutors._id} />
                                )
                            })
                        }
                    </div>
                    <BlockClientSettings />
                </div>
                <BlockMessages />
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

