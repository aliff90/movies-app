import React from "react";

const OptionModal = ({ openModal: {setIsOpen, increaseCount }}) => {

    const retainCount = () => {
        setIsOpen(false);
    };

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <button onClick={() => setIsOpen(false)}>X</button>
                <div className="bodyModal">
                    <h3>Already watched this episode?</h3>
                </div>
                <div className="footerModal">
                    <button onClick={increaseCount}>Ofcourse!</button>
                    <button onClick={retainCount}>Not Yet</button>
                </div>
            </div>  
        </div>
    )
}

export default OptionModal