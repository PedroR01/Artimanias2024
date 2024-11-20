import React, { useState } from "react";
import imgVideo from "../assets/img/misc/video.png";
import sliderArrow from "../assets/img/icons/back_arrow.svg";

export default function Slider({ video, obra, imagenes }) {
  // Estado para mantener el índice actual del slider
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array con las URLs de las imágenes y el video
  const slides = [
    { type: "image", url: imgVideo },
    { type: "video", url: video },
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
      {/* Botón para ir al slide anterior */}
      <button
        aria-label="Previous"
        className="flex absolute w-9 h-9 left-0 top-1/2 z-10 ml-5 items-center justify-center rounded-full bg-[#FFFBF2]
             border-2 border-black button-shadow 
             transition duration-300 ease-in-out hover:-translate-x-2 
             hover:bg-[#D1C1B4] hover:button-shadow active:bg-[#FFDD6A] 
             hover:shadow-lg active:shadow-none"
        onClick={prevSlide}
      >
        <img className="w-[25%]" src={sliderArrow} alt="Icon" />
      </button>

      {/* Botón para ir al siguiente slide */}
      <button
        aria-label="Previous"
        className="flex absolute w-9 h-9 right-0 top-1/2 z-10 mr-5 items-center justify-center rounded-full bg-[#FFFBF2]
             border-2 border-black button-shadow 
             transition duration-300 ease-in-out hover:translate-x-2 
             hover:bg-[#D1C1B4] hover:button-shadow active:bg-[#FFDD6A] 
             hover:shadow-lg active:shadow-none"
        onClick={nextSlide}
      >
        <img className="w-[25%] rotate-180" src={sliderArrow} alt="Icon" />
      </button>
      {/* Contenedor del slider */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >

          {slides.map((slide, index) => (
            <div key={index} className="min-w-full">
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