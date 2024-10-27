'use client'
import { Compass, MapPin } from "lucide-react";
import DraggableScroll from "../../components/DraggableScroll";
import { useTranslations } from "next-intl";
import { Tabs, Tab } from "@nextui-org/tabs";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
    const t = useTranslations();
    return <>
        <section className=" py-10">
            <div className="flex justify-between items-center px-20 py-10">
                <div className="text-[54px]  font-bold">{t('Island')}</div>
                <div className="text-lg">{t('Drive by the Blessed')}</div>

            </div>
            <div className="p-10">
                <video src="/videos/islanddrone.mp4" autoPlay={true} className="w-full rounded-[20px] " />
            </div>


        </section>


        <section className="bg-zinc-100 py-10">
            <div className="w-[90vw] mx-auto">
                <div className="text-[22px] text-[--primary]">{t(`Island`)}</div>
                <div className="text-[48px] font-bold">{t(`By tour company`)}</div>
                <div className="py-5">
                    <DraggableScroll className="" items={
                        [
                            <Link href="/categories/island/someid">
                                <div className="hover:w-[500px] bg-[--primary] duration-300 shadow-lg rounded-xl w-[500px] h-[400px] p-4 relative text-white" style={{
                                    backgroundImage: "url(https://cf.bstatic.com/xdata/images/hotel/max1280x900/147105150.jpg?k=6af0ecc5e938d79dc46f69c613709802622945a37fb1453b8277418d71c0f491&o=&hp=1)",
                                    backgroundSize: "cover"
                                }}>
                                    <div className="h-full flex items-end justify-end flex-col">
                                        <div className="text-2xl font-bold">Racha island</div>
                                        <div className="flex gap-2"><MapPin /> THAILAND , Phuket</div>
                                    </div>
                                </div>
                            </Link>
                        ]
                    } />
                </div>
            </div>
        </section>


        <section className="bg-white py-10">
            <div className="text-[22px] px-20 text-[--primary]">{t(`Island`)}</div>
            <div className="text-[48px] px-20 font-bold">{t(`Charter a boat`)}</div>
            <div className="p-4 px-20 ">
                <Tabs aria-label="Options" radius="full" color="primary" variant="underlined"
                    className="w-full "
                    isVertical={false} classNames={{
                        cursor: "w-full bg-[--primary] text-white",
                        tab: "py-5",



                    }}>
                    <Tab key="longtail" title="Longtail" >
                        <div className="bg-white/20 rounded-xl p-4 h-[400px]">
                            <DraggableScroll items={
                                [
                                    <Link href="/categories/island/boat/someid">
                                    <div className="w-64  overflow-hidden">
                                        {/* Image */}
                                        <Image
                                            alt={""}
                                            width={300}
                                            height={300}
                                            src="/images/tripboat.png"
                                            className="w-full h-[250px] object-cover rounded-[18px]"
                                        />

                                        {/* Content */}
                                        <div className="p-4">
                                            <h2 className="font-semibold text-lg">Woldsend Cottages</h2>
                                            <p className="text-sm text-gray-500 flex items-center">
                                                <MapPin />
                                                Phuket , Thailand
                                            </p>
                                            <p className="font-semibold text-xl mt-2">฿1500 <span className="text-sm text-gray-500">/ Ticket</span></p>
                                        </div>
                                    </div>
                                   
                                    </Link>
                                    ,


                                ]
                            } />
                        </div>
                    </Tab>
                    <Tab key="catamaran" title="Catamaran">
                        <div className="bg-white/20 rounded-xl p-4 h-[400px]">
                            <DraggableScroll items={
                                [
                                    <Link href="/categories/island/someid">
                                        <div className="w-64  overflow-hidden">
                                            {/* Image */}
                                            <Image
                                                alt={""}
                                                width={300}
                                                height={300}
                                                src="/images/tripboat.png"
                                                className="w-full h-[250px] object-cover rounded-[18px]"
                                            />

                                            {/* Content */}
                                            <div className="p-4">
                                                <h2 className="font-semibold text-lg">Woldsend Cottages</h2>
                                                <p className="text-sm text-gray-500 flex items-center">
                                                    <svg
                                                        className="w-4 h-4 mr-1"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 3a5 5 0 100 10A5 5 0 0010 3zM2 10a8 8 0 1116 0A8 8 0 012 10z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    Wakefield Council, England
                                                </p>
                                                <p className="font-semibold text-xl mt-2">฿1500 <span className="text-sm text-gray-500">/ Ticket</span></p>
                                            </div>
                                        </div>
                                    </Link>

                                ]
                            } />
                        </div>
                    </Tab>
                    <Tab key="speedboat" title="Speedboat">
                        <div className="bg-white/20 rounded-xl p-4 h-[400px] flex flex-col justify-center items-center "><Compass className="w-[56px] h-[56px]" /><div className="">No data</div></div>
                    </Tab>
                    <Tab key="fishing" title="Fishing">
                        <div className="bg-white/20 rounded-xl p-4 h-[400px] flex flex-col justify-center items-center"><Compass className="w-[56px] h-[56px]" /><div className="">No data</div></div>
                    </Tab>
                </Tabs>
            </div>

        </section>
        <section className="bg-blue-100 py-10">
            <div className="text-[22px] px-20 text-[--primary]">{t(`Island`)}</div>
            <div className="text-[48px] px-20 font-bold">{t(`Sea scuba diving`)}</div>
            <div className="p-4 px-20">
                <DraggableScroll items={
                    [1,2,3,4].map((item: any,index:number) =><div key={index} className="relative w-72 h-48 rounded-lg overflow-hidden shadow-lg">
                    {/* Background Image */}
                    <img 
                      src="https://via.placeholder.com/400x300" 
                      alt="Explore Places" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
              
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              
                    {/* Content */}
                    <div className="relative p-4 text-white h-full flex flex-col justify-between">
                      {/* Title */}
                      <div>
                        <h2 className="text-lg font-semibold">Discover the most favorite places</h2>
                      </div>
              
                      {/* People Joined */}
                      <div className="flex items-center mt-4 space-x-2">
                        <div className="flex -space-x-2">
                          <img 
                            className="w-8 h-8 border-2 border-white rounded-full" 
                            src="https://randomuser.me/api/portraits/women/1.jpg" 
                            alt="Person 1"
                          />
                          <img 
                            className="w-8 h-8 border-2 border-white rounded-full" 
                            src="https://randomuser.me/api/portraits/men/2.jpg" 
                            alt="Person 2"
                          />
                          <img 
                            className="w-8 h-8 border-2 border-white rounded-full" 
                            src="https://randomuser.me/api/portraits/women/3.jpg" 
                            alt="Person 3"
                          />
                        </div>
                        <p className="text-sm">120+ People Joined</p>
                      </div>
              
                      {/* Button */}
                      <button className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-lg font-semibold hover:bg-blue-600 transition">
                        Explore Now
                      </button>
                    </div>
                  </div>)
                } />
            </div>
        </section>

    </>
}