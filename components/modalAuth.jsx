import React, { useState } from "react"

const ModalAuth = ({ clickFun, input, auxiliaryButton, auxiliaryButtonName, handleChange }) => {

    return (
        <div className="Modal-Auth">
            {input.map((el, index) => {
                return (
                    <label key={index}>
                        <p>{el.title}</p>
                        <input name={el.name} onChange={handleChange} />
                    </label>
                )
            })}
            <button className="Button-Auth" onClick={clickFun}>Log On</button>
            <a className="auxiliary-Button" onClick={auxiliaryButton}>{auxiliaryButtonName}</a>
        </div>
    )
}



export default ModalAuth