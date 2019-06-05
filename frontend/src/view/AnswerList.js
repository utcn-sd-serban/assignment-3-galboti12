import React from "react";
import 'bulma/css/bulma.min.css';

const AnswerList = ({ answers }) => (
    <div>
        <hr />
        {answers.map((answer, index) => (
            <div key={index} className="box" style={{ backgroundColor: '#f0ffff' }}>
                <article className="media">
                    <div className="media-content">
                        <div className="content">
                            <p> {answer.text}</p>
                        </div>
                        
                        <div className="level-rigth">
                            <i>by</i> <i style={{color : 'coral'}}>{answer.author}</i> <br/>
                            <font size="2">{answer.time}</font>
                        </div>
                    </div>
                </article>
            </div>
        ))}
    </div>
);

export default AnswerList;