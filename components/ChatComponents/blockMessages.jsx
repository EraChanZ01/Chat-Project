import React, { useState } from "react";
import { connect } from "react-redux";
import { sendMessage } from '../../redux/slice/contactSlice'

const BlockMessages = ({ sendMessage, messageList, currentChat, participant }) => {

    function handleKeyUp(event) {
        if (event.keyCode === 13) {
            sendMessage({ value: event.target.value, chatId: currentChat, participant })
            event.target.value = ''
        }
    }

    return (
        <div className="chat">
            <ul className="output-message">
                {messageList.map((mes, index) => {
                    return (
                        <li key={index}>
                            {mes.body}
                        </li>
                    )
                })}
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