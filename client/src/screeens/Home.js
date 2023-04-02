import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function Home() {

  const [search, setSearch] = useState('');

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:8000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);

    // console.log(response[0], response[1])
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div class="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{setSearch(e.target.value)}}
                />
                {/* <button class="btn btn-outline-success text-white bg-danger" type="submit">
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900*700/?burger"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900*700/?pizza"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900*700/?momos"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container mt-3">
        {foodCat !== [] ? (
          foodCat.map((data) => {
            return (
              <div key={data._id}>
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                  {foodItem !== [] ? (
                    foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search))) 
                    .map((filterItems) => {
                        return (
                          <div key={filterItems._id} className="col">
                            <Card foodItem={filterItems}
                              options={filterItems.options[0]}
                              
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div className="col">"No Data Exist"</div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          ""
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
