import React from 'react';

const ButtonWithProgress = (props) => {
    const { onClick, pendingApiCall, disabled, text, loading } = props
    return (
        <div>
            <div className="text-center">
                <button disabled={disabled} className="btn btn-primary" onClick={onClick}>{text}</button>
            </div>
            <div className="text-center mt-2">
                {pendingApiCall && //conditional rendering deniyor buna pendingApiCall dogruysa devamindaki calisir
                    <div className="spinner-border" role="status">
                        <span className="sr-only">{loading}</span>
                    </div>}
            </div>
        </div>

    );
};

export default ButtonWithProgress;