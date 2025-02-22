import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/addRecipe.css";

export const AddRecipe = ({ addNewRecipe }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState(null);
  const [cuisine, setCuisine] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !desc || !ingredients || !image || !cuisine) return;

    const newRecipe = { title, desc, ingredients, image, cuisine };
    addNewRecipe(newRecipe);
    navigate("/feed");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-light">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Recipe Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Ingredients (comma-separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        {image && <img src={image} alt="Recipe Preview" className="img-thumbnail d-block mx-auto mb-3" />}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Cuisine Type"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Add Recipe</button>
      </form>
    </div>
  );
};
