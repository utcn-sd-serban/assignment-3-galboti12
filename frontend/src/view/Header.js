import React from "react";
import 'bulma/css/bulma.min.css';
import logo from '../images/so-logo.png';

const Header = ({ searchText, onChange, onSearch, onSignUp, onLogin }) => (
  <nav className="level">
    <div className="level-left">
      <a className="level-item" href={'#/'}>
        <figure className="image is-64x64">
          <img src={logo} alt="so-logo" />
        </figure>

      </a>
      <div className="level-item">
        <div className="field has-addons">
          <input className="input" type="text" placeholder="Find a question" 
           value={searchText} onChange={e => onChange("searchText", e.target.value)}/>
          <p className="button" onClick={() => onSearch(searchText)}> Search </p>
        </div>
      </div>
      <div className="level-item">
        <p style = {{color:'#ff0000'}}>Log in to ask question.</p>
      </div>
    </div>
    <div className="level-right">
      <div className="level-item"><p className="button is-success" onClick={onSignUp}>Sign up</p></div>
      <div className="level-item"><p className="button" onClick={onLogin}>Log in</p></div>
    </div>
  </nav>
);

export default Header;
