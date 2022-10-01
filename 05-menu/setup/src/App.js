import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import items from "./data";

function App() {
  const [menu, setMenu] = useState(items);
  const [categories, setCategories] = useState(
    menu
      .map((item) => item.category)
      .filter((value, index, self) => self.indexOf(value) === index)
      .concat(["All"])
      .sort()
  );

  const filterItems = (cat) => {
    const newItems =
      cat === "All" ? items : items.filter((item) => item.category === cat);
    setMenu(newItems);
  };
  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>our Menu</h2>
          <div className="underline"></div>
        </div>
        <Categories filterItems={filterItems} categories={categories} />
        <Menu items={menu} />
      </section>
    </main>
  );
}

export default App;
