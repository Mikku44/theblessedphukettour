
import { Carousel as CarouselComponent } from "flowbite-react";

export default function Carousel({ className, items }: any) {
  const dummy = [
    <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />,
    <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />,
    <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />,
    <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />,
    <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
  ]
  items = items || dummy
  return (
    <div className={`h-56 sm:h-64 xl:h-80 2xl:h-96 ${className}`}>
      <CarouselComponent >
        {items}

      </CarouselComponent>
    </div>
  );
}
