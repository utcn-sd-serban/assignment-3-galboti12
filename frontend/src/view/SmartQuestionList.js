import React, { Component } from "react";
import questionModel from "../model/QuestionModel";
import QuestionList from "./QuestionList";
import stackoverflowPresenter from "../presenter/StackoverflowPresenter";

const mapModelStateToComponentState = modelState => ({
    questions: modelState.questions
});

export default class SmartQuestionList extends Component {
    constructor() {
        super();
        this.state = mapModelStateToComponentState(questionModel.state);
        this.listener = modelState => this.setState(mapModelStateToComponentState(modelState));
        questionModel.addListener("change", this.listener);
        console.log("SmartQuestionList constructor");
    }

    componentWillUnmount() {
        questionModel.removeListener("change", this.listener);
        console.log("SmartQuestionList will unmount");
    }

    componentWillMount(){
        stackoverflowPresenter.onInit();
    }

    render() {
        return (
            <QuestionList
                onClickQuestion={stackoverflowPresenter.onClickQuestion}
                questions={this.state.questions}
                searchByTag={stackoverflowPresenter.onSearchByTag}
            />
        );
    }
}