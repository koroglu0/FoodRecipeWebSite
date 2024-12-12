import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import "../components/project.css";

const Category = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://9b7iaq2n07.execute-api.eu-north-1.amazonaws.com/prod/category?categoryId=all`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryName && categories.length > 0) {
      const category = categories.find((cat) => cat.name === categoryName);

      if (category) {
        const filteredRecipes = category.recipes || [];
        setRecipes(filteredRecipes);
      }
    }
  }, [categoryName, categories]);

  const handleCategory = (category) => {
    navigate(`/category/${category.name}`);
  };

  const handleRecipe = (recipe) => {
    navigate(`/category/${categoryName}/${recipe.name}/${recipe.id}`);
  };

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="category">
      <h1>{categoryName ? categoryName : "Kategoriler"}</h1>
      {categoryName
        ? recipes.map((recipe) => (
            <div key={recipe.id}>
              <Button
                className="categorybuton"
                title={recipe.name}
                onclick={() => handleRecipe(recipe)}
              />
            </div>
          ))
        : categories.map((category) => (
            <div key={category.id}>
              <Button
                className="categorybuton"
                style={{
                  backgroundImage: `url(https://image-url-bucket.s3.eu-north-1.amazonaws.com/${category.name}.jpg)`
                }}
                title={category.name}
                onclick={() => handleCategory(category)}
              />
            </div>
          ))}
    </div>
  );
};

export default Category;
