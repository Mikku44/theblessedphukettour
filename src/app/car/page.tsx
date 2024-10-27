'use client'
import { useRouter } from "next/navigation";
import CarCard from "../components/carCard";
import { Button } from "flowbite-react";
import Link from "next/link";

export default function Car() {

    const router = useRouter();

    const handleLearnMore = () => {
        console.log("Learn More button clicked!");
        // Navigate to a details page or show more info
        router.push("/car-details");
    };

    const handleReserve = () => {
        console.log("Reserve button clicked!");
        // Navigate to a booking page
        router.push("/reserve");
    };


    return <>
        <div className="min-h-[80vh]">
            <section className="relative h-screen flex items-center justify-center bg-gray-800">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                        src="https://live.staticflickr.com/1241/856038094_4efa1779c9_b.jpg" // Replace with the path to your hero image
                        alt="Luxury Car"
                        className="opacity-60 w-full"
                    />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl font-bold mb-4">
                        Discover Your Dream Ride
                    </h1>
                    <p className="text-lg mb-8">
                        Luxury, comfort, and adventure – find the perfect car for every journey.
                    </p>
                    <Link href="#car-list">
                        <Button
                            size="lg"

                        // onClick={handleExploreCars}
                        >
                            Explore Cars
                        </Button>
                    </Link>
                </div>
            </section>
            <section className="mx-auto my-20 w-[80vw]">
                <div className="text-[42px] font-bold py-5">Explore cars</div>
                <div id="car-list" className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                    {[1, 2, 34, 5, 6].map(item =>
                        <Link key={item} href={`/car/booking?id=${item}`}>
                            <CarCard
                            
                                title="ROV22 City"
                                imageUrl="https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg" // Replace with actual image path
                                onLearnMore={handleLearnMore}
                                onReserve={handleReserve}
                            />
                        </Link>)}
                </div>
            </section>
        </div>
    </>
}