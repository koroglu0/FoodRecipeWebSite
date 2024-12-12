import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import "../components/project.css";
import axios from "axios";
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const recipesUrl =
    "https://9b7iaq2n07.execute-api.eu-north-1.amazonaws.com/prod/recipes";

  useEffect(() => {
    // API'den veri çek
    axios
      .get(`${recipesUrl}?recipesId=all`)
      .then((response) => {
        // Başarılı yanıtı işleme
        console.log("API Yanıtı:", response);
        const filteredRecipes = response.data.filter(
          (recipe) => recipe.id >= 1 && recipe.id <= 5
        );

        console.log("filtered response :",filteredRecipes)
        setRecipes(filteredRecipes);
      })
      .catch((error) => {
        // Hata ayıklama ve mesaj güncelleme
        if (error.response) {
          // Sunucudan dönen hata yanıtı varsa
          setMessage(`Hata ${error.response.status}: ${error.response.data.message}`);
          console.error("API Hatası Durum Kodu:", error.response.status);
          console.error("API Hatası Yanıtı:", error.response.data);
        } else if (error.request) {
          // İstek gönderildi ancak yanıt alınamadı
          setMessage("Sunucuya istek gönderilemedi.");
          console.error("API Hatası İstek:", error.request);
        } else {
          // Diğer hatalar
          setMessage("Bir hata oluştu.");
          console.error("API Hatası:", error.message);
        }
      });
  }, []);

  const handleClick = (recipe) => {
    navigate(`/category/${recipe.category}/${recipe.name}/${recipe.id}`);
  };

  return (
    <div className="home">
      <h2>Önerilen Tarifler</h2>
      <div>
        {recipes.map((recipe) => (
          <Button
            className="recipeButton"
            key={recipe.id}
            title={recipe.name}
            onclick={() => handleClick(recipe)}
          />
        ))}
      </div>
      {message && <div>{message}</div>}
    </div>
  );
};

export default Home;
