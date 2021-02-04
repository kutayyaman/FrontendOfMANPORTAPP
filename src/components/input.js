import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeSquare, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

const Input = (props) => {
    const { label, error, name, onChange, type, iconName } = props;
    const className = error ? "form-control is-invalid" : 'form-control';
    return (
        <div className="form-group">
            <label>{label}</label>
            <div className="input-group-append">
                <span className="input-group-text"><FontAwesomeIcon icon={iconName} /></span>
                <input className={className} name={name} onChange={onChange} type={type} />
                <div className="invalid-feedback ml-1">
                    {error}
                </div>
            </div>
        </div>
    );
};

export default Input;