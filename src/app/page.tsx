import Image from "next/image";
import { useTranslations } from 'next-intl';

import { ArrowRight, MapPin, MessageCircle, Waves, Wind } from "lucide-react";
import { Button } from "@nextui-org/button";
import DraggableScroll from "./components/DraggableScroll";
import RecommendedCard from "./components/RecommendedCard";
import Link from "next/link";
import { image } from "@nextui-org/theme";

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

  const image = "/images/tripboat.png"
  return (
    <>

      <section className="flex gap-5 justify-center h-[80vh] ">


        <div className="absolute top-0 left-0 z-0  w-full h-[80vh] overflow-hidden show_bg_2">
          <div className="h-full  grid items-center">
            <div className="px-10">
              <div className="text-[16px] text-[--primary]">{t('The Blessed Trip Manager')}</div>
              <div className="text-[42px] font-bold">{t('Hello')},</div>
              <div className="text-[42px]">{t('Where do you wanna go?')}</div>
              <div className="text-[16px] text-white w-fit px-5 py-2 flex gap-2 items-center rounded-full bg-[--primary] "><MapPin />  {t('THAILAND')} , {t('Phuket')}</div>
            </div>
          </div>
        </div>

        <section className="container absolute lg:bottom-20 md:bottom-10 bottom-0 ">
          <div className="bg-white rounded-[30px] p-10 min-h-[100px] shadow-md">
            <div className="font-bold text-2xl">

              {t('Find you favourite places')}?
            </div>
          </div>

          <div className="flex justify-center mt-[-25px] w-[100%]"><Button className="w-[300px] bg-[--primary] text-white">{t('Search Place')}</Button></div>
        </section>

      </section>


      <section>
        <div className="bg-white p-10 min-h-[300px]">
          <div className="text-[34px] font-bold py-5">{t('Explore categories')}</div>
          <div className="flex justify-evenly flex-wrap gap-10">


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
        <DraggableScroll className="p-5 px-10" items={
          [
            places.map((item, key) => <RecommendedCard key={key} text={item.text} description={item.description} image={item.image} className="bg-[--primary] cursor-pointer select-none min-w-[200px]" />,)

          ]
        } />
      </section>


      <section className="bg-[--primary] py-10">
        <div className="text-[34px] text-white font-bold py-5 p-10 flex gap-2"><div className="icon">&#xf773;</div>{t('We also have')}</div>
        <div className="px-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        
          {[1,2,3,4,5,6].map((item:any,index:number) =><div key={index} className="rounded-[28px] p-5 border-[1px] flex flex-col justify-end bg-white h-[350px] text-white shadow-sm duration-150 group" style={{ background: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.853)),url(${image})` ,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
            <div className="font-bold text-[24px] absolute group-hover:relative duration-200">Title</div>
            <div className="text-[12px] opacity-0 group-hover:opacity-75 duration-200 ">Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet. adipisicing elit.</div>
          </div>)}

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
