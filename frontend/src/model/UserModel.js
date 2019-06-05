import { EventEmitter } from "events";
import client from "../rest/RestClient";

class UserModel extends EventEmitter {
    constructor() {
        super();
        this.state = {
            newUser: {
                username: "",
                password: "",
                searchText: ""
            },
            loggedInUser: ""
        };
    }

    addUser(username, password) {
        return client.createUser(username, password);
    }

    changeNewUserProperty(property, value) {
        this.state = {
            ...this.state,
            newUser: {
                ...this.state.newUser,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

    // login(username, password) {
    //     questionModel.client = new RestClient(username, password);
    //     if (client != null) {
    //         this.state = {
    //             ...this.state,
    //             loggedInUser: username
    //         };
    //     }
    // }

    logout() {
        this.state = {
            ...this.state,
            loggedInUser: {
                ...this.state.loggedInUser,
                username: "",
                password: ""
            }
        }
        console.log("logged out");
        this.emit("change", this.state);
    }


}

const userModel = new UserModel();
export default userModel;