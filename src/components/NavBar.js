import React, { Component } from 'react';
import { Link } from 'react-router-dom'; //a etiketi yerine Link kullanma sebebimiz HashRouter yerine BrowserRouter kullanmak istersek ilerde sorun yasamamk icin yani hashrouter /# gibi bir etiket ekliyor cunku
import { withTranslation } from 'react-i18next';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import LanguageSelector from '../components/LanguageSelector';


class NavBar extends Component {
    render() {
        const { t } = this.props;
        return (
            <div className="shadow-sm mb-2">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">MANPORT</Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className=" navbar-collapse collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">{t('Home')}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">{t('Dashboard')}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/management">{t('Management')}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/issues">{t('Issues')}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/links">{t('Links')}</Link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {t('Language')}
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <LanguageSelector></LanguageSelector>
                                </div>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    <span className="mr-1">{t('Login')}</span>
                                    <FontAwesomeIcon icon={faSignInAlt} />
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">
                                    <span className="mr-1">{t('Add User')}</span>
                                    <FontAwesomeIcon icon={faUserPlus} />
                                </Link>
                            </li>
                        </ul>
                    </div>


                </nav>
            </div>
        )
    }
}

export default withTranslation()(NavBar);