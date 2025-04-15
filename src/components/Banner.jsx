import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="relative container mx-auto my-10 px-4 overflow-hidden rounded-2xl  group">
      {/* Carousel Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <img
            src={slides[currentSlide].image || "/placeholder.svg"}
            alt={slides[currentSlide].title}
            className="w-full h-[70vh] object-cover rounded-2xl"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 rounded-2xl flex flex-col justify-center items-center text-center p-6">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-bold sm:text-6xl drop-shadow-lg"
            >
              {slides[currentSlide].title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-4 text-lg sm:text-xl  max-w-2xl drop-shadow-lg"
            >
              {slides[currentSlide].description}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link to={"/find-tutors"}>
                <Button
                  size="lg"
                  className="mt-6 font-semibold text-lg px-8 py-6 transition-colors duration-300"
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlaying(false);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white scale-125 w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
