import React from "react";
import './popUp.css';

function PopUp({ isModalOpen, setIsModalOpen, message }) {

    const closeModal = () => setIsModalOpen(false);

    if(!isModalOpen) 
        return null;

    return(
        <div className="backGound">
            <div className="customModal">
                <p className="warning">{message}</p>
                <button onClick={closeModal} className="closeButton">
                    close
                </button>
            </div>            
        </div>
    )
}


export default PopUp;