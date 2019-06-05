import WebSocketListener from "../ws/WebSocketListener";
import questionModel from "../model/QuestionModel";

const BASE_URL = "http://localhost:8080";

class RestClient {
    constructor(username, password) {
        this.authorization = "Basic " + btoa(username + ":" + password);
    }

    loadAllQuestions() {
        return fetch(BASE_URL + "/questions", {
            method: "GET",
            headers: {
                "Authorization": this.authorization
            }
        }).then(response => response.json());
    }

    createQuestion(title, text, tags) {
        return fetch(BASE_URL + "/questions", {
            method: "POST",
            body: JSON.stringify({ id: 1, author: "", title, text, time: "", tags, answers: [] }),
            headers: {
                "Authorization": this.authorization,
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }

    filterByText(text) {
        return fetch(BASE_URL + "/filter-by-text/" + text, {
            method: "GET",
            headers: {
                "Authorization": this.authorization
            }
        }).then(response => response.json());
    }

    filterByTag(tag) {
        return fetch(BASE_URL + "/filter-by-tag/" + tag, {
            method: "GET",
            headers: {
                "Authorization": this.authorization
            }
        }).then(response => response.json());
    }

    createUser(username, password) {
        return fetch(BASE_URL + "/create-user", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Authorization": this.authorization,
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }

    login(username, password) {
        return fetch(BASE_URL + "/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Authorization": this.authorization,
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }

    loadAnswers(questionId) {
        return fetch(BASE_URL + "/show-question/" + questionId, {
            method: "GET",
            headers: {
                "Authorization": this.authorization,
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }

    loadSelectedQuestion(questionId) {
        return fetch(BASE_URL + "/show-question/" + questionId, {
            method: "PUT",
            headers: {
                "Authorization": this.authorization,
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }

    addAnswer(questionId, text) {
        return fetch(BASE_URL + "/show-question/" + questionId, {
            method: "POST",
            body: JSON.stringify({ id: 1, author: "", text, time: "" }),
            headers: {
                "Authorization": this.authorization,
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }
}

const client = new RestClient("boti", "boti");
const listener = new WebSocketListener("boti", "boti");

listener.on("event", event => {
    if (event.type === "QUESTION_CREATED") {
        questionModel.appendQuestion(event.question)
    }
});


export default client;