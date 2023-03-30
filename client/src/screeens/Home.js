import React from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Carousel from "../components/Carousel";

export default function Home() {
  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div>
        <Carousel />
      </div>
      <div className="m-3">
        <Card />
        {/* <Card/> */}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
