import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { User } from "@/interface/user.interface";
import Messages from "@/pages/messages/Messages";

const server = "http://localhost:8000";

export default function Home() {

  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState(``);

  function handleUserNameChange(event: { target: { value: React.SetStateAction<string>; }; }) {
    // @ts-ignore
    setUserName(event.target.value);
  }

  function displayUserInput() {
    return (
      <div className="userForm" data-cy="user-form">
        <h1 className="marginBottom15">
          Welcome to the chat
        </h1>
        <div className="marginBottom15">
          What is your name ?
        </div>
        <form onSubmit={activeUser}>
          <input className="marginBottom15" type="text" value={userName}
                 onChange={handleUserNameChange} />
          <Button type="submit" variant="contained" color="primary">
            Let&apos;s go!
          </Button>
        </form>
      </div>
    );
  }

  function displayMessages() {
    return <Messages user={user}></Messages>;
  }

  function activeUser(event: { preventDefault: () => void; }) {
    event.preventDefault();
    if (userName !== ``) {
      return axios.post(`${server}/users`, { name: userName }).then(response => {
          setUser(response.data);
        },
        (error) => console.error(error));
    }
  }

  return (
    <main className="application-component" data-cy="application-component">
      <div className="application-container">
        {user ? displayMessages() : displayUserInput()}
      </div>
    </main>
  );
}
