import { EventEmitter } from "events";
import client from "../rest/RestClient";

class QuestionModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            questions: [],
            newQuestion: {
                id: 0,
                author: "",
                title: "",
                text: "",
                time: "",
                tags: "",
                answerIds: []
            }
        };
    }

    loadQuestions() {
        return client.loadAllQuestions()
            .then(questions => {
                this.state = {
                    ...this.state, questions
                };
                this.emit("change", this.state);
            })

    }

    addQuestion = (title, text, tags) => {
        return client.createQuestion(title, text, tags)
            .then(question => {
                if (!this.state.questions.includes(question)) {
                    this.appendQuestion(question)
                }
            }
            )
    }

    appendQuestion(question) {
        this.state = {
            ...this.state,
            questions: [question].concat(this.state.questions)
        };
        this.emit("change", this.state);
    }

    changeNewQuestionProperty(property, value) {
        this.state = {
            ...this.state,
            newQuestion: {
                ...this.state.newQuestion,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

    filterByText(text) {
        return client.filterByText(text)
            .then(questions => {
                this.state = {
                    ...this.state, questions
                };
                this.emit("change", this.state);
            })
    }

    filterByTag(tag) {
        return client.filterByTag(tag)
            .then(questions => {
                this.state = {
                    ...this.state, questions
                };
                this.emit("change", this.state);
            })
    }
}

const questionModel = new QuestionModel();

export default questionModel;