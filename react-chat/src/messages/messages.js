import React, { Component } from 'react';
import './messages.scss';
import axios from "axios";
import Icon from "@material-ui/core/Icon";
import { Stomp } from 'stompjs/lib/stomp.js';

export class Messages extends Component {

    server = 'http://localhost:8000';
    webSocket = 'ws://localhost:8000/socket';

    constructor(props) {
        super(props);
        this.state = {messages: [], message: ''};
        this.sendMessage = this.sendMessage.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
    }

    componentDidMount() {
        axios.get(`${this.server}/messages`)
            .then(response => {
                const messages = response.data.map(message => ({...message, date: new Date(message.date)}));
                this.setState({messages: messages})
            });
        this.connect();
    }

    componentWillUnmount() {
        this.disconnect();
    }

    sendMessage(event) {
        event.preventDefault();
        if (this.state.message !== '') {
            let body = {
                text: this.state.message,
                userId: this.props.user.id
            };
            return axios.post(`${this.server}/messages/new`, body)
                .then(() => this.setState({message: ''}));
        }
    }

    handleMessageChange(event) {
        this.setState({message: event.target.value});
    }

    displayMessages() {
        let messages = this.state.messages.map(message => {
            return (
                <div key={message.id} className={this.isCurrentUser(message.userId) ? 'current-user' : 'other-user'}>
                    <div className="bubble">
                        <div className="user-name">
                            {message.userName}
                        </div>
                        <div className="message-text">
                            <span className="margin-right-10">{message.text}</span>
                            {Messages.isToday(message.date) ? (
                                <span
                                    className="message-date">{this.getDateWithFormat(message.date, true)}</span>) : null}
                        </div>
                        {!Messages.isToday(message.date) ? (
                            <div
                                className="message-date">{this.getDateWithFormat(message.date, false)}</div>) : null}
                    </div>
                </div>
            )
        });
        return <div className="messages">{messages}</div>;
    }

    connect() {
        let socket = new WebSocket(this.webSocket);
        this.ws = Stomp.over(socket);
        this.ws.connect({}, () => {
            this.ws.subscribe('/chat', frame => {
                const message = JSON.parse(frame.body);
                const formatedMessage = {...message, date: new Date(message.date)};
                this.setState({messages: [...this.state.messages, formatedMessage]});
            });
        }, (error) => {
            alert('STOMP error ' + error);
        });
    }

    disconnect() {
        if (this.ws != null) {
            this.ws.ws.close();
        }
        console.warn('Disconnected');
    }

    isCurrentUser(userId) {
        return userId === this.props.user.id;
    }

    static isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate()
            && date.getMonth() === today.getMonth()
            && date.getFullYear() === today.getFullYear();
    }

    render() {
        return (
            <div className="message-component">
                <div className="message-container">
                    {this.displayMessages()}
                </div>
                <form className="message-form" onSubmit={this.sendMessage}>
                    <input type="text" value={this.state.message} onChange={this.handleMessageChange}
                           placeholder="Write your message..."/>
                    <div className="send-button">
                        <button type=" submit">
                            <Icon>send</Icon>
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    getDateWithFormat(date, isToday) {
        let options;
        if (isToday) {
            options = {minute: 'numeric', second: 'numeric'};
        } else {
            options = {year: 'numeric', month: 'long', day: 'numeric'};
        }
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    }
}
