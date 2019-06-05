import React from "react";
import 'bulma/css/bulma.min.css';

const QuestionList = ({ questions, searchByTag, tagSearch , onClickQuestion}) => (
    <div>
        <hr />
        <i><b>{tagSearch}</b></i>
        {questions.map((question, index) => (
            <div key={index} className="box" style={{ backgroundColor: '#fffff0' }}>
                <article className="media">
                    <div className="media-content">
                        <div className="content" onClick={() => onClickQuestion(question.id)}>
                            <p className="button is-white" style={{ backgroundColor: '#fffff0' }}> <strong>{question.title}</strong>
                            </p>
                        </div>
                        <nav className="level is-mobile">
                            <div className="level-left">
                                {question.tags.map((tag, index) => (
                                    <p key={index} className="level-item" >
                                        <span style={{ backgroundColor: '#ffffA0' }} className="button is-small" onClick={() => searchByTag(tag)}>
                                            {tag}
                                        </span>
                                    </p>
                                ))}
                            </div>
                            <div className="level-rigth">
                                <i>by</i> <i style={{ color: 'coral' }}>{question.author}</i> <br />
                                <font size="2">{question.time}</font>
                            </div>
                        </nav>

                    </div>
                </article>
            </div>
        ))}
    </div>
);

export default QuestionList;