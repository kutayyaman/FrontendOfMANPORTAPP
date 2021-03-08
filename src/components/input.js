import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Input = (props) => {
    const { label, error, name, onChange, type, iconName, disabled, defaultValue } = props;
    const className = error ? "form-control is-invalid" : 'form-control';
    return (
        <div className="form-group">
            <label>{label}</label>
            <div className="form-group position-relative">
                <div className="input-group">
                    <span className="input-group-text"><FontAwesomeIcon icon={iconName} /></span>
                    <input className={className} name={name} onChange={onChange} type={type} disabled={disabled} defaultValue={defaultValue} />
                    <div className="invalid-feedback">
                        {error}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Input;