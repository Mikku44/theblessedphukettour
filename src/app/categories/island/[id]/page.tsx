'use client'
import { useState } from "react";
import Carousel from "../../../components/carousel";
import TimelineTrip from "../../../components/Timeline";
import { Tab, Tabs } from "@nextui-org/tabs";

export default function Page() {

    const [currentTab, setCurrentTap] = useState("");

    return (

        <div className="min-h-[80vh]">
            <section>
                <Carousel />
            </section>

            <section className="px-10">
                <div className="flex flex-wrap gap-4 py-5">

                    <Tabs variant={"underlined"} aria-label="Tabs variants" onSelectionChange={e => setCurrentTap(e.toString())}>
                        <Tab key="Info" title="Info" />
                        <Tab key="Program" title="Program" />
                        <Tab key="Note" title="Note" />
                    </Tabs>

                </div>
                {currentTab === "Info" && <Info />}
                {currentTab === "Program" && <TimelineTrip />}
                {currentTab === "Note" && <Note />}
            </section>
        </div>

    )
}



function Info() {
    return <>
        <div className="py-3">
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
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Meal :</div>
            <div className="text-zinc-800">
                3 meals , drinks, snacks and fruit.
            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Halal :</div>
            <div className="text-zinc-800">
                Yes
            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Activities :</div>
            <div className="text-zinc-800">
                Snorkerling , Swimming , finding dolphin
            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Total Hours :</div>
            <div className="text-zinc-800">
                8:30 AM -4:40 PM.
            </div>
        </div>
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