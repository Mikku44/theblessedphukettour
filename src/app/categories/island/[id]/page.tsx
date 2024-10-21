'use client'
import { useState } from "react";
import Carousel from "../../../components/carousel";
import TimelineTrip from "../../../components/Timeline";
import { Tab, Tabs } from "@nextui-org/tabs";
import { ChevronDown, Link, MapPin, Star } from "lucide-react";
import { Button } from "flowbite-react";
import Collapse from "../../../components/collapse";

export default function Page() {

    const [currentTab, setCurrentTap] = useState("");

    return (

        <div className="min-h-[80vh]">
            <section >
                <Carousel className="m-4" />
            </section>

            <section className="px-10 py-10">
                <div className="text-[56px] font-bold">Racha Island</div>
                <div className="flex  gap-2 font-semibold"><MapPin />Location :  Phuket , Thailand</div>
                <div className="flex flex-wrap gap-4 py-5">

                    <Tabs variant={"underlined"} aria-label="Tabs variants" onSelectionChange={e => setCurrentTap(e.toString())}>
                        <Tab key="Info" title="Info" />
                        <Tab key="Program" title="Program" />
                        <Tab key="Note" title="Note" />
                    </Tabs>

                </div>
                <div className="flex justify-between flex-wrap">
                    <div className=" overflow-auto hidden-scroll px-2 lg:basis-1/2">
                        {currentTab === "Info" && <Collapse>
                            <Info />
                        </Collapse>}
                        {currentTab === "Program" && <TimelineTrip />}
                        {currentTab === "Note" && <Note />}
                    </div>


                    <div className="lg:basis-1/2 flex justify-center">
                        <div className="border rounded-[20px] p-6 flex flex-col gap-10 shadow-lg lg:w-[70%] min-h-fit h-[400px]">
                            <div className="flex justify-between">
                                <div className="text-2xl font-semibold">
                                    <div className="">Adult Ticket Price</div>
                                    ฿1500 <span className="text-sm text-gray-500">/ticket</span>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-gray-600 flex gap-2"><Star /><span> 4.95</span></span>
                                </div>
                            </div>
                            <div className="mt-4 border rounded-lg ">
                                <div className="flex justify-between mb-3 p-4">
                                    <div>
                                        <div className="text-black text-lg font-bold">CHECK-IN</div>
                                        <div className="font-semibold text-xs">01/24/2023</div>
                                    </div>
                                    <div>
                                        <div className="text-black text-lg font-bold">CHECKOUT</div>
                                        <div className="font-semibold text-xs">01/28/2023</div>
                                    </div>
                                </div>
                                <div className="border-t">
                                    <div className="flex justify-between mb-3 p-4">
                                        <div>
                                            <div className="text-black text-lg font-bold">Total Hours </div>
                                            <div className="font-semibold text-xs">8:30 AM - 4:40 PM</div>
                                        </div>
                                        <div>
                                            <div className="text-black text-lg font-bold text-end w-full">Meal </div>
                                            <div className="font-semibold text-xs">3 meals , drinks, snacks and fruit.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" border-t ">
                                    <div className="p-4 flex justify-between">
                                        <div className="text-black text-lg font-bold">GUESTS</div>
                                        <div className="font-semibold text-xs flex items-center">
                                            6 guests
                                            <span className="ml-2"><ChevronDown /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link href="#">
                                <Button className="bg-[--primary] text-white w-full mt-4 py-2 rounded-lg font-semibold">
                                    BOOK NOW
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}



function Info() {
    return <>
        <div className="py-3">
            {/* <div className="text-[--primary] font-bold text-2xl py-2"></div> */}
            <div className="text-zinc-800 flex gap-2 px-1">
                {["Snorkerling", "Swimming", "finding dolphin"].map((item: any, index: number) =>
                    <div className="p-2 px-4 rounded-[12px] border w-fit h-fit shadow-md">
                        
                        {item}
                    </div>)}
            </div>
        </div>
        <div className={`py-3`}>
            <div className="text-[--primary] font-bold text-2xl py-2">Description :</div>
            <div className="text-zinc-800">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, nobis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur sunt,
                eius minus eligendi, aperiam iure temporibus hic est accusamus perferendis facilis
                libero iusto earum molestias repellat eaque ipsa! Velit, amet.
            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Visit Point :</div>
            <div className="text-zinc-800">
                Racha Island
            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Reference Page :</div>
            <div className="text-zinc-800">
                Island 004
            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Travel Via :</div>
            <div className="text-zinc-800">
                Tour boat
            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Boat Duration :</div>
            <div className="text-zinc-800">
                1 hours
            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Adult Ticket Price :</div>
            <div className="text-zinc-800">
                1500
            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Child Ticket Price :</div>
            <div className="text-zinc-800">
                300
            </div>
        </div>
        {/* <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Meal :</div>
            <div className="text-zinc-800">
                3 meals , drinks, snacks and fruit.
            </div>
        </div> */}
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Halal :</div>
            <div className="text-zinc-800">
                Yes
            </div>
        </div>

        {/* <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Total Hours :</div>
            <div className="text-zinc-800">
                8:30 AM -4:40 PM.
            </div>
        </div> */}
        <div className="py-3 pb-10">
            <div className="text-[--primary] font-bold text-2xl py-2">How to book the trip :</div>
            <div className="text-zinc-800">
                <div className="">1.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, nobis.</div>
                <div className="">2.Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur sunt,</div>
                <div className="">3.eius minus eligendi, aperiam iure temporibus hic est accusamus perferendis facilis
                    libero iusto earum molestias repellat eaque ipsa! Velit, amet.</div>
            </div>
        </div>
    </>
}
function Note() {
    return <>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Tour include :</div>
            <div className="text-zinc-800">
                <div className="">- Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, nobis.</div>
                <div className="">- Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur sunt,</div>
                <div className="">- eius minus eligendi, aperiam iure temporibus hic est accusamus perferendis facilis</div>
                <div className="">- libero iusto earum molestias repellat eaque ipsa! Velit, amet.</div>
            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Note :</div>
            <div className="text-zinc-800">
                <div className="">1.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, nobis.</div>
                <div className="">2.Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur sunt,</div>
                <div className="">3.eius minus eligendi, aperiam iure temporibus hic est accusamus perferendis facilis
                    libero iusto earum molestias repellat eaque ipsa! Velit, amet.</div>
            </div>
        </div>

    </>
}