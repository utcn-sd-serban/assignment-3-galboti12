import React, { Component } from 'react';
import userModel from "../model/UserModel";
import Login from "./Login";
import loginPreseneter from "../presenter/LoginPresenter";

const mapModelStateToComponentState = modelState => ({
    user: modelState.newUser
});

export default class SmartCreateUser extends Component {
    constructor() {
        console.log("SmartLogin consructor");
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
            <Login
                onChange={loginPreseneter.onChange}
                onLogin={loginPreseneter.onLogin}
                username={this.state.user.username}
                password={this.state.user.password}
            />
        )
    }
}