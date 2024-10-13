'use client'
import { Compass, MapPin } from "lucide-react";
import DraggableScroll from "../../components/DraggableScroll";
import { useTranslations } from "next-intl";
import { Tabs, Tab } from "@nextui-org/tabs";
import Link from "next/link";

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


        <section className="bg-blue-100 py-10">
            <div className="text-[48px] px-20 font-bold">{t(`By tour company`)}</div>
            <div className="p-4">
                <DraggableScroll className="px-10" items={
                    [
                        <Link href="/categories/island/someid">
                        <div className="hover:w-[500px] bg-[--primary] duration-300 shadow-lg rounded-xl w-[300px] h-[400px] p-4 relative text-white" style={{
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
        </section>


        <section className="bg-blue-100 py-10">
            <div className="text-[48px] px-20 font-bold">{t(`Charter a boat`)}</div>
            <div className="p-4 px-20 ">
                <Tabs aria-label="Options" radius="full" color="primary"
                className="w-full "
                isVertical={false} classNames={{
                    cursor: "w-full bg-[--primary] text-white",
                    tab: "py-5",
                  
      

                }}>
                    <Tab key="longtail" title="Longtail" >
                        <div className="bg-white/20 rounded-xl p-4 h-[600px]">
                            <DraggableScroll items={
                                [
                                    <div className="hover:w-[500px] bg-[--primary] duration-300 shadow-lg rounded-xl w-[300px] h-[400px] p-4 relative text-white" style={{
                                        backgroundImage: "url(https://cf.bstatic.com/xdata/images/hotel/max1280x900/147105150.jpg?k=6af0ecc5e938d79dc46f69c613709802622945a37fb1453b8277418d71c0f491&o=&hp=1)",
                                        backgroundSize: "cover"
                                    }}>

                                        <div className="h-full flex items-end justify-end flex-col">

                                            <div className="text-2xl font-bold">Racha island</div>
                                            <div className="flex gap-2"><MapPin /> THAILAND , Phuket</div>
                                        </div>
                                    </div>,


                                ]
                            } />
                        </div>
                    </Tab>
                    <Tab key="catamaran" title="Catamaran">
                        <div className="bg-white/20 rounded-xl p-4 h-[600px]">
                            <DraggableScroll items={
                                [
                                    <Link href="/categories/island/someid">
                                    <div className="hover:w-[500px] bg-[--primary] duration-300 shadow-lg rounded-xl w-[300px] h-[400px] p-4 relative text-white" style={{
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
                    </Tab>
                    <Tab key="speedboat" title="Speedboat">
                    <div className="bg-white/20 rounded-xl p-4 h-[600px] flex flex-col justify-center items-center "><Compass className="w-[56px] h-[56px]" /><div className="">No data</div></div>
                    </Tab>
                    <Tab key="fishing" title="Fishing">
                    <div className="bg-white/20 rounded-xl p-4 h-[600px] flex flex-col justify-center items-center"><Compass className="w-[56px] h-[56px]" /><div className="">No data</div></div>
                    </Tab>
                </Tabs>
            </div>

        </section>
        <section className="bg-blue-100 py-10">
            <div className="text-[48px] px-20 font-bold">{t(`Sea scuba diving`)}</div>
            <div className="p-4">
                <DraggableScroll items={
                    [
                        <div className="hover:w-[500px] bg-[--primary] duration-300 shadow-lg rounded-xl w-[300px] h-[400px] p-4 relative text-white" style={{
                            backgroundImage: "url(https://cf.bstatic.com/xdata/images/hotel/max1280x900/147105150.jpg?k=6af0ecc5e938d79dc46f69c613709802622945a37fb1453b8277418d71c0f491&o=&hp=1)",
                            backgroundSize: "cover"
                        }}>

                            <div className="h-full flex items-end justify-end flex-col">

                                <div className="text-2xl font-bold">Racha island</div>
                                <div className="flex gap-2"><MapPin /> THAILAND , Phuket</div>
                            </div>
                        </div>,
                        <div className="hover:w-[500px] bg-[--primary] duration-300 shadow-lg rounded-xl w-[300px] h-[400px] p-4 relative text-white" style={{
                            backgroundImage: "url(https://cf.bstatic.com/xdata/images/hotel/max1280x900/147105150.jpg?k=6af0ecc5e938d79dc46f69c613709802622945a37fb1453b8277418d71c0f491&o=&hp=1)",
                            backgroundSize: "cover"
                        }}>

                            <div className="h-full flex items-end justify-end flex-col">

                                <div className="text-2xl font-bold">Racha island</div>
                                <div className="flex gap-2"><MapPin /> THAILAND , Phuket</div>
                            </div>
                        </div>,
                        <div className="hover:w-[500px] bg-[--primary] duration-300 shadow-lg rounded-xl w-[300px] h-[400px] p-4 relative text-white" style={{
                            backgroundImage: "url(https://cf.bstatic.com/xdata/images/hotel/max1280x900/147105150.jpg?k=6af0ecc5e938d79dc46f69c613709802622945a37fb1453b8277418d71c0f491&o=&hp=1)",
                            backgroundSize: "cover"
                        }}>

                            <div className="h-full flex items-end justify-end flex-col">

                                <div className="text-2xl font-bold">Racha island</div>
                                <div className="flex gap-2"><MapPin /> THAILAND , Phuket</div>
                            </div>
                        </div>,

                    ]
                } />
            </div>
        </section>

    </>
}