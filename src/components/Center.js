const Center = (data) => {
  data.categories.map((items, index) => {
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
  });
};

export default Center;
