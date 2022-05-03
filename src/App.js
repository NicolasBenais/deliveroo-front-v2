import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
// import Center from "./components/Center";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState([0]);
  const [total, setTotal] = useState(0);

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

  const addToCart = (item) => {
    let index;
    const newCart = [...cart];
    let newSubTotal = [...subTotal];
    let isPresent = false;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === item.id) {
        index = i;
        isPresent = true;
      }
    }
    if (!isPresent) {
      newCart.push({
        id: item.id,
        title: item.title,
        price: Number(item.price),
        quantity: 1,
      });
      setCart(newCart);
      newSubTotal = Number(cart[index].price) * Number(cart[index].quantity);
      setSubTotal(newSubTotal);
    } else {
      newCart[index].quantity++;
      setCart(newCart);
      newSubTotal = Number(cart[index].price) * Number(cart[index].quantity);
      setSubTotal(Number(subTotal) + newSubTotal);
      console.log(typeof cart[index].price);
      console.log(typeof subTotal);
      console.log(typeof newSubTotal);
      console.log(typeof item.price);
      // console.log(newCart[index]);
    }
  };

  const addQuantity = (index) => {
    // console.log(cart[index]);
    const newCart = [...cart];
    newCart[index].quantity++;
    setCart(newCart);
  };

  const removeQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity--;
    setCart(newCart);
  };

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

      <div className="main">
        <div className="center">
          {/* Menu Title */}
          {data.categories.map((items) => {
            return (
              items.meals.length > 0 && (
                <div className="MenuItems">
                  <h2> {items.name} </h2>

                  {/* Item */}
                  <div className="MenuItem">
                    {items.meals.map((item, index) => {
                      return (
                        <div
                          key={item.id}
                          className="item"
                          onClick={() => {
                            addToCart(item, index);
                          }}
                        >
                          <div className="left-part-item">
                            <h3>{item.title}</h3>
                            <p className="item-description">
                              {item.description}
                            </p>
                            <p className="price">{Number(item.price)} €</p>
                          </div>
                          {item.picture && <img src={item.picture} alt="" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            );
          })}
        </div>

        <div className="cart">
          <button>Valider mon panier</button>
          <div className="line-cart">
            {cart.map((cartItem, index) => {
              return (
                <div>
                  <div>
                    <button
                      onClick={() => {
                        removeQuantity(index);
                      }}
                    >
                      Minus
                    </button>
                    {cartItem.quantity}
                    <button
                      onClick={() => {
                        addQuantity(index);
                      }}
                    >
                      Plus
                    </button>
                    {cartItem.title} {cartItem.price} €
                  </div>
                </div>
              );
            })}
          </div>
          <div>{subTotal}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
