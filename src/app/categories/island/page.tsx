'use client'
import { ChevronDown, Compass, MapPin, MapPinned, Ship, Star } from "lucide-react";
import DraggableScroll from "../../components/DraggableScroll";
import { useTranslations } from "next-intl";
import { Tabs, Tab } from "@nextui-org/tabs";
import Link from "next/link";
import Image from "next/image";
import Carousel from "../../components/carousel";
import { useEffect, useState } from "react";
import { db } from "../../api/config/config";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu } from "@nextui-org/dropdown";
import SkeletonCard from "../../components/skeletonCart";

export default function Page() {
    const t = useTranslations();
    const [currentTap, setCurrentTap] = useState("island");
    const [boatType, setBoatType] = useState('longTail');

    return <main className="min-h-screen ">

        <div className="w-full overflow-hidden">
            <Carousel items={
                [
                    "/images/banner/banner1.png",
                    "/images/banner/banner2.png",
                    "/images/banner/banner3.png",
                ].map((item, index) =>
                    <div key={index} className=" text-white ">
                        <img src={item} alt="" className=" rounded-none " />
                    </div>
                )
            } className="w-full h-[400px] aspect-auto" />
        </div>
        <div className="grid lg:grid-cols-4 w-full bg-[--primary]">
            <Button radius='none' className={` bg-[--primary] p-4 h-[54px] text-small font-bold ${currentTap == 'island' && "bg-[--secondary] text-white"}`}
                onClick={e => setCurrentTap('island')}
            >Tour by company</Button>
            <Dropdown>
                <DropdownTrigger>
                    <Button radius='none' className={` bg-[--primary] p-4 h-[54px] text-small font-bold ${currentTap == 'boat' && "bg-[--secondary] text-white"}`}

                    >Charter a boat <ChevronDown className="inline mx-1" /></Button>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem onClick={e => {
                        setCurrentTap('boat')
                        setBoatType('longtail')
                    }}>Long tail boat</DropdownItem>
                    <DropdownItem onClick={e => {
                        setCurrentTap('boat')
                        setBoatType('chatamaran')
                    }}>Chatamaran boat</DropdownItem>
                    <DropdownItem onClick={e => {
                        setCurrentTap('boat')
                        setBoatType('speed')
                    }}>Speed boat</DropdownItem>
                    <DropdownItem onClick={e => {
                        setCurrentTap('boat')
                        setBoatType('fishing')
                    }}>Fishing</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Button radius='none' className={` bg-[--primary] p-4 h-[54px] text-small font-bold ${currentTap == 'jet' && "bg-[--secondary] text-white"}`}
                onClick={e => setCurrentTap('jet')}
            >Jet Ski</Button>
            <Button radius='none' className={` bg-[--primary] p-4 h-[54px] text-small font-bold ${currentTap == 'scuba' && "bg-[--secondary] text-white"}`}
                onClick={e => setCurrentTap('scuba')}
            >Scuba dive</Button>
        </div>
        <div className="mx-auto lg:w-[80vw] w-full mb-10 overflow-hidden ">

            <div className="text-3xl px-5 font-bold pb-5 mt-10">Explore the Andaman Sea with us!</div>

            <div className="">

                {currentTap == "island" && <Islands />}
                {currentTap == "boat" && boatType}
                {currentTap == "jet" && "jet"}
                {currentTap == "scuba" && "scuba"}


            </div>
        </div>

    </main >

}

function Islands() {
    const [data, setData] = useState<any>([]);
    const [lang, setLang] = useState("en");
    const [isLoading, setIsLoading] = useState(true);

    async function GetData() {
        setIsLoading(true);
        const docRef = collection(db, "islands");
        const docSnap = await getDocs(docRef);
        if (!docSnap.empty) {
            docSnap.forEach((doc) => {

                const docData = { id: doc.id, ...doc.data() };
                setData((prev: any) => [docData, ...prev])

            });
            setIsLoading(false)
        } else {
            console.log("No such document!");
        }
    }

    useEffect(() => {
        console.log("DATA  : ", data)
    }, [data]);

    useEffect(() => {
        GetData();
    }, []);
    return <>
        <div className="grid grid-cols-2 gap-2 w-full max-w-[1215px] py-5 px-5 lg:px-5">
            {isLoading && [1, 2, 3, 4, 5, 6].map(() => {
                return <SkeletonCard />
            })}
            {data.length > 0 && data.map((item: any, index: number) => {

                return <Link
                    key={index}
                    href={`/categories/island/${item?.id}`}
                    className="block rounded-xl overflow-hidden border-2 border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                    <div className="relative h-[300px] w-full overflow-hidden">
                        <img
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            src={item?.image_url?.[`${lang}`]?.[0] || "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            alt={item?.place_name || "Island"}
                        />
                    </div>

                    <div className="p-4">
                        <h2 className="font-bold text-xl mb-2 text-gray-800">{item?.place_name || "Island Name"}</h2>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                            {item?.description || "Experience the beauty of this tropical paradise with crystal clear waters, white sandy beaches, and lush vegetation. Perfect for a relaxing getaway or an adventure-filled vacation."}
                        </p>

                        <div className="flex items-center text-sm mb-3">
                            <Star className="fill-yellow-400 text-yellow-400 w-4 h-4 mr-1" />
                            <span className="font-bold text-gray-700">4.8</span>
                            <span className="mx-1 text-gray-400">•</span>
                            <span className="text-gray-600">100+ reserved</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                            <div className="inline-flex items-center text-sm px-2 py-1 rounded-full bg-green-100 text-green-700">
                                <MapPinned className="w-4 h-4 mr-1" />
                                <span>{item?.province || "Phuket"}, Thailand</span>
                            </div>
                            <div className="inline-flex items-center text-sm px-2 py-1 rounded-full bg-red-100 text-red-700">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>{item?.province || "Phuket"}, Thailand</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end">
                            <div className="text-sm text-gray-600">
                                Start at
                                <span className="block text-xl font-bold text-[--primary]">
                                    ฿ {item.price || 300}
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>


            })}
        </div>
    </>
}