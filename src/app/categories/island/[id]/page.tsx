'use client'
import { useEffect, useState } from "react";
import Carousel from "../../../components/carousel";
import TimelineTrip from "../../../components/Timeline";
import { Tab, Tabs } from "@nextui-org/tabs";
import { ChevronDown, MapPin, Star } from "lucide-react";
import { Button, Card } from "flowbite-react";
import Collapse from "../../../components/collapse";
import Link from "next/link";
import DraggableScroll from "../../../components/DraggableScroll";
import PlanSelector from "../../../components/planSelector";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Checkbox } from "@nextui-org/checkbox";
import PlaceSelector from "../../../components/placeSelector";
import { db } from "../../../api/config/config";
import { collection, doc, getDoc } from "firebase/firestore";
import CustomerReview from "../../../components/customerReview";


export default function Page({ params }: { params: { id: string } }) {

    const [currentTab, setCurrentTap] = useState("");
    const [shuttleOn, setShuttleOn] = useState(false);

    const [data, setData] = useState<any>();
    const [lang, setLang] = useState("en");

    async function GetData() {
        const docRef = doc(db, "islands", params?.id);
        const docSnap = await getDoc(docRef);


        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setData(docSnap.data())
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

    }

    useEffect(() => {
        console.log("DATA  : ", data)
    }, [data]);

    useEffect(() => {
        GetData();
    }, []);
    return (

        <div className="min-h-[80vh]  mx-auto flex justify-center relative flex-wrap py-20">
            <section className="lg:w-[60%] w-full">
                <Carousel items={
                    data ?
                        data?.image_url?.[lang]?.map((item: any, index: number) => <div key={index} className="bg-black h-full text-white flex justify-center">
                            <img src={item} className="w-full h-full object-cover" alt="" />
                        </div>)
                        :
                        [
                            <div className="bg-black h-full text-white flex justify-center items-center">PIC 1</div>,
                            <div className="bg-black h-full text-white flex justify-center items-center">PIC 2 </div>

                        ]} className="m-4" />
                <div className="px-10 py-10">
                    <div className="text-[56px] font-bold">{data?.place_name || "Island Name"}</div>
                    <div className="flex  gap-2 font-semibold"><MapPin />Location :  {data?.province || "Phuket"} , Thailand</div>
                    <div className="flex flex-wrap gap-4 py-5">
                        <Tabs

                            radius="sm"
                            color="warning"
                            variant="light"
                            classNames={{
                                base: ' text-white',
                                tab: "bg-[--primary]"
                            }}
                            size="lg"
                            aria-label="Tabs variants"
                            onSelectionChange={e => setCurrentTap(e.toString())}>
                            <Tab key="Info" title="Info" />
                            <Tab key="Program" title="Program" />
                            <Tab key="Note" title="Note" />
                        </Tabs>
                    </div>
                    <div className="flex justify-between flex-wrap">
                        <div className=" overflow-auto hidden-scroll px-2 ">
                            {currentTab === "Info" && <Collapse>
                                <Info data={data} />
                            </Collapse>}
                            {currentTab === "Program" && <TimelineTrip program={data?.program_timeline} />}
                            {currentTab === "Note" && <Note notes={data?.note} tourInclude={data?.tour_include} />}
                        </div>

                    </div>
                </div>
            </section>


            <section className="lg:w-[30%] flex justify-center py-5">
                <div className="border rounded-[20px] p-4 flex flex-col gap-10 sticky top-20 shadow-lg w-full min-h-fit h-[400px]">
                    <div className="grid">
                        {data && <PlanSelector data={data?.ticket_price} />
                        }
                    </div>
                    <DateRangePicker
                        label="Stay duration"
                        description="Please enter your stay duration"
                        className=""
                    />
                    <Checkbox checked={shuttleOn} onChange={e => setShuttleOn(e.currentTarget.checked)} radius="full">Need a shuttle</Checkbox>
                    {shuttleOn && <PlaceSelector />}
                    {/* <div className="mt-4 border rounded-lg ">
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
                    </div> */}
                    <Link href={`/categories/island/booking?id=${params.id}`}>
                        <Button className="bg-[--secondary] hover:bg-[--secondary-50] text-white w-full mt-4 py-2 rounded-lg font-semibold">
                            BOOK NOW
                        </Button>
                    </Link>
                </div>
            </section>


            <section className="w-[90vw] mx-auto">
                <div className="text-xl px-10">Reviews from customers</div>


                <DraggableScroll className="p-5 px-10 pretty-scroll" items={
                    [
                        [1, 2, 3, 4, 5, 6, 7, 8].map((item, key) => <CustomerReview/>,)

                    ]
                } />
            </section>
        </div>

    )
}



function Info({ data }) {
    return <>
        <div className="py-3">
            {/* <div className="text-[--primary] font-bold text-2xl py-2"></div> */}
            <div className="text-zinc-800 flex gap-2 px-1">
                {data && data?.activities?.split(",").map((item: any, index: number) =>
                    <div className="p-2 px-4 rounded-[12px] border w-fit h-fit shadow-md">

                        {item}
                    </div>)}
            </div>
        </div>
        <div className={`py-3`}>
            <div className="text-[--primary] font-bold text-2xl py-2">Description :</div>
            <div className="text-zinc-800">
                {data?.place_des || "description"}
            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Visit Point :</div>
            <div className="text-zinc-800">
                {data?.visit_point || "Visit Point info"}
            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Reference Page :</div>
            <div className="text-zinc-800">
                {data?.reference_page || "Ref page"}
            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Travel Via :</div>
            <div className="text-zinc-800">
                {data?.travel_via || "Travel via"}
            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Boat Duration :</div>
            <div className="text-zinc-800">
                {data?.boat_duration || "boat duration"}
            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Adult Ticket Price :</div>
            <div className="text-zinc-800">
                {data?.ticket_price?.adult ||"No data"}
            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Child Ticket Price :</div>
            <div className="text-zinc-800">
            {data?.ticket_price?.child ||"No data"}
            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Meal :</div>
            <div className="text-zinc-800">
               {data?.meal ||"No meals"}
            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Halal :</div>
            <div className="text-zinc-800">
            <Checkbox isSelected={data?.food_halal}>{data?.food_halal ? "Yes" : "No"}</Checkbox>
            </div>
        </div>

        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Total Hours :</div>
            <div className="text-zinc-800">
                {data?.total_hours ||"No total Hours"}
            </div>
        </div>
        <div className="py-3 pb-10">
            <div className="text-[--primary] font-bold text-2xl py-2">How to book the trip :</div>
            <div className="text-zinc-800 grid gap-2">
               {data?.how_to_book?.map((item,index) => <div className="" key={index}>{item||"how to book"}</div>)}
          
            </div>
        </div>
    </>
}
function Note({ notes, tourInclude }: any) {
    return <>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Tour include :</div>
            <div className="text-zinc-800">
                {tourInclude?.map((item, index) => <div className="" key={index}>{item || "- Tour Include"}</div>)}

            </div>
        </div>
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Note :</div>
            <div className="text-zinc-800">
                {notes?.map((item, index) => <div className="" key={index}>{`${item}` || "1.Note."}</div>)}

            </div>
        </div>

    </>
}