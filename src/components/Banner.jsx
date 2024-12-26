import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Banner = () => {
  const slides = [
    {
      id: 1,
      image: "https://i.ibb.co.com/3TQN63t/v1.jpg",
      title: "Find Expert Tutors",
      description:
        "Connect with the best tutors for personalized learning experiences.",
    },
    {
      id: 2,
      image: "https://i.ibb.co.com/HxrqtZP/v2.webp",
      title: "Book Your Lessons",
      description: "Flexible scheduling to fit your busy life.",
    },
    {
      id: 3,
      image: "https://i.ibb.co.com/w6Mf62y/v3.jpg",
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
    <div className="relative container mx-auto my-10 overflow-hidden rounded-lg shadow-lg group">
      {/* Carousel Image */}
      <div className="relative">
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="w-full h-64 object-cover sm:h-96"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70 flex flex-col justify-center items-center text-center text-white p-6">
          <h2 className="text-3xl font-bold sm:text-5xl text-black">
            {slides[currentSlide].title}
          </h2>
          <p className="mt-2 text-sm sm:text-lg text-black">
            {slides[currentSlide].description}
          </p>
          <Button variant="default" size="lg" className="mt-4 font-semibold">
            Get Started
          </Button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex justify-between items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handlePrev}
          className="p-2 bg-gray-800/70 hover:bg-gray-900 text-white rounded-full shadow-lg"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-gray-800/70 hover:bg-gray-900 text-white rounded-full shadow-lg"
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              currentSlide === index ? "bg-white scale-125" : "bg-gray-400"
            }`}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
