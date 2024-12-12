import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../components/project.css";

const RecipeDetail = () => {
  const { categoryName, recipeName, recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const recipeUrl = `https://9b7iaq2n07.execute-api.eu-north-1.amazonaws.com/prod/recipes?recipesId=${recipeId}`;

  useEffect(() => {
    axios
      .get(recipeUrl)
      .then((response) => {
        setRecipe(response.data);
        setLoading(false);
        console.log("response data:", response.data);
      })

      .catch((error) => {
        if (error.response) {
          setError(
            `Hata ${error.response.status}: ${error.response.data.message}`
          );
        } else if (error.request) {
          setError("Sunucuya istek gönderilemedi.");
        } else {
          setError("Bir hata oluştu.");
        }
        setLoading(false);
      });
  }, [categoryName, recipeName,recipeUrl]);

  if (loading) {
    return <div className="yükleniyor">Yükleniyor...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!recipe) {
    return <div>Tarif bulunamadı!</div>;
  }
  const imageUrl = recipe.imageUrl;
  return (
    <div
      className="recipeDetail"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <h1>{recipe.name}</h1>
      <h2>Kategori: {categoryName}</h2>
      <p>{recipe.instructions}</p>
      {recipe.ingredients && (
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeDetail;
