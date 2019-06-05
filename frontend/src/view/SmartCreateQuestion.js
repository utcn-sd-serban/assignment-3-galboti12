import React, { Component } from "react";
import questionModel from "../model/QuestionModel";
import CreateQuestion from "./CreateQuestion";
import createQuestionPresenter from "../presenter/CreateQuestionPresenter";

const mapModelStateToComponentState = modelState => ({
    question: modelState.newQuestion
});

export default class SmartCreateQuestion extends Component {
    constructor() {
        console.log("SmartCreateQuestion constructor");
        super();
        this.state = mapModelStateToComponentState(questionModel.state);
        this.listener = modelState => this.setState(mapModelStateToComponentState(modelState));
        questionModel.addListener("change", this.listener);
    }

    componentWillUnmount() {
        console.log("SmartCreateQuestion will unmont!");
        questionModel.removeListener("change", this.listener);
    }

    render() {
        return (
            <CreateQuestion 
                onCreate={createQuestionPresenter.onCreate}
                onChange={createQuestionPresenter.onChange}
                title={this.state.question.title}
                text={this.state.question.text}
                tags={this.state.question.tags} />
        );
    }
}