import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.scss";
import { WishlistContext } from "../../context/wishlist";
import { BasketContext } from "../../context/basket";

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToWish, wishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(BasketContext);

  async function fetchData() {
    const res = await axios("http://localhost:4100/products");
    setProducts(res.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="products">
      <div className="prod-head">
        <div className="line"></div>
        <h1>Our Services</h1>
      </div>
      <div className="prod-wrapper">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          products &&
          products.map((item) => (
            <div className="prod-card" key={item._id}>
              <i className={item.image}></i>
              <h2 onClick={() => navigate(`/details/${item._id}`)}>
                {item.title}
              </h2>
              <p onClick={() => navigate(`/details/${item._id}`)}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum tenetur inventore atque ad adipisci quibusdam nobis
                itaque eveniet vero soluta.
              </p>
              <span>PRICE: ${item.price}.00</span>
              <div className="card-icons">
                <i
                  onClick={() => addToCart(item)}
                  className="fa-solid fa-bag-shopping"
                ></i>
                <i
                  onClick={() => addToWish(item)}
                  className={`${
                    wishlist.find((x) => x._id === item._id)
                      ? "fa-solid"
                      : "fa-regular"
                  } fa-heart`}
                ></i>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
