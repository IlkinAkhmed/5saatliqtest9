import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const BasketContext = createContext();

export default function BasketContextProvider({ children }) {
  const [basket, setBasket] = useState(
    localStorage.getItem("5saatliq9basket")
      ? JSON.parse(localStorage.getItem("5saatliq9basket"))
      : []
  );
  useEffect(() => {
    localStorage.setItem("5saatliq9basket", JSON.stringify(basket));
  }, [basket]);

  const addToCart = (item) => {
    const foundData = basket.find((x) => x._id === item._id);
    if (foundData) {
      foundData.count++;
      foundData.total = foundData.count * foundData.price;
      setBasket([...basket]);
      Swal.fire({
        icon: "info",
        title: "Already in cart",
      });
      return;
    } else {
      const total = item.price;
      setBasket([...basket, { ...item, count: 1, total: total }]);
      Swal.fire({
        icon: "success",
        title: "added to cart",
      });
    }
  };

  const modifyCount = (isIncreament, item) => {
    const foundData = basket.find((x) => x._id === item._id);
    if (isIncreament) {
      foundData.count++;
      foundData.total = foundData.count * foundData.price;
      setBasket([...basket]);
    } else if (foundData.count > 1) {
      foundData.count--;
      foundData.total = foundData.count * foundData.price;
      setBasket([...basket]);
    }
  };

  const data = {
    basket,
    setBasket,
    addToCart,
    modifyCount,
  };
  return (
    <BasketContext.Provider value={data}>{children}</BasketContext.Provider>
  );
}
