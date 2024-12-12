import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetUserSession, getUser } from "../service/AuthServise"; // session yönetimi fonksiyonları
import "./project.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Giriş durumunu başlangıçta kontrol et

  useEffect(() => {
    const user = getUser(); // Kullanıcı oturumu kontrol et

    if (user) {
      setIsLoggedIn(true); // Kullanıcı oturumu varsa giriş durumunu güncelle
    } 
  }, [navigate]);

  const handleclick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    resetUserSession(); // Kullanıcı oturumunu sıfırla
    setIsLoggedIn(false); // Giriş durumunu güncelle
    navigate("/home"); // Anasayfaya yönlendir
  };

  return (
    <div className="navbar">
      <button onClick={() => handleclick("/home")}>Anasayfa</button>
      <button onClick={() => handleclick("/category")}>Kategoriler</button>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Çıkış yap</button>
      ) : (
        <>
          <button onClick={() => handleclick("/login")}>Giriş yap</button>
          <button onClick={() => handleclick("/register")}>Kayıt ol</button>
        </>
      )}
    </div>
  );
};

export default NavBar;
