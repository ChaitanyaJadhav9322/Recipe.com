import React from 'react';
import "../Styles/Recipecard.css";
 
const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.name} />
      <h3>{recipe.name}</h3>
      <button className="details-btn">See Details</button>
    </div>
  );
};

export default RecipeCard;