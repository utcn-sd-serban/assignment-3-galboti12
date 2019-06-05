import React from "react";
import 'bulma/css/bulma.min.css';

const CreateAnswer = ({ questionId, text, onCreate, onChange }) => (
    <div>
        <br />
        <div className="box" style={{ backgroundColor: '#fff0f0' }}>
            <article className="media">
                <div className="media-left">
                    <button className="button is-info"  onClick={onCreate(questionId)}>Answer</button>
                </div>
                <div className="media-content">
                    <div className="content">
                        <input className="input" type="text" placeholder="Minimum 3 charachers"
                            value={text} onChange={e => onChange("text", e.target.value)} />
                    </div>
                </div>
            </article>
        </div>
    </div>
);

export default CreateAnswer;