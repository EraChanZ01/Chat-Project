import React from "react";
import Image from "next/image"

const Contact = ({ name, picture, lastMessage }) => {
    return (
        <div className="Contact">
            <Image src={picture.large} width={50} height={50} style={{borderRadius:"100%"}}/>
            <div className="Contact-info">
                <span>{name.first}  {name.last}</span>
                <p className="lastMessage">{lastMessage}</p>
            </div>
        </div>
    )
}


export default Contact