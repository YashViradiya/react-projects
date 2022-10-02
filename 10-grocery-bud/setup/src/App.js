import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  return list ? JSON.parse(list) : [];
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setAlert({ show: true, msg: "please enter value", type: "danger" });
    } else if (name && isEditing) {
      // list.forEach((item) => {
      //   if (item.id === editID) {
      //     item.title = name;
      //   }
      // });
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      setAlert({
        show: true,
        msg: "item edited successfully",
        type: "success",
      });
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
      setAlert({ show: true, msg: "item added successfully", type: "success" });
    }
  };

  useEffect(() => {
    const res = setTimeout(() => {
      setAlert({
        show: false,
        msg: "",
        type: "",
      });
    }, 3000);
    return () => clearTimeout(res);
  }, [alert]);

  const removeItem = (item) => {
    const newList = list.filter((it) => it.id !== item.id);
    setList(newList);
    setAlert({ show: true, msg: "item removed from the list", type: "danger" });
  };

  const editItem = (item) => {
    setIsEditing(true);
    setName(item.title);
    setEditID(item.id);
  };

  const clearItem = () => {
    setList([]);
    setAlert({
      show: true,
      msg: "item list cleared",
      type: "danger",
    });
    setEditID(null);
    setIsEditing(false);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearItem}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
