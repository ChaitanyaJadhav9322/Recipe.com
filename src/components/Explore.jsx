import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Explore.css";

// Import images directly
import firstImg from "../assets/images/first.png";
import secondImg from "../assets/images/second.png";
import thirdImg from "../assets/images/third.png";
import fourthImg from "../assets/images/fourth.png";
import fifthImg from "../assets/images/fifth.png";
import sixthImg from "../assets/images/sixth.png";
import seventhImg from "../assets/images/seventh.png";
import eighthImg from "../assets/images/eighth.png";
import tenthImg from "../assets/images/tenth.png";

const foodItems = [
  { image: eighthImg, title: "Spicy Chicken", desc: "A fiery delight with bold spices." },
  { image: fifthImg, title: "Grilled Fish", desc: "Perfectly grilled with lemon zest." },
  { image: firstImg, title: "Vegetable Stir Fry", desc: "A healthy mix of fresh veggies." },
  { image: fourthImg, title: "Cheesy Pizza", desc: "Loaded with cheese and toppings." },
  { image: secondImg, title: "Healthy Salad", desc: "Fresh greens with a light dressing." },
  { image: seventhImg, title: "Juicy Burger", desc: "A classic burger with extra flavors." },
  { image: sixthImg, title: "Sweet Dessert", desc: "A delightful treat for sweet lovers." },
  { image: tenthImg, title: "Pasta Delight", desc: "Italian pasta with rich sauce." },
  { image: thirdImg, title: "Hot Soup", desc: "A warm and comforting soup bowl." }
];

export const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter food items based on search query
  const filteredItems = foodItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {/* Search Bar */}
      <div className="mb-4 text-center">
        <input
          type="text"
          className="form-control search-bar"
          placeholder="Search for food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Display Filtered Items */}
      <div className="row">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="card h-100">
                <img src={item.image} className="card-img-top" alt={item.title} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.desc}</p>
                  <Link to="/details" className="btn btn-primary">Explore More</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted">No results found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
