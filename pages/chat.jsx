import React, { useEffect, useState } from "react"
import Contact from "../components/contact"
import { connect } from "react-redux"
import { checkAuth, addFriend } from "../redux/slice/userSlice"
import { getAllUser } from '../redux/slice/contactSlice'
import Image from "next/image"


/*export const getServerSideProps = async () => {

    const res = await fetch('http://localhost:3000/api/user/getAll')
    const data = await res.json()
    console.log(data)
    if (!data) {
        return {
            notFound: true
        }
    }
    return {
        props: { contact: data }
    }
}*/


const Chat = ({ contact, checkAuth, getAllUser, contactList, addFriend, data }) => {
    const [regex, setRegex] = useState('')
    useEffect(() => {
        checkAuth()
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
                            contactList?.map((user, index) => <Contact key={index} name={user.phoneNumber} picture={user.picture ? user.picture.large : "/images/png-user.png"} lastMessage={user.phoneNumber} />)
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
    checkAuth: () => dispatch(checkAuth()),
    getAllUser: (data) => dispatch(getAllUser(data)),
    addFriend: (data) => dispatch(addFriend(data))
})
const mapStateToProps = (state) => {
    return {
        ...state.contactStore,
        ...state.userStore
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)



//