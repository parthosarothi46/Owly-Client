import { useState } from "react";
import { Button } from "@/components/ui/button";

const Banner = () => {
  const slides = [
    {
      id: 1,
      image: "https://via.placeholder.com/1200x600?text=Find+Expert+Tutors",
      title: "Find Expert Tutors",
      description:
        "Connect with the best tutors for personalized learning experiences.",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/1200x600?text=Book+Your+Lessons",
      title: "Book Your Lessons",
      description: "Flexible scheduling to fit your busy life.",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/1200x600?text=Learn+Anywhere",
      title: "Learn Anywhere",
      description:
        "Access tutorials and lessons from the comfort of your home.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-8 overflow-hidden rounded-lg shadow-lg">
      {/* Carousel Image */}
      <div className="relative">
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="w-full h-64 object-cover sm:h-96"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white p-4">
          <h2 className="text-3xl font-bold sm:text-5xl">
            {slides[currentSlide].title}
          </h2>
          <p className="mt-2 sm:text-lg">{slides[currentSlide].description}</p>
          <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
            Get Started
          </Button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between items-center w-full px-4">
        <button
          onClick={handlePrev}
          className="p-2 bg-white bg-opacity-50 hover:bg-opacity-100 text-black rounded-full shadow-md"
          aria-label="Previous Slide"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-white bg-opacity-50 hover:bg-opacity-100 text-black rounded-full shadow-md"
          aria-label="Next Slide"
        >
          →
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-blue-500" : "bg-gray-300"
            }`}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
