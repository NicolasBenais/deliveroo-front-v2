import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

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
      <header>
        <div className="left-part-header">
          <h1>{data.restaurant.name}</h1>
          <p>{data.restaurant.description}</p>
        </div>
        <img src={data.restaurant.picture} alt="" />
      </header>
      <div className="center">
        {data.categories.map((items, index) => {
          return (
            <div className="MenuItems">
              <h2 key={index}> {items.name} </h2>
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
