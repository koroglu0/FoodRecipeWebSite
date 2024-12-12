import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RecipeDetail from "./pages/RecipeDetails";
import PublicRoute from "./pages/PublicRoute"; 
import PrivateRoute from "./pages/PrivateRoute"; 
import {
  getToken,
  getUser,
  resetUserSession,
  setUserSession,
} from "./service/AuthServise";
import axios from "axios";

const verifyTokenAPIURL =
  "https://b4nbwr8dw9.execute-api.eu-north-1.amazonaws.com/prod/verify";

function App() {
  const [isAuthenticating, setAuthenticating] = useState(true);
  console.log("isAuthenticating", isAuthenticating);
  useEffect(() => {
    const token = getToken();
    if (
      token === "undefined" ||
      token === undefined ||
      token === null ||
      !token
    ) {
      return;
    }

    const requestConfig = {
      headers: {
        "x-api-key": "13FJozYe5dauc7SkXEbwS7p6uKkN4Lal5NLv28Zv",
      },
    };
    const requestBody = {
      user: getUser(),
      token: token,
    };

    axios
      .post(verifyTokenAPIURL, requestBody, requestConfig)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        setAuthenticating(true);
      })
      .catch(() => {
        resetUserSession();
        setAuthenticating(false);
      });
  }, []);

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<PublicRoute element={<Home />} />} />
          <Route path="/home" element={<PublicRoute element={<Home />} />} />
          <Route path="/category" element={<PrivateRoute element={<Category />} />} />
          <Route path="/category/:categoryName" element={<PrivateRoute element={<Category />} />} />
          <Route path="/category/:categoryName/:recipeName/:recipeId" element={<PrivateRoute element={<RecipeDetail />} />} />
          <Route path="/register" element={<PublicRoute element={<Register />} />} />
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
