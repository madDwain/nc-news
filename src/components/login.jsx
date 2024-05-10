import React, { useState } from "react";
import { getUsers } from "../utils/api";
import { useLogin } from "../contexts/login";

const Login = () => {
  const [usernameInput, setUsernameInput] = useState("");

  const { user, setUser } = useLogin();

  function handleClick(usernameInput) {
    console.log("clicked");
    getUsers(usernameInput)
      .then(({ data }) => {
        const { users } = data;
        console.log(users);
        users.forEach((user) => {
          if (user.username === usernameInput) {
            console.log('hit')
            setUser(user.username);
          } else {
            return Promise.reject()
          }
        });
        console.log('setUser as ', user)
      })
  }
  return (
    <>
      <input
        value={usernameInput}
        type="Text"
        id="usernameInput"
        onInput={(e) => {
          setUsernameInput(e.target.value);
          console.log(usernameInput);
        }}
      ></input>
      <button
        onClick={(e) => {
          handleClick(usernameInput);
        }}
      >
        Login
      </button>
    </>
  );
};

export default Login;
