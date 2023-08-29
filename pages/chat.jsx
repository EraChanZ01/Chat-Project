import React, { useEffect, useState, useLayoutEffect } from "react"
import Contact from "../components/ChatComponents/contact"
import BlockClientSettings from '../components/ChatComponents/blockClientSettings'
import BlockMessages from '../components/ChatComponents/blockMessages'
import BoxFilter from '../components/ChatComponents/boxFilter'
import { chatController } from './api/ws/socketInit';
import { useRouter } from 'next/router';
import { connect } from "react-redux"
import { checkAuth } from "../redux/slice/userSlice"
import { addFriend, getChats, filterChats } from '../redux/slice/contactSlice'
import Image from "next/image"


const Chat = ({ checkAuth, filterChats, chatsView, addFriend, getChats, data }) => {
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
        if (data) {
            chatController.subscribeChat(data._id)
            return () => {
                chatController.unsubscribeChat(data._id)
            }
        }
    }, [data])

    useEffect(() => {
        filterChats(regex)
    }, [regex])

    const handleChange = ({ target }) => {
        setRegex(target.value)
    }

    const handleClick = ({ target }) => {
        addFriend({ addNumber: regex, userNumber: data.phoneNumber })
        target.value = ''
    }
    return (
        <div className="Chat-page">
            <div className="Frame">
                <div className="Contact-frame">
                    <BoxFilter handleChange={handleChange} handleClick={handleClick} />
                    <div className="box-contact">
                        {
                            chatsView?.map((chat, index) => {
                                return (
                                    <Contact key={index} name={chat.interlocutors.name ? chat.interlocutors.name : chat.interlocutors.phoneNumber}
                                        picture={chat.interlocutors.image}
                                        lastMessage={chat.lastMessage} id={chat._id}
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
    filterChats: (data) => dispatch(filterChats(data)),
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

