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
            <Image src={picture} width={50} height={50} style={{ borderRadius: "100%" }} alt="Your Contact" />
            <div className="Contact-info">
                <span>{name}</span>
                <p className="lastMessage">{lastMessage}</p>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getOneChat: (data) => dispatch(getOneChat(data))
})

export default connect(null, mapDispatchToProps)(Contact);