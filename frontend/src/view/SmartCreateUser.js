import React, { Component } from 'react';
import userModel from "../model/UserModel";
import CreateUser from "./CreateUser";
import signUpPreseneter from "../presenter/SignUpPresenter";

const mapModelStateToComponentState = modelState => ({
    user: modelState.newUser
});

export default class SmartCreateUser extends Component {
    constructor() {
        console.log("SmartCreateUser consructor");
        super();
        this.state = mapModelStateToComponentState(userModel.state);
        this.listener = modelState => this.setState(mapModelStateToComponentState(modelState));
        userModel.addListener("change", this.listener);
    }

    componentWillUnmount() {
        userModel.removeListener("change", this.listener);
    }

    render() {
        return (
            <CreateUser
                onChange={signUpPreseneter.onChange}
                onCreate={signUpPreseneter.onCreate}
                username={this.state.user.username}
                password={this.state.user.password}
            />
        )
    }
}