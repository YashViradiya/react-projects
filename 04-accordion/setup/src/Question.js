import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const Question = ({ title, info }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    let newVis = !visible;
    setVisible(newVis);
  };
  return (
    <article className="question">
      <header>
        <h4>{title}</h4>
        <button className="btn" onClick={toggleVisibility}>
          {visible ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {visible && <p>{info}</p>}
    </article>
  );
};

export default Question;
