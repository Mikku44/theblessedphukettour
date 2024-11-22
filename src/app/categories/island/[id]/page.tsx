'use client'
import { useContext, useEffect, useState } from "react";
import Carousel from "../../../components/carousel";
import TimelineTrip from "../../../components/Timeline";
import { Tab, Tabs } from "@nextui-org/tabs";
import { MapPin } from "lucide-react";
import { Button } from "flowbite-react";
import Collapse from "../../../components/collapse";
import Link from "next/link";

import { Checkbox } from "@nextui-org/checkbox";
import PlaceSelector from "../../../components/placeSelector";
import { db } from "../../../api/config/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import CustomerReview from "../../../components/customerReview";
import { Calendar } from "@nextui-org/calendar";
import { GetPrices } from "../../../../ultilities/stripeFunc";
import { formatCurrency } from "../../../../ultilities/formator";
import { CartContext } from "../../../variants/context";
import { v4 } from "uuid";
export default function Page({ params }: { params: { id: string } }) {
    const store = useContext(CartContext);
    const [currentTab, setCurrentTap] = useState("");
    const [shuttleOn, setShuttleOn] = useState(false);

    const [data, setData] = useState<any>();
    const [lang, setLang] = useState("en");
    const [plans, setPlans] = useState([]);
    const [bookingDate, setBookingDate] = useState('');

    const [state, setState] = useState(
        {
            quantity: [],
            prices: [],
            totalPrice: 0

        }
    );

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
        if (data)
            console.log("DATA  : ", data)
    }, [data]);


    useEffect(() => {
        setState((prev) => ({
            ...prev,
            totalPrice: prev.quantity.reduce(
                (total, qty, index) => total + qty * (prev.prices[index] || 0),
                0
            ),
        }));
    }, [state.quantity]);

    useEffect(() => {
        GetData();
        GetPrices('prod_RBdKHJOiWZ9SRi').then((result) => {
            setPlans(result?.data);
            setState((prevState) => ({
                ...prevState,
                quantity: result?.data.map(() => 0),
                prices: result?.data.map((item) => item?.unit_amount),
            }));
        })
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
                            <div key={1} className="bg-black h-full text-white flex justify-center items-center">PIC 1</div>,
                            <div key={2} className="bg-black h-full text-white flex justify-center items-center">PIC 2 </div>

                        ]} className="m-4" />
                <div className="px-10 py-10">
                    <div className="lg:text-[42px] md:text-[32px] text-[32px] font-bold">{data?.place_name || "Island Name"}</div>
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


            <section className="lg:w-[30%] flex justify-center py-5 w-[80vw]">
                <div className="border rounded-[20px] p-4 flex flex-col gap-10 sticky top-20 shadow-lg w-full min-h-fit h-[400px]">
                    <div className="grid gap-2">
                        {/* {data && <PlanSelector data={data?.ticket_price} />
                        } */}
                        {plans.map((item, index) => {
                            return <div key={index} className="rounded-md border-2 p-2 px-4 flex justify-between">
                                <div className="">
                                    <div className="text-lg">{item?.nickname || `Program ${index + 1}`}</div>
                                    <div className="text-sm">{formatCurrency(item?.unit_amount, "THB")} THB</div>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <Button onClick={() => setState((prev) => ({
                                        ...prev,
                                        quantity: prev.quantity.map((item, i) =>
                                            i === index && item > 0 ? item - 1 : item
                                        ),
                                    }))} className="bg-[--primary]" >-</Button>
                                    <div className="px-2">{state?.quantity[index]}</div>
                                    <Button onClick={() => setState((prev) => ({
                                        ...prev,
                                        quantity: prev.quantity.map((item, i) =>
                                            (i === index) ? item + 1 : item
                                        ),
                                    }))} className="bg-[--primary]" >+</Button>
                                </div>
                            </div>
                        })}
                    </div>
                    {/* <DateRangePicker
                        label="Stay duration"
                        description="Please enter your stay duration"
                        className=""
                    /> */}
                    <div className="w-full flex justify-center">
                        <Calendar
                            onChange={(e) => setBookingDate(e.toDate.toString())
                            }
                            className=""
                            aria-label="Please enter your stay duration"
                            showMonthAndYearPickers
                        />
                    </div>
                    <Checkbox checked={shuttleOn} onChange={e => setShuttleOn(e.currentTarget.checked)} radius="full">Need a shuttle</Checkbox>
                    {shuttleOn && <PlaceSelector />}


                    <div className="flex justify-between">
                        <div className="text-sm">Total Price : </div>
                        <div className="text-lg font-bold">{formatCurrency(state?.totalPrice, "THB")}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <Button onClick={() => {
                                store.setCart((prev) => {
                                    const newItems =
                                        state.quantity.map((item, index) => ({
                                            name: `${data?.place_name} (${plans[index].nickname || index})`,
                                            quantity: item,
                                            image: data?.image_url?.[lang]?.[0] || '',
                                            price: state.prices[index] * state.quantity[index],
                                            id:plans[index].id 
                                        }))
                                        ;
                                    console.log([...prev.listItems, ...newItems])
                                    return ({
                                        listItems: [...prev.listItems, ...newItems]
                                    })
                                })
                            }} className="bg-[--primary] hover:bg-[--primart-50] text-white w-full mt-4 py-2 rounded-lg font-semibold">
                                Add to Cart
                            </Button>
                        </div>
                        <Link href={`/checkout`}>
                            <Button onClick={ async() => {
                                store.setCart((prev) => {
                                    const newItems =
                                        state.quantity.map((item, index) => ({
                                            name: data?.place_name + plans[index].nickname,
                                            quantity: item,
                                            image: data?.image_url?.[lang]?.[0] || '',
                                            price: state.prices[index] * state.quantity[index],
                                            id:plans[index].id
                                        }))
                                        ;
                                    console.log([...prev.listItems, ...newItems])
                                    return ({
                                        listItems: [...prev.listItems, ...newItems]
                                    })
                                })

                                await setDoc(doc(db, "Bookings", v4()), {
                                    uid:"user_id",
                                    created_at: new Date().toISOString(),
                                    status:"waiting",
                                    total_price:1000,
                                    items:[{
                                        ref_id:"ref_id",
                                        type:"island",
                                        quantity:1,
                                        price:1000,
                                        pick_up_place:'',
                                        datetime:'2024-11-25T23:00:30Z'
                                    }]

                                  });
                            }} className="bg-[--secondary] hover:bg-[--secondary-50] text-white w-full mt-4 py-2 rounded-lg font-semibold">
                                BOOK NOW
                            </Button>
                        </Link>

                    </div>
                </div>
            </section>


            <section className="w-[90vw] mx-auto mt-10">
                <div className="text-[42px] font-bold px-10 pb-10">Reviews from customers</div>


                <div className="grid lg:grid-cols-3 gap-2">{[1, 2, 3, 4, 5, 6, 7, 8].map((item, key) => <CustomerReview key={key} />,)}</div>
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
        {/* <div className="py-3">
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
        </div> */}
        <div className="py-3">
            <div className="text-[--primary] font-bold text-2xl py-2">Meal :</div>
            <div className="text-zinc-800">
                {data?.meal || "No meals"}
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
                {data?.total_hours || "No total Hours"}
            </div>
        </div>
        {/* <div className="py-3 pb-10">
            <div className="text-[--primary] font-bold text-2xl py-2">How to book the trip :</div>
            <div className="text-zinc-800 grid gap-2">
               {data?.how_to_book?.map((item,index) => <div className="" key={index}>{item||"how to book"}</div>)}
          
            </div>
        </div> */}
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