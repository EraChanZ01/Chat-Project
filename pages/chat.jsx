import React from "react"
import Contact from "../components/contact"

export const getServerSideProps = async () => {
    const res = await fetch('https://randomuser.me/api/?results=16')
    const data = await res.json()
    if (!data) {
        return {
            notFound: true
        }
    }
    return {
        props: { contact: data.results }
    }
}

const Chat = ({ contact }) => {
    return (
        <div className="Chat-page">
            <div className="Frame">
                <div className="Contact-frame">
                    {
                        contact.map((user) => <Contact name={user.name} picture={user.picture} lastMessage={user.phone} />)
                    }
                </div>
                <div className="chat">

                </div>
            </div>
        </div>
    )
}

export default Chat