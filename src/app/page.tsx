import Image from "next/image";
import { useTranslations } from 'next-intl';

import { ArrowRight, ArrowUpRight, MapPin, MessageCircle, Waves, Wind } from "lucide-react";
import { Button } from "@nextui-org/button";
import DraggableScroll from "./components/DraggableScroll";
import RecommendedCard from "./components/RecommendedCard";
import Link from "next/link";
import { image } from "@nextui-org/theme";
import Carousel from "./components/carousel";

export default function Home() {
  const t = useTranslations();

  const categories = [
    { icon: <div className="icon">&#xf773;</div>, name: 'Island', link: "/island" },
    { icon: <div className="icon">&#xe800;</div>, name: 'Beach', link: "/beach" },
    { icon: <div className="icon">&#xe801;</div>, name: 'Animals', link: "/animals" },
    { icon: <div className="icon">&#xe800;</div>, name: 'Activities', link: "/activities" },
    { icon: <div className="icon">&#xe800;</div>, name: 'Shopping', link: "/shopping" },
    { icon: <Waves />, name: 'Restaurant', link: "/restaurant" },
    { icon: <div className="icon">&#xe802;</div>, name: 'Spa', link: "/spa" },
  ]

  const places = [
    { text: "Rustic Ridge", description: "3 Friends joined", image: "/images/tripboat.png" },
    { text: "Willow Valley", description: "3 Friends joined" },
    { text: "Golden Prairie", description: "4 Friends joined" },
    { text: "Cedar Haven", description: "5 Friends joined" },
    { text: "Emerald Hills", description: "8 Friends joined" },
    { text: "Emerald Hills", description: "8 Friends joined" },
    { text: "Emerald Hills", description: "8 Friends joined" },
    { text: "Emerald Hills", description: "8 Friends joined" },
    { text: "Emerald Hills", description: "8 Friends joined" },
    { text: "Whispering Pines", description: "3 Friends joined" }
  ]

  const image = "https://images.unsplash.com/photo-1458538977777-0549b2370168?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  return (
    <>

      <section className="flex flex-col md:flex-row gap-5 justify-center h-auto md:h-[500px] overflow-hidden mt-5">
        <div className="w-full relative bg-slate-100 aspect-video md:aspect-auto">
          {/* Carousel */}
          <Carousel
            items={[
              "/images/banner/banner1.png",
              "/images/banner/banner2.png",
              "/images/banner/banner3.png",
            ].map((item, index) => (
              <div key={index} className="text-white">
                <img
                  src={item}
                  alt="Beautiful banner showcasing Jalanista Trip Manager"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />

          {/* Overlay and Text */}
          <div className="absolute inset-0 z-10 flex items-center text-white bg-gradient-to-t from-zinc-900/80 to-slate-50/10 rounded-xl">
            <div className="px-5 sm:px-10">
              <p className="text-sm sm:text-base md:text-lg text-[--primary]">{t('Jalanista Trip Manager')}</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{t('Hello')},</h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl">{t('Where do you wanna go?')}</h2>
              <div className="mt-4 text-sm sm:text-base md:text-lg w-fit px-4 sm:px-5 py-2 flex gap-2 items-center rounded-full bg-[--primary]">
                <MapPin className="w-4 sm:w-5 h-4 sm:h-5" />
                {t('THAILAND')}, {t('Phuket')}
              </div>
            </div>
          </div>
        </div>
      </section>




      <section>
        <div className="bg-white p-10 min-h-[300px]">
          <div className="text-[34px] font-bold py-5">{t('Explore categories')}</div>
          <div className="flex flex-wrap gap-10 justify-between">


            {categories.map((item, key) => <div key={key} className="w-20">
              <Link href={`/categories${item.link}`}>
                <div className="aspect-square rounded-2xl bg-[--primary-50] text-[--primary] text-2xl  flex  justify-center items-center hover:scale-105 duration-150 cursor-default">
                  {item.icon}
                </div>
                <div className="text-black text-center">{t(item.name)}</div>
              </Link>
            </div>
            )}

          </div>
        </div>
      </section>


      <section className="bg-blue-50">
        <div className="text-[34px] text-[--primary] font-bold py-5 p-10">{t('Recommended for you')}</div>
        <DraggableScroll className="p-5 px-10 scrollbar-hide" items={
          [
            places.map((item, key) => <RecommendedCard key={key} text={item.text} description={item.description} image={item.image} className="bg-[--primary] cursor-pointer select-none min-w-[200px]" />,)

          ]
        } />
      </section>


      <section className="bg-[--primary] py-10">
        <div className="text-[34px] text-white font-bold py-5 p-10 flex gap-2"><div className="icon">&#xf773;</div>{t('We also have')}</div>
        <div className="px-10 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 justify-items-center">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div className="w-[80%] rounded-lg shadow-lg p-4 bg-white space-y-4">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 bg-black text-white text-sm px-2 py-1 rounded-full">
                  <span>2d left</span>
                </div>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                  <ArrowUpRight />
                </button>
              </div>

              {/* Title and Description */}
              <div>
                <h2 className="text-lg font-bold">GET 30% DISCOUNT!</h2>
                <p className="text-gray-500 text-sm">Any destination with Bidje Airlines!</p>
              </div>

              {/* Image */}
              <div className="rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1458538977777-0549b2370168?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Mountain" className="w-full h-auto" />
              </div>
            </div>

          ))}
        </div>

      </section>

      <section className="p-10">
        <div className="">
          <div className="text-sm text-[--primary]">
            Our Features
          </div>
          <div className="text-[34px] font-bold">
            Explore for more on Apps
          </div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">

          <div className="flex justify-end items-end">
            <div className="flex flex-wrap  justify-end gap-3 w-[400px]">
              <div className="rounded-2xl border-[1px] p-3 w-fit h-fit shadow-sm">
                <div className="flex justify-between gap-10">
                  <div className="font-bold">Get more packages</div>
                  <Button isIconOnly={true} className="bg-black rounded-full text-white"><ArrowRight /></Button>
                </div>
                <div className="text-sm">Book now and explore</div>
              </div>
              <div className="rounded-2xl border-[1px] p-3 w-fit h-fit shadow-sm">
                <div className="flex justify-between gap-10">
                  <div className="font-bold">Get more Experience</div>
                  <Button isIconOnly={true} className="bg-black rounded-full text-white"><ArrowRight /></Button>
                </div>
                <div className="text-sm">Book the best price offer here</div>
              </div>
              <div className="rounded-2xl  p-3 w-[70px] h-[70px] shadow-sm  bg-black text-white">
                <div className="flex justify-between gap-10">
                  <div className="font-bold">34k</div>
                </div>
                <div className="text-sm">Trips</div>
              </div>
            </div>
          </div>



          <img className="w-[400px]" src="https://png.pngtree.com/png-clipart/20240305/original/pngtree-3d-mobile-phone-frame-mockup-template-illustration-png-image_14512826.png" alt="" />
          <div className="flex flex-col gap-4">
            <div className="text-sm w-[400px]">
              Experience the Best in Travel:
              A Journey Where Every Destination Becomes an Unforgettable Adventure!
            </div>
            <div className="flex flex-col gap-2">
              <Link href="#" className="" ><Image src={"/images/googleplay.svg"} alt="Google play" width={200} height={300} /></Link >
              <Link href="#" className="" ><Image src={"/images/appstore.svg"} alt="App store" width={200} height={300} /></Link >
            </div>
          </div>
        </div>
      </section>


      <section className="bg-[--primary] p-10">
        <div className="text-[56px] text-white text-center">
          Make your trips Blessed.
        </div>
      </section>


    </>
  );
}
