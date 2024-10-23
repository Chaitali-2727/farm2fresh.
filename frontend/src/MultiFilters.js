import React, { useEffect, useState } from "react";
import { items } from "./items";
import "./styles.css";


export default function MultiFilters() {
  const [showFilters, setShowFilters] = useState(false);
  const [locations, setLocations] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  const [filteredItems, setFilteredItems] = useState([]);
  const [cart, setCart] = useState([]);

  // Extract unique locations from items
  useEffect(() => {
    setLocations([...new Set(items.map((item) => item.location))]);
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      const farmersInLocation = items
        .filter((item) => item.location === selectedLocation)
        .map((item) => item.farmer);
      setFarmers([...new Set(farmersInLocation)]);
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (selectedFarmer) {
      const productsFromFarmer = items
        .filter(
          (item) =>
            item.location === selectedLocation && item.farmer === selectedFarmer
        )
        .map((item) => item.category);
      setProducts([...new Set(productsFromFarmer)]);
    }
  }, [selectedFarmer]);

  const handleFilterItems = () => {
    const result = items.filter(
      (item) =>
        item.location === selectedLocation &&
        item.farmer === selectedFarmer &&
        item.category === selectedProduct
    );
    setFilteredItems(result);
    setShowFilters(false); // Hide filters after applying
  };

  const handleAddToCart = (item) => setCart([...cart, item]);

  return (
    <div className="container">
      {/* Show blank screen until filters are selected */}
      {!showFilters && filteredItems.length === 0 && (
        <div className="welcome-message">
          <h1>Welcome to Fresh2Farm!</h1>
          <p>Please click the button below to select filters.</p>
          <button className="filter-button" onClick={() => setShowFilters(true)}>
            🛠️ Open Filters
          </button>
        </div>
      )}

      {/* Filters Section */}
      {showFilters && (
        <div className="filters-container">
          <h2>Select Filters</h2>

          <div className="filter-group">
            <label>Select Location:</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Choose Location</option>
              {locations.map((location, idx) => (
                <option key={`location-${idx}`} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Select Farmer:</label>
            <select
              value={selectedFarmer}
              onChange={(e) => setSelectedFarmer(e.target.value)}
              disabled={!selectedLocation}
            >
              <option value="">Choose Farmer</option>
              {farmers.map((farmer, idx) => (
                <option key={`farmer-${idx}`} value={farmer}>
                  {farmer}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Select Product:</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              disabled={!selectedFarmer}
            >
              <option value="">Choose Product</option>
              {products.map((product, idx) => (
                <option key={`product-${idx}`} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>

          <div className="buttons">
            <button className="apply-button" onClick={handleFilterItems} disabled={!selectedProduct}>
              Apply Filters
            </button>
            <button className="close-button" onClick={() => setShowFilters(false)}>
              ❌ Close
            </button>
          </div>
        </div>
      )}

      {/* Display Filtered Items */}
      {filteredItems.length > 0 && (
        <div className="items-container">
          {filteredItems.map((item, idx) => (
            <div key={`item-${idx}`} className="item-card">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-info">
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Farmer:</strong> {item.farmer}</p>
                <p><strong>Location:</strong> {item.location}</p>
                <button onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Section */}
      <div className="cart-container">
        <h2>Your Cart</h2>
        {cart.length > 0 ? (
          cart.map((item, idx) => (
            <div key={`cart-item-${idx}`} className="cart-item">
              <p>
                <strong>{item.name}</strong> - {item.category}
              </p>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}
