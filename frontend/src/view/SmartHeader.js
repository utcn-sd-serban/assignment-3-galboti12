import React, { Component } from 'react';
import userModel from "../model/UserModel";
import Header from "./Header";
import LoggedinHeader from "./LoggedinHeader";
import stackoverflowPresenter from "../presenter/StackoverflowPresenter";

const mapModelStateToComponentState = modelState => ({
    loggedInUser: modelState.loggedInUser,
    newUser: modelState.newUser
});

export default class SmartHeader extends Component {
    constructor() {
        console.log("SmartHeader consructor");
        super();
        this.state = mapModelStateToComponentState(userModel.state);
        this.listener = modelState => this.setState(mapModelStateToComponentState(modelState));
        userModel.addListener("change", this.listener);
    }

    componentWillUnmount() {
        console.log("SmartCreateQuestion will unmont!");
        userModel.removeListener("change", this.listener);
    }

    render() {
        if (this.state.loggedInUser === "") {
            return (
                <Header
                    searchText={this.state.newUser.searchText}
                    onChange={stackoverflowPresenter.onChangeSearchText}
                    onSearch={stackoverflowPresenter.onSearchByText}
                    onSignUp={stackoverflowPresenter.onCreateUser}
                    onLogin={stackoverflowPresenter.onLogin}
                />
            )
        }
        else {
            return (
                <LoggedinHeader
                searchText={this.state.newUser.searchText}
                    onChange={stackoverflowPresenter.onChangeSearchText}
                    onSearch={stackoverflowPresenter.onSearchByText}
                    onCreateQuestion={stackoverflowPresenter.onCreateQuestion}
                    onLogout={stackoverflowPresenter.onLogout}
                    username={this.state.loggedInUser.username}
                />
            )
        }

    }
}