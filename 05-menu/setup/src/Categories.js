import React from "react";

const Categories = ({ filterItems, categories }) => {
  return (
    <div className="btn-container">
      {categories.map((category, index) => (
        <button
          type="button"
          className="filter-btn"
          key={index}
          onClick={() => filterItems(category)}
        >
          {category}
        </button>
      ))}
      {/* <button className="filter-btn" onClick={() => filterItems("ass")}>
        yash
      </button> */}
    </div>
  );
};

export default Categories;
