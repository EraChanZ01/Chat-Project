import React from "react"


const BoxFilter = ({ handleClick, handleChange }) => {

    return (
        <div className="box-filter">
            <label>
                <input onChange={(e) => handleChange(e)} />
                <div onClick={(e) => handleClick(e)} className="button-add-friend">
                    Add
                </div>
            </label>
        </div>
    )
}

export default BoxFilter