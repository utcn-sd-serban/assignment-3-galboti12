import questionModel from "../model/QuestionModel";

class CreateQuestionPresenter {
    onCreate() {
        console.log("CreateQuestionPresenter onCreate");
        questionModel.addQuestion(questionModel.state.newQuestion.title,
            questionModel.state.newQuestion.text, [...new Set(questionModel.state.newQuestion.tags.split(" "))]);
        questionModel.changeNewQuestionProperty("title", "");
        questionModel.changeNewQuestionProperty("text", "");
        questionModel.changeNewQuestionProperty("tags", "");
        window.location.assign("#/");
    }
    onChange(property, value) {
        questionModel.changeNewQuestionProperty(property, value);
    }
}

const createQuestionPresenter = new CreateQuestionPresenter();

export default createQuestionPresenter;