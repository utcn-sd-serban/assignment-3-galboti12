import userModel from "../model/UserModel";

class SignUpPresenter {
    onCreate() {
        console.log("SignUpPresenter onCreate");
        userModel.addUser(userModel.state.newUser.username,
            userModel.state.newUser.password);
        userModel.changeNewUserProperty("username", "");
        userModel.changeNewUserProperty("password", "");
        window.location.assign("#/");
    }
    onChange(property, value) {
        userModel.changeNewUserProperty(property, value);
    }
}

const signUpPresenter = new SignUpPresenter();
export default signUpPresenter;