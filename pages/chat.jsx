import React, { useEffect } from "react"
import Contact from "../components/contact"
import { connect } from "react-redux"
import { checkAuth } from "../redux/slice/userSlice"


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


const Chat = ({ contact, checkAuth }) => {
    useEffect(() => {
        checkAuth()
    }, [])
    return (
        <div className="Chat-page">
            <div className="Frame">
                <div className="Contact-frame">
                    <div className="box-contact">
                        {
                            contact?.map((user, index) => <Contact key={index} name={user.name} picture={user.picture ? user.picture.large : "/png-user.png"} lastMessage={user.phone} />)
                        }
                    </div>
                    <div className="box-setting">

                    </div>
                </div>
                <div className="chat">

                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    checkAuth: () => dispatch(checkAuth())
})

export default connect(null, mapDispatchToProps)(Chat)