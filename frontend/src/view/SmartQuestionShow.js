import React, { Component } from "react";
import answerModel from "../model/AnswerModel";
import stackoverflowPresenter from "../presenter/StackoverflowPresenter";
import Question from "./Question";
import AnswerList from "./AnswerList";
import CreateAnswer from "./CreateAnswer";
import createAnswerPresenter from "../presenter/CreateAnswerPresenter";

const mapModelStateToComponentState = answerModelState => ({
    question: answerModelState.selectedQuestion,
    answers: answerModelState.answers,
    newAnswer: answerModelState.newAnswer
})

export default class SmartQuestionShow extends Component {
    constructor(props) {
        super(props);
        this.state = mapModelStateToComponentState(answerModel.state);
        this.listener = answerModelState => this.setState(mapModelStateToComponentState(answerModelState));
        answerModel.addListener("change", this.listener);
    }

    // componentDidUpdate(prev) {
    //     if (prev.match.params.id !== this.props.match.params.id) {
    //         this.setState(mapModelStateToComponentState(answerModel.state, this.props));
    //     }
    // }

    // componentWillMount() {
    //     createAnswerPresenter.onInit(this.props.match.params.id);
    // }

    // componentWillUnmount() {
    //     answerModel.removeListener("change", this.listener);
    // }
    
    render() {
        return (
            <div>
                <Question
                    question={this.state.question}
                    searchByTag={stackoverflowPresenter.onSearchByTag} />
                <CreateAnswer
                    questionId={this.state.question.id}
                    text={this.state.newAnswer.text}
                    onCreate={createAnswerPresenter.onCreate}
                    onChange={createAnswerPresenter.onChange} />
                <AnswerList answers={this.state.answers} />
            </div>
        );
    }
}