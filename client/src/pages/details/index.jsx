import React, { useContext, useState } from "react";
import "./index.scss";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { WishlistContext } from "../../context/wishlist";
import { BasketContext } from "../../context/basket";

function Details() {
  const { addToWish, wishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(BasketContext);

  const { id } = useParams();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const res = await axios.get(`http://localhost:4100/products/${id}`);
    setData(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | Details</title>
      </Helmet>

      <div className="det">
        <div className="det-card">
          <div className="det-img">
            <i className={data.image}></i>
          </div>
          <div className="det-texts">
            <h1>{data.title}</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
              quas totam, mollitia atque similique quis possimus ut maxime
              maiores voluptas?
            </p>
            <p>Price: {data.price}.00</p>
            <div className="det-card-icons">
              <i
                onClick={() => addToCart(data)}
                className="fa-solid fa-bag-shopping"
              ></i>
              <i
                onClick={() => addToWish(data)}
                className={`${
                  wishlist.find((x) => x._id === data._id)
                    ? "fa-solid"
                    : "fa-regular"
                } fa-heart`}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
