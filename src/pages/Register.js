import React, { useState } from "react";
import axios from "axios";
import "../components/project.css"
const registerUrl =
  "https://b4nbwr8dw9.execute-api.eu-north-1.amazonaws.com/prod/register";
  
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      name.trim() === "" ||
      password.trim() === ""
    ) {
      setMessage("All fields are required!!");
      return;
    }

    
    const requestBody = {
      username: username,
      email: email,
      name: name,
      password: password,
    };

    axios
      .post(registerUrl, requestBody)
      .then((response) => {
        console.log(response);
        setMessage("Registration Successful");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setMessage(error.response.data.message);
        } else {
          setMessage(
            "Sorry... the backend server is down!! Please try again later!!"
          );
        }
      });
  };

  return (
    <div className="register">
      <form onSubmit={submitHandler}>
        <h5>Register</h5>
        Name:
        <input
        className="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        Email:
        <input
        className="email"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        Username: 
        <input className="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        Password:
        <input
        className="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <input type="submit" value="Register" className="registerButton"/>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Register;
