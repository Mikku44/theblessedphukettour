
import { Carousel as CarouselComponent, Flowbite } from "flowbite-react";

export default function Carousel({ className, items,control = true}: any) {
  const dummy = [
    <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />,
    <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />,
    <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />,
    <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />,
    <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
  ]
  items = items || dummy
  return (
    <div className={` ${className} lg:h-[400px]`}>
      <Flowbite
        theme={{
          theme: {
            carousel: {
              root: {
                "base": "relative h-full w-full",
                "leftControl": `${control ? 'absolute' :'hidden'} left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none `,
                "rightControl": `${control ? 'absolute' :'hidden'} right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none`
              },
              scrollContainer: {
                "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-none ",
                "snap": "snap-x"
              }

            }
          },
        }}
      >
        <CarouselComponent className="rounded-none" >
          {items}

        </CarouselComponent>
      </Flowbite>
    </div>
  );
}
