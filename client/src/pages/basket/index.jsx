import React, { useContext } from "react";
import "./index.scss";
import { Helmet } from "react-helmet-async";
import { BasketContext } from "../../context/basket";
import { WishlistContext } from "../../context/wishlist";
import { useNavigate } from "react-router-dom";

function Basket() {
  const { basket, modifyCount, setBasket } = useContext(BasketContext);
  const navigate = useNavigate();
  const { wishlist, addToWish } = useContext(WishlistContext);
  return (
    <>
      <Helmet>
        <title>Home | Basket</title>
      </Helmet>
      <div className="basket">
        <h1>Your Cart</h1>
        <div className="prod-wrapper">
          {basket &&
            basket.map((item) => (
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
                    onClick={() =>
                      setBasket(basket.filter((x) => x._id !== item._id))
                    }
                    className="fa-solid fa-trash-can"
                  ></i>
                  <p
                    onClick={() => modifyCount(true, item)}
                    style={{ cursor: "pointer", fontSize: "2em" }}
                  >
                    +
                  </p>
                  <p>{item.count}</p>
                  <p
                    onClick={() => modifyCount(false, item)}
                    style={{ cursor: "pointer", fontSize: "2em" }}
                  >
                    -
                  </p>
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
            ))}
        </div>
      </div>
    </>
  );
}

export default Basket;
