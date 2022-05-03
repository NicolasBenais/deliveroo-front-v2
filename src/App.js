import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
// import Center from "./components/Center";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://deliveroo-backend-nbns.herokuapp.com/"
      );
      setData(response.data);

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading === true ? (
    <p>Loading</p>
  ) : (
    <div>
      {/* -------- HEADER -------- */}

      {/* Top bar */}
      <div className="top-bar">
        <div className="logo">
          <p>DELIVEROO</p>

          {/* <img
            src="/Users/nicolasbenais/Dev/LeReacteur/React/06/Exercices/deliveroo-frontend-v2/src/assets/img/Deliveroo-Logo-650x366.png"
            alt=""
          /> */}
        </div>
      </div>

      {/* Bottom bar */}
      <header>
        <div className="bottom-bar">
          <div className="left-part-header">
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <img src={data.restaurant.picture} alt="" />
        </div>
      </header>

      {/* -------- CENTER -------- */}

      {/* <Center data={data.categories} /> */}

      <div className="center">
        {/* Menu Title */}
        {data.categories.map((items, index) => {
          return (
            <div className="MenuItems">
              <h2 key={index}> {items.name} </h2>

              {/* Item */}
              <div className="MenuItem">
                {items.meals.map((item) => {
                  return (
                    <div key={item.id} className="item">
                      <div className="left-part-item">
                        <h3>{item.title}</h3>
                        <p className="item-description">{item.description}</p>
                        <p className="price">{item.price} €</p>
                      </div>
                      {item.picture && <img src={item.picture} alt="" />}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
