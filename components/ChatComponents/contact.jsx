import React from "react";
import Image from "next/image"
import { connect } from "react-redux";
import { getOneChat } from "../../redux/slice/contactSlice";

const Contact = ({ name, picture, lastMessage, id, getOneChat, interlocutorId }) => {
    const handleClick = () => {
        getOneChat({ chatId: id, participant: interlocutorId })
    }
    return (
        <div className="Contact" onClick={handleClick}>
            <Image src={picture} width={45} height={45} style={{ borderRadius: "100%" }} alt="Your Contact" priority={false} />
            <div className="Contact-info">
                <span>{name}</span>
                <p className="lastMessage">{lastMessage?.body}</p>
            </div>
            {
                lastMessage?.status === 'new' && lastMessage?.sender._id === interlocutorId? <div className="notifi-mes"></div> : null
            }

        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getOneChat: (data) => dispatch(getOneChat(data))
})

export default connect(null, mapDispatchToProps)(Contact);