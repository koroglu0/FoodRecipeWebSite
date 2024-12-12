import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/project.css"
import { setUserSession } from "../service/AuthServise";

const loginAPIUrl =
  "https://9b7iaq2n07.execute-api.eu-north-1.amazonaws.com/prod/login";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Both username and password are required");
      return;
    }

    const requestBody = {
      username: username,
      password: password,
    };

    axios
      .post(loginAPIUrl, requestBody)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        navigate("/home");
        setErrorMessage("Login Başarılı!");
      })
      .catch((error) => {
        console.log("error var!", error);
        if (error) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage(
            "sorry... backend server is down, please try again later!!!"
          );
        }
      });
  };
  return (
    <div  className="login">
      <div>
        <form onSubmit={submitHandler}>
        <h5>Login</h5>
        Username :
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br/>
         Password :
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        /><br/><br/>
        <input type="submit" value="Login " class="button"/>
      </form>
      </div>
      
      {errorMessage && <p className="message">{errorMessage}</p>}
    </div>
  );
};

export default Login;
