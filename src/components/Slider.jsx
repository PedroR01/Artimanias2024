import React, { useState } from "react";
import sliderArrow from "../assets/img/sliderArrow.svg";

export default function Slider({ video, obra, imagenes }) {
  // Estado para mantener el índice actual del slider
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array con las URLs de las imágenes y el video
  const slides = [
    { type: "video", url: video },
    { type: "image", url: "https://via.placeholder.com/800x400?text=Image+1" },
    { type: "image", url: "https://via.placeholder.com/800x400?text=Image+2" },
  ];

  // Función para avanzar al siguiente slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  // Función para retroceder al slide anterior
  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length,
    );
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Contenedor del slider */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full border-2 border-black">
              {slide.type === "image" ? (
                <img
                  src={slide.url}
                  alt={`Slide ${index}`}
                  className="w-full h-auto"
                />
              ) : (
                <iframe
                  controls
                  className="w-full h-full"
                  src={slide.url}
                  title={obra}
                  referrerpolicy="strict-origin-when-cross-origin"
                ></iframe>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Botón para ir al slide anterior */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 transition ease-in-out delay-150 hover:-translate-x-6  duration-300"
      >
        <img className="rotate-180" src={sliderArrow} alt="" />
      </button>

      {/* Botón para ir al siguiente slide */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 transition ease-in-out delay-150 hover:translate-x-6  duration-300"
      >
        <img src={sliderArrow} alt="" />
      </button>

      {/* Indicadores de los slides */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-gray-800" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
}
