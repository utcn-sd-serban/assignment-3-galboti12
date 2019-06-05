import { EventEmitter } from "events";
import client from "../rest/RestClient";

class AnswerModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            answers: [],
            newAnswer: {
                id: 0,
                author: "",
                text: "",
                time: ""
            },
            selectedQuestion :{
                id: 0,
                author: "",
                title: "",
                text: "",
                time: "",
                tags: [],
                answerIds: []
            },
            text: ""
        };
    }

    setAnswers = (questionId) => {
        return client.loadAnswers(questionId)
            .then(answers => {
                this.state = {
                    ...this.state, answers
                };
                this.emit("change", this.state);
            })
    }

    addAnswer = (questionId, text) => {
        return client.addAnswer(questionId, text)
            .then(answer => {
                this.state = {
                    ...this.state,
                    answers: this.state.answers.concat(answer)
                };
                this.emit("change", this.state);
            })
    }

    changeNewAnswerProperty(property, value) {
        this.state = {
            ...this.state,
            newAnswer: {
                ...this.state.newAnswer,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

    setQuestion = (questionID) => {
        return client.loadSelectedQuestion(questionID)
        .then(selectedQuestion => {
            this.state = {
                ...this.state, selectedQuestion
            };
            this.emit("change", this.state);
        })
    }
}

const answerModel = new AnswerModel();

export default answerModel;