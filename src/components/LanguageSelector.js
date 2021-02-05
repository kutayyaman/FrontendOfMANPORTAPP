import React from 'react';
import { changeBackendLanguage } from '../api/apiCalls';
import { withTranslation } from 'react-i18next';

const LanguageSelector = (props) => {

    const onClickLanguage = language => {
        const { i18n } = props;
        i18n.changeLanguage(language);
        changeBackendLanguage(language);
    }

    return (
        <div className="container">
            <img src="https://www.countryflags.io/tr/flat/24.png" alt="Turkish Flag" onClick={() => onClickLanguage('tr')} style={{ cursor: 'pointer' }}></img>
            <img src="https://www.countryflags.io/us/flat/24.png" alt="USA Flag" onClick={() => onClickLanguage('en')} style={{ cursor: 'pointer' }}></img>
        </div>
    );
};

export default withTranslation()(LanguageSelector); //Higher Order Component denir buna.