import answerModel from "../model/AnswerModel";

class CreateAnswerPresenter {
    onCreate(questionId) {
        console.log("CreateAnswerPresenter onCreate " + questionId);
        answerModel.addAnswer(questionId, answerModel.state.newAnswer.text);
        answerModel.changeNewAnswerProperty("text", "");
        window.location.assign("#/show-question/" + questionId);
    }
    onChange(property, value) {
        answerModel.changeNewAnswerProperty(property, value);
    }
    onInit(id){
        answerModel.setAnswers(id);
        answerModel.setQuestion(id);
    }
}

const createAnswerPresenter = new CreateAnswerPresenter();

export default createAnswerPresenter;