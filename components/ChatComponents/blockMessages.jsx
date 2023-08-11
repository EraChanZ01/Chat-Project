import React, { useState } from "react";
import Image from 'next/image'
import { connect } from "react-redux";
import { sendMessage } from '../../redux/slice/contactSlice'

const BlockMessages = ({ sendMessage, messageList, currentChat, participant }) => {

    function handleKeyUp(event) {
        if (event.keyCode === 13) {
            sendMessage({ value: event.target.value, chatId: currentChat, participant })
            event.target.value = ''
        }
    }

    const messages = []
    messageList.map((mes, index) => {
        let image = null
        let classN = "message"

        if (index === 0 || mes.sender._id !== messageList[index - 1].sender._id) {
            image = <Image src={mes.sender.image ? `/images/${mes.sender.image}` : "/images/png-user.png"} width={30} height={30} />
            classN = "message-user"
        }

        messages.push(
            <div key={index} className={classN}>
                {image}
                <li>
                    {mes.body}
                </li>
            </div>
        )
    })

    return (
        <div className="chat">
            <ul className="output-message">
                {messages}
            </ul>
            <div className="input-message-div">
                <input onKeyUp={handleKeyUp} />
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    sendMessage: (data) => dispatch(sendMessage(data))
})

const mapStateToProps = (state) => {
    return {
        ...state.contactStore
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockMessages)