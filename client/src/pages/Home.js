import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function Home() {

  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + "foodData", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",withCredentials:true,
        },
      });
      const data = await response.json();
      setFoodItem(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-3">
        <div className="d-flex justify-content-center mb-4">
          <input
            className="form-control w-50"
            type="search"
            placeholder="Search for food"
            aria-label="Search"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        {foodCat.map((category) => (
          <div key={category._id}>
            <div className="fs-3 m-3">{category.CategoryName}</div>
            <hr />
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {foodItem
                .filter((item) => (
                  item.CategoryName === category.CategoryName &&
                  item.name.toLowerCase().includes(search.toLowerCase())
                ))
                .map((filteredItem) => (
                  <div key={filteredItem._id} className="col">
                    <Card foodItem={filteredItem} options={filteredItem.options[0]} />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
