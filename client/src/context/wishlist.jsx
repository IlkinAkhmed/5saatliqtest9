import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const WishlistContext = createContext();


export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState(
    localStorage.getItem("5saatliq9")
      ? JSON.parse(localStorage.getItem("5saatliq9"))
      : []
  );
  useEffect(() => {
    localStorage.setItem("5saatliq9", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWish = (item) => {
    const foundData = wishlist.find((x) => x._id === item._id);
    if (foundData) {
      setWishlist(wishlist.filter((x) => x._id !== item._id));
      Swal.fire({
        icon: "success",
        title: "removed from wishlist",
      });
      return;
    } else {
      setWishlist([...wishlist, item]);
      Swal.fire({
        icon: "success",
        title: "added to wishlist",
      });
    }
  };

  const data = {
    wishlist,
    setWishlist,
    addToWish,
  };
  return (
    <WishlistContext.Provider value={data}>{children}</WishlistContext.Provider>
  );
}
