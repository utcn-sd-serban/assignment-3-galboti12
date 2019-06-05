import React from "react";
import 'bulma/css/bulma.min.css';


const CreateQuestion = ({ title, text, tags, onCreate, onChange }) => (
    <div className="box" style={{ backgroundColor: '#fffff0' }}>
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">Title</label>
            </div>
            <div className="field-body">
                <div className="field">
                    <div className="control">
                        <input className="input" type="text" placeholder="Minimum 5 charachers"
                            value={title} onChange={e => onChange("title", e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">Question</label>
            </div>
            <div className="field-body">
                <div className="field">
                    <textarea className="textarea" placeholder="Describe in at least 10 characters"
                        value={text} onChange={e => onChange("text", e.target.value)}></textarea>
                </div>
            </div>
        </div>

        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">Tags</label>
            </div>
            <div className="field-body">
                <div className="field">
                    <input className="input" type="text" value={tags} onChange={e => onChange("tags", e.target.value)} />
                </div>
            </div>
        </div>

        <div className="field is-grouped is-grouped-right">
            <button className="button is-info" disabled={text.length < 10 || title.length < 5 || tags.length < 3} onClick={onCreate}>Create</button>
        </div>
    </div>
);

export default CreateQuestion;
