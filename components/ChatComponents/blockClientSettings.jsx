import React from "react"
import { connect } from "react-redux"
import Image from 'next/image'

const BlockClientSettings = ({ data }) => {
    return (
        <div className="box-setting">
            <Image src={data?.image ? `/images/${data.image}` : "/images/png-user.png"}
                width={28} height={28} alt="Your image" />
            <div className="short-info">
                <p>{data?.name}</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state.userStore
    }
}

export default connect(mapStateToProps)(BlockClientSettings)