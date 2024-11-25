import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Carousel.css"; // Import CSS file for styling
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  // Variants for animations
  const slideVariants = {
    hiddenRight: { x: "100%", opacity: 0 },
    hiddenLeft: { x: "-100%", opacity: 0 },
    visible: { x: "0", opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0,transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.2, backgroundColor: "#ff00008e" },
  };

  const dotVariants = {
    initial: { y: 0 },
    animate: { transition: { type: "spring", stiffness: 1000, damping: 10 } },
    hover: { scale: 1, transition: { duration: 0.2 } },
  };

  // Navigation handlers
  const debounceNavigation = (callback) => {
    if (isNavigating) return;
    setIsNavigating(true);
    callback();
    setTimeout(() => setIsNavigating(false), 500);
  };

  const handleNext = () =>
    debounceNavigation(() => {
      setDirection("right");
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    });

  const handlePrevious = () =>
    debounceNavigation(() => {
      setDirection("left");
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    });

  const handleDotClick = (index) => {
    if (index !== currentIndex) {
      setDirection(index > currentIndex ? "right" : "left");
      setCurrentIndex(index);
    }
  };

  // Auto-slide (Optional)
  useEffect(() => {
    const autoSlide = setInterval(() => handleNext(), 5000);
    return () => clearInterval(autoSlide);
  }, []);

  return (
    <div className="flex gap-2 justify-center">
       {images && <div className="lg:flex flex-col gap-2 md:flex hidden">
            {images?.map((imageURL,index)=><div  onClick={() => handleDotClick(index)} key={index} className="rounded-xl bg-black aspect-square w-[100px] overflow-hidden">
                <img src={imageURL} className={`w-full h-full object-cover   ${index !== currentIndex && 'opacity-70'}`} alt="" />
            </div>)}
        </div>}
        <div className="carousel">
          <div className="carousel-images">
            <AnimatePresence>
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                loading="lazy"
                initial={isFirstRender ? null : direction === "right" ? "hiddenRight" : "hiddenLeft"}
                animate="visible"
                exit="exit"
                variants={slideVariants}
              />
            </AnimatePresence>
            <div className="slide_direction">
              <motion.div
                className="left"
                onClick={handlePrevious}
                role="button"
                aria-label="Previous Slide"
                variants={buttonVariants}
                whileHover="hover"
              >
                <ChevronLeft />
              </motion.div>
              <motion.div
                className="right"
                onClick={handleNext}
                role="button"
                aria-label="Next Slide"
                variants={buttonVariants}
                whileHover="hover"
              >
                <ChevronRight />
              </motion.div>
            </div>
          </div>
          <div className="carousel-indicator">
            {images.map((_, index) => (
              <motion.div
                key={index}
                className={`dot ${currentIndex === index ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
                initial="initial"
                animate={currentIndex === index ? "animate" : ""}
                whileHover="hover"
                variants={dotVariants}
              ></motion.div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default Carousel;
