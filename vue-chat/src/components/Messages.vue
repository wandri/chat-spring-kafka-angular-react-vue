<template>
  <div class="message-component" data-cy="message-component">
    <div class="message-container">
      <div class="messages">
        <div v-for="message in messages"
             :key="message"
             :class="isCurrentUser(message.userId) ? 'current-user' : 'other-user'" data-cy="message">
          <div class="bubble">
            <div v-if="!isCurrentUser(message.userId)" class="user-name">
              {{ message.userName }}
            </div>
            <div class="message-text">
              <span class="margin-right-10">{{ message.text }}</span>
              <span v-if="isToday(message.date)" class="message-date">
                {{ getDateWithFormat(message.date, true) }}
              </span>
            </div>
            <div v-if="!isToday(message.date)" class="message-date">
              {{ getDateWithFormat(message.date, false) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <form class="message-form" @submit="sendMessage" data-cy="message-form">
      <input v-model="message" placeholder="Write your message..." type="text" />
      <div class="send-button">
        <button type="submit">
          send
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosResponse } from 'axios';
import { Client } from '@stomp/stompjs';
import { User } from '@/user.interface';
import { onMounted, onUnmounted, ref } from 'vue';
import type { Message } from '@/components/message.interface';

const server = 'http://localhost:8000';
const webSocket = 'ws://localhost:8000/socket';

const props = defineProps({ user: { type: User, required: true } });

let messages = ref<Message[]>([]);
let message = ref<string>('');

const ws: Client = new Client({
  brokerURL: webSocket,
  onConnect: () => {
    ws.subscribe('/chat', (frame: { body: string }) => {
      const message = JSON.parse(frame.body);
      const formattedMessage = { ...message, date: new Date(message.date) };
      messages.value = [...messages.value, formattedMessage];
    });
  }
});

function sendMessage(event: Event): void {
  event.preventDefault();
  if (message.value !== '') {
    const body = {
      text: message.value,
      userId: props.user.id
    };
    axios.post(`${server}/messages/new`, body)
      .then(() => message.value = '');
  }
}

function isCurrentUser(userId: string): boolean {
  return userId === props.user.id;
}

function isToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear();
}

onMounted(() => {
  axios.get(`${server}/messages`)
    .then((response: AxiosResponse) => {
      messages.value = response.data.map((message: any) => ({ ...message, date: new Date(message.date) }));
    }).then(() => connect());
});

onUnmounted(() => {
  disconnect();
});

function getDateWithFormat(date: Date, isToday: boolean): string {
  let options: Intl.DateTimeFormatOptions;
  if (isToday) {
    options = { hour: '2-digit', minute: 'numeric' };
  } else {
    options = { year: 'numeric', month: 'long', day: 'numeric' };
  }
  return new Intl.DateTimeFormat('en-GB', options).format(date);
}

function connect(): void {
  ws.activate();
}

function disconnect() {
  ws.deactivate();
}
</script>

<style lang="scss" scoped>
.message-component {
  height: 500px;
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

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-button {
  width: 8px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: #eee;
  border: thin solid lightgray;
  box-shadow: 0 0 3px #dfdfdf inset;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #999;
  border: thin solid gray;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #7d7d7d;
}
</style>
