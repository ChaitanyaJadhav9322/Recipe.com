import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const foodItems = [
  { image: require("../assets/images/eighth.png"), title: "Spicy Chicken", desc: "A fiery delight with bold spices." },
  { image: require("../assets/images/fifth.png"), title: "Grilled Fish", desc: "Perfectly grilled with lemon zest." },
  { image: require("../assets/images/first.png"), title: "Vegetable Stir Fry", desc: "A healthy mix of fresh veggies." },
  { image: require("../assets/images/fourth.png"), title: "Cheesy Pizza", desc: "Loaded with cheese and toppings." },
  { image: require("../assets/images/second.png"), title: "Healthy Salad", desc: "Fresh greens with a light dressing." },
  { image: require("../assets/images/seventh.png"), title: "Juicy Burger", desc: "A classic burger with extra flavors." },
  { image: require("../assets/images/sixth.png"), title: "Sweet Dessert", desc: "A delightful treat for sweet lovers." },
  { image: require("../assets/images/tenth.png"), title: "Pasta Delight", desc: "Italian pasta with rich sauce." },
  { image: require("../assets/images/third.png"), title: "Hot Soup", desc: "A warm and comforting soup bowl." }
];

export const Feed = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState(foodItems);
  const navigate = useNavigate();

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center">Recipe Feed</h2>
      
      <div className="input-group my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-secondary">Search</button>
      </div>

      <div className="row">
        {filteredRecipes.map((recipe, index) => (
          <div key={index} className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100 shadow">
              <img src={recipe.image} className="card-img-top" alt={recipe.title} />
              <div className="card-body text-center">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.desc}</p>
                <button className="btn btn-primary">Explore More</button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Recipe Button */}
        <div className="col-md-4 col-sm-6 mb-4">
          <div className="card h-100 d-flex align-items-center justify-content-center text-center bg-light border" 
               style={{ cursor: "pointer" }} 
               onClick={() => navigate("/add-recipe")}>
            <h3 className="text-success">+</h3>
            <p>Add New Recipe</p>
          </div>
        </div>
      </div>
    </div>
  );
};
