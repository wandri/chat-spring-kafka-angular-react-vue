import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import { Messages } from "./messages/messages";
import Button from "@material-ui/core/Button";

class App extends Component {

    server = 'http://localhost:8000';

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            userName: ''
        };
        this.activeUser = this.activeUser.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
    }

    handleUserNameChange(event) {
        this.setState({userName: event.target.value});
    }

    render() {
        return (
            <div className="application-component">
                <div className="application-container">
                    {this.state.user ? this.displayMessages() : this.displayUserInput()}
                </div>
            </div>
        )
    }

    displayUserInput() {
        return (
            <div className="userForm">
                <h1 className="marginBottom15">
                    Welcome to the chat
                </h1>
                <div className="marginBottom15">
                    What is your name ?
                </div>
                <form onSubmit={this.activeUser}>
                    <input className="marginBottom15" type="text" value={this.state.userName}
                           onChange={this.handleUserNameChange}/>
                    <Button type="submit" variant="contained" color="primary">
                        Let's go!
                    </Button>
                </form>
            </div>
        )
    }

    displayMessages() {
        return <Messages user={this.state.user}></Messages>;
    }

    activeUser(event) {
        event.preventDefault();
        return axios.post(`${this.server}/users`, {name: this.state.userName}).then(response => {
                this.setState({user: response.data});
            },
            (error) => console.error(error))
    }
}

export default App
