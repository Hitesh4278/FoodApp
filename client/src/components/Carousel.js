import React from "react";

export default function Carousel() {
  return (
    <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <form class="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ height: "2rem" }} // add this line to adjust the height
              />
              <button
                class="btn btn-outline-success text-white bg-danger"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/900*300/?burger"
              className="d-block w-100"
              alt="..."
              width="500" // add this line to set the width to 500 pixels
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900*700/?pizza"
              className="d-block w-100"
              alt="..."
              width="500" // add this line to set the width to 500 pixels
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900*700/?momos"
              className="d-block w-100"
              alt="..."
              width="500" // add this line to set the width to 500 pixels
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
  );
}
