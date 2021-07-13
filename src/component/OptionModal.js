import React from "react";

const OptionModal = ({ openModal: {setIsOpen, increaseCount }}) => {

    const retainCount = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <div className="modalBackground">
            <div className="modalContainer">
                <div>
                    <button className="cross-btn" onClick={() => setIsOpen(false)}>X</button>
                </div>
                <div className="modal-content">
                    <h3>Already watched this episode?</h3>
                    <div className="modal-footer">
                        <button onClick={increaseCount} className="btn btn--add">Watched!</button>
                        <button onClick={retainCount} className="btn btn--red">Not Yet</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default OptionModal