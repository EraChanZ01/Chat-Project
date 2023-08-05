import React from "react";
import Image from "next/image"

const Contact = ({ name, picture, lastMessage }) => {
    return (
        <div className="Contact">
            <Image src={picture} width={50} height={50} style={{ borderRadius: "100%" }} alt="Your Contact" />
            <div className="Contact-info">
                <span>{name}</span>
                <p className="lastMessage">{lastMessage}</p>
            </div>
        </div>
    )
}


export default Contact