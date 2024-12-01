'use client'
import { useContext, useEffect, useState } from "react";
// import Carousel from "../../../components/carousel";
import TimelineTrip from "../../../components/Timeline";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Activity, CarFront, Clock, InfoIcon, Loader, Map, MapPin, MapPinHouse, MapPinned, MapPinPlus, Slack, Utensils } from "lucide-react";
import { Button, Popover, Tooltip } from "flowbite-react";
import Collapse from "../../../components/collapse";
import Link from "next/link";
import { Button as NextButton } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import PlaceSelector from "../../../components/placeSelector";
import { db } from "../../../api/config/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import CustomerReview from "../../../components/customerReview";
import { Calendar } from "@nextui-org/calendar";
import { GetPrices } from "../../../../ultilities/stripeFunc";
import { formatCurrency } from "../../../../ultilities/formator";
import { v4 } from "uuid";
import { usePathname } from "next/navigation";
import { CartContext } from "../../../components/cartContext";
import Carousel from "../../../components/carouselMultiple";
import { Input } from "@nextui-org/input";
import Modal from "../../../components/modal";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import Image from "next/image";

export default function Page({ params }: { params: { id: string } }) {
    const cart = useContext(CartContext);
    const pathname = usePathname();

    const [isLoading, setIsLoading] = useState(true);

    const [currentTab, setCurrentTap] = useState("Info");
    const [shuttleOn, setShuttleOn] = useState(false);

    const [tempQuantity, setTempQuantity] = useState([]);
    const [data, setData] = useState<any>();
    const [lang, setLang] = useState("en");
    const [plans, setPlans] = useState([]);
    const [bookingDate, setBookingDate] = useState('');
    const [user, setUser] = useState<any>({});



    const [state, setState] = useState(
        {
            quantity: [],
            prices: [],
            pick_up_place: '',
            datetime: '',
            totalPrice: 0,
            name: '',
            lastname: '',
            email: '',
            phone: '',
            other: '',
            names: []


        }
    );

    async function GetData() {

        const docRef = doc(db, "islands", params?.id);
        const docSnap = await getDoc(docRef);


        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setData(docSnap.data())
            docSnap.data().ref_stripe && GetPrices(docSnap.data().ref_stripe).then((result) => {
                setPlans(result?.data.reverse());
                setState((prevState) => ({
                    ...prevState,
                    quantity: result?.data.map(() => 0),
                    prices: result?.data.map((item) => item?.unit_amount / 100),
                }));
            })
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }



        setIsLoading(false);

    }

    useEffect(() => {
        console.log("NAMES : ", state.names)
    }, [state.names]);

    useEffect(() => {
        if (data)
            console.log("DATA  : ", data)
    }, [data]);

    useEffect(() => {
        if (JSON.stringify(tempQuantity) === JSON.stringify(state.quantity)) return;

        setTempQuantity(state.quantity);
        const totalPrice = state.quantity.reduce(
            (total, qty, index) => total + qty * (state.prices[index] || 0),
            0
        );

        setState((prev) => ({ ...prev, totalPrice }));

    }, [state.quantity]);


    useEffect(() => {
        if (params) {
            GetData();

        }
        setUser(JSON.parse(localStorage.getItem('user')))
    }, []);
    return (

        <div className="">
            <Breadcrumbs className="py-5 lg:ml-16 ml-2" items={[
                {
                    label: "Island",
                    href: "/categories/island"
                },
                {
                    label: "Tour with group",
                    href: "/categories/island"
                },
                {
                    label: `${data?.place_name || ""}`,

                },
            ]} />
            <div className="min-h-[80vh]  mx-auto flex justify-center  flex-wrap pb-20">

                <section className="lg:w-[60%] w-full">
                    {/* <Carousel items={
                        data ?
                            data?.image_url?.[lang]?.map((item: any, index: number) => <div key={index} className="bg-black h-full text-white flex justify-center">
                                <img src={item} className="w-full h-full object-cover" alt="" />
                            </div>)
                            :
                            [
                                <div key={1} className="bg-black h-full text-white flex justify-center items-center"><Loader className=" animate-spin" /></div>,
                            ]} className="m-4" /> */}
                    {isLoading && <div className="flex flex-col mx-2">
                        <div className=" w-[90%]  rounded-lg bg-gray-200 animate-pulse mx-2" />
                        <div className="flex gap-2">
                            <div className=" bg-gray-200 animate-pulse aspect-square w-[100px] overflow-hidden"></div>
                            <div className=" bg-gray-200 animate-pulse aspect-square w-[100px] overflow-hidden"></div>
                            <div className=" bg-gray-200 animate-pulse aspect-square w-[100px] overflow-hidden"></div>
                        </div>
                    </div>}
                    {data && data?.image_url && <Carousel images={data?.image_url?.[lang]} />}
                    <div className="lg:px-10 md:px-0 py-10">
                        <div className="grid gap-1 lg:px-0 px-10">
                            <div className="lg:text-[36px] md:text-[32px] text-[24px] font-bold">{data?.place_name || "Island Name"}</div>
                            <div className="  gap-2 font-semibold  text-red-700"><Map className="text-black inline mx-2" />Island location  in  {data?.province || "Phuket"} , Thailand</div>
                            <div className="  gap-2 font-semibold mt-1 text-red-700"><MapPinHouse className="text-black inline mx-2" />Main service location and pier located in <a href={data?.pier_location?.link || ""}>{data?.pier_location?.label || ""}</a> , Thailand</div>
                        </div>

                        {isLoading && <div className="space-y-6">
                            {/* Section 1 */}
                            <div className="space-y-3">
                                {/* Title Skeleton */}
                                <div className="w-3/5 h-8 rounded-lg bg-gray-200 animate-pulse" />
                                {/* Description Skeleton */}
                                <div className="space-y-2">
                                    <div className="w-full h-4 rounded-lg bg-gray-200 animate-pulse" />
                                    <div className="w-11/12 h-4 rounded-lg bg-gray-200 animate-pulse" />
                                    <div className="w-4/5 h-4 rounded-lg bg-gray-200 animate-pulse" />
                                </div>
                            </div>
                            {/* Section 2 */}
                            <div className="space-y-3">
                                {/* Title Skeleton */}
                                <div className="w-2/3 h-8 rounded-lg bg-gray-200 animate-pulse" />
                                {/* Description Skeleton */}
                                <div className="space-y-2">
                                    <div className="w-full h-4 rounded-lg bg-gray-200 animate-pulse" />
                                    <div className="w-10/12 h-4 rounded-lg bg-gray-200 animate-pulse" />
                                    <div className="w-3/4 h-4 rounded-lg bg-gray-200 animate-pulse" />
                                </div>
                            </div>
                            {/* Section 3 */}
                            <div className="space-y-3">
                                {/* Title Skeleton */}
                                <div className="w-1/2 h-8 rounded-lg bg-gray-200 animate-pulse" />
                                {/* Description Skeleton */}
                                <div className="space-y-2">
                                    <div className="w-full h-4 rounded-lg bg-gray-200 animate-pulse" />
                                    <div className="w-9/12 h-4 rounded-lg bg-gray-200 animate-pulse" />
                                    <div className="w-2/3 h-4 rounded-lg bg-gray-200 animate-pulse" />
                                </div>
                            </div>
                        </div>
                        }
                        <div className="flex flex-col">
                            <div className="grid lg:grid-cols-3 top-0 sticky py-5  z-10">
                                <NextButton
                                    radius="none"
                                    onClick={() => setCurrentTap("Info")}
                                    className={`bg-[--primary] p-2 text-white ${currentTab === "Info" && "bg-[--secondary] font-bold"
                                        }`}
                                >
                                    Overview
                                </NextButton>
                                <NextButton
                                    radius="none"
                                    onClick={() => setCurrentTap("Program")}
                                    className={`bg-[--primary] p-2 text-white ${currentTab === "Program" && "bg-[--secondary] font-bold"
                                        }`}
                                >
                                    Program
                                </NextButton>
                                <NextButton
                                    radius="none"
                                    onClick={() => setCurrentTap("Note")}
                                    className={`bg-[--primary] p-2 text-white ${currentTab === "Note" && "bg-[--secondary] font-bold"
                                        }`}
                                >
                                    Note & Trip include
                                </NextButton>
                            </div>
                            <div className="px-2 overflow-y-auto">
                                {currentTab === "Info" && !isLoading && <Info data={data} />}
                                {currentTab === "Program" && (
                                    <TimelineTrip program={data?.program_timeline} />
                                )}
                                {currentTab === "Note" && (
                                    <Note notes={data?.note} tourInclude={data?.tour_include} />
                                )}
                            </div>
                        </div>

                    </div>
                </section>
                <section className="lg:w-[30%] flex justify-center mt-1  w-[80vw]">
                    <div className="border rounded-[20px] p-4 flex flex-col gap-10 sticky top-0 bg-white shadow-lg w-full min-h-fit lg:h-[400px]">
                        <div className="grid gap-1">
                            {/* {data && <PlanSelector data={data?.ticket_price} />
                            } */}
                            {isLoading && <div className="space-y-3">
                                {/* Title Skeleton */}
                                <div className="w-3/5 h-8 rounded-lg bg-gray-200 animate-pulse" />
                                {/* Description Skeleton */}
                                <div className="w-4/5 h-16 rounded-lg bg-gray-200 animate-pulse" />
                                {/* Rating Section */}
                                <div className="flex items-center gap-2">
                                    {/* Star Icon Skeleton */}
                                    <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse">
                                        <div className="w-6 h-6 text-gray-300" />
                                    </div>
                                    {/* Rating Text Skeletons */}
                                    <div className="w-16 h-4 rounded-lg bg-gray-200 animate-pulse" />
                                    <div className="w-24 h-4 rounded-lg bg-gray-200 animate-pulse" />
                                </div>
                            </div>}
                            {plans.map((item, index) => {
                                return <div key={index} className="rounded-md border-2 p-2 px-4 flex  justify-between">
                                    <div className="">
                                        <div className="text-sm mr-2 flex items-center gap-2">{item?.nickname || `Program ${index + 1}`}
                                            {item?.nickname.toLowerCase() == "child" && <Tooltip content="6-12 years old">
                                                <InfoIcon className="inline size-4 text-red-800"></InfoIcon>
                                            </Tooltip>}
                                        </div>
                                        <div className="text-xl font-bold">{formatCurrency(item?.unit_amount / 100, "")} THB</div>
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
                                onChange={(e: any) => {
                                    const selectedDate = e?.toDate?.(); // Safely access `toDate` method if it exists
                                    if (selectedDate) {
                                        console.log(`DATE  :${selectedDate.toISOString()}`);
                                        setBookingDate(`${selectedDate.toISOString()}`)
                                    } else {
                                        console.warn("No valid date found in MappedDateValue:", e);
                                    }
                                }}
                                className=""
                                aria-label="Please enter your stay duration"
                                showMonthAndYearPickers
                            />
                        </div>
                        {data?.trans_service && <Checkbox checked={shuttleOn} onChange={e => setShuttleOn(e.currentTarget.checked)} radius="full">Need a shuttle</Checkbox>}
                        {data?.trans_service && shuttleOn && <PlaceSelector onChange={(place) => {
                            setState((prevState) => ({
                                ...prevState, // Spread the existing state to preserve other properties
                                pick_up_place: place, // Update the `pick_up_place` key
                            }));
                        }}
                        />}
                        <div className="flex justify-between">
                            <div className="text-sm">Total Price : </div>
                            <div className="text-lg font-bold">{formatCurrency(state?.totalPrice, "THB")}</div>
                        </div>
                        {
                            (state.quantity.length && state.quantity.reduce((acc, cur) => acc + cur) > 0) &&
                            <div className="grid gap-1">
                                <div className="text-sm mb-1">Ticket 1</div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input value={state.name} onChange={(e) => setState(prev => ({ ...prev, name: e.target.value }))} placeholder="Name" classNames={{ input: "border-none" }}></Input>
                                    <Input value={state.lastname} onChange={(e) => setState(prev => ({ ...prev, lastname: e.target.value }))} placeholder="Last name" classNames={{ input: "border-none" }}></Input>
                                </div>
                                <Input value={state.email || user?.email} placeholder="Email address" type="email" classNames={{ input: "border-none" }}></Input>
                                <Input value={state.phone} onChange={(e) => setState(prev => ({ ...prev, phone: e.target.value }))} placeholder="Contact Number" type="phone" classNames={{ input: "border-none" }}></Input>
                                <Input value={state.other} onChange={(e) => setState(prev => ({ ...prev, other: e.target.value }))} placeholder="Other contact chanel eg. WhatsApp/LINE" type="phone" classNames={{ input: "border-none" }}></Input>
                            </div>
                        }
                        {
                            state.quantity.length && Array.from({ length: state.quantity.reduce((acc, cur) => acc + cur) - 1 }).map((item, index) =>
                                <div className="" key={index}>
                                    <div className="text-sm  mb-1">Ticket {index + 2}</div>
                                    <div className="grid  gap-2">
                                        <Input value={state.names[index]} onChange={(e) => setState((prev) => {
                                            const names = [...(prev.names || [])];
                                            names[index] = e.target.value;
                                            // console.log("NAMES: ", names);
                                            return ({
                                                ...prev,
                                                names: names,
                                            });
                                        })} placeholder="Name" classNames={{ input: "border-none" }}></Input>
                                    </div>
                                </div>
                            )
                        }
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-2">
                            <div>
                                <Button onClick={() => {
                                    if (state.quantity.reduce((acc, cur) => acc + cur) === 0) return alert("please pick ticket > 0");
                                    const products = state.quantity.map((item, index) => {
                                        return ({
                                            id: plans[index].id,
                                            page_id: params.id,
                                            quantity: item,
                                            type: 'island',
                                            status: "waiting",
                                            datetime: bookingDate,
                                            pick_up_place: state?.pick_up_place,
                                            name: state?.name,
                                            lastname: state?.lastname,
                                            email: state?.email,
                                            phone: state?.phone,
                                            other: state?.other,
                                            names: state?.names,
                                            created_at: new Date().toISOString(),
                                            image_url: data?.image_url?.[lang]?.[0]
                                        })
                                    });
                                    products.map((product) => {
                                        if (product.quantity <= 0) return;
                                        return cart.addOneToCart(product)
                                    });
                                    // store.setCart((prev) => {
                                    //     const newItems =
                                    //         state.quantity.map((item, index) => ({
                                    //             name: `${data?.place_name} (${plans[index].nickname || index})`,
                                    //             quantity: item,
                                    //             image: data?.image_url?.[lang]?.[0] || '',
                                    //             price: state.prices[index] * state.quantity[index],
                                    //             id: plans[index].id
                                    //         }))
                                    //         ;
                                    //     console.log([...prev.listItems, ...newItems])
                                    //     return ({
                                    //         listItems: [...prev.listItems, ...newItems]
                                    //     })
                                    // })
                                }} className="bg-[--primary] hover:bg-[--primart-50] text-white w-full mt-4 py-2 rounded-lg font-semibold">
                                    Add to Cart
                                </Button>
                            </div>
                            <Button onClick={async () => {
                                if (state.quantity.reduce((acc, cur) => acc + cur) === 0) return alert("please pick ticket > 0");
                                if (!user) window.location.href = `/login?from=${pathname}`
                                const products = state.quantity.map((item, index) => ({
                                    //miss id
                                    id: plans[index].id,
                                    quantity: item,
                                    type: 'island',
                                }));
                                products.map(async (product) => {
                                    // cart.addOneToCart(product.id, product.quantity)
                                    if (product.quantity <= 0) return
                                    await setDoc(doc(db, "Bookings", v4()), {
                                        uid: user.uid,
                                        created_at: new Date().toISOString(),
                                        page_id: params.id,
                                        ref_id: product?.id,
                                        type: product?.type,
                                        quantity: product?.quantity,
                                        status: "waiting",
                                        datetime: bookingDate,
                                        pick_up_place: state?.pick_up_place,
                                        name: state?.name,
                                        lastname: state?.lastname,
                                        email: state?.email,
                                        phone: state?.phone,
                                        other: state?.other,
                                        names: state?.names
                                    });
                                });
                                window.location.href = `/checkout`
                                // store.setCart((prev) => {
                                //     const newItems =
                                //         state.quantity.map((item, index) => ({
                                //             name: data?.place_name + plans[index].nickname,
                                //             quantity: item,
                                //             image: data?.image_url?.[lang]?.[0] || '',
                                //             price: state.prices[index] * state.quantity[index],
                                //             id: plans[index].id
                                //         }))
                                //         ;
                                //     console.log([...prev.listItems, ...newItems])
                                //     return ({
                                //         listItems: [...prev.listItems, ...newItems]
                                //     })
                                // })
                            }} className="bg-[--secondary] hover:bg-[--secondary-50] text-white w-full mt-4 py-2 rounded-lg font-semibold">
                                BOOK NOW
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="w-[90vw] mx-auto mt-10">
                    <div className="lg:text-[36px] md:text-[32px] text-[32px] font-bold px-10 pb-10">Reviews from customers</div>
                    <div className="grid lg:grid-cols-3 gap-2">{[1, 2, 3, 4, 5, 6, 7, 8].map((item, key) => <CustomerReview key={key} />,)}</div>
                </section>
            </div>


        </div>

    )
}



function Info({ data }) {
    const [expanded, setExpanded] = useState(false);
    return <>

        <Collapse className="lg:h-auto h-[100px] rounded-[30px] bg-gray-100">
            <div className='py-3 px-5 '>

                <span className="text-zinc-800">
                    {data?.place_des || "description"}
                </span>
            </div>
        </Collapse>

        <div className="py-3 flex items-center gap-2 px-5 rounded-[30px] bg-gray-100">
            <Slack className="inline size-6 text-[--primary-2]" />
            <div className="">
                <span className=" font-bold">Key Activity : </span>
                <span className="text-zinc-800">
                    {data?.activities || "No Activities"}
                </span>
            </div>
        </div>

        <div className="px-5 rounded-[30px] bg-gray-100 mt-3">
            <div className="py-3 flex items-center gap-2 ">
                <MapPinPlus className="inline size-6 text-[--primary-2]" />
                <div className="">
                    <span className=" font-bold ">Visit Point : </span>
                    <span className="text-zinc-800">
                        {data?.visit_point || "Visit Point info"}
                    </span>
                </div>
            </div>
            <div className="py-3 flex items-center gap-2">
                <Utensils className="inline size-6 text-[--primary-2]" />
                <div className="">
                    <span className=" font-bold ">Meal : </span>
                    <span className="text-zinc-800">
                        {data?.meal || "No meals"} <span>
                            {data?.food_halal ? <Image src="/icons/halal.svg" height="32" width="32" className="inline p-1" alt={"halal icon"} /> : ""}
                        </span>
                    </span>
                </div>
            </div>
            <div className="py-3  ">
                <MapPinPlus className="inline size-6 text-[--primary-2] mr-2" />
                <span className="text-[--primary-3]">
                    <span className="font-bold">Pier located at: : </span>
                    <a href={data?.pier_location?.link || ""}>
                        <span className="">
                            {data?.pier_location?.label || ""}
                        </span>
                    </a>

                </span>
            </div>
            <div className="py-3  ">
                <CarFront className="inline size-6 text-[--primary-2] mr-2" />
                <span className="text-[--primary-3]">
                    <span className="font-bold">Transfer service : </span>
                    <span className={`${expanded ? " " : "line-clamp-2"} `}>
                        {data?.trans_service ? "Yes, The tour provider will pickup and delivery to your accommodation once trip is complete Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, eius!Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, eius!Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, eius!Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, eius!" : "No total Hours"}
                    </span>
                    <button className="text-black font-bold mr-1" onClick={() => setExpanded(prev => !prev)}>{`${expanded ? "( less detail )" : "(view more for detail)"}`}</button>
                </span>
            </div>

            <div className="py-3 flex items-center gap-2">
                <Clock className="inline size-6 text-[--primary-2]" />
                <div className="">
                    <span className=" font-bold">Trip start-end : </span>
                    <span className="text-zinc-800">
                        {data?.total_hours || "No total Hours"}
                    </span>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-2 py-5">
            <div className="p-2 text-center py-4 bg-gray-100">
                Group tour by spead boat
            </div>
            <div className="p-2 text-center py-4 bg-gray-100">
                {data?.lang_guide} language guide
            </div>
        </div>


        <div className="py-3 grid grid-cols-2 gap-2 px-5 rounded-[20px] bg-gray-100">
            <div className="p-2 bg-gray-100">
                <Modal text={{
                    header: "Terms & condition ",
                    button: "Terms & condition",

                }}
                    className="w-full bg-gray-400"
                >
                    <div className="">{data?.terms}</div>
                </Modal>
            </div>
            <div className="p-2 bg-gray-100">
                <Modal text={{
                    header: "Trip policy",
                    button: "Trip policy",

                }}
                    className="w-full bg-gray-400"
                >
                    <div className="">{data?.trip_policy}</div>
                </Modal>
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
        <div className="py-3 bg-[#D9D9D970] px-5 rounded-[30px]">
            <div className="text-[--primary] font-bold text-2xl py-2">Tour include :</div>
            <div className="text-zinc-800">
                {tourInclude?.map((item, index) => <div className="" key={index}>{item || "- Tour Include"}</div>)}

            </div>
        </div>
        <div className="mb-3"></div>
        <div className="py-3 bg-[#D9D9D970] px-5 rounded-[30px]">
            <div className="text-[--primary] font-bold text-2xl py-2">Note :</div>
            <div className="text-zinc-800">
                {notes?.map((item, index) => <div className="" key={index}>{`${item}` || "1.Note."}</div>)}

            </div>
        </div>

    </>
}