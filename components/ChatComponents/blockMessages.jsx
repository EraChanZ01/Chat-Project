import React, { useEffect } from "react";
import Image from 'next/image'
import { connect } from "react-redux";
import { sendMessage, updateStatusMassage } from '../../redux/slice/contactSlice'

const BlockMessages = ({ sendMessage, updateStatusMassage, messageList, currentChat, currentParticipant }) => {

    useEffect(() => {
        if (currentParticipant && currentChat) {
            updateStatusMassage({ chatId: currentChat, participantId: currentParticipant._id })
        }
    }, [currentParticipant, currentChat])

    function handleKeyUp(event) {
        if (event.keyCode === 13) {
            sendMessage({ value: event.target.value, chatId: currentChat, participant: currentParticipant._id })
            event.target.value = ''
        }
    }

    const messages = []
    messageList.map((mes, index) => {
        let image = null
        let classN = "message"
        if (index === 0 || mes.sender._id !== messageList[index - 1].sender._id) {
            image = <Image src={mes.sender.image} width={40} height={40} alt="image sender" />
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
            <header className="header-chat">
                {
                    currentParticipant && (
                        <>
                            <Image src={currentParticipant.image} width={35} height={35} alt="image sender" />
                            <p>{currentParticipant.name ? currentParticipant.name : currentParticipant.phoneNumber}</p>
                        </>
                    )
                }
            </header>
            <ul className="output-message">
                {messages}
            </ul>
            <div className="input-message-div">
                <input onKeyUp={handleKeyUp} />
            </div>
        </div>
    )
}
// 
const mapDispatchToProps = (dispatch) => ({
    sendMessage: (data) => dispatch(sendMessage(data)),
    updateStatusMassage: (data) => dispatch(updateStatusMassage(data))
})

const mapStateToProps = (state) => {
    return {
        ...state.contactStore
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockMessages)