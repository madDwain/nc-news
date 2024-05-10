import React, { useState } from "react";
import { getUsers } from "../utils/api";
import { useLogin } from "../contexts/login";

const Login = () => {
  const [usernameInput, setUsernameInput] = useState("");

  const { user, setUser } = useLogin();

  function handleClick(usernameInput) {
    getUsers(usernameInput)
      .then(({ data }) => {
        const { users } = data;
        users.forEach((user) => {
          if (user.username === usernameInput) {
            setUser(user.username);
          } else {
            return Promise.reject()
          }
        });
      })
  }
  return (
    <div className="login-box">
        <label>Enter Username:</label>
      <input
        value={usernameInput}
        type="Text"
        id="usernameInput"
        onInput={(e) => {
          setUsernameInput(e.target.value);
        }}
      ></input>
      <button
        onClick={(e) => {
          handleClick(usernameInput);
        }}
      >
        Login
      </button>
      <p>{user===null ? 'You are not logged in, please enter a valid username' : 'You are now logged in'}</p>
    </div>
  );
};

export default Login;
