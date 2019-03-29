<template>
    <div class="message-component">
        <div class="message-container">
            <div class="messages">
                <div v-for="message in messages"
                     v-bind:class="isCurrentUser(message.userId) ? 'current-user' : 'other-user'">
                    <div class="bubble">
                        <div class="user-name">
                            {{message.userName}}
                        </div>
                        <div class="message-text">
                            <span class="margin-right-10">{{message.text}}</span>
                            <span v-if="isToday(message.date)" class="message-date">
                                {{getDateWithFormat(message.date, true)}}
                            </span>
                        </div>
                        <div class="message-date" v-if="!isToday(message.date)">
                            {{getDateWithFormat(message.date, false)}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <form class="message-form" @submit="sendMessage">
            <input type="text" v-model="message" placeholder="Write your message..."/>
            <div class="send-button">
                <button type="submit">
                    send
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { User } from '@/user.interface';
    import { Stomp } from 'stompjs/lib/stomp.js';
    import axios, { AxiosResponse } from 'axios';

    const server = 'http://localhost:8000';
    const webSocket = 'ws://localhost:8000/socket';

    @Component
    export default class Messages extends Vue {
        public messages: Messages[];
        public message: string;

        private ws: any;
        @Prop() private user!: User;

        constructor() {
            super();
            this.message = '';
            this.messages = [];
        }

        public created() {
            axios.get(`${server}/messages`)
                .then((response: AxiosResponse) => {
                    this.messages = response.data.map((message: any) => ({...message, date: new Date(message.date)}));
                });
        }

        public sendMessage(event: Event) {
            event.preventDefault();
            if ( this.message !== '' ) {
                const body = {
                    text: this.message,
                    userId: this.user.id,
                };
                return axios.post(`${server}/messages/new`, body)
                    .then(() => this.message = '');
            }
        }

        public isCurrentUser(userId: string) {
            return userId === this.user.id;
        }

        public isToday(date: Date) {
            const today = new Date();
            return date.getDate() === today.getDate()
                && date.getMonth() === today.getMonth()
                && date.getFullYear() === today.getFullYear();
        }

        public mounted() {
            this.connect();
        }

        public destroyed() {
            this.disconnect();
        }

        public getDateWithFormat(date: Date, isToday: boolean) {
            let options;
            if ( isToday ) {
                options = {hour: '2-digit', minute: 'numeric'};
            } else {
                options = {year: 'numeric', month: 'long', day: 'numeric'};
            }
            return new Intl.DateTimeFormat('en-GB', options).format(date);
        }

        private connect() {
            const socket = new WebSocket(webSocket);
            this.ws = Stomp.over(socket);
            this.ws.connect({}, () => {
                this.ws.subscribe('/chat', (frame: { body: string }) => {
                    const message = JSON.parse(frame.body);
                    const formatedMessage = {...message, date: new Date(message.date)};
                    this.messages = [...this.messages, formatedMessage];
                });
            });
        }

        private disconnect() {
            if ( this.ws != null ) {
                this.ws.ws.close();
            }
        }
    }
</script>

<style scoped lang="scss">
    .message-component {
        height: 100%;
        width: 100%;

        .message-container {
            padding: 20px;
            height: calc(100% - 75px);
            overflow-y: scroll;

            .messages {
                .current-user {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }

                .other-user {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }

                .bubble {
                    box-shadow: -1px 1px 0px #ccd6d8;
                    padding: 10px;
                    border: solid 1px #9f9f9f;
                    border-radius: 10px;
                }

                .current-user, .other-user {
                    margin-bottom: 20px;
                }

                .user-name, .message-date {
                    color: #949494;
                    font-size: 12px;
                }

                .user-name, .message-text {
                    margin-bottom: 5px;
                }

                .message-text {
                    font-size: 16px;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: flex-end;
                    align-content: flex-end;

                    .margin-right-10 {
                        margin-right: 10px;
                    }
                }
            }
        }

        .message-form {
            width: 100%;
            background-color: #EEEEEE;
            height: 75px;

            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            align-content: center;

            input {
                font-size: 16px;
                padding: 15px 25px;
                width: calc(100% - 100px);
                height: 40px;
                margin-left: 30px;
                margin-right: 30px;
                border-radius: 25px;
                background-color: #ffffff;
                outline: none;
                border: none;
                box-sizing: border-box;
            }

            .send-button {
                font-size: 20px;
                width: 100px;

                button {
                    cursor: pointer;
                    outline: none;
                    border: none;
                    background: none;
                }
            }
        }
    }
</style>
