import React from "react";
import "./index.scss";
import { Helmet } from "react-helmet-async";
import Header from "../../components/header";
import Products from "../../components/products";

function Home() {
  return (
  <>
    <Helmet>
      <title>Home</title>
    </Helmet>
    
    <Header/>
    <Products/>
  </>

  )
}

export default Home;
