import React, { useEffect, useState, useLayoutEffect } from "react"
import Contact from "../components/contact"
import BlockClientSettings from '../components/blockClientSettings'
import { chatController } from './api/ws/socketInit';
import { useRouter } from 'next/router';
import { connect } from "react-redux"
import { checkAuth } from "../redux/slice/userSlice"
import { getAllUser, addFriend, getChats } from '../redux/slice/contactSlice'
import Image from "next/image"


const Chat = ({ checkAuth, getAllUser, chatsView, addFriend, getChats, data }) => {
    const router = useRouter();
    const [regex, setRegex] = useState('')

    /*const socketInitializer = async (id) => {
        await fetch('/api/socket')
        socket = io()

        socket.on('connect', () => {
            socket.emit('socketSubscribe', id)
        })
    }*/


    useEffect(() => {
        checkAuth().then(({ payload, meta }) => {
            if (meta.requestStatus === 'fulfilled') {
                chatController.subscribeChat(payload.data._id)
                getChats()
            } else {
                router.push('/')
            }
        })
        return () => {
            //socket?.emit('socketUnsubscribe', data._id)
        }
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
                            chatsView?.map((user, index) => <Contact key={index} name={user.interlocutors.phoneNumber} picture={user.picture ? user.picture.large : "/images/png-user.png"} lastMessage={user.lastMessage?.body} />)
                        }
                    </div>
                    <BlockClientSettings />
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

