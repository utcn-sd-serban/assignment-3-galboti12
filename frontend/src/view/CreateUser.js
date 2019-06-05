import React from "react";
import 'bulma/css/bulma.min.css';

const CreateUser = ({ username, password, onCreate, onChange }) => (
    <div className="box" style={{ backgroundColor: '#fffff0' }}>
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">Username</label>
            </div>
            <div className="field-body">
                <div className="field">
                    <div className="control">
                        <input className="input" type="text" placeholder="Minimum 6 charachers"
                            value={username} onChange={e => onChange("username", e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">Password</label>
            </div>
            <div className="field-body">
                <div className="field">
                    <input className="input" type="password" placeholder="Minimum 6 charachers"
                        value={password} onChange={e => onChange("password", e.target.value)} />
                </div>
            </div>
        </div>

        <div className="field is-grouped is-grouped-right">
            <button className="button is-info" disabled={username.length < 6 || password.length < 6} onClick={onCreate}>Sign Up</button>
        </div>
    </div>
);

export default CreateUser;