// src/components/CardList.jsx
import React from "react";
import "./CardList.css";

const CardList = ({ items }) => {
  return (
    <div className="card-list">
      {items.map((item, index) => (
        <div key={index} className="card">
          <img src={item.imageUrl} alt={item.title} className="card-image" />
          <div className="card-content">
            <h3 className="card-title">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
