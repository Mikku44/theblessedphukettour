'use client'
import { ChevronDown, Compass, MapPin, Ship, Star } from "lucide-react";
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

export default function Page() {
    const t = useTranslations();
    const [currentTap, setCurrentTap] = useState("island");
    const [boatType, setBoatType] = useState('longTail');

    return <main className="min-h-screen bg-slate-100">
       
            <div className="w-full overflow-hidden  rounded-b-[40px]">
                <Carousel items={
                    [
                        "/images/banner/banner1.png",
                        "/images/banner/banner2.png",
                        "/images/banner/banner3.png",
                    ].map((item, index) =>
                        <div key={index} className="bg-black  text-white ">
                            <img src={item} alt="" />
                        </div>
                    )
                } className="w-full lg:h-[620px] h-[50vh] aspect-auto" />
            </div>
            <div className="mx-auto w-[80vw] my-10 overflow-hidden">
                <div className="text-3xl font-bold pb-5">What are you looking for?</div>
                <div className="flex flex-wrap gap-4 py-2 lg:w-full w-[80vw] overflow-auto">
                    {/* <Tabs
                        style={{ fontWeight: "bold" }}
                        radius="sm"
                        color="warning"
                        variant="light"
                        classNames={{
                            base: ' text-white',
                            tab: "bg-[--primary]"
                        }}
                        size="lg"
                        aria-label="Tabs variants"
                        onSelectionChange={e => setCurrentTap(e.toString())}
                    >

                        <Tab key="island" title="Tour by company" />
                        <Tab key="boat"  title="Charter a boat" />
                        <Tab key="jet" title="Jet ski" />
                        <Tab key="scuba" title="Scuba dive" />
                    </Tabs> */}
                    <div className="flex gap-2">
                        <Button className={` bg-[--primary] p-2 text-white ${currentTap == 'island' && "bg-[--secondary]"}`}
                            onClick={e => setCurrentTap('island')}
                        >Tour by company</Button>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button className={` bg-[--primary] p-2 text-white ${currentTap == 'boat' && "bg-[--secondary]"}`}

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
                        <Button className={` bg-[--primary] p-2 text-white ${currentTap == 'jet' && "bg-[--secondary]"}`}
                            onClick={e => setCurrentTap('jet')}
                        >Jet Ski</Button>
                        <Button className={` bg-[--primary] p-2 text-white ${currentTap == 'scuba' && "bg-[--secondary]"}`}
                            onClick={e => setCurrentTap('scuba')}
                        >Scuba dive</Button>
                    </div>
                </div>
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

    async function GetData() {
        const docRef = collection(db, "islands");
        const docSnap = await getDocs(docRef);
        if (!docSnap.empty) {
            docSnap.forEach((doc) => {

                const docData = { id: doc.id, ...doc.data() };
                setData((prev: any) => [docData, ...prev])
            });
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
        <div className="grid lg:grid-cols-2  gap-2  w-full py-5 ">
            {data.length > 0 && data.map((item: any, index: number) => {

                return <a key={index} href={`/categories/island/${item?.id}`} className="rounded-xl w-full h-auto p-4 border-2 bg-white flex flex-col justify-between">
                    <div className="rounded-md  overflow-hidden h-[300px] w-full">
                        <img
                            className="h-full w-full object-cover"
                            src={item?.image_url?.[`${lang}`]?.[0] || "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            alt={item?.place_name || "Island"}
                        />
                    </div>

                    <div className="mt-4 mb-2">
                        <h2 className="font-bold text-xl mb-2">{item?.place_name || "Island Name"}</h2>
                        <p className="text-gray-600 text-sm line-clamp-3">
                            {item?.description || "Experience the beauty of this tropical paradise with crystal clear waters, white sandy beaches, and lush vegetation. Perfect for a relaxing getaway or an adventure-filled vacation."}
                        </p>
                        <span className="text-sm ">
                            <Star className="fill fill-yellow-300 text-yellow-300 inline " /> <span className="font-bold">4.8  • </span><span className="text-gray-600">100+ reserved</span>
                        </span>
                    </div>

                    <div className="flex justify-between items-end">
                        <div className="grid">
                            <div className="text-green-400 flex items-center text-sm px-2 py-1 rounded-full bg-green-100">
                                <Ship className="inline mr-2 h-4 w-4" />
                                <span>{item?.province || "Phuket"}, Thailand</span>
                            </div>
                            <div className="text-red-500 flex items-center text-sm mt-1 px-2 py-1 rounded-full bg-red-100">
                                <MapPin className="mr-2 inline h-4 w-4" />
                                <span>{item?.province || "Phuket"}, Thailand</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-semibold text-gray-600">
                                Start at
                            </div>
                            <div className="text-xl font-bold text-[--primary]">
                                ฿ {item.price || 300} 
                            </div>
                        </div>
                    </div>
                </a>


            })}
        </div>
    </>
}