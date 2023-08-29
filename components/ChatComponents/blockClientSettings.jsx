import React from "react"
import { connect } from "react-redux"
import Image from 'next/image'

const BlockClientSettings = ({ data }) => {
    return (
        <div className="box-setting">
            {
                data && <Image src={data.image} width={45} height={45} alt="Your image" />
            }
            <div className="short-info">
                <p>{data?.name ? data?.name : data?.phoneNumber}</p>
                <Image src={'images/icons8.svg'} width={28} height={28} alt="settings" priority={true} />
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