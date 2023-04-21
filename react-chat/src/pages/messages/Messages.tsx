import React, { useEffect, useState } from "react";
import styles from "../../styles/Message.module.scss";
import axios from "axios";
import { Message } from "@/interface/message.interface";
import { User } from "@/interface/user.interface";
import { Client } from "@stomp/stompjs";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function Messages(props: { user: User | null }) {

  const server = "http://localhost:8000";
  const webSocket = "ws://localhost:8000/socket";


  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");


  const ws: Client = new Client({
    brokerURL: webSocket,
    onConnect: () => {
      ws.subscribe("/chat", (frame: { body: string }) => {
        const message = JSON.parse(frame.body);
        const formattedMessage = { ...message, date: new Date(message.date) };
        setMessages([...messages, formattedMessage]);
      });
    }
  });

  useEffect(() => {
    axios.get(`${server}/messages`)
      .then((response: { data: Message[] }) => {
        setMessages(response.data.map((message: any) => ({ ...message, date: new Date(message.date) })));
      }).then(() => connect());

    return () => {
      disconnect();
    };
  });

  function connect(): void {
    ws.activate();
  }

  function disconnect(): void {
    ws.deactivate();
  }

  function isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate()
      && date.getMonth() === today.getMonth()
      && date.getFullYear() === today.getFullYear();
  }

  function getDateWithFormat(date: Date, isToday: boolean) {
    if (isToday) {
      return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "numeric" }).format(date);
    } else {
      return new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "long", day: "numeric" }).format(date);
    }
  }

  function sendMessage(event: { preventDefault: () => void; }) {
    event.preventDefault();
    if (message !== "") {
      let body = {
        text: message,
        userId: props.user?.id
      };
      return axios.post(`${server}/messages/new`, body)
        .then(() => setMessage(""));
    }
  }

  function handleMessageChange(event: { target: { value: React.SetStateAction<string>; }; }) {
    setMessage(event.target.value);
  }

  function displayMessages() {
    let newMessages = messages.map(message => {
      return (
        <div key={message.id} className={isCurrentUser(message.userId) ? styles.current_user : styles.other_user}
             data-cy="message">
          <div className={styles.bubble}>
            <div className={styles.user_name}>
              {message.userName}
            </div>
            <div className={styles.message_text}>
              <span className={styles.margin_right_10}>{message.text}</span>
              {isToday(message.date) ? (
                <span
                  className={styles.message_date}>{getDateWithFormat(message.date, true)}</span>) : null}
            </div>
            {!isToday(message.date) ? (
              <div
                className={styles.message_date}>{getDateWithFormat(message.date, false)}</div>) : null}
          </div>
        </div>
      );
    });
    return <div className={styles.messages}>{newMessages}</div>;
  }

  function isCurrentUser(userId: string) {
    return userId === props.user?.id;
  }

  return (
    <div className={styles.message_component} data-cy="message-component">
      <div className={styles.message_container}>
        {displayMessages()}
      </div>
      <form className={styles.message_form} onSubmit={sendMessage} data-cy="message-form">
        <input type="text" value={message} onChange={handleMessageChange}
               placeholder="Write your message..." />
        <div className={styles.send_button}>
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            send
          </Button>
        </div>
      </form>
    </div>
  );
}
