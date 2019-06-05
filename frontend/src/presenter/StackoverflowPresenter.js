import userModel from "../model/UserModel";
import questionModel from "../model/QuestionModel";
import answerModel from "../model/AnswerModel";

class StackoverflowPresenter {
    onCreateQuestion() {
        window.location.assign("#/create-question");
    }
    onCreateUser() {
        window.location.assign('#/sign-up');
    }
    onLogin() {
        window.location.assign('#/login');
    }
    onLogout() {
        console.log("LogoutPresenter onLogout");
        userModel.logout();
    }
    onSearchByTag(tag) {
        console.log("searchByTag " + tag);
        questionModel.filterByTag(tag);
        window.location.assign('#/filter-by-tag/' + tag);
    }
    onChangeSearchText(property, value) {
        userModel.changeNewUserProperty(property, value);
    }
    onSearchByText(text) {
        if (text.trim() != "") {
            console.log("searchByText " + text);
            questionModel.filterByText(text);
            window.location.assign('#/filter-by-text/' + text);
        }
    }
    onClickQuestion(id) {
        console.log("clicked Question with id " + id);
        window.location.assign('#/show-question/' + id);
    }

    onInit() {
        questionModel.loadQuestions();
    }
}

const stackoverflowPresenter = new StackoverflowPresenter();

export default stackoverflowPresenter;