import React from "react";
import 'bulma/css/bulma.min.css';
import logo from '../images/so-logo.png';

const LoggedinHeader = ({ onCreateQuestion, onLogout, username }) => (
    <nav className="level">
        <div className="level-left">
            <a className="level-item" href={'#/'}>
                <figure className="image is-64x64">
                    <img src={logo} alt="so-logo" />
                </figure>

            </a>
            <div className="level-item">
                <div className="field has-addons">
                    <input className="input" type="text" placeholder="Find a post" />
                    <p className="button"> Search </p>
                </div>
            </div>
            <div className="level-item">
                <p className="button  is-danger is-focused" onClick={onCreateQuestion}>Ask Question</p>
            </div>
        </div>
        <div className="level-right">
            <div className="level-item"><p><strong><u>{username}</u></strong></p></div>
            <div className="level-item"><p className="button" onClick={onLogout}>Log out</p></div>
        </div>
    </nav>
);

export default LoggedinHeader;