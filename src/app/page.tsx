import Image from "next/image";
import { useTranslations } from 'next-intl';

import { MapPin, MessageCircle, Waves, Wind } from "lucide-react";
import { Button } from "@nextui-org/button";
import DraggableScroll from "./components/DraggableScroll";
import RecommendedCard from "./components/RecommendedCard";

export default function Home() {
  const t = useTranslations();

  const categories = [
    { icon: <div className="icon">&#xf773;</div>, name: 'Island' },
    { icon: <div className="icon">&#xe800;</div>, name: 'Beach' },
    { icon: <div className="icon">&#xe801;</div>, name: 'Animals' },
    { icon: <div className="icon">&#xe800;</div>, name: 'Activities' },
    { icon: <div className="icon">&#xe800;</div>, name: 'Shopping' },
    { icon: <Waves />, name: 'Restaurant' },
    { icon: <div className="icon">&#xe802;</div>, name: 'Spa' },
  ]

  const places = [
    { text: "Rustic Ridge", description: "3 Friends joined" },
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
              <div className="aspect-square rounded-2xl bg-[--primary-50] text-[--primary] text-2xl  flex  justify-center items-center hover:scale-105 duration-150 cursor-default">
                {item.icon}
              </div>
              <div className="text-black text-center">{t(item.name)}</div>
            </div>
            )}

          </div>
        </div>
      </section>


      <section className="bg-blue-50">
        <div className="text-[34px] text-[--primary] font-bold py-5 p-10">{t('Recommended for you')}</div>
        <DraggableScroll className="p-5 px-10" items={
          [
            places.map((item, key) => <RecommendedCard key={key} text={item.text} description={item.description} className="bg-[--primary] cursor-pointer select-none" />,)

          ]
        } />
      </section>


      <section className="bg-blue-50">
        <div className="text-[34px] text-[--primary] font-bold py-5 p-10 flex gap-2"><div className="icon">&#xf773;</div>{t('Island')}</div>
        <DraggableScroll className="p-5 px-10" items={
          [
            places.map((item, key) => <RecommendedCard key={key} text={item.text} description={item.description} className="bg-[--primary] cursor-pointer select-none" />,)

          ]
        } />
      </section>

      <section className="bg-blue-50">
        <div className="text-[34px] text-[--primary] font-bold py-5 p-10 flex gap-2"> <div className="icon">&#xe800;</div>{t('Beach')}</div>
        <DraggableScroll className="p-5 px-10" items={
          [
            places.map((item, key) => <RecommendedCard key={key} text={item.text} description={item.description} className="bg-[--primary] cursor-pointer select-none" />,)

          ]
        } />
      </section>



      {/* floating button */}
        <div className="fixed bottom-5 right-5">
          <Button isIconOnly={true} radius="full" className="p-3 border-[1px]  shadow-md bg-[--primary] text-white"><MessageCircle /></Button>
        </div>
    </>
  );
}
