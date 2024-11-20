'use client'
import { Compass, MapPin } from "lucide-react";
import DraggableScroll from "../../components/DraggableScroll";
import { useTranslations } from "next-intl";
import { Tabs, Tab } from "@nextui-org/tabs";
import Link from "next/link";
import Image from "next/image";
import Carousel from "../../components/carousel";
import { useEffect, useState } from "react";
import { db } from "../../api/config/config";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export default function Page() {
    const t = useTranslations();
    const [currentTap, setCurrentTap] = useState("island");


    return <main className="min-h-screen">
        <section className="">
            <div className="w-full bg-black">
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
                } className="w-full h-[620px]" />
            </div>
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
        <div className="grid lg:grid-cols-2  gap-2  w-full py-5">
            {data.length > 0 && data.map((item: any, index: number) => {

                return <a key={index} href={`/categories/island/${item?.id}`} className="rounded-xl w-full h-[300px] p-2">
                    <div className="rounded-md shadow-md overflow-clip h-[80%] w-full aspect-square">
                        <img
                            className="h-full w-full object-cover"
                            src={item?.image_url?.[`${lang}`]?.[0] || "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />
                    </div>
                    <div className="font-bold text-[22px] pt-2">{item?.place_name || "Island Name"}</div>
                    <div className="text-red-500 flex gap-1 items-center">
                        <MapPin className="size-5"></MapPin>
                        <div className="">{item?.province || "Phuket"} , Thailand</div>
                    </div>
                </a>
            })}
        </div>
    </>
}