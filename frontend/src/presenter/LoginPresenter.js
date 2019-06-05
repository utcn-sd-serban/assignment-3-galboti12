import userModel from "../model/UserModel";

class LoginPresenter {
    onChange(property, value) {
        userModel.changeNewUserProperty(property, value);
    }
    onLogin(username, password) {
        console.log("LoginPresenter onLogin");
        if (userModel.login(username, password)){
            window.location.assign("#/");
        }
        else alert("Wrong username or password!");
    }
}

const loginPresenter = new LoginPresenter();
export default loginPresenter;