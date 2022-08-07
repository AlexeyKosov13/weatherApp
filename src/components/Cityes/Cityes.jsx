import React from "react";
import "./Cityes.css";

export default function Cityes({city, setCity}) {
 
  const City = ["Москва", "Чебоксары", "Ульяновск", "Лондон", "Казань"];

  const setCityes = (item) => {
    setCity(item.target.innerText);
  }

  return (
    <nav className="cityes">
      {City.map((item, index) => (
        <span onClick={(e)=>setCityes(e)} key={index} className={city === item ? "selected" : ""}>
          {item}
        </span>
      ))}
    </nav>
  );
}
