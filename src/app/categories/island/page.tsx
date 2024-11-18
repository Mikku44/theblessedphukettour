'use client'
import { Compass, MapPin } from "lucide-react";
import DraggableScroll from "../../components/DraggableScroll";
import { useTranslations } from "next-intl";
import { Tabs, Tab } from "@nextui-org/tabs";
import Link from "next/link";
import Image from "next/image";
import Carousel from "../../components/carousel";
import { useState } from "react";

export default function Page() {
    const t = useTranslations();
    const [currentTap, setCurrentTap] = useState("island");

    return <main className="min-h-screen relative top-0 ">
        <section className="">
            <Carousel items={

                ["https://images.unsplash.com/photo-1443181994330-3e365ff8949e?q=80&w=1781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "https://images.unsplash.com/photo-1529333241880-9558d5e5e064?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGlzbGFuZHxlbnwwfHwwfHx8MA%3D%3D",
                    "https://images.unsplash.com/photo-1527401850656-0f34108fdb30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fGlzbGFuZHxlbnwwfHwwfHx8MA%3D%3D"].map((item, index) =>
                        <div key={index} className="bg-black h-full text-white flex justify-center">
                            <img src={item} alt="" />
                        </div>
                    )



            } className="m-4 h-[500px]" />
            <div className="mx-auto w-[80vw]">

                <div className="flex flex-wrap gap-4 py-2">
                    <Tabs
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
                        <Tab key="boat" title="Charter a boat" />
                        <Tab key="jet" title="Jet ski" />
                        <Tab key="scuba" title="Scuba dive" />
                    </Tabs>
                </div>
                <div className="">

                    {currentTap == "island" && <Islands />}
                    {currentTap == "boat" && "boat"}
                    {currentTap == "jet" && "jet"}
                    {currentTap == "scuba" && "scuba"}


                </div>
            </div>
        </section>
    </main >

}

function Islands() {
    return <>
        <div className="grid grid-cols-3 gap-2  w-full py-5">
            {[1, 2, 3, 4, 5].map((item: any, index: number) => {

                return <a key={index} href={`/categories/island/${item}`} className="rounded-xl w-full h-[300px] p-2">
                    <div className="rounded-md shadow-md overflow-clip h-[80%] w-full aspect-square">
                        <img src="https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </div>
                    <div className="font-bold text-[22px]">Island Name</div>
                    <div className="text-red-500 flex gap-1 items-center">
                        <MapPin className="size-5"></MapPin>
                        <div className="">Phuket , Thailand</div>
                    </div>
                </a>
            })}
        </div>
    </>
}