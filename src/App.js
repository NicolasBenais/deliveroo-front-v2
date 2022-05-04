import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
// import Center from "./components/Center";
import logo from "./assets/img/logo.png";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState([0]);
  const [total, setTotal] = useState(0);

  // const calculTotal = () => {
  //   let total = 0;
  //   cart.forEach(cartItem) => {
  //     total =+ cartItem.price * item.quantity;

  //   }
  //   return total.toFixed(2)
  // }

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
    } else {
      newCart[index].quantity++;
      setCart(newCart);

      // console.log(newCart[index]);
    }
  };

  const addQuantity = (index) => {
    // console.log(cart[index]);
    const newCart = [...cart];
    newCart[index].quantity++;
    setCart(newCart);
  };

  const removeQuantity = (cartItem, index) => {
    if (cartItem.quantity === 1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    } else {
      const newCart = [...cart];
      newCart[index].quantity--;
      setCart(newCart);
    }
  };

  return isLoading === true ? (
    <p>Loading</p>
  ) : (
    <div>
      {/* -------- HEADER -------- */}

      {/* Top bar */}
      <div className="top-bar">
        <div className="logo">
          <img src={logo} alt="logo" />
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

        {/* -------- CART -------- */}

        <div className="cart">
          <button>Valider mon panier</button>
          <div className="line-cart">
            {cart.map((cartItem, index) => {
              return (
                <div>
                  <div>
                    <button
                      onClick={() => {
                        removeQuantity(cartItem, index);
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
          {/* <div>{calculTotal(cartItem)} €</div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
