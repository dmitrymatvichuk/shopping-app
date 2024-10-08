import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import "./Carousel.scss";

const slides = [
  { id: "phones", title: "Phones" },
  { id: "tablets", title: "Tablets" },
  { id: "accessories", title: "Accessories" },
];

const properties = {
  prevArrow: (
    <button type="button" className="Carousel__button Carousel__button--prev">
      {" "}
    </button>
  ),
  nextArrow: (
    <button type="button" className="Carousel__button Carousel__button--next">
      {" "}
    </button>
  ),
};

export const Carousel = () => {
  return (
    <div className="Carousel">
      <Slide {...properties} indicators>
        {slides.map((slide, index) => (
          <div className="each-slide-effect" key={index}>
            <div className={`Carousel__slide Carousel__slide--${slide.id}`}>
              <div className="Carousel__text">{slide.title}</div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};
