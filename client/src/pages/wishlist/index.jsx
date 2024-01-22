import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { BasketContext } from "../../context/basket";
import { WishlistContext } from "../../context/wishlist";
import "./index.scss";

function Wishlist() {
  const navigate = useNavigate();
  const { addToCart } = useContext(BasketContext);
  const { wishlist, setWishlist } = useContext(WishlistContext);
  return (
    <>
      <Helmet>
        <title>Home | Wishlist</title>
      </Helmet>
      <div className="wish">
        <h1>Your Favorites</h1>
        <div className="prod-wrapper">
          {wishlist &&
            wishlist.map((item) => (
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
                      setWishlist(wishlist.filter((x) => x._id !== item._id))
                    }
                    className="fa-solid fa-trash-can"
                  ></i>
                  <i
                    onClick={() => addToCart(item)}
                    className="fa-solid fa-bag-shopping"
                  ></i>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
